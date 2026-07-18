import React from 'react';
import { motion } from 'motion/react';
import { Music, ExternalLink, PenTool, Radio, HelpCircle, Disc } from 'lucide-react';

export default function SunoPlaylist() {
  return (
    <section className="mb-24" id="suno-music-section">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[#52525B] font-bold shrink-0">Creative Output // Suno Playlist</h2>
        <div className="h-[1px] w-full bg-[#262626]"></div>
        <a 
          href="https://suno.com/@amvicioushecs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F0F11] border border-[#262626] hover:border-[#3B82F6] hover:text-white text-zinc-400 text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all cursor-pointer whitespace-nowrap"
          id="suno-profile-top-btn"
        >
          <Disc size={12} className="text-[#3B82F6] animate-spin" style={{ animationDuration: '4s' }} /> Suno Profile
        </a>
      </div>

      <div className="grid md:grid-cols-12 gap-8" id="music-workspace-container">
        {/* Left Column: Note & Metadata */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-[#0F0F11] border border-[#262626] p-6 rounded-sm relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Visual corner grid */}
            <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-[#262626] flex items-center justify-center bg-black/40 text-[8px] font-mono text-[#52525B]">
              LRC
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Music size={16} className="text-[#3B82F6]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#52525B] font-bold">Creative Synthesis</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2 font-mono">SONIC EXPEDITIONS</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed font-sans font-light">
                  When I am not designing high-scale emissions ledgers or organizing transactional microservices, I translate complexity into soundscapes.
                </p>
              </div>

              {/* Lyrics Attributions Note */}
              <div className="bg-black/60 border border-[#262626] p-4 rounded-sm flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-[#EAB308]">
                  <PenTool size={14} />
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Creative Directive</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans font-light">
                  <strong className="text-white font-medium">Lyrics written by me.</strong> All song narratives, verse structures, and thematic concepts are crafted from personal logs and field observations.
                </p>
              </div>
            </div>

            {/* Profile CTA */}
            <div className="pt-6 border-t border-[#262626] mt-6">
              <span className="text-[9px] font-mono text-[#52525B] block mb-2 uppercase">Discover More Tracks</span>
              <a 
                href="https://suno.com/@amvicioushecs"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-black border border-[#262626] hover:border-[#3B82F6] p-3 rounded-sm text-xs font-mono text-white transition-all"
                id="suno-profile-cta-card"
              >
                <div className="flex items-center gap-2">
                  <Radio size={14} className="text-[#3B82F6] animate-pulse" />
                  <span className="group-hover:text-[#3B82F6] transition-colors">@amvicioushecs</span>
                </div>
                <ExternalLink size={12} className="text-[#52525B] group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Interactive Synthesizer Visualizer Mock */}
          <div className="bg-[#0F0F11] border border-[#262626] p-6 rounded-sm">
            <div className="flex justify-between items-center mb-4 text-[9px] font-mono text-[#52525B]">
              <span>OSCILLOSCOPE FEED</span>
              <span className="text-emerald-500 animate-pulse">● SIGNAL ACTIVE</span>
            </div>

            {/* Simulated Animated waveform bars */}
            <div className="h-16 flex items-end gap-[3px] bg-black/60 border border-[#262626] p-4 rounded-sm justify-between">
              {[20, 45, 15, 65, 80, 40, 55, 90, 75, 30, 50, 85, 60, 25, 70, 45, 95, 35, 60, 20].map((height, i) => (
                <motion.div
                  key={i}
                  className="w-full bg-[#3B82F6]/80 rounded-t-xs"
                  initial={{ height: `${height}%` }}
                  animate={{ 
                    height: [
                      `${height}%`, 
                      `${Math.min(100, Math.max(10, height + (Math.random() * 40 - 20)))}%`,
                      `${Math.min(100, Math.max(10, height + (Math.random() * 40 - 20)))}%`, 
                      `${height}%`
                    ] 
                  }}
                  transition={{
                    duration: 1.5 + (i % 3) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-between text-[9px] font-mono text-[#52525B]">
              <span>FREQ: 44.1 KHZ</span>
              <span>CHANNELS: STEREO</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Embedded Player */}
        <div className="md:col-span-8">
          <div className="bg-[#0F0F11] border border-[#262626] rounded-sm overflow-hidden flex flex-col h-full min-h-[360px]">
            {/* Embedded player header */}
            <div className="flex items-center justify-between border-b border-[#262626] px-6 py-4 bg-black/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Official Playlist Feed // Suno Engine</span>
              </div>
              <span className="text-[9px] font-mono text-[#52525B]">SSL ENCRYPTED</span>
            </div>

            {/* Playlist Iframe */}
            <div className="flex-1 bg-[#050505] p-1 h-[300px]">
              <iframe 
                src="https://suno.com/embed/playlist/5dfb7f55-cab9-459e-a7ca-4bca9c1cf7e7" 
                width="100%" 
                height="100%" 
                style={{ border: '0px', background: 'transparent' }} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                allowFullScreen
                title="Suno Playlist"
                className="rounded-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
