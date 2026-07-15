import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Unlock, Shield, Calendar, Server, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle, FileText, Briefcase, ChevronRight, Check, TrendingUp, DollarSign, Target, Users, Percent, BarChart3 } from 'lucide-react';

interface ESGForgeVaultProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ESGForgeVault({ isOpen, onClose }: ESGForgeVaultProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptionProgress, setDecryptionProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'tech' | 'security' | 'business'>('overview');
  const [decryptionLogs, setDecryptionLogs] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isUnlocked) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setPassword('');
      setError('');
    }
  }, [isOpen, isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = password.trim().toLowerCase();
    
    if (normalized === 'forge2026' || normalized === 'esg-secure' || normalized === 'hector' || normalized === 'verdugo2026') {
      setError('');
      setIsDecrypting(true);
      setDecryptionProgress(0);
      setDecryptionLogs([]);

      const logs = [
        '🔑 Initializing decryption protocol...',
        '🛰️ Routing through node clusters in US-WEST1...',
        '🧬 Verifying compliance certificates & access signatures...',
        '📦 Decrypting proprietary 6-month product roadmap...',
        '📁 Parsing technical database schemas & Climatiq API pipeline keys...',
        '🔒 Unlocking SOC 2 Type II audit readiness logs...',
        '✅ Decryption complete. Access granted.'
      ];

      logs.forEach((logText, idx) => {
        setTimeout(() => {
          setDecryptionLogs(prev => [...prev, logText]);
          setDecryptionProgress(() => Math.round(((idx + 1) / logs.length) * 100));
        }, (idx + 1) * 350);
      });

      setTimeout(() => {
        setIsUnlocked(true);
        setIsDecrypting(false);
      }, logs.length * 350 + 200);

    } else {
      setError('INVALID COMPLIANCE ACCESS KEY. Decryption failed.');
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" id="esgforge-vault-root">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/98 backdrop-blur-md cursor-zoom-out"
            id="vault-backdrop"
          />

          {/* Vault Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#050505] border border-[#262626] text-white shadow-2xl z-10 p-6 md:p-10 font-mono rounded-sm flex flex-col"
            id="vault-content-container"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-[#3B82F6] transition-colors"
              aria-label="Close vault"
              id="close-vault-btn"
            >
              <X size={24} />
            </button>

            {/* Locked screen */}
            {!isUnlocked && !isDecrypting && (
              <div className="flex flex-col items-center justify-center py-16 max-w-md mx-auto text-center" id="locked-state-view">
                <div className="w-16 h-16 bg-[#0F0F11] border border-[#262626] rounded-sm flex items-center justify-center mb-6 text-[#3B82F6]">
                  <Lock size={28} className="animate-pulse" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-white uppercase">ESG Forge Secure Spec Vault</h2>
                <p className="text-xs text-[#A1A1AA] mb-8 font-sans leading-relaxed">
                  Proprietary technical specifications, multi-tenant database pipeline blueprints, and audit-readiness roadmaps are strictly classified.
                </p>

                <form onSubmit={handleUnlock} className="w-full mb-6">
                  <div className="relative mb-4">
                    <input
                      ref={inputRef}
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="ENTER VAULT ACCESS KEY"
                      className="w-full px-4 py-3 bg-black border border-[#262626] focus:border-[#3B82F6] focus:outline-none text-xs text-center tracking-widest text-white rounded-sm font-mono"
                      id="vault-passcode-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-white transition-colors"
                      id="toggle-visibility-btn"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 justify-center text-[10px] text-red-500 font-bold uppercase mb-4" id="error-message">
                      <AlertCircle size={12} />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#3B82F6] text-white hover:bg-blue-600 transition-all font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer"
                    id="decrypt-submit-btn"
                  >
                    Decrypt Vault Data &rarr;
                  </button>
                </form>

                <div className="bg-[#0F0F11] border border-[#262626] p-4 text-[10px] text-[#52525B] leading-relaxed text-left w-full rounded-sm" id="vault-key-hint-card">
                  <span className="text-white font-bold block mb-1">🔐 SECURITY DRILL NOTICE</span>
                  To inspect company vision documents, ClimbAtiq pipeline specs, and roadmap milestones, enter passcode <span className="text-emerald-500 font-bold bg-emerald-950/20 border border-emerald-800/30 px-1 py-0.5 rounded-sm font-mono">forge2026</span> in the workspace gate.
                </div>
              </div>
            )}

            {/* Decrypting screen */}
            {isDecrypting && (
              <div className="flex flex-col items-center justify-center py-16 max-w-xl mx-auto text-left w-full" id="decrypting-state-view">
                <div className="flex items-center justify-between w-full mb-4 font-mono text-xs font-bold text-[#3B82F6]">
                  <span>DECRYPTING VAULT ARCHIVE...</span>
                  <span>{decryptionProgress}%</span>
                </div>
                <div className="w-full bg-[#1A1A1E] h-[4px] rounded-sm overflow-hidden mb-8" id="decrypting-progress-bar">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${decryptionProgress}%` }}
                    className="bg-[#3B82F6] h-full"
                  />
                </div>

                <div className="w-full bg-black border border-[#262626] p-4 h-[180px] overflow-y-auto font-mono text-[10px] leading-relaxed text-[#A1A1AA] space-y-1 rounded-sm" id="decryption-terminal-logs">
                  {decryptionLogs.map((log, idx) => (
                    <div key={idx} className="border-l border-[#262626] pl-2">
                      {log.includes('complete') ? (
                        <span className="text-[#10B981] font-bold">{log}</span>
                      ) : (
                        <span>{log}</span>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 text-[#52525B] pl-2 animate-pulse">
                    <span>|</span>
                    <span>Processing binary stream...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Unlocked State - Full Interactive Spec Deck */}
            {isUnlocked && (
              <div className="flex-1 flex flex-col" id="unlocked-vault-dashboard">
                {/* Header info */}
                <div className="mb-6 border-b border-[#262626] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4" id="vault-unlocked-header">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 text-xs text-[#10B981] font-bold">
                      <Unlock size={14} />
                      <span>{"VAULT SESSION ACTIVE // DECRYPTED SECURE DATA"}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      ESG FORGE INTERNAL BLUEPRINTS<span className="text-[#3B82F6]">.</span>
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#52525B]" id="header-spec-labels">
                    <span className="border border-[#262626] px-2 py-1 bg-[#0F0F11] rounded-sm">{"CLASSIFIED // ROADMAP & SPEC DECK"}</span>
                  </div>
                </div>

                {/* Document tabs */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-[#262626] pb-4" id="vault-tabs-row">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold font-mono transition-all rounded-sm cursor-pointer ${
                      activeTab === 'overview'
                        ? 'bg-[#1A1A1E] border-[#3B82F6] text-white'
                        : 'bg-black border-[#262626] text-[#A1A1AA] hover:border-neutral-700 hover:text-white'
                    }`}
                    id="tab-btn-overview"
                  >
                    <Briefcase size={14} />
                    Executive Briefing
                  </button>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold font-mono transition-all rounded-sm cursor-pointer ${
                      activeTab === 'roadmap'
                        ? 'bg-[#1A1A1E] border-[#3B82F6] text-white'
                        : 'bg-black border-[#262626] text-[#A1A1AA] hover:border-neutral-700 hover:text-white'
                    }`}
                    id="tab-btn-roadmap"
                  >
                    <Calendar size={14} />
                    6-Month Roadmap
                  </button>
                  <button
                    onClick={() => setActiveTab('tech')}
                    className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold font-mono transition-all rounded-sm cursor-pointer ${
                      activeTab === 'tech'
                        ? 'bg-[#1A1A1E] border-[#3B82F6] text-white'
                        : 'bg-black border-[#262626] text-[#A1A1AA] hover:border-neutral-700 hover:text-white'
                    }`}
                    id="tab-btn-tech"
                  >
                    <Server size={14} />
                    Technical Spec
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold font-mono transition-all rounded-sm cursor-pointer ${
                      activeTab === 'security'
                        ? 'bg-[#1A1A1E] border-[#3B82F6] text-white'
                        : 'bg-black border-[#262626] text-[#A1A1AA] hover:border-neutral-700 hover:text-white'
                    }`}
                    id="tab-btn-security"
                  >
                    <ShieldCheck size={14} />
                    Security Checklist
                  </button>
                  <button
                    onClick={() => setActiveTab('business')}
                    className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold font-mono transition-all rounded-sm cursor-pointer ${
                      activeTab === 'business'
                        ? 'bg-[#1A1A1E] border-[#3B82F6] text-white'
                        : 'bg-black border-[#262626] text-[#A1A1AA] hover:border-neutral-700 hover:text-white'
                    }`}
                    id="tab-btn-business"
                  >
                    <TrendingUp size={14} />
                    Business Plan
                  </button>
                </div>

                {/* Tab content space */}
                <div className="flex-1 min-h-[350px] overflow-y-auto text-neutral-300 pr-1 text-sm font-sans" id="vault-tab-content">
                  {/* TAB 1: EXECUTIVE BRIEFING */}
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                      id="content-briefing"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3 font-mono border-b border-[#262626] pb-2 uppercase tracking-wide">
                          Executive Summary
                        </h3>
                        <p className="text-[#A1A1AA] leading-relaxed font-light mb-4">
                          As regulatory pressures mount, Shopify Plus merchants need an automated solution to navigate mandatory ESG compliance without extensive internal overhead. ESG Forge automates the entire sustainability reporting and data processing pipeline, making it completely audit-ready and compliant under modern regulatory mandates. This allows growing businesses to focus purely on scale while maintaining regulatory peace of mind.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6" id="briefing-target-market">
                        <div className="bg-[#0F0F11] border border-[#262626] p-5 rounded-sm">
                          <span className="text-[10px] uppercase font-bold text-[#52525B] font-mono tracking-widest block mb-1">Target Audience</span>
                          <span className="text-white font-bold block mb-2 font-mono">Shopify Plus Enterprises</span>
                          <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                            High-volume merchants on Shopify Plus with annual revenues of <strong className="text-white">$1M to $500M+</strong> who process large volume orders and have high climate regulatory exposure.
                          </p>
                        </div>
                        <div className="bg-[#0F0F11] border border-[#262626] p-5 rounded-sm">
                          <span className="text-[10px] uppercase font-bold text-[#52525B] font-mono tracking-widest block mb-1">Market Scope</span>
                          <span className="text-white font-bold block mb-2 font-mono">Global Focus (EU & US)</span>
                          <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                            Active target focus in the European Union (navigating CSRD compliance) and the United States (adapting to modern SEC Climate disclosure mandates).
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6" id="briefing-problem-solution">
                        <div>
                          <h4 className="text-xs uppercase font-bold tracking-widest text-red-500 mb-3 font-mono">
                            The Regulatory Problem
                          </h4>
                          <p className="text-xs text-[#A1A1AA] leading-loose font-light">
                            Shopify Plus merchants face increasing pressure to comply with mandatory ESG regulations. Lacking the resources of specialized, full-time ESG departments, they struggle to keep pace with complex compliance rules, exposing themselves to severe fines and app-store delisting.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase font-bold tracking-widest text-[#10B981] mb-3 font-mono">
                            The Automated Solution
                          </h4>
                          <p className="text-xs text-[#A1A1AA] leading-loose font-light">
                            ESG Forge automates compliance, turning complex sustainability calculations into a clean, audit-ready dashboard. By instantly parsing orders, correlating courier weight matrices, and compiling carbon ledger data, merchants meet strict regulatory goals with zero manual work.
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 border-t border-[#262626] pt-6" id="briefing-vision-mission">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#52525B] font-mono tracking-widest block mb-1">Our Vision</span>
                          <p className="text-xs text-[#A1A1AA] leading-relaxed italic">
                            "To be the leading platform for automated sustainability compliance, empowering high-scale digital commerce platforms to thrive in a regulated global environment."
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#52525B] font-mono tracking-widest block mb-1">Our Mission</span>
                          <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                            To simplify, calculate, and automate sustainability compliance reporting for high-scale merchants, ensuring airtight adherence while promoting responsible corporate behavior.
                          </p>
                        </div>
                      </div>

                      {/* Hector Profile */}
                      <div className="border-t border-[#262626] pt-6 flex flex-col md:flex-row gap-6 items-start" id="founder-profile-brief">
                        <div className="w-12 h-12 bg-[#0F0F11] border border-[#262626] flex items-center justify-center font-bold text-white rounded-sm shrink-0 font-mono text-sm">
                          HV
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#3B82F6] font-mono tracking-widest block mb-1">Founder Spotlight</span>
                            <h4 className="text-base font-bold text-white font-mono">Hector — Co-Founder & CEO, EsgForge</h4>
                          </div>
                          
                          <p className="text-xs text-[#A1A1AA] leading-relaxed font-light font-sans">
                            Hector is a self-taught builder and founder whose journey into RegTech was forged through resilience and necessity. After a serious injury left him bed-bound for over six months, he transformed a period of recovery into intensive self-education — diving deep into regulatory compliance, carbon accounting, Shopify ecosystems, and automation technologies. What started as a way to stay productive became the foundation for solving a massive problem he knew mid-market merchants were about to face.
                          </p>

                          <p className="text-xs text-[#A1A1AA] leading-relaxed font-light font-sans">
                            Witnessing the wave of mandatory ESG regulations (<strong className="text-white">EU CSRD</strong>, <strong className="text-white">California SB 253/261</strong>, and expanding U.S. state/federal requirements), Hector identified that Shopify Plus merchants generating <strong className="text-white">$1M–$500M+ in revenue</strong> were caught in a perfect storm: complex Scope 1-3 reporting demands with zero ESG teams and broken manual processes. He built EsgForge from the ground up to automate what used to require spreadsheets, consultants, and guesswork — turning Shopify transaction data, logistics, and emissions factors into audit-ready, GHG Protocol-compliant reports.
                          </p>

                          <p className="text-xs text-[#A1A1AA] leading-relaxed font-light font-sans">
                            As the technical and visionary lead, Hector has architected EsgForge’s headless integration, multi-tenant architecture, and merchant-facing dashboard so brands can achieve compliance without hiring specialists. His mission is personal: make sustainability reporting effortless and defensible so e-commerce founders can focus on growth instead of regulatory survival.
                          </p>

                          <p className="text-xs text-[#A1A1AA] leading-relaxed font-light font-sans">
                            Hector’s story resonates strongly with the operators and agencies EsgForge serves — proof that determination and smart automation can level the playing field against complex global regulations. He is currently onboarding the founding cohort of merchants and partners who want to get ahead of the compliance wave.
                          </p>

                          <div className="bg-black/40 border border-[#262626] p-4 rounded-sm text-xs space-y-2" id="founder-contact-card">
                            <span className="text-[10px] font-mono font-bold text-[#3B82F6] uppercase tracking-wider block">Direct Connection Terminal</span>
                            <p className="text-[#A1A1AA] leading-relaxed font-sans font-light">
                              Connect with Hector to share your compliance challenges or explore partnership opportunities:
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-mono text-white pt-1">
                              <span>EMAIL: <a href="mailto:founder@esgforge.xyz" className="text-[#3B82F6] hover:underline">founder@esgforge.xyz</a></span>
                              <span>PHONE: <a href="tel:858-288-3502" className="text-[#3B82F6] hover:underline">858-288-3502</a></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: 6-MONTH ROADMAP */}
                  {activeTab === 'roadmap' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                      id="content-roadmap"
                    >
                      <div className="flex justify-between items-start border-b border-[#262626] pb-2" id="roadmap-heading-section">
                        <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
                          6-Month Strategic Product Roadmap
                        </h3>
                        <span className="text-xs text-[#3B82F6] font-mono">July 2026 - December 2026</span>
                      </div>

                      <div className="space-y-6 relative border-l border-[#262626] ml-4 pl-6" id="roadmap-timeline">
                        {/* Phase 1 */}
                        <div className="relative" id="roadmap-phase-1">
                          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#3B82F6] border-2 border-[#050505]"></span>
                          <span className="text-[10px] font-bold font-mono text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-0.5 uppercase tracking-wider rounded-sm">
                            {"Phase 1 // MVP Completion & pilot (July 2026)"}
                          </span>
                          <h4 className="text-sm font-bold text-white font-mono mt-3 mb-2">Core Emissions Data Pipeline</h4>
                          <div className="grid md:grid-cols-2 gap-4 mt-2 mb-4" id="phase-1-grid">
                            <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm">
                              <span className="text-[10px] text-[#52525B] font-mono font-bold block mb-2 uppercase">Critical Milestones & Objectives</span>
                              <ul className="space-y-1.5 text-xs text-[#A1A1AA] leading-relaxed list-disc pl-4">
                                <li>Complete end-to-end emissions parsing and database ingestion pipeline</li>
                                <li>Finalize compliance ledger exporting capabilities (PDF & CSV formats)</li>
                                <li>Onboard first <strong className="text-white">5 lighthouse pilot merchants</strong> for production debugging</li>
                              </ul>
                            </div>
                            <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm">
                              <span className="text-[10px] text-[#52525B] font-mono font-bold block mb-2 uppercase">Key Technical Activities</span>
                              <div className="space-y-1.5 text-xs text-[#A1A1AA]">
                                <div className="flex items-center gap-1.5"><Check size={12} className="text-[#10B981]" /><span>Service-key authentication live (P0)</span></div>
                                <div className="flex items-center gap-1.5"><Check size={12} className="text-[#10B981]" /><span>Climatiq API calculation endpoint (P0)</span></div>
                                <div className="flex items-center gap-1.5"><Check size={12} className="text-[#10B981]" /><span>Deduplication & webhook sync (P1)</span></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Phase 2 */}
                        <div className="relative" id="roadmap-phase-2">
                          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#050505]"></span>
                          <span className="text-[10px] font-bold font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 uppercase tracking-wider rounded-sm">
                            {"Phase 2 // App Store Launch (August - September 2026)"}
                          </span>
                          <h4 className="text-sm font-bold text-white font-mono mt-3 mb-2">Founding Merchant Cohort</h4>
                          <div className="grid md:grid-cols-2 gap-4 mt-2 mb-4" id="phase-2-grid">
                            <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm">
                              <span className="text-[10px] text-[#52525B] font-mono font-bold block mb-2 uppercase">Strategic Objectives</span>
                              <ul className="space-y-1.5 text-xs text-[#A1A1AA] leading-relaxed list-disc pl-4">
                                <li>Secure official Shopify App Store publishing approval</li>
                                <li>Initialize founding program capped at <strong className="text-white">100 active merchants</strong></li>
                                <li>Achieve run-rate target of <strong className="text-white">$17.5K Monthly Recurring Revenue</strong></li>
                              </ul>
                            </div>
                            <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm">
                              <span className="text-[10px] text-[#52525B] font-mono font-bold block mb-2 uppercase">Key Development Tracks</span>
                              <div className="space-y-1.5 text-xs text-[#A1A1AA]">
                                <div className="flex items-center gap-1.5"><Check size={12} className="text-[#3B82F6]" /><span>Partner commission tracking dashboard</span></div>
                                <div className="flex items-center gap-1.5"><Check size={12} className="text-[#3B82F6]" /><span>Rate-limiting & detailed error logging</span></div>
                                <div className="flex items-center gap-1.5"><Check size={12} className="text-[#3B82F6]" /><span>Refined onboarding flows & API wizard</span></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Phase 3 */}
                        <div className="relative" id="roadmap-phase-3">
                          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#A1A1AA] border-2 border-[#050505]"></span>
                          <span className="text-[10px] font-bold font-mono text-[#A1A1AA] bg-[#A1A1AA]/10 px-2.5 py-0.5 uppercase tracking-wider rounded-sm">
                            {"Phase 3 // Infrastructure Scale (October 2026)"}
                          </span>
                          <h4 className="text-sm font-bold text-white font-mono mt-3 mb-2">Platform Scale & Multi-Currency Support</h4>
                          <div className="grid md:grid-cols-2 gap-4 mt-2 mb-4" id="phase-3-grid">
                            <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm">
                              <span className="text-[10px] text-[#52525B] font-mono font-bold block mb-2 uppercase">Database & Cache Optimization</span>
                              <ul className="space-y-1.5 text-xs text-[#A1A1AA] leading-relaxed list-disc pl-4">
                                <li>Optimize DB indexes to ensure <strong className="text-white">&lt;200ms queries</strong> under load</li>
                                <li>Implement local caching layer for Climatiq emission factors (TTL-based)</li>
                                <li>Integrate asynchronous webhook scheduling queues (Cloudflare Queues / Durable Objects)</li>
                              </ul>
                            </div>
                            <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm">
                              <span className="text-[10px] text-[#52525B] font-mono font-bold block mb-2 uppercase">Feature Expansion</span>
                              <ul className="space-y-1.5 text-xs text-[#A1A1AA] leading-relaxed list-disc pl-4">
                                <li>Develop Scope 1 and Scope 2 automation algorithms</li>
                                <li>Support global multi-currency transactions (EUR, GBP, MXN, CAD, AUD)</li>
                                <li>Deploy real-time Net Promoter Score (NPS) feedback collection</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Phase 4 */}
                        <div className="relative" id="roadmap-phase-4">
                          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#EAB308] border-2 border-[#050505]"></span>
                          <span className="text-[10px] font-bold font-mono text-[#EAB308] bg-yellow-500/10 px-2.5 py-0.5 uppercase tracking-wider rounded-sm">
                            {"Phase 4 // Internationalization & VC Funding (Nov - Dec 2026)"}
                          </span>
                          <h4 className="text-sm font-bold text-white font-mono mt-3 mb-2">Expansion, Compliance Statements & Series A Prep</h4>
                          <div className="grid md:grid-cols-2 gap-4 mt-2 mb-4" id="phase-4-grid">
                            <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm">
                              <span className="text-[10px] text-[#52525B] font-mono font-bold block mb-2 uppercase">Audits & Legal Declarations</span>
                              <ul className="space-y-1.5 text-xs text-[#A1A1AA] leading-relaxed list-disc pl-4">
                                <li>Publish official, audited EU CSRD-compliant statement templates</li>
                                <li>Complete formal external penetration testing & SOC 2 Type II audit engagement</li>
                                <li>Establish legal EU Representative framework for cross-border compliance routing</li>
                              </ul>
                            </div>
                            <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm">
                              <span className="text-[10px] text-[#52525B] font-mono font-bold block mb-2 uppercase">Geographic & Financial Scope</span>
                              <ul className="space-y-1.5 text-xs text-[#A1A1AA] leading-relaxed list-disc pl-4">
                                <li>Launch active market pilots for merchants in Australia (AU) and Mexico (MX)</li>
                                <li>Prepare airtight digital data room for institutional Series A fundraising</li>
                                <li>Target metrics: <strong className="text-white">50+ merchants onboarded</strong> // <strong className="text-white">$35K+ MRR</strong></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: TECHNICAL SPEC */}
                  {activeTab === 'tech' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                      id="content-tech"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3 font-mono border-b border-[#262626] pb-2 uppercase tracking-wide">
                          Technical Architecture & Infrastructure Spec
                        </h3>
                        <p className="text-[#A1A1AA] leading-relaxed font-light mb-4">
                          ESG Forge is built with modern, serverless, edge-native microservices designed for high availability and extreme transactional throughput. All endpoints are secured, rate-limited, and compliant with SOC 2 CC6 data containment principles.
                        </p>
                      </div>

                      {/* Technical Stack Overview */}
                      <div className="grid md:grid-cols-2 gap-6" id="tech-stack-overview">
                        <div className="bg-[#0F0F11] border border-[#262626] p-5 rounded-sm">
                          <h4 className="text-xs uppercase font-bold text-[#3B82F6] font-mono mb-3 tracking-widest">
                            Serverless Core Stack
                          </h4>
                          <div className="space-y-3 text-xs">
                            <div>
                              <span className="text-[#52525B] font-mono font-bold block uppercase text-[10px]">Frontend Framework</span>
                              <span className="text-white">{"Next.js 15 (App Router) // React // Tailwind CSS // Radix UI / shadcn"}</span>
                            </div>
                            <div>
                              <span className="text-[#52525B] font-mono font-bold block uppercase text-[10px]">Backend Edge Compute</span>
                              <span className="text-white">{"Next.js Edge Functions / API Routes (Cloudflare Workers via opennextjs-cloudflare)"}</span>
                            </div>
                            <div>
                              <span className="text-[#52525B] font-mono font-bold block uppercase text-[10px]">Database Architecture</span>
                              <span className="text-white">{"Totalum Built-in DB (Postgres-compatible) with tenant isolation"}</span>
                            </div>
                            <div>
                              <span className="text-[#52525B] font-mono font-bold block uppercase text-[10px]">Authentication Engine</span>
                              <span className="text-white">{"Better Auth (full ownership, multi-tenancy ready)"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#0F0F11] border border-[#262626] p-5 rounded-sm">
                          <h4 className="text-xs uppercase font-bold text-[#3B82F6] font-mono mb-3 tracking-widest">
                            Storage & Background Queues
                          </h4>
                          <div className="space-y-3 text-xs">
                            <div>
                              <span className="text-[#52525B] font-mono font-bold block uppercase text-[10px]">Storage Platform</span>
                              <span className="text-white">{"Cloudflare R2 / Storage (Signed URLs) // PDF gen via @react-pdf/renderer"}</span>
                            </div>
                            <div>
                              <span className="text-[#52525B] font-mono font-bold block uppercase text-[10px]">Background Workers</span>
                              <span className="text-white">{"Cloudflare Queues / Durable Objects or in-app asynchronous scheduling"}</span>
                            </div>
                            <div>
                              <span className="text-[#52525B] font-mono font-bold block uppercase text-[10px]">Integration APIs</span>
                              <span className="text-white">{"Shopify Plus Webhooks (ORDERS_FULFILLED + GDPR) & Climatiq API (server Bearer)"}</span>
                            </div>
                            <div>
                              <span className="text-[#52525B] font-mono font-bold block uppercase text-[10px]">Monitoring & Diagnostics</span>
                              <span className="text-white">{"Sentry (error tracking) & Pino logging"}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Webhook Data Pipeline */}
                      <div>
                        <h4 className="text-xs uppercase font-bold text-[#52525B] font-mono mb-3 tracking-widest">
                          Emissions Calculation & Webhook Ingestion Flow
                        </h4>
                        <div className="border border-[#262626] p-5 bg-black/40 rounded-sm" id="tech-pipeline-flow">
                          <ol className="space-y-4 font-mono text-xs text-[#A1A1AA]">
                            <li className="flex items-start gap-3">
                              <span className="bg-[#262626] text-[#3B82F6] px-1.5 py-0.5 rounded-sm text-[10px] font-bold">1</span>
                              <div>
                                <strong className="text-white block">Shopify Webhook Dispatch</strong>
                                Shopify triggers an <code className="text-[#3B82F6]">ORDERS_FULFILLED</code> webhook payload via HTTPS POST on merchant sales.
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-[#262626] text-[#3B82F6] px-1.5 py-0.5 rounded-sm text-[10px] font-bold">2</span>
                              <div>
                                <strong className="text-white block">HMAC Signature Handshake</strong>
                                Next.js API endpoint validates webhook authenticity by generating local SHA-256 HMAC and matching Shopify headers.
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-[#262626] text-[#3B82F6] px-1.5 py-0.5 rounded-sm text-[10px] font-bold">3</span>
                              <div>
                                <strong className="text-white block">Deduplication Guard</strong>
                                Enforces database uniqueness constraints using composite key: <code className="text-[#3B82F6]">(shop_domain, shopify_order_id)</code> to prevent double emission ledger counting.
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-[#262626] text-[#3B82F6] px-1.5 py-0.5 rounded-sm text-[10px] font-bold">4</span>
                              <div>
                                <strong className="text-white block">Climatiq API Correlative Calculation</strong>
                                Transmits normalized courier shipment data to Climatiq to calculate exact metric CO2 footprint based on carrier transit and load volume.
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-[#262626] text-[#3B82F6] px-1.5 py-0.5 rounded-sm text-[10px] font-bold">5</span>
                              <div>
                                <strong className="text-white block">Immutable Record Ledger & Versioning</strong>
                                Writes calculations to append-only database logs tracking: <code className="text-[#3B82F6]">data_version</code>, <code className="text-[#3B82F6]">emission_factor_id</code>, and <code className="text-[#3B82F6]">timestamp</code> for audit trails.
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: SECURITY CHECKLIST */}
                  {activeTab === 'security' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                      id="content-security"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3 font-mono border-b border-[#262626] pb-2 uppercase tracking-wide">
                          Security Baseline & Compliance Checklist
                        </h3>
                        <p className="text-[#A1A1AA] leading-relaxed font-light mb-4">
                          ESG Forge conforms to rigorous enterprise compliance policies. The baseline is built to pass SOC 2 Type II controls and GDPR requirements for handling sensitive order tracking metadata.
                        </p>
                      </div>

                      {/* SOC 2 Type II Readiness */}
                      <div className="bg-[#0F0F11] border border-[#262626] p-5 rounded-sm" id="security-soc2-card">
                        <span className="text-[10px] uppercase font-bold text-[#10B981] font-mono tracking-widest block mb-1">Audit Control Matrix</span>
                        <h4 className="text-sm font-bold text-white font-mono mb-3">SOC 2 Type II Trust Criteria</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-xs text-[#A1A1AA]">
                          <div>
                            <span className="text-white font-bold block mb-1">Security & Access CC6</span>
                            <p className="leading-relaxed font-light mb-3">
                              Tenant isolation is strictly active at the database layer via Better Auth session scoping. Merchant domains are fully isolated to guarantee cross-tenant confidentiality. Administrative access requires mandatory Multi-Factor Authentication (MFA).
                            </p>
                          </div>
                          <div>
                            <span className="text-white font-bold block mb-1">System Operations CC7</span>
                            <p className="leading-relaxed font-light mb-3">
                              Inbound webhook processing pipelines are continuously audited for queue depth and latency. Uptime SLAs are preserved above 99.99%. Robust Sentry alert policies track anomalous calculations.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* GDPR & Privacy */}
                      <div className="grid md:grid-cols-2 gap-6" id="security-privacy-matrix">
                        <div className="border border-[#262626] p-5 rounded-sm">
                          <span className="text-[10px] uppercase font-bold text-[#EAB308] font-mono tracking-widest block mb-1">GDPR Compliance</span>
                          <h4 className="text-xs font-bold text-white font-mono mb-2">Cross-Border Data Handshake</h4>
                          <ul className="space-y-1.5 text-xs text-[#A1A1AA] leading-relaxed list-disc pl-4">
                            <li>ESG Forge acts strictly as a **Data Processor**; merchants serve as **Data Controllers**</li>
                            <li>Enforces official Standard Contractual Clauses (SCCs) for cross-border traffic (US/EU)</li>
                            <li>Implements mandatory customer/data_request, customer/redact, and shop/redact webhooks</li>
                            <li>Emissions records retained for <strong className="text-white">7 years</strong>; raw merchant order payload bodies completely purged after <strong className="text-white">90 days</strong></li>
                          </ul>
                        </div>

                        <div className="border border-[#262626] p-5 rounded-sm">
                          <span className="text-[10px] uppercase font-bold text-[#3B82F6] font-mono tracking-widest block mb-1">Security Baseline</span>
                          <h4 className="text-xs font-bold text-white font-mono mb-2">Technical Cryptography Guard</h4>
                          <ul className="space-y-1.5 text-xs text-[#A1A1AA] leading-relaxed list-disc pl-4">
                            <li>**In-Transit**: TLS 1.2+ mandatory across all connection routers with HTTP strictly disabled</li>
                            <li>**At-Rest**: High-entropy AES-256 database storage encryption enforced locally</li>
                            <li>**KMS Secrets**: Environment credentials managed via secure, encrypted dashboard panels</li>
                            <li>**Vulnerabilities**: Automatic Snyk package code scans trigger alert patches within 48 hours</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 5: BUSINESS PLAN */}
                  {activeTab === 'business' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8 animate-fade-in"
                      id="content-business"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3 font-mono border-b border-[#262626] pb-2 uppercase tracking-wide flex items-center gap-2">
                          <TrendingUp size={18} className="text-[#3B82F6]" />
                          Corporate Business Plan // Investment Memorandum
                        </h3>
                        <p className="text-[#A1A1AA] leading-relaxed font-light mb-4">
                          ESGForge automates the complex compliance reporting process for Shopify Plus merchants. This comprehensive business strategy highlights the immense market opportunity, financial milestones, and strategic GTM channels.
                        </p>
                      </div>

                      {/* Executive Snapshot Grid */}
                      <div className="grid md:grid-cols-3 gap-4" id="business-snapshot-grid">
                        <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#3B82F6] font-mono tracking-widest block mb-1">PROJECT IDENTITY</span>
                            <h4 className="text-sm font-bold text-white font-mono mb-2">ESGForge</h4>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                              "Automate your sustainability compliance effortlessly." Simplifying and automating ESG reporting for high-revenue e-commerce merchants.
                            </p>
                          </div>
                          <div className="mt-4 border-t border-[#1C1C21] pt-2 text-[10px] font-mono text-[#52525B]">
                            INDUSTRY: SaaS Compliance
                          </div>
                        </div>

                        <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#10B981] font-mono tracking-widest block mb-1">PROBLEM MATRIX</span>
                            <h4 className="text-sm font-bold text-white font-mono mb-2">The Efficiency Gap</h4>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                              Shopify Plus merchants ($1M - $500M ARR) face mounting mandatory CSRD (EU) & SEC (US) deadlines. They lack full ESG departments, spending €50K - €150K on manual compliance consultants.
                            </p>
                          </div>
                          <div className="mt-4 border-t border-[#1C1C21] pt-2 text-[10px] font-mono text-emerald-500 font-bold">
                            SOLVED BY SYSTEM AUTOMATION
                          </div>
                        </div>

                        <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#EAB308] font-mono tracking-widest block mb-1">REVENUE MODEL</span>
                            <h4 className="text-sm font-bold text-white font-mono mb-2">B2B SaaS Subscription</h4>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                              Tiered pricing structure ($200 to $500/month) scaled by transaction volumes, alongside upfront setup and integration fees for bespoke enterprise requirements.
                            </p>
                          </div>
                          <div className="mt-4 border-t border-[#1C1C21] pt-2 text-[10px] font-mono text-[#EAB308]">
                            {"LTV:CAC RATIO // 5.3:1"}
                          </div>
                        </div>
                      </div>

                      {/* Market Size Metrics */}
                      <div>
                        <h4 className="text-sm font-bold text-white font-mono mb-4 flex items-center gap-2">
                          <BarChart3 size={16} className="text-[#3B82F6]" />
                          TAM, SAM, SOM & Growth Projections
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="market-metrics-grid">
                          <div className="border border-[#262626] p-4 rounded-sm text-center bg-black/40">
                            <span className="text-[10px] text-[#A1A1AA] font-mono block uppercase">Total Addressable Market</span>
                            <span className="text-xl font-bold text-white font-mono block my-1">$1.24B</span>
                            <span className="text-[9px] text-[#52525B] leading-tight block">Global ESG software market size</span>
                          </div>
                          <div className="border border-[#262626] p-4 rounded-sm text-center bg-black/40">
                            <span className="text-[10px] text-[#A1A1AA] font-mono block uppercase">Serviceable Addressable Market</span>
                            <span className="text-xl font-bold text-white font-mono block my-1">$1.13B</span>
                            <span className="text-[9px] text-[#52525B] leading-tight block">ESG reporting software & services segment</span>
                          </div>
                          <div className="border border-[#262626] p-4 rounded-sm text-center bg-black/40">
                            <span className="text-[10px] text-[#A1A1AA] font-mono block uppercase">Serviceable Obtainable Market</span>
                            <span className="text-xl font-bold text-white font-mono block my-1">$50M</span>
                            <span className="text-[9px] text-[#52525B] leading-tight block">Target Shopify Plus market share</span>
                          </div>
                          <div className="border border-[#262626] p-4 rounded-sm text-center bg-black/40">
                            <span className="text-[10px] text-[#A1A1AA] font-mono block uppercase">Market CAGR Growth</span>
                            <span className="text-xl font-bold text-[#10B981] font-mono block my-1">17% - 20%</span>
                            <span className="text-[9px] text-[#52525B] leading-tight block">Forecast period: 2025 – 2031</span>
                          </div>
                        </div>
                      </div>

                      {/* Competitive Landscape Table */}
                      <div className="border border-[#262626] rounded-sm overflow-hidden" id="competitive-landscape-panel">
                        <div className="bg-[#0F0F11] border-b border-[#262626] px-4 py-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-mono tracking-tight uppercase flex items-center gap-1.5">
                            <Target size={14} className="text-red-500" /> Competitive Matrix & Differentiators
                          </span>
                          <span className="text-[9px] font-mono text-[#52525B]">VERTICAL ACCREDITATION</span>
                        </div>
                        <div className="overflow-x-auto text-xs">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-[#262626] text-[#A1A1AA] font-mono text-[10px] uppercase bg-black/20">
                                <th className="p-3">Competitor</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Key Differentiator vs ESGForge</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1C1C21]">
                              <tr>
                                <td className="p-3 font-bold text-white font-mono">R3</td>
                                <td className="p-3"><span className="px-1.5 py-0.5 bg-red-950/40 border border-red-800/30 text-red-400 font-mono text-[9px] rounded-sm">DIRECT</span></td>
                                <td className="p-3 text-[#A1A1AA] font-light">Broad enterprise approach. ESGForge specializes specifically in native, deep Shopify Plus platform integrations.</td>
                              </tr>
                              <tr>
                                <td className="p-3 font-bold text-white font-mono">EcoVadis</td>
                                <td className="p-3"><span className="px-1.5 py-0.5 bg-zinc-800/40 border border-zinc-700/30 text-[#A1A1AA] font-mono text-[9px] rounded-sm">INDIRECT</span></td>
                                <td className="p-3 text-[#A1A1AA] font-light">Primarily provides static ratings. ESGForge actively automates real-time, audit-ready compliance data.</td>
                              </tr>
                              <tr>
                                <td className="p-3 font-bold text-white font-mono">Workiva</td>
                                <td className="p-3"><span className="px-1.5 py-0.5 bg-zinc-800/40 border border-zinc-700/30 text-[#A1A1AA] font-mono text-[9px] rounded-sm">INDIRECT</span></td>
                                <td className="p-3 text-[#A1A1AA] font-light">Extremely expensive, generic GRC suite. ESGForge is streamlined and optimized entirely for high-volume e-commerce.</td>
                              </tr>
                              <tr className="bg-blue-950/10">
                                <td className="p-3 font-bold text-[#3B82F6] font-mono flex items-center gap-1">ESGForge <Check size={12} className="text-emerald-500" /></td>
                                <td className="p-3"><span className="px-1.5 py-0.5 bg-blue-950/40 border border-blue-800/30 text-blue-400 font-mono text-[9px] rounded-sm">SYSTEM LEADER</span></td>
                                <td className="p-3 text-white font-normal">Automated Shopify API connector, instant Climatiq carbon calculations, audit-ready CSRD/SEC output reports in seconds.</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Financial Projections & Funding Roadmap */}
                      <div className="grid md:grid-cols-2 gap-6" id="business-financials-roadmap">
                        {/* Financial Projections */}
                        <div className="border border-[#262626] p-5 rounded-sm bg-[#0F0F11]">
                          <span className="text-[10px] uppercase font-bold text-[#3B82F6] font-mono tracking-widest block mb-1">Financial Forecasts</span>
                          <h4 className="text-sm font-bold text-white font-mono mb-4">ARR Growth Path</h4>
                          
                          <div className="space-y-3 text-xs">
                            <div className="flex items-center justify-between border-b border-[#1C1C21] pb-2">
                              <div>
                                <span className="font-bold text-white block">Year 1 Projection</span>
                                <span className="text-[10px] text-[#52525B]">{"40 Customers // $5K average contract value (ACV)"}</span>
                              </div>
                              <span className="font-mono text-[#3B82F6] font-bold">$200K ARR</span>
                            </div>

                            <div className="flex items-center justify-between border-b border-[#1C1C21] pb-2">
                              <div>
                                <span className="font-bold text-white block">Year 2 Projection</span>
                                <span className="text-[10px] text-[#52525B]">{"180 Customers // 90% customer retention rate"}</span>
                              </div>
                              <span className="font-mono text-[#3B82F6] font-bold">$900K ARR</span>
                            </div>

                            <div className="flex items-center justify-between pb-2">
                              <div>
                                <span className="font-bold text-white block">Year 3 Projection</span>
                                <span className="text-[10px] text-[#52525B]">{"500 Customers // High expansion/upsell potential"}</span>
                              </div>
                              <span className="font-mono text-emerald-500 font-bold">$2.5M ARR</span>
                            </div>
                          </div>

                          <div className="mt-4 p-3 bg-black border border-[#1C1C21] text-[10px] leading-relaxed text-[#A1A1AA]">
                            <span className="text-white font-bold block mb-1">📅 BREAKEVEN HORIZON</span>
                            Achieved between Months 12–16 at <strong className="text-white">150 customers</strong>. $750K ARR fully covers the projected $40K/month operational burn rate.
                          </div>
                        </div>

                        {/* Capital Structure & Allocation */}
                        <div className="border border-[#262626] p-5 rounded-sm bg-[#0F0F11]">
                          <span className="text-[10px] uppercase font-bold text-[#EAB308] font-mono tracking-widest block mb-1">Funding Strategy</span>
                          <h4 className="text-sm font-bold text-white font-mono mb-4">Capital Structure & Seed Raise</h4>
                          
                          <div className="space-y-4 text-xs">
                            <div className="flex items-center justify-between text-[#A1A1AA]">
                              <span>Capital Raised to Date:</span>
                              <span className="font-mono text-white font-bold">$500K</span>
                            </div>
                            <div className="flex items-center justify-between text-[#A1A1AA]">
                              <span>Valuation Baseline:</span>
                              <span className="font-mono text-white">$3.0M Valuation (Friends & Family)</span>
                            </div>
                            <div className="flex items-center justify-between text-[#A1A1AA] border-b border-[#1C1C21] pb-2">
                              <span>Target Round Size:</span>
                              <span className="font-mono text-[#EAB308] font-bold">$2M Seed Round</span>
                            </div>

                            <div>
                              <span className="font-bold text-white block mb-2">Use of Seed Funds (%)</span>
                              <div className="space-y-2">
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono text-[#A1A1AA] mb-1">
                                    <span>Product Development</span>
                                    <span>{"50% // Expand features"}</span>
                                  </div>
                                  <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-[#3B82F6] h-full" style={{ width: '50%' }} />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono text-[#A1A1AA] mb-1">
                                    <span>Marketing & Distribution</span>
                                    <span>{"30% // Customer acquisition"}</span>
                                  </div>
                                  <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-[#EAB308] h-full" style={{ width: '30%' }} />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono text-[#A1A1AA] mb-1">
                                    <span>Operations</span>
                                    <span>{"20% // Regulatory advisory"}</span>
                                  </div>
                                  <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full" style={{ width: '20%' }} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Go-To-Market Channels & Acquisition Metrics */}
                      <div className="grid md:grid-cols-3 gap-4" id="business-gtm-channels">
                        <div className="border border-[#262626] p-4 rounded-sm bg-black/20">
                          <span className="text-[10px] uppercase font-bold text-[#3B82F6] font-mono block mb-1">PRIMARY CHANNEL</span>
                          <h4 className="text-xs font-bold text-white mb-2">Shopify Plus App Store</h4>
                          <ul className="space-y-1 text-[11px] text-[#A1A1AA] list-disc pl-4 font-light">
                            <li>{"Budget: $5K / Expected CAC: $100"}</li>
                            <li>Direct platform-embedded distribution</li>
                            <li>High organic search positioning on keywords</li>
                          </ul>
                        </div>
                        <div className="border border-[#262626] p-4 rounded-sm bg-black/20">
                          <span className="text-[10px] uppercase font-bold text-[#EAB308] font-mono block mb-1">SECONDARY CHANNEL</span>
                          <h4 className="text-xs font-bold text-white mb-2">Digital Ad Strategy</h4>
                          <ul className="space-y-1 text-[11px] text-[#A1A1AA] list-disc pl-4 font-light">
                            <li>{"Budget: $10K / Expected CAC: $200"}</li>
                            <li>High-relevance targeting on search queries</li>
                            <li>Addresses urgent active-deadline merchants</li>
                          </ul>
                        </div>
                        <div className="border border-[#262626] p-4 rounded-sm bg-black/20">
                          <span className="text-[10px] uppercase font-bold text-[#10B981] font-mono block mb-1">PARTNERSHIP CHANNEL</span>
                          <h4 className="text-xs font-bold text-white mb-2">ESG Consulting Alliances</h4>
                          <ul className="space-y-1 text-[11px] text-[#A1A1AA] list-disc pl-4 font-light">
                            <li>{"Budget: $5K / Expected CAC: $150"}</li>
                            <li>Co-marketing & shared referral leads</li>
                            <li>Direct access to pre-qualified high ARR sellers</li>
                          </ul>
                        </div>
                      </div>

                      {/* Key Risks & Proactive Mitigations */}
                      <div>
                        <h4 className="text-sm font-bold text-white font-mono mb-4">
                          Top Key Risks & Strategic Mitigations
                        </h4>
                        <div className="space-y-4" id="risks-mitigations-list">
                          <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 bg-red-950/40 border border-red-800/30 text-red-400 font-mono text-[9px] rounded-sm font-bold">SEVERITY: HIGH</span>
                                <h5 className="text-xs font-bold text-white">Software Integration & API Challenges</h5>
                              </div>
                              <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                                System must continuously sync high volumes of sales, shipment & supplier records without disrupting store operations or Shopify rate limit quotas.
                              </p>
                            </div>
                            <div className="bg-black border border-[#1C1C21] p-2 rounded-sm md:w-1/3 text-[10px] text-[#10B981] font-mono leading-relaxed">
                              <strong>MITIGATION:</strong> Perform strict caching, rate-limited batch queues, and write robust, pre-compiled API endpoint integrations.
                            </div>
                          </div>

                          <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 bg-red-950/40 border border-red-800/30 text-red-400 font-mono text-[9px] rounded-sm font-bold">SEVERITY: HIGH</span>
                                <h5 className="text-xs font-bold text-white">Compliance & Regulatory Fluctuations</h5>
                              </div>
                              <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                                Fast-changing CSRD mandates, SEC compliance variations, and Scope 3 calculation standards could make older analytics logic obsolete or non-compliant.
                              </p>
                            </div>
                            <div className="bg-black border border-[#1C1C21] p-2 rounded-sm md:w-1/3 text-[10px] text-[#10B981] font-mono leading-relaxed">
                              <strong>MITIGATION:</strong> Build modular emission-version frameworks; consult regulatory experts regularly to deploy quick schema upgrades.
                            </div>
                          </div>

                          <div className="bg-[#0F0F11] border border-[#262626] p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 bg-yellow-950/40 border border-yellow-800/30 text-yellow-500 font-mono text-[9px] rounded-sm font-bold">SEVERITY: MEDIUM</span>
                                <h5 className="text-xs font-bold text-white">Increased Competitive Pressures</h5>
                              </div>
                              <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                                As compliance mandates tighten, large generic GRC firms may try to enter the e-commerce vertical, driving up CAC or squeezing subscription pricing.
                              </p>
                            </div>
                            <div className="bg-black border border-[#1C1C21] p-2 rounded-sm md:w-1/3 text-[10px] text-[#10B981] font-mono leading-relaxed">
                              <strong>MITIGATION:</strong> Focus heavily on platform-specific ease-of-use, instant setups, and unbeatable integrated app experience.
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
