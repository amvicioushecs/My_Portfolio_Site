import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, ChevronRight, Github, Mail, Linkedin, Server, Shield, Database, Activity, Clock, FileText } from 'lucide-react';
import ArchitectureModal from './components/ArchitectureModal';
import ESGForgeVault from './components/ESGForgeVault';
import CalendarDashboard from './components/CalendarDashboard';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<'esg-forge' | 'finesse-os' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const formatted = now.toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        }).replace(',', '');
        setCurrentTime(formatted);
      } catch (e) {
        setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openArchitecture = (project: 'esg-forge' | 'finesse-os') => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-mono selection:bg-white selection:text-black p-4 md:p-12 relative overflow-x-hidden">
      {/* Background Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Real-time Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between text-[10px] text-[#52525B] border-b border-[#262626] pb-4 mb-16 gap-4 font-mono" id="telemetry-bar">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="uppercase tracking-widest font-bold">Node Cluster: US-WEST1</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Activity size={12} className="text-[#52525B]" />
              SLA UPTIME: 99.99%
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#52525B]" />
              {currentTime || 'FETCHING METRICS...'}
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="mb-24 flex flex-col md:flex-row md:justify-between md:items-start gap-8" id="portfolio-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white" id="main-title">
              HECTOR VERDUGO<span className="text-[#3B82F6]">.</span>
            </h1>
            <p className="text-[#A1A1AA] text-lg md:text-xl font-medium max-w-2xl leading-snug font-sans">
              Building scalable, compliance-driven SaaS platforms. 
              Merging high-precision field operations with cloud-native 
              architectural rigor.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8 text-xs font-mono uppercase tracking-widest" id="social-links-row">
              <a 
                href="https://github.com/amvicioushecs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-[#3B82F6] transition-colors border border-[#262626] px-4 py-2 bg-[#0F0F11] rounded-sm"
                id="github-link"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                <Github size={14}/> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/hector-verdugo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-[#3B82F6] transition-colors border border-[#262626] px-4 py-2 bg-[#0F0F11] rounded-sm"
                id="linkedin-link"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                <Linkedin size={14}/> LinkedIn
              </a>
              <a 
                href="mailto:hectorverdugojr@gmail.com" 
                className="flex items-center gap-2 hover:text-[#3B82F6] transition-colors border border-[#262626] px-4 py-2 bg-[#0F0F11] rounded-sm"
                id="contact-link"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                <Mail size={14}/> Contact
              </a>
            </div>
          </motion.div>
        </header>

        {/* Project Spotlight */}
        <section className="mb-24" id="project-spotlight-section">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#52525B] font-bold shrink-0">Project Spotlight</h2>
            <div className="h-[1px] w-full bg-[#262626]"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8" id="projects-grid">
            {/* ESG Forge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-[#0F0F11] border border-[#262626] p-8 hover:border-[#3B82F6] transition-colors group flex flex-col justify-between rounded-sm"
              id="project-esg-forge"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-[#52525B] bg-[#1A1A1E] px-2 py-1 uppercase tracking-wide rounded-sm">01 / compliance & saas</span>
                  <div className="w-3 h-3 border-t-2 border-r-2 border-[#3B82F6]"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">ESG Forge</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-8 flex-1 font-sans font-light">
                  Automated, audit-ready compliance reporting for Shopify Plus merchants.
                  Focusing on CSRD and SEC regulatory disclosures within a 
                  high-availability serverless environment.
                </p>
              </div>
              <div className="border-t border-[#262626] pt-6 mt-auto flex flex-wrap gap-4 justify-between items-center">
                <div className="flex gap-4">
                  <button 
                    onClick={() => openArchitecture('esg-forge')}
                    className="text-[11px] font-bold text-white uppercase tracking-tighter cursor-pointer flex items-center gap-1.5 hover:text-[#3B82F6] transition-colors"
                    id="view-esg-arch-btn"
                  >
                    Architecture &rarr;
                  </button>
                  <button 
                    onClick={() => setIsVaultOpen(true)}
                    className="text-[11px] font-bold text-[#3B82F6] uppercase tracking-tighter cursor-pointer flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                    id="open-esg-vault-btn"
                  >
                    🔒 Secure Vault
                  </button>
                </div>
                <a 
                  href="https://www.esgforge.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[11px] font-mono text-[#71717A] hover:text-[#3B82F6] transition-colors"
                  id="esgforge-website-link"
                >
                  esgforge.xyz
                </a>
              </div>
            </motion.div>

            {/* FinesseOS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-[#0F0F11] border border-[#262626] p-8 hover:border-[#3B82F6] transition-colors group flex flex-col justify-between rounded-sm"
              id="project-finesse-os"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-[#52525B] bg-[#1A1A1E] px-2 py-1 uppercase tracking-wide rounded-sm">02 / core systems & analytics</span>
                  <div className="w-3 h-3 border-t-2 border-r-2 border-[#3B82F6]"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">FinesseOS</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-8 flex-1 font-sans font-light">
                  Central operating system for affiliate compliance, link 
                  tracking, and media storage. Built for precision asset 
                  organization and high-scale distribution workflows.
                </p>
              </div>
              <div className="border-t border-[#262626] pt-6 mt-auto flex justify-between items-center">
                <button 
                  onClick={() => openArchitecture('finesse-os')}
                  className="text-[11px] font-bold text-white uppercase tracking-tighter cursor-pointer flex items-center gap-1.5 hover:text-[#3B82F6] transition-colors"
                  id="view-finesse-arch-btn"
                >
                  Architecture &rarr;
                </button>
                <a 
                  href="https://finesseos-dash-z6qjr3t9.manus.space/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[11px] font-mono text-[#71717A] hover:text-[#3B82F6] transition-colors max-w-[150px] truncate"
                  title="FinesseOS Dashboard"
                  id="finesseos-website-link"
                >
                  finesseos.dash
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Google Calendar Operations Dashboard */}
        <CalendarDashboard />

        {/* Narrative & Core Competencies */}
        <section className="mb-24 flex flex-col gap-6" id="narrative-section">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#52525B] font-bold shrink-0">The Narrative</h2>
            <div className="h-[1px] w-full bg-[#262626]"></div>
          </div>

          <div className="grid md:grid-cols-12 gap-8" id="narrative-content-row">
            {/* Interactive Narrative Box */}
            <div className="md:col-span-8 bg-[#0F0F11] border border-[#262626] p-8 rounded-sm flex flex-col justify-center">
              <p className="text-[13px] text-[#A1A1AA] leading-loose italic mb-6 border-l-2 border-[#3B82F6] pl-4 font-sans font-light">
                My journey began in the high-intensity world of commercial construction, 
                where "structural integrity" wasn't just a concept—it was the baseline for 
                survival. That rigor was my crucible; it forged an obsession with precision 
                that I now channel into digital architecture. 
              </p>
              <p className="text-[13px] text-[#A1A1AA] leading-loose font-sans font-light">
                Today, I build compliance-heavy, high-scale SaaS platforms, applying the 
                same relentless focus on stress points and system stability that I once 
                applied to steel and concrete. I don't just build software; I engineer 
                ecosystems designed to endure. Current focus: Legal intelligence mapping 
                and optimizing serverless infrastructure for compliance-heavy marketplaces.
              </p>
            </div>

            {/* Core Competencies side column */}
            <div className="md:col-span-4 bg-[#0F0F11] border border-[#262626] p-8 rounded-sm flex flex-col justify-center" id="competencies-container">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#52525B] mb-6 font-bold font-mono">Core Disciplines</h4>
              <div className="flex flex-col gap-5 text-xs" id="competencies-list">
                <div className="flex items-start gap-3 text-neutral-300">
                  <Shield size={16} className="text-[#3B82F6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">Constitutional Compliance</span>
                    <span className="text-[#A1A1AA] text-[10px] font-sans">Automated policy checks & audit logs</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-neutral-300">
                  <Server size={16} className="text-[#3B82F6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">High-Throughput Ingest</span>
                    <span className="text-[#A1A1AA] text-[10px] font-sans">Idempotent webhooks & queue workers</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-neutral-300">
                  <Database size={16} className="text-[#3B82F6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">Relational & OLAP DBs</span>
                    <span className="text-[#A1A1AA] text-[10px] font-sans">Strict schema & streaming telemetry</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-neutral-300">
                  <FileText size={16} className="text-[#3B82F6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">WORM Vault Ledgers</span>
                    <span className="text-[#A1A1AA] text-[10px] font-sans">Immutable storage & policy mapping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="mt-24 border-t border-[#262626] pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-[#3F3F46] tracking-tighter gap-4" id="portfolio-footer">
          <span>HECTOR VERDUGO &copy; 2026 // ALL SYSTEMS RIGOROUSLY TESTED</span>
        </footer>
      </div>

      {/* Dynamic Architecture Modal */}
      <ArchitectureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={selectedProject} 
      />

      {/* Secure Document Vault for ESG Forge */}
      <ESGForgeVault
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
      />
    </div>
  );
}
