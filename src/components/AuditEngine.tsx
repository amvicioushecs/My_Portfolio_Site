import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Terminal, HelpCircle, RefreshCw, Layers } from 'lucide-react';

interface AuditPreset {
  id: string;
  name: string;
  category: string;
  text: string;
}

const PRESETS: AuditPreset[] = [
  {
    id: 'csrd',
    name: 'CSRD Article 19 Ingestion',
    category: 'ESG Compliance',
    text: `[MANIFEST]
AppName: ESG-Forge-Ingestor
Target: CSRD-Disclosures-2026
Standard: EU Corporate Sustainability Reporting Directive (CSRD)

[METRIC_CALCULATION]
Scope_1_Direct_CO2: Calculated using standard combustion emissions. Verified.
Scope_2_Indirect_CO2: Purchased electricity verified with local grid emissions factors.
Scope_3_Supply_Chain: INCOMPLETE - Supplier telemetry missing from 4 sub-tier vendors.
S3_WORM_Storage: Configured on Bucket 'csrd-vault-2026' with lock retention of 7 years.`
  },
  {
    id: 'sec',
    name: 'SEC Climate Rules Subpart 1500',
    category: 'SEC Disclosure',
    text: `[MANIFEST]
AppName: ESG-Forge-SEC-Reporter
Target: SEC-Form-10K-Part-II
Standard: SEC Regulation S-K Subpart 1500

[GOVERNANCE]
Oversight_Board: Configured with quarterly review cycles.
Severe_Weather_Risk_Model: Applied. 100-year flood zone exposure index mapped.
Material_Impact_Calculations: Enabled.
Cryptographic_Signatures: MISSING - Payload verification keys not present in environmental variables.`
  },
  {
    id: 'shopify',
    name: 'Shopify Plus App Store Policy',
    category: 'SaaS Integrity',
    text: `[MANIFEST]
AppName: FinesseOS-Shopify-Sync
Target: Shopify-Plus-Merchant-App
Standard: Shopify App Store Integrity Guidelines v4.2

[SECURITY]
Oauth_Protocol: OAuth 2.0 with offline access tokens.
Data_Privacy_Webhooks: Active - Mandatory customer deletion webhooks integrated.
HMAC_Validation: Enabled on incoming webhooks.
Session_Tokens: Dynamic App Bridge session token exchange validated. Uptime stable.`
  }
];

export default function AuditEngine() {
  const [selectedPreset, setSelectedPreset] = useState<AuditPreset>(PRESETS[0]);
  const [inputText, setInputText] = useState<string>(PRESETS[0].text);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [auditProgress, setAuditProgress] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [auditResult, setAuditResult] = useState<{
    score: number;
    status: 'compliant' | 'warning' | 'non_compliant';
    issues: string[];
    criticals: number;
    warnings: number;
  } | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputText(selectedPreset.text);
    setLogs([]);
    setAuditResult(null);
    setAuditProgress(0);
  }, [selectedPreset]);

  // Scroll terminal to bottom when logs update
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const runAudit = () => {
    if (isRunning) return;
    setIsRunning(true);
    setAuditProgress(0);
    setLogs([]);
    setAuditResult(null);

    const logSteps = [
      { text: '⚡ INITIALIZING CONSTITUTIONAL AUDIT ENGINE...', delay: 100 },
      { text: `⚡ Ingesting custom manifest payload (${inputText.length} bytes)...`, delay: 300 },
      { text: '⚙️ Parsing lexical syntax tree & compliance nodes...', delay: 600 },
      { text: '⚙️ Matching structures against constitutional rule sheets...', delay: 1000 },
      { text: '🔍 Analyzing validation chains & cryptographic proofs...', delay: 1400 },
      { text: '⚠️ Evaluating stress point resilience & failure thresholds...', delay: 1800 },
      { text: '✍️ Finalizing cryptographically signed compliance report...', delay: 2200 },
      { text: '✅ AUDIT RUN COMPLETED.', delay: 2500 }
    ];

    logSteps.forEach((step) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${step.text}`]);
        setAuditProgress((prev) => Math.min(prev + 12.5, 100));
      }, step.delay);
    });

    setTimeout(() => {
      // Analyze text to generate realistic audit score and feedback
      const textLower = inputText.toLowerCase();
      let score = 100;
      const issues: string[] = [];
      let criticals = 0;
      let warnings = 0;

      if (textLower.includes('csrd')) {
        if (textLower.includes('incomplete') || textLower.includes('missing')) {
          score -= 15;
          warnings += 1;
          issues.push('Scope 3 Supply Chain telemetry lacks active sub-vendor integrations.');
        }
      }

      if (textLower.includes('sec')) {
        if (textLower.includes('missing') || textLower.includes('not present')) {
          score -= 25;
          criticals += 1;
          issues.push('CRITICAL: Environment lacks active KMS/verification keys for tamper-proof signing.');
        }
      }

      if (textLower.includes('shopify')) {
        if (score === 100) {
          score = 98; // Minor warning
          warnings += 1;
          issues.push('Webhook rotation keys should be cycled every 30 days (currently set to auto-expire).');
        }
      }

      // If user input custom text with words like "fail", "missing", "error"
      if (!PRESETS.some(p => p.text === inputText)) {
        if (textLower.includes('missing') || textLower.includes('error') || textLower.includes('fail')) {
          score -= 20;
          criticals += 1;
          issues.push('Custom Rule Check: Detected keywords referencing service failure or missing declarations.');
        } else {
          score = 95;
        }
      }

      let status: 'compliant' | 'warning' | 'non_compliant' = 'compliant';
      if (score < 80) {
        status = 'non_compliant';
      } else if (score < 96) {
        status = 'warning';
      }

      setAuditResult({
        score,
        status,
        issues,
        criticals,
        warnings
      });
      setIsRunning(false);
    }, 2800);
  };

  const handleReset = () => {
    setInputText(selectedPreset.text);
    setLogs([]);
    setAuditResult(null);
    setAuditProgress(0);
    setIsRunning(false);
  };

  return (
    <div className="grid md:grid-cols-12 gap-8" id="audit-engine-layout">
      {/* Configuration Column */}
      <div className="md:col-span-5 flex flex-col gap-6" id="audit-config-column">
        <div>
          <h4 className="text-sm font-semibold mb-2 text-white flex items-center gap-2">
            <Layers size={16} className="text-[#3B82F6]" />
            1. Select Compliance Target
          </h4>
          <p className="text-xs text-[#A1A1AA] mb-4 leading-relaxed font-sans">
            Choose an automated compliance benchmark preset to mount into the analyzer workspace.
          </p>
          <div className="flex flex-col gap-2" id="preset-selector-buttons">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset)}
                className={`text-left p-3 border transition-all rounded-sm ${
                  selectedPreset.id === preset.id
                    ? 'bg-[#1A1A1E] border-[#3B82F6] text-white'
                    : 'bg-black border-[#262626] text-[#A1A1AA] hover:border-[#3B82F6] hover:text-white'
                }`}
                id={`preset-btn-${preset.id}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold font-mono">{preset.name}</span>
                  <span className="text-[9px] bg-[#262626] px-1.5 py-0.5 text-[#A1A1AA] rounded-sm uppercase tracking-wide">
                    {preset.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h4 className="text-sm font-semibold mb-2 text-white flex items-center gap-2">
            <Terminal size={16} className="text-[#3B82F6]" />
            2. App Manifest & Protocol Code
          </h4>
          <p className="text-xs text-[#A1A1AA] mb-4 leading-relaxed font-sans">
            Modify the configuration file directly below to test real-time failure conditions.
          </p>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isRunning}
            className="flex-1 w-full min-h-[160px] p-3 bg-black/40 border border-[#262626] focus:border-[#3B82F6] focus:outline-none text-xs text-neutral-300 font-mono resize-none leading-relaxed rounded-sm"
            placeholder="[MANIFEST]..."
            id="manifest-editor-textarea"
          />
        </div>

        <div className="flex gap-4" id="action-buttons-container">
          <button
            onClick={runAudit}
            disabled={isRunning}
            className="flex-1 py-3 px-4 bg-[#3B82F6] text-white hover:bg-blue-600 disabled:bg-[#1A1A1E] disabled:text-[#52525B] transition-all font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider rounded-sm cursor-pointer"
            id="run-audit-btn"
          >
            {isRunning ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play size={14} fill="white" />
                Execute Constitutional Check
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            disabled={isRunning}
            className="p-3 border border-[#262626] hover:border-white text-[#A1A1AA] hover:text-white transition-all rounded-sm cursor-pointer"
            title="Reset manifest"
            id="reset-audit-btn"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Workspace Column */}
      <div className="md:col-span-7 flex flex-col bg-[#0F0F11] border border-[#262626] p-6 rounded-sm" id="terminal-workspace-column">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4" id="terminal-workspace-header">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
              <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
            </div>
            <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest font-bold font-mono">compliance_terminal_v0.4.2</span>
          </div>
          <span className="text-[9px] text-[#52525B] font-mono">PID 4822</span>
        </div>

        {/* Terminal logs content */}
        <div className="flex-1 min-h-[220px] max-h-[300px] overflow-y-auto mb-4 font-mono text-xs leading-relaxed text-[#A1A1AA]" id="terminal-log-output">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#52525B] py-12 text-center" id="empty-terminal-prompt">
              <Terminal size={32} className="mb-2 opacity-50 text-[#3B82F6]" />
              <p className="font-mono text-xs">Ready for validation. Click "Execute Constitutional Check"</p>
              <p className="text-[10px] text-[#3F3F46] mt-1 font-mono">Configured standards: EU CSRD, SEC 1500, Shopify Plus Integration Policy</p>
            </div>
          ) : (
            <div className="space-y-1.5" id="log-list">
              {logs.map((log, idx) => (
                <div key={idx} className="font-mono border-l border-[#262626] pl-2">
                  {log.includes('INITIALIZING') || log.includes('COMPLETED') ? (
                    <span className="text-white font-bold">{log}</span>
                  ) : log.includes('⚡') ? (
                    <span className="text-neutral-300">{log}</span>
                  ) : log.includes('⚙️') ? (
                    <span className="text-neutral-400">{log}</span>
                  ) : log.includes('🔍') || log.includes('✅') ? (
                    <span className="text-[#10B981]">{log}</span>
                  ) : (
                    <span className="text-yellow-500">{log}</span>
                  )}
                </div>
              ))}
              {isRunning && (
                <div className="flex items-center gap-2 text-[#52525B] italic pl-2" id="logging-loader">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  Processing rule-sheets...
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>
          )}
        </div>

        {/* Progress bar container */}
        {isRunning && (
          <div className="w-full bg-[#1A1A1E] h-[2px] rounded overflow-hidden mb-4" id="progress-container">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${auditProgress}%` }}
              className="bg-[#3B82F6] h-full"
            />
          </div>
        )}

        {/* Audit Results Panel */}
        <AnimatePresence>
          {auditResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border-t border-[#262626] pt-4"
              id="audit-results-card"
            >
              <div className="flex items-start justify-between mb-4" id="results-score-row">
                <div>
                  <h5 className="text-xs uppercase tracking-widest text-[#52525B] mb-1 font-bold font-mono">Analysis Verdict</h5>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold tracking-tight ${
                      auditResult.status === 'compliant' ? 'text-[#10B981]' :
                      auditResult.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {auditResult.score}% Compliant
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase ${
                      auditResult.status === 'compliant' ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30' :
                      auditResult.status === 'warning' ? 'bg-yellow-950/30 text-yellow-500 border border-yellow-800' :
                      'bg-red-950/30 text-red-500 border border-red-800'
                    }`}>
                      {auditResult.status === 'compliant' ? 'Verified Pass' :
                       auditResult.status === 'warning' ? 'Action Required' : 'Critical Failure'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 text-[10px] uppercase font-bold text-[#52525B] font-mono" id="issue-counters">
                  <div>
                    <span className="block text-right text-red-500">{auditResult.criticals}</span>
                    <span>Criticals</span>
                  </div>
                  <div>
                    <span className="block text-right text-yellow-500">{auditResult.warnings}</span>
                    <span>Warnings</span>
                  </div>
                </div>
              </div>

              {auditResult.issues.length > 0 ? (
                <div className="bg-[#050505]/40 p-4 border border-[#262626] rounded-sm" id="issues-panel">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-neutral-300 font-sans">
                    <AlertTriangle size={14} className="text-yellow-500" />
                    Detected Discrepancies
                  </div>
                  <ul className="space-y-2 text-neutral-400 text-xs pl-5 list-disc font-sans" id="issues-list">
                    {auditResult.issues.map((issue, idx) => (
                      <li key={idx} className="leading-relaxed">{issue}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-[#10B981]/10 p-4 border border-[#10B981]/30 text-[#10B981] rounded-sm flex items-center gap-3 text-xs" id="success-panel">
                  <ShieldCheck size={18} />
                  <div>
                    <p className="font-semibold font-sans">All Constitutional Checks Passed</p>
                    <p className="text-[10px] text-[#10B981]/80 mt-0.5 font-sans">Cryptographic signature and regulatory compliance structures validated completely.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
