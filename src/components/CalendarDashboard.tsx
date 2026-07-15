import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Plus, Trash2, LogOut, RefreshCw, AlertTriangle, 
  Loader2, Lock, Clock, Settings, ShieldAlert, CheckCircle,
  Play, Check, ExternalLink, CalendarDays, Terminal, Activity
} from 'lucide-react';
import { initAuth, googleSignIn, logout, getAccessToken } from '../lib/google-auth';
import { User } from 'firebase/auth';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  htmlLink?: string;
}

export default function CalendarDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Create Event Form States
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [isCreating, setIsCreating] = useState(false);
  
  // Delete Event Confirmation State
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Terminal API Logs
  const [apiLogs, setApiLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setApiLogs(prev => [`[${time}] ${message}`, ...prev.slice(0, 49)]);
  };

  useEffect(() => {
    addLog("System initializing... Monitoring auth state.");
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setNeedsAuth(false);
        addLog(`Authenticated: ${currentUser.email}`);
        fetchEvents(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
        addLog("No active Google session found.");
      }
    );

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setEventDate(today);

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    addLog("Initiating Google Sign-In pop-up flow...");
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        addLog(`Successfully authorized. User: ${result.user.email}`);
        fetchEvents(result.accessToken);
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Google authentication failed');
      addLog(`ERR: Auth popup rejected or failed. Details: ${err.message || 'Unknown'}`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    addLog("Logging out from Google services...");
    try {
      await logout();
      setUser(null);
      setToken(null);
      setEvents([]);
      setNeedsAuth(true);
      addLog("Signed out. Session cleared.");
    } catch (err: any) {
      addLog(`ERR: Logout error. Details: ${err.message}`);
    }
  };

  const fetchEvents = async (accessToken: string) => {
    setIsLoading(true);
    setError(null);
    const timeMin = new Date().toISOString();
    addLog(`GET https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin.substring(0, 10)}...`);
    try {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true&timeMin=${timeMin}&maxResults=10`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          addLog("ERR [401 Unauthorized] Access token expired. Please re-authenticate.");
          setNeedsAuth(true);
          return;
        }
        throw new Error(`Google Calendar API returned status ${res.status}`);
      }

      const data = await res.json();
      setEvents(data.items || []);
      addLog(`SUCCESS: Parsed ${data.items?.length || 0} upcoming calendar events.`);
    } catch (err: any) {
      console.error('Fetch events failed:', err);
      setError(err.message || 'Failed to fetch calendar events');
      addLog(`ERR: Event retrieval failed. Connection lost or bad API parameters.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!summary) {
      setError('Event summary title is required.');
      return;
    }

    setIsCreating(true);
    setError(null);

    const startDateTime = `${eventDate}T${startTime}:00`;
    const endDateTime = `${eventDate}T${endTime}:00`;

    // Guess timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

    const eventPayload = {
      summary,
      description: description || 'Created from Operations Telemetry Portal',
      start: {
        dateTime: startDateTime,
        timeZone,
      },
      end: {
        dateTime: endDateTime,
        timeZone,
      },
    };

    addLog(`POST https://www.googleapis.com/calendar/v3/calendars/primary/events (Payload: "${summary}")`);

    try {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventPayload),
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to create event. Status code: ${res.status}`);
      }

      const created = await res.json();
      addLog(`SUCCESS [201 Created] Event ID: ${created.id}`);
      
      // Reset form
      setSummary('');
      setDescription('');
      
      // Refresh events
      fetchEvents(token);
    } catch (err: any) {
      console.error('Create event failed:', err);
      setError(err.message || 'Failed to create calendar event');
      addLog(`ERR: Creation failed. Check event timeline dates and permissions.`);
    } finally {
      setIsCreating(false);
    }
  };

  // Secure Delete Confirmation Dialog
  const triggerDeleteConfirm = (event: CalendarEvent) => {
    setEventToDelete(event);
  };

  const confirmDeleteEvent = async () => {
    if (!token || !eventToDelete) return;

    setIsDeleting(true);
    setError(null);
    addLog(`DELETE https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventToDelete.id}`);

    try {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventToDelete.id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to delete event. Status code: ${res.status}`);
      }

      addLog(`SUCCESS: Event "${eventToDelete.summary}" purged from remote calendar ledger.`);
      setEventToDelete(null);
      fetchEvents(token);
    } catch (err: any) {
      console.error('Delete event failed:', err);
      setError(err.message || 'Failed to delete calendar event');
      addLog(`ERR: Deletion failed. Check scope write permissions.`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="mb-24" id="google-calendar-section">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[#52525B] font-bold shrink-0">
          Ops Schedule & Compliance Hub
        </h2>
        <div className="h-[1px] w-full bg-[#262626]"></div>
      </div>

      <div className="bg-[#0F0F11] border border-[#262626] rounded-sm overflow-hidden" id="calendar-console-root">
        
        {/* Console Telemetry Header */}
        <div className="bg-black/80 px-6 py-4 border-b border-[#262626] flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${needsAuth ? 'bg-amber-500' : 'bg-[#10B981] animate-pulse'}`}></span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white uppercase tracking-widest">
              <Calendar size={14} className="text-[#3B82F6]" />
              GOOGLE CALENDAR BRIDGE v2.1
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-zinc-500 uppercase">OPERATOR: <span className="text-white font-bold">{user.email}</span></span>
                <button 
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 transition-colors uppercase font-bold flex items-center gap-1 cursor-pointer bg-red-950/10 border border-red-900/40 px-2 py-1 rounded-sm text-[9px]"
                  title="Disconnect account"
                >
                  <LogOut size={10} /> Disconnect
                </button>
              </div>
            ) : (
              <span className="text-amber-500 font-bold uppercase tracking-widest">BRIDGE STATUS: OFFLINE</span>
            )}
          </div>
        </div>

        {/* Master Console Container - Centered Single Panel */}
        <div className="max-w-2xl mx-auto p-8" id="calendar-scheduler-container">
          {needsAuth ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6" id="auth-prompt-container">
              <div className="w-12 h-12 rounded-full border border-dashed border-[#3B82F6]/50 flex items-center justify-center bg-[#1A1A1E]">
                <Lock className="text-[#3B82F6]" size={20} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase">Authentication Required</h4>
                <p className="text-xs text-zinc-400 max-w-sm font-sans leading-relaxed">
                  Securely connect to Google Calendar to synchronize scheduled audits, policy check reviews, and upcoming environmental assessments.
                </p>
              </div>
              
              {/* Official Material Style Sign In Button */}
              <button 
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="relative flex items-center gap-3 bg-white hover:bg-zinc-100 text-black px-5 py-3 text-xs font-bold font-mono transition-all rounded-sm disabled:opacity-50 cursor-pointer shadow-lg active:scale-[0.98]"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-black" />
                    CONNECTING...
                  </>
                ) : (
                  <>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 mr-1">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                    SIGN IN WITH GOOGLE
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6" id="schedule-planner-form">
              <div>
                <h4 className="text-xs font-bold text-white font-mono tracking-wider uppercase mb-1 flex items-center gap-2">
                  <Plus size={14} className="text-[#3B82F6]" />
                  Record Operations Event
                </h4>
                <p className="text-[11px] text-zinc-500 font-sans">
                  Schedule tasks directly onto your synchronized Google Calendar account.
                </p>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Event Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Shopify ESG Sync, CSRD Audit Review"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full bg-black/40 border border-[#262626] focus:border-[#3B82F6] px-3 py-2 rounded-sm text-xs font-mono text-white outline-none placeholder-zinc-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Description</label>
                  <textarea 
                    placeholder="e.g. Immutable documentation and policy proof reviews"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full bg-black/40 border border-[#262626] focus:border-[#3B82F6] px-3 py-2 rounded-sm text-xs font-mono text-white outline-none placeholder-zinc-600 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Date</label>
                    <input 
                      type="date" 
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-black/40 border border-[#262626] focus:border-[#3B82F6] px-2 py-1.5 rounded-sm text-xs font-mono text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Start Time</label>
                    <input 
                      type="time" 
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-black/40 border border-[#262626] focus:border-[#3B82F6] px-2 py-1.5 rounded-sm text-xs font-mono text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">End Time</label>
                    <input 
                      type="time" 
                      required
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-black/40 border border-[#262626] focus:border-[#3B82F6] px-2 py-1.5 rounded-sm text-xs font-mono text-white outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-950/20 border border-red-900/40 p-3 rounded-sm flex items-start gap-2.5 text-xs text-red-400 font-sans leading-relaxed">
                    <AlertTriangle className="shrink-0 text-red-400 mt-0.5" size={14} />
                    <div>{error}</div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isCreating}
                  className="w-full py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-xs font-bold text-white uppercase tracking-widest rounded-sm transition-all disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {isCreating ? (
                    <>
                      <Loader2 size={12} className="animate-spin text-white" />
                      PUBLISHING EVENT...
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      PUBLISH TO GOOGLE CALENDAR
                    </>
                  )}
                </button>
              </form>

              {/* Automation Presets */}
              <div className="border-t border-[#1C1C21] pt-4">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#52525B] block mb-2">Ops Presets</span>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <button 
                    onClick={() => {
                      setSummary("Shopify ESG Policy Compliance Sync");
                      setDescription("Verify automatic transaction scopes and Scope 3 compliance thresholds.");
                    }}
                    className="border border-[#262626] hover:border-[#3B82F6] bg-black/20 hover:bg-[#3B82F6]/5 px-2 py-1.5 rounded-sm text-left text-zinc-300 font-mono transition-all text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer"
                  >
                    🛡️ Compliance Sync
                  </button>
                  <button 
                    onClick={() => {
                      setSummary("FinesseOS Performance System Check");
                      setDescription("Benchmark throughput metrics, latency bounds, and token rate limits.");
                    }}
                    className="border border-[#262626] hover:border-[#3B82F6] bg-black/20 hover:bg-[#3B82F6]/5 px-2 py-1.5 rounded-sm text-left text-zinc-300 font-mono transition-all text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer"
                  >
                    ⚡ Performance Check
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECURE MODAL FOR MUTATING API ACTION CONFIRMATION (Required by Scope Constraints) */}
      <AnimatePresence>
        {eventToDelete && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0F0F11] border border-[#262626] max-w-md w-full rounded-sm overflow-hidden shadow-2xl"
              id="secure-delete-confirm-modal"
            >
              {/* Header */}
              <div className="bg-red-950/20 border-b border-[#262626] px-6 py-4 flex items-center gap-3">
                <ShieldAlert className="text-red-500 shrink-0" size={18} />
                <h4 className="text-xs font-bold font-mono text-white tracking-widest uppercase">
                  MUTATING ACTION AUTHORIZATION
                </h4>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Requested Operation</span>
                  <p className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    {`DELETE /calendar/v3/calendars/primary/events/${eventToDelete.id.substring(0, 12)}...`}
                  </p>
                </div>

                <div className="bg-black/40 border border-[#1C1C21] p-4 rounded-sm space-y-2">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Affected Milestones</div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-white font-mono">{eventToDelete.summary}</h5>
                    {eventToDelete.description && (
                      <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">{eventToDelete.description}</p>
                    )}
                    <span className="text-[10px] font-mono text-[#3B82F6] block">
                      SCHEDULE: {eventToDelete.start.dateTime || eventToDelete.start.date}
                    </span>
                  </div>
                </div>

                <div className="bg-red-950/10 border border-red-900/30 p-3 rounded-sm text-[10px] text-red-400 leading-relaxed font-sans">
                  <strong>Warning:</strong> This API call will permanently destroy user-owned calendar information on Google Calendar. Silent or unconfirmed data mutations are forbidden.
                </div>
              </div>

              {/* Footer */}
              <div className="bg-black/40 border-t border-[#262626] px-6 py-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEventToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 border border-[#262626] hover:border-zinc-700 hover:text-white text-[10px] font-mono uppercase text-zinc-400 rounded-sm transition-all cursor-pointer"
                >
                  ABORT TRANSACTION
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteEvent}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-mono font-bold uppercase rounded-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 size={10} className="animate-spin text-white" />
                      EXECUTING...
                    </>
                  ) : (
                    <>
                      CONFIRM PURGE
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
