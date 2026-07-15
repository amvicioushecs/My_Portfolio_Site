import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Server, Database, ArrowRight, CheckCircle2, Cpu, FileText } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: 'esg-forge' | 'finesse-os' | null;
}

export default function ArchitectureModal({ isOpen, onClose, project }: ArchitectureModalProps) {
  if (!project) return null;

  const isESG = project === 'esg-forge';

  const specs = isESG 
    ? {
        title: 'ESG Forge Architecture',
        subtitle: 'Automated, Audit-Ready Regulatory Disclosures for Shopify Plus',
        throughput: '15,000+ webhooks/sec burst capacity (edge + async)',
        latency: '< 200ms end-to-end ingest-to-emissions',
        availability: '99.99% Ingestion SLA',
        techStack: [
          'Next.js 15 (App Router)',
          'TypeScript',
          'Tailwind CSS',
          'Better Auth',
          'Next.js Route Handlers',
          'Cloudflare Workers',
          'Totalum Built-in DB (Postgres)',
          'Cloudflare Queues',
          'Climatiq API',
          '@react-pdf/renderer',
          'Stripe Payments',
          'Sentry & Pino',
          'opennextjs-cloudflare'
        ],
        nodes: [
          { id: 'shopify', label: 'Shopify Plus Webhooks', type: 'source', desc: 'Secure HTTPS with HMAC-SHA256 payload verification' },
          { id: 'edge', label: 'Next.js Edge Functions', type: 'edge', desc: 'Cloudflare Workers (opennextjs-cloudflare) immediate 200 OK' },
          { id: 'queue', label: 'Cloudflare Queues', type: 'mq', desc: 'Durable queues & async Durable Objects processing' },
          { id: 'climatiq', label: 'Climatiq API Engine', type: 'compute', desc: 'Batch automated server-side Scope 3 emissions estimations' },
          { id: 'db', label: 'Totalum Built-in DB', type: 'db', desc: 'Postgres-compatible tenant isolated data storage via Better Auth' },
          { id: 'storage', label: 'Cloudflare R2 / Storage', type: 'storage', desc: 'Secure PDF generation with @react-pdf/renderer & signed URLs' }
        ],
        highlights: [
          'Automatic HMAC-SHA256 signature validation on every single Shopify payload.',
          'Edge-first idempotency via unique DB constraints (shop, shopify_order_id).',
          'Immutable ledger audit trails for historical regulatory disclosures.',
          'Tenant isolation at the database layer via Better Auth session scopes.'
        ]
      }
    : {
        title: 'FinesseOS Architecture',
        subtitle: 'High-Scale Enterprise Affiliate Operating System',
        throughput: '120,000+ parallel clicks tracked/sec',
        latency: '< 12ms global routing latency',
        availability: '99.999% global CDN availability',
        techStack: ['Cloudflare Workers', 'KV / Durable Objects', 'Redis Enterprise', 'ClickHouse', 'S3 CDN', 'Node.js'],
        nodes: [
          { id: 'traffic', label: 'Affiliate Traffic', type: 'source', desc: 'High-volume redirect events & pixel pings' },
          { id: 'edge', label: 'Cloudflare Workers (Edge)', type: 'edge', desc: 'V8 isolate processing, georouting & real-time redirection' },
          { id: 'cache', label: 'Redis Enterprise', type: 'cache', desc: 'Global key-value lookups with active-active replication' },
          { id: 'analytics', label: 'ClickHouse Columnar DB', type: 'db', desc: 'Real-time OLAP ingestion of click-stream telemetry' },
          { id: 'media', label: 'S3 CDN Distribution', type: 'storage', desc: 'Media assets, landing pages, and dynamic creatives' },
          { id: 'control', label: 'Node.js Control Plane', type: 'compute', desc: 'Compliance rule mapping, payouts, and partner dashboard' }
        ],
        highlights: [
          'Edge computation reduces TTFB to under 15ms globally.',
          'Real-time fraud prevention maps bot patterns at the edge before redirection.',
          'ClickHouse allows sub-second query performance over billions of rows.'
        ]
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" id="architecture-modal-root">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
            id="modal-backdrop"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#050505] border border-[#262626] text-white shadow-2xl z-10 p-6 md:p-10 font-mono rounded-sm"
            id="modal-content-container"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-[#3B82F6] transition-colors"
              aria-label="Close modal"
              id="close-modal-btn"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="mb-8 border-b border-[#262626] pb-6" id="modal-header-section">
              <span className="text-xs text-[#52525B] uppercase tracking-widest block mb-1 font-bold">
                {isESG ? 'SECURE DATA INGEST & STORAGE' : 'GLOBAL HIGH-PERFORMANCE ROUTING'}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">{specs.title}<span className="text-[#3B82F6]">.</span></h2>
              <p className="text-neutral-400 text-sm font-sans font-light">{specs.subtitle}</p>
            </div>

            {/* Grid Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" id="metrics-grid">
              <div className="bg-[#0F0F11] p-4 border border-[#262626] rounded-sm">
                <span className="text-[#52525B] text-[10px] uppercase tracking-wider block mb-1 font-bold">Scale / Load</span>
                <span className="text-white text-sm font-semibold flex items-center gap-2">
                  <Cpu size={14} className="text-[#3B82F6]" />
                  {specs.throughput}
                </span>
              </div>
              <div className="bg-[#0F0F11] p-4 border border-[#262626] rounded-sm">
                <span className="text-[#52525B] text-[10px] uppercase tracking-wider block mb-1 font-bold">Performance SLA</span>
                <span className="text-white text-sm font-semibold flex items-center gap-2">
                  <Server size={14} className="text-[#3B82F6]" />
                  {specs.latency}
                </span>
              </div>
              <div className="bg-[#0F0F11] p-4 border border-[#262626] rounded-sm">
                <span className="text-[#52525B] text-[10px] uppercase tracking-wider block mb-1 font-bold">Availability</span>
                <span className="text-white text-sm font-semibold flex items-center gap-2">
                  <Shield size={14} className="text-[#3B82F6]" />
                  {specs.availability}
                </span>
              </div>
            </div>

            {/* Visual Architecture Diagram */}
            <div className="mb-8" id="architecture-diagram-container">
              <h3 className="text-xs uppercase tracking-widest text-[#52525B] mb-4 flex items-center gap-2 font-bold">
                <span>Infrastructure Flow Diagram</span>
              </h3>

              <div className="border border-[#262626] bg-[#0F0F11]/80 p-6 rounded-sm relative overflow-x-auto min-w-[500px] md:min-w-0" id="flow-diagram">
                <div className="flex flex-col gap-6 relative" id="nodes-flow-container">
                  {/* Row 1: Ingestion to API */}
                  <div className="flex justify-between items-center relative" id="flow-row-1">
                    {/* Ingestion Node */}
                    <div className="w-[45%] border border-[#262626] p-3 bg-[#1A1A1E] relative rounded-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                        <span className="text-xs font-bold text-white font-mono">{specs.nodes[0].label}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">{specs.nodes[0].desc}</p>
                    </div>

                    <div className="flex-1 flex justify-center text-[#52525B] font-sans" id="arrow-1">
                      <ArrowRight size={20} className="animate-pulse text-[#3B82F6]" />
                    </div>

                    {/* Edge Node */}
                    <div className="w-[45%] border border-[#262626] p-3 bg-[#1A1A1E] relative rounded-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
                        <span className="text-xs font-bold text-white font-mono">{specs.nodes[1].label}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">{specs.nodes[1].desc}</p>
                    </div>
                  </div>

                  {/* Vertical Connection Indicator */}
                  <div className="flex justify-around text-[#52525B] h-6 select-none font-bold" id="vertical-indicators-1">
                    <span className="text-xs font-sans">|</span>
                    <span className="text-xs font-sans">|</span>
                  </div>

                  {/* Row 2: MQ/Cache to Compute */}
                  <div className="flex justify-between items-center relative" id="flow-row-2">
                    {/* Cache/Queue Node */}
                    <div className="w-[45%] border border-[#262626] p-3 bg-[#1A1A1E] relative rounded-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span className="text-xs font-bold text-white font-mono">{specs.nodes[2].label}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">{specs.nodes[2].desc}</p>
                    </div>

                    <div className="flex-1 flex justify-center text-[#52525B] font-sans" id="arrow-2">
                      <ArrowRight size={20} className="rotate-180 md:rotate-0 text-[#3B82F6]" />
                    </div>

                    {/* Compute Node */}
                    <div className="w-[45%] border border-[#262626] p-3 bg-[#1A1A1E] relative rounded-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="text-xs font-bold text-white font-mono">{specs.nodes[3].label}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">{specs.nodes[3].desc}</p>
                    </div>
                  </div>

                  {/* Vertical Connection Indicator */}
                  <div className="flex justify-around text-[#52525B] h-6 select-none font-bold" id="vertical-indicators-2">
                    <span className="text-xs font-sans">|</span>
                    <span className="text-xs font-sans">|</span>
                  </div>

                  {/* Row 3: DB and Storage */}
                  <div className="flex justify-between items-center relative" id="flow-row-3">
                    {/* DB Node */}
                    <div className="w-[45%] border border-[#262626] p-3 bg-[#1A1A1E] relative rounded-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Database size={12} className="text-[#3B82F6]" />
                        <span className="text-xs font-bold text-white font-mono">{specs.nodes[4].label}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">{specs.nodes[4].desc}</p>
                    </div>

                    <div className="flex-1 flex justify-center text-[#52525B] font-sans" id="arrow-3">
                      <ArrowRight size={20} className="text-[#3B82F6]" />
                    </div>

                    {/* Storage Node */}
                    <div className="w-[45%] border border-[#262626] p-3 bg-[#1A1A1E] relative rounded-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText size={12} className="text-[#10B981]" />
                        <span className="text-xs font-bold text-white font-mono">{specs.nodes[5].label}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">{specs.nodes[5].desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Details & Tech Stack */}
            <div className="grid md:grid-cols-2 gap-8" id="tech-stack-and-highlights">
              {/* Architecture Highlights */}
              <div id="highlights-container">
                <h4 className="text-xs uppercase tracking-widest text-[#52525B] mb-4 font-bold">Architectural Integrity</h4>
                <ul className="space-y-3" id="highlights-list">
                  {specs.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-3 text-xs leading-relaxed text-neutral-300 font-sans">
                      <CheckCircle2 size={16} className="text-[#3B82F6] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div id="tech-used-container">
                <h4 className="text-xs uppercase tracking-widest text-[#52525B] mb-4 font-bold">Technologies & Protocols</h4>
                <div className="flex flex-wrap gap-2" id="tech-badges-container">
                  {specs.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[#0F0F11] border border-[#262626] hover:border-[#3B82F6] text-xs text-neutral-300 rounded-sm hover:text-white transition-all cursor-default font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
