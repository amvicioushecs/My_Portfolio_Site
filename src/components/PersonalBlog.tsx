import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  FileText, 
  Plus, 
  Search, 
  Tag, 
  ChevronLeft, 
  Calendar, 
  Eye, 
  Save, 
  Trash2, 
  Clock, 
  Sparkles, 
  Bold, 
  Heading, 
  List, 
  Code, 
  Quote, 
  X, 
  Edit,
  ExternalLink,
  BookOpen,
  Check
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  tags: string[];
  color: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple';
  isDraft?: boolean;
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'structural-rigor',
    title: 'Structural Rigor in Software: Lessons from Steel & Concrete',
    summary: 'How years in commercial construction forged an obsession with load-bearing systems, stress points, and building digital architectures designed to endure.',
    date: '2026-07-12',
    tags: ['Architecture', 'Philosophy', 'Rigor'],
    color: 'blue',
    content: `# Structural Rigor in Software: Lessons from Steel & Concrete

In the high-intensity world of commercial construction, "structural integrity" isn't a theoretical metric or an item on a sprint backlog. It is a physical baseline. If your load-bearing calculations are off, if the concrete mixture fails to cure under the correct atmospheric conditions, or if the steel reinforcement is spaced incorrectly, the consequences are immediate and catastrophic.

When I transitioned into digital systems engineering, I brought that physical crucible with me.

Today, when I look at distributed microservices, Serverless pipelines, or transactional ledgers, I don't see abstract code. I see **beams, columns, and foundations**.

## 1. Static vs. Dynamic Load
In construction, we plan for both:
- **Dead Load**: The permanent, static weight of the structure itself. In software, this is your baseline background memory, cold start overheads, and persistent database footprint.
- **Live Load**: The temporary, variable forces applied (wind, traffic, weather). In software, this is your request traffic, webhook spikes from Shopify, and parallel background worker executions.

Too many SaaS platforms are engineered like indoor furniture. They look sleek under static conditions, but collapse when subjected to the sheer wind-shear of a live load. At **ESG Forge**, we treat incoming webhook bursts as major atmospheric events. Every system point must be decoupled with redundant joints (message queues) to ensure that stress is dissipated gracefully without cracking the primary database foundation.

## 2. Structural Redundancy is Not Waste
If you design a steel truss to support exactly $1.0\\times$ the maximum expected load, you will lose your license, and people will get hurt. We design for margins of safety: $1.5\\times$, $2.0\\times$, or $3.0\\times$.

In serverless architecture, this translates to:
- **Idempotency keys** on all incoming emissions reports.
- **Outbox patterns** for cross-system event propagation.
- **Fail-safe default states** that degrade functionality without completely locking up the UI.

## 3. Curing Takes Time
You can't rush concrete. Trying to build on top of a foundation that hasn't fully cured is a recipe for a collapsing superstructure. 

The same applies to product cycles. "Move fast and break things" works when you're building social widgets. It is completely unacceptable when building compliance ledgers like CSRD and SEC disclosure engines. When a merchant relies on your platform for regulatory filings, your data model must cure. You must test under high stress before declaring the system ready.

*We don't just write code. We build structures that persist.*`
  },
  {
    id: 'csrd-webhooks',
    title: 'Inside the ESG Compliance Beast: Navigating CSRD Webhooks',
    summary: 'A deep technical breakdown of handling massive Shopify Plus webhook bursts, automating CSRD data mappings, and running audit-ready transaction ledgers.',
    date: '2026-07-08',
    tags: ['SaaS', 'Compliance', 'Shopify'],
    color: 'emerald',
    content: `# Inside the ESG Compliance Beast: Navigating CSRD Webhooks

The Corporate Sustainability Reporting Directive (CSRD) is transforming ESG from a voluntary PR exercise into an audit-mandatory regulatory discipline. For Shopify Plus brands, this means accounting for Scope 1, 2, and 3 emissions for every single order, shipment, and returned item.

Doing this at scale requires capturing real-time commerce events without introducing checkout latencies or dropping critical transactions.

Here is how we architected the ingestion engine inside **ESG Forge**.

## Ingestion Architecture

Our webhook handler is built entirely on edge-compute workers backed by highly resilient queues.

\`\`\`
[Shopify Event] -> [Cloudflare Edge Worker] -> [Resilient Queue] -> [KMS Mapping Engine] -> [WORM Audit Ledger]
\`\`\`

### 1. The 100ms Response Rule
When Shopify fires an \`ORDERS_FULFILLED\` webhook, our edge gateway must validate the signature and acknowledge the request within 100 milliseconds. Doing database lookups or running complex emission factors at this stage is a structural flaw.

Our gateway simply:
1. Validates the secure HMAC signature using Web Crypto APIs.
2. Pushes the raw payload into a regional queue.
3. Instantly returns a \`202 Accepted\` status code.

### 2. Resolving the Emissions Mapping (Climatiq API)
Once safe in the queue, asynchronous workers consume the payloads. We map product metadata (materials, weight, shipping distances) against international carbon registries (like Climatiq and DEFRA emission factors).

To prevent rate-limit starvation on third-party APIs, we implement:
- **Caching of static emission profiles**: A cotton t-shirt shipping to zone 1 has a predictable baseline carbon weight.
- **Token bucket rate limiting**: Queue consumers self-throttle to preserve API budgets while maintaining persistent, smooth ingestion rates.

### 3. Creating the WORM Audit Ledger
CSRD compliance requires that data cannot be retrospectively altered or deleted without an audit trail. We store finalized carbon statements inside a Write-Once-Read-Many (WORM) storage architecture using encrypted, content-addressed files.

Every carbon ledger entry contains:
- The raw source transaction reference.
- The precise version of the emission factor registry used.
- A cryptographic signature validating that the record is untampered.

When auditors verify a merchant's ESG statement, they are not looking at dynamic database columns. They are reviewing immutable, cryptographically sealed ledger files. That is how you turn software into audit-ready compliance infrastructure.`
  },
  {
    id: 'minimalist-dev-stack',
    title: 'Minimalist DevStacks: The Power of Architectural Clarity',
    summary: 'Why over-engineered code is the ultimate form of technical debt. Thoughts on edge functions, atomic components, and maintaining a high signal-to-noise ratio.',
    date: '2026-06-30',
    tags: ['DevOps', 'Architecture', 'Simplicity'],
    color: 'amber',
    content: `# Minimalist DevStacks: The Power of Architectural Clarity

We live in an era of unprecedented architectural bloat. A simple form submission now regularly triggers a chain of twelve distinct framework layers, client-side hydration cascades, state managers, and state synchronization databases. 

It is the ultimate "tech-larping." It looks impressive in architectural slides, but introduces massive surface areas for failures, security vulnerabilities, and latency.

Here is my philosophy on building high-performance, minimalist stacks in 2026.

## 1. Zero-Cost Abstractions
Every dependency you add is an uninvited developer working on your codebase. They can introduce vulnerabilities, breaking changes, or slow down your build pipeline.

When choosing a package, ask yourself:
> Can I write this in 20 lines of vanilla TypeScript?

If yes, write it yourself. The code you write yourself is code you fully understand, debug, and maintain.

## 2. Compute on the Edge
Traditional server instances are designed for static, heavy configurations. For modern compliance platforms, we prioritize Edge functions (such as Cloudflare Workers or Vercel Edge).

- **Ultra-low latency**: Code runs microseconds away from the user.
- **Zero cold starts**: Instant response rates.
- **Isolation by design**: If one tenant's mapping process fails, it is sandboxed and does not crash the core system engine.

## 3. High Signal-to-Noise Ratio
Keep your codebase readable. A single developer should be able to hold the entire layout and data flow in their head. 
- Group components by logical features, not abstract folders.
- Avoid nesting state managers unless you are building a real-time collaborative whiteboard.
- Rely on standard CSS/Tailwind utilities to keep styling close to the markup.

By stripping away the noise, you make space for what truly matters: **rigorous, stable logic and lightning-fast execution.**`
  }
];

export default function PersonalBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Editor State
  const [editorId, setEditorId] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorSummary, setEditorSummary] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorTags, setEditorTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [editorColor, setEditorColor] = useState<BlogPost['color']>('blue');
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<string>('');

  // Initial load
  useEffect(() => {
    const stored = localStorage.getItem('hector_blog_posts');
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch (e) {
        setPosts(DEFAULT_POSTS);
      }
    } else {
      localStorage.setItem('hector_blog_posts', JSON.stringify(DEFAULT_POSTS));
      setPosts(DEFAULT_POSTS);
    }

    // Check for draft in progress
    const draft = localStorage.getItem('hector_blog_draft');
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        if (parsedDraft && parsedDraft.content) {
          setAutoSaveTimer('Draft recovered from local cache');
        }
      } catch (e) {}
    }
  }, []);

  // Filter posts
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // Start creating new post
  const handleNewPost = () => {
    setEditorId(null);
    setEditorTitle('');
    setEditorSummary('');
    setEditorContent('');
    setEditorTags(['DevLog']);
    setEditorColor('blue');
    setIsEditing(true);
    setActiveTab('write');
    localStorage.removeItem('hector_blog_draft');
    setAutoSaveTimer('');
  };

  // Start editing existing post
  const handleEditPost = (post: BlogPost) => {
    setEditorId(post.id);
    setEditorTitle(post.title);
    setEditorSummary(post.summary);
    setEditorContent(post.content);
    setEditorTags(post.tags);
    setEditorColor(post.color);
    setIsEditing(true);
    setActiveTab('write');
    setAutoSaveTimer('');
  };

  // Add tag to list
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tagInput.trim();
    if (clean && !editorTags.includes(clean)) {
      setEditorTags([...editorTags, clean]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditorTags(editorTags.filter(t => t !== tagToRemove));
  };

  // Auto-save draft helper
  useEffect(() => {
    if (isEditing) {
      const draftData = {
        id: editorId,
        title: editorTitle,
        summary: editorSummary,
        content: editorContent,
        tags: editorTags,
        color: editorColor,
        timestamp: Date.now()
      };
      
      const timer = setTimeout(() => {
        localStorage.setItem('hector_blog_draft', JSON.stringify(draftData));
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setAutoSaveTimer(`Local cache updated at ${timeStr}`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [editorTitle, editorSummary, editorContent, editorTags, editorColor, isEditing, editorId]);

  // Save/Publish Post
  const handleSavePost = () => {
    if (!editorTitle.trim() || !editorContent.trim()) {
      alert('Title and content are required.');
      return;
    }

    const newId = editorId || editorTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `post-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    const postToSave: BlogPost = {
      id: newId,
      title: editorTitle,
      summary: editorSummary || (editorContent.split('\n')[2]?.substring(0, 150) || 'No summary provided.'),
      content: editorContent,
      date: posts.find(p => p.id === editorId)?.date || today,
      tags: editorTags.length > 0 ? editorTags : ['General'],
      color: editorColor
    };

    let updatedPosts: BlogPost[];
    if (editorId) {
      updatedPosts = posts.map(p => p.id === editorId ? postToSave : p);
    } else {
      updatedPosts = [postToSave, ...posts];
    }

    localStorage.setItem('hector_blog_posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setIsEditing(false);
    setSelectedPost(postToSave);
    localStorage.removeItem('hector_blog_draft');
    
    // Notification popup
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 3000);
  };

  // Delete Post
  const handleDeletePost = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('Are you sure you want to delete this blog post?')) {
      const updated = posts.filter(p => p.id !== id);
      localStorage.setItem('hector_blog_posts', JSON.stringify(updated));
      setPosts(updated);
      if (selectedPost?.id === id) {
        setSelectedPost(null);
      }
      if (isEditing && editorId === id) {
        setIsEditing(false);
      }
    }
  };

  // Markdown Editor formatting helpers
  const insertTextAtCursor = (before: string, after: string = '') => {
    const textarea = document.getElementById('blog-markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = before + (selected || 'text') + after;
    setEditorContent(text.substring(0, start) + replacement + text.substring(end));
    
    // Reset focus & selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selected || 'text').length);
    }, 50);
  };

  // Word & Reading Time Counter
  const getWordCount = () => {
    const clean = editorContent.trim();
    if (!clean) return 0;
    return clean.split(/\s+/).length;
  };

  const getReadingTime = () => {
    const words = getWordCount();
    return Math.max(1, Math.ceil(words / 200)); // ~200 wpm
  };

  const getColorClass = (color: BlogPost['color']) => {
    switch (color) {
      case 'emerald': return { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', border: 'border-[#10B981]/30', dot: 'bg-[#10B981]', hover: 'hover:border-[#10B981]' };
      case 'amber': return { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/30', dot: 'bg-amber-500', hover: 'hover:border-amber-500' };
      case 'rose': return { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/30', dot: 'bg-rose-500', hover: 'hover:border-rose-500' };
      case 'purple': return { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30', dot: 'bg-purple-500', hover: 'hover:border-purple-500' };
      default: return { bg: 'bg-[#3B82F6]/10', text: 'text-[#3B82F6]', border: 'border-[#3B82F6]/30', dot: 'bg-[#3B82F6]', hover: 'hover:border-[#3B82F6]' };
    }
  };

  return (
    <section className="mb-24" id="personal-blog-section">
      {/* Visual divider */}
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[#52525B] font-bold shrink-0">Personal Logs & Blog</h2>
        <div className="h-[1px] w-full bg-[#262626]"></div>
        <button 
          onClick={handleNewPost}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F0F11] border border-[#262626] hover:border-[#3B82F6] hover:text-white text-zinc-400 text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all cursor-pointer whitespace-nowrap"
          id="new-blog-post-btn"
        >
          <Plus size={12} className="text-[#3B82F6]" /> Write Post
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-8" id="blog-workspace-container">
        {/* Main Interface or Editor */}
        <div className="md:col-span-12">
          
          <AnimatePresence mode="wait">
            {isEditing ? (
              /* ================= EDITOR & LIVE PREVIEW MODE ================= */
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-[#0F0F11] border border-[#262626] rounded-sm relative overflow-hidden"
                id="blog-editor-panel"
              >
                {/* Editor Header */}
                <div className="flex flex-wrap items-center justify-between border-b border-[#262626] px-6 py-4 bg-black/60 gap-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        if (confirm('Cancel and discard unsaved changes?')) {
                          setIsEditing(false);
                          localStorage.removeItem('hector_blog_draft');
                        }
                      }}
                      className="text-[#52525B] hover:text-white transition-colors cursor-pointer"
                      title="Back to feed"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">
                        {editorId ? 'EDITING SYSTEM LOG' : 'CREATING NEW SYSTEM LOG'}
                      </span>
                      <h3 className="text-sm font-bold text-white font-mono uppercase tracking-tight">
                        {editorTitle || 'Untitled Blog Post'}
                      </h3>
                    </div>
                  </div>

                  {/* Tabs & Buttons */}
                  <div className="flex items-center gap-3">
                    <div className="flex bg-black border border-[#262626] p-0.5 rounded-sm">
                      <button 
                        onClick={() => setActiveTab('write')}
                        className={`px-3 py-1 text-[10px] uppercase font-mono tracking-wider transition-all rounded-sm cursor-pointer ${activeTab === 'write' ? 'bg-[#3B82F6] text-white font-bold' : 'text-[#71717A] hover:text-white'}`}
                      >
                        Write
                      </button>
                      <button 
                        onClick={() => setActiveTab('preview')}
                        className={`px-3 py-1 text-[10px] uppercase font-mono tracking-wider transition-all rounded-sm cursor-pointer ${activeTab === 'preview' ? 'bg-[#3B82F6] text-white font-bold' : 'text-[#71717A] hover:text-white'}`}
                      >
                        Live Preview
                      </button>
                    </div>

                    <button 
                      onClick={handleSavePost}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3B82F6] hover:bg-blue-600 text-white text-[10px] uppercase font-mono font-bold tracking-wider rounded-sm transition-all cursor-pointer"
                    >
                      <Save size={12} /> Publish
                    </button>
                  </div>
                </div>

                {/* Editor Settings Row */}
                <div className="p-6 border-b border-[#262626] bg-[#050505]/40 grid md:grid-cols-12 gap-6">
                  {/* Title */}
                  <div className="md:col-span-6 flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono text-zinc-500 font-bold">Post Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Scaling Shopify Webhooks Under Pressure"
                      value={editorTitle}
                      onChange={(e) => setEditorTitle(e.target.value)}
                      className="w-full bg-black border border-[#262626] focus:border-[#3B82F6] px-3 py-2 rounded-sm text-xs font-mono text-white outline-none placeholder-zinc-600 transition-all"
                    />
                  </div>

                  {/* Summary */}
                  <div className="md:col-span-6 flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono text-zinc-500 font-bold">Brief Executive Summary</label>
                    <input 
                      type="text" 
                      placeholder="e.g. A deep technical breakdown of managing compliance-driven Shopify Plus spikes."
                      value={editorSummary}
                      onChange={(e) => setEditorSummary(e.target.value)}
                      className="w-full bg-black border border-[#262626] focus:border-[#3B82F6] px-3 py-2 rounded-sm text-xs font-mono text-white outline-none placeholder-zinc-600 transition-all"
                    />
                  </div>

                  {/* Category Accent Color */}
                  <div className="md:col-span-4 flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono text-zinc-500 font-bold">Branding Accent Color</label>
                    <div className="flex items-center gap-3 bg-black border border-[#262626] p-2 rounded-sm h-[38px]">
                      {(['blue', 'emerald', 'amber', 'rose', 'purple'] as BlogPost['color'][]).map((col) => {
                        const style = getColorClass(col);
                        return (
                          <button
                            key={col}
                            onClick={() => setEditorColor(col)}
                            className={`w-4 h-4 rounded-full ${style.dot} transition-transform relative cursor-pointer flex items-center justify-center`}
                          >
                            {editorColor === col && (
                              <Check size={10} className="text-black font-bold" />
                            )}
                          </button>
                        );
                      })}
                      <span className="text-[9px] font-mono uppercase text-zinc-500 ml-auto mr-1">{editorColor}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono text-zinc-500 font-bold">Metadata Tags</label>
                    <form onSubmit={handleAddTag} className="flex gap-2">
                      <div className="flex-1 flex items-center bg-black border border-[#262626] focus-within:border-[#3B82F6] rounded-sm px-2.5 transition-all">
                        <Tag size={12} className="text-[#52525B] mr-2" />
                        <input 
                          type="text" 
                          placeholder="Add custom tag and press Enter"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          className="w-full bg-transparent border-none py-2 text-xs font-mono text-white outline-none placeholder-zinc-600"
                        />
                      </div>
                    </form>
                    
                    {/* Tags List */}
                    {editorTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {editorTags.map(t => (
                          <span 
                            key={t}
                            className="inline-flex items-center gap-1 text-[9px] font-bold font-mono bg-[#1A1A1E] text-zinc-300 border border-[#262626] px-2 py-0.5 uppercase tracking-wide rounded-sm"
                          >
                            {t}
                            <button 
                              onClick={() => handleRemoveTag(t)}
                              className="hover:text-red-400 transition-colors cursor-pointer ml-1"
                            >
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Editor Workspace (Markdown Input or Preview) */}
                <div className="p-6 h-[480px]">
                  {activeTab === 'write' ? (
                    <div className="h-full flex flex-col">
                      {/* Formatting Toolbar */}
                      <div className="flex items-center gap-1 border-b border-[#262626] bg-black/40 p-1.5 rounded-t-sm">
                        <button 
                          onClick={() => insertTextAtCursor('**', '**')}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1A1A1E] rounded-sm transition-colors cursor-pointer"
                          title="Bold Text"
                        >
                          <Bold size={13} />
                        </button>
                        <button 
                          onClick={() => insertTextAtCursor('# ', '')}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1A1A1E] rounded-sm transition-colors cursor-pointer"
                          title="Header 1"
                        >
                          <Heading size={13} />
                        </button>
                        <button 
                          onClick={() => insertTextAtCursor('- ', '')}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1A1A1E] rounded-sm transition-colors cursor-pointer"
                          title="Bullet List"
                        >
                          <List size={13} />
                        </button>
                        <button 
                          onClick={() => insertTextAtCursor('`', '`')}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1A1A1E] rounded-sm transition-colors cursor-pointer"
                          title="Inline Code"
                        >
                          <Code size={13} />
                        </button>
                        <button 
                          onClick={() => insertTextAtCursor('\n```typescript\n', '\n```\n')}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1A1A1E] rounded-sm transition-colors cursor-pointer"
                          title="Code Block"
                        >
                          <span className="text-[10px] font-bold font-mono">CODE</span>
                        </button>
                        <button 
                          onClick={() => insertTextAtCursor('> ', '')}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1A1A1E] rounded-sm transition-colors cursor-pointer"
                          title="Blockquote"
                        >
                          <Quote size={13} />
                        </button>
                        
                        <div className="h-4 w-[1px] bg-[#262626] mx-2"></div>
                        <span className="text-[9px] font-mono text-[#52525B] ml-2">
                          WORDS: {getWordCount()} // READ TIME: {getReadingTime()} MIN
                        </span>

                        {autoSaveTimer && (
                          <span className="text-[9px] font-mono text-emerald-500 ml-auto pr-1 flex items-center gap-1">
                            <Sparkles size={10} className="animate-pulse" />
                            {autoSaveTimer}
                          </span>
                        )}
                      </div>

                      <textarea
                        id="blog-markdown-textarea"
                        placeholder="# Write your thoughts in raw Markdown format here..."
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        className="w-full flex-1 bg-black border-x border-b border-[#262626] focus:border-[#3B82F6] p-4 text-xs font-mono text-neutral-300 outline-none placeholder-zinc-600 transition-all resize-none leading-relaxed rounded-b-sm"
                      />
                    </div>
                  ) : (
                    /* Editor Live Preview Mode */
                    <div className="h-full border border-[#262626] bg-[#050505]/40 rounded-sm p-6 overflow-y-auto font-sans leading-relaxed">
                      {editorContent ? (
                        <div className="prose prose-invert max-w-none text-sm text-[#A1A1AA]">
                          <div className="border-b border-[#262626] pb-4 mb-6">
                            <span className="text-[10px] font-bold font-mono text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-0.5 uppercase tracking-wider rounded-sm">
                              PREVIEW MODE
                            </span>
                            <h1 className="text-3xl font-black text-white tracking-tight mt-3 mb-2">{editorTitle || 'Untitled Blog Post'}</h1>
                            <p className="text-xs text-[#52525B] font-mono uppercase">
                              DATE: {new Date().toISOString().split('T')[0]} // CATEGORY: {editorColor}
                            </p>
                          </div>
                          
                          <div className="markdown-body text-neutral-300 space-y-4">
                            <ReactMarkdown>{editorContent}</ReactMarkdown>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-[#52525B] font-mono text-xs">
                          <FileText size={24} className="mb-2" />
                          <span>No markdown content written to preview yet.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : selectedPost ? (
              /* ================= READ BLOG POST MODE ================= */
              <motion.div
                key="read-post"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                className="bg-[#0F0F11] border border-[#262626] rounded-sm overflow-hidden"
                id="blog-reader-panel"
              >
                {/* Reader Header */}
                <div className="flex flex-wrap items-center justify-between border-b border-[#262626] px-6 py-4 bg-black/60 gap-4">
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-[#262626] hover:border-[#3B82F6] hover:text-white text-[#A1A1AA] text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all cursor-pointer"
                  >
                    <ChevronLeft size={12} /> Back to feed
                  </button>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleEditPost(selectedPost)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[#262626] hover:border-[#3B82F6] hover:text-white text-zinc-400 text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all cursor-pointer"
                    >
                      <Edit size={12} className="text-[#3B82F6]" /> Edit Post
                    </button>
                    <button 
                      onClick={() => handleDeletePost(selectedPost.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[#262626] hover:border-red-500 hover:text-red-400 text-zinc-400 text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all cursor-pointer"
                    >
                      <Trash2 size={12} className="text-red-500" /> Delete
                    </button>
                  </div>
                </div>

                {/* Reader Body */}
                <div className="p-8 md:p-12 max-w-4xl mx-auto">
                  {/* Metadata header block */}
                  <div className="border-b border-[#262626] pb-8 mb-8" id="reader-metadata-block">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedPost.tags.map(t => (
                        <span 
                          key={t}
                          className="text-[9px] font-bold font-mono bg-[#1A1A1E] text-zinc-400 border border-[#262626] px-2 py-0.5 uppercase tracking-wide rounded-sm"
                        >
                          #{t}
                        </span>
                      ))}
                      <span className={`text-[9px] font-bold font-mono px-2 py-0.5 uppercase tracking-wide rounded-sm ml-auto ${getColorClass(selectedPost.color).bg} ${getColorClass(selectedPost.color).text} border ${getColorClass(selectedPost.color).border}`}>
                        SYSTEM LOG // {selectedPost.color}
                      </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 font-sans">
                      {selectedPost.title}
                    </h1>

                    <div className="flex flex-wrap items-center text-[10px] font-mono text-[#52525B] gap-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        PUBLISHED: {selectedPost.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        READ TIME: {Math.max(1, Math.ceil(selectedPost.content.split(/\s+/).length / 200))} MIN
                      </span>
                    </div>
                  </div>

                  {/* Rendered content */}
                  <div className="markdown-body font-sans text-[#D4D4D8] leading-relaxed text-base space-y-6 max-w-none">
                    <ReactMarkdown 
                      components={{
                        h1: ({ children }) => <h1 className="text-2xl md:text-3xl font-bold text-white font-mono border-b border-[#262626] pb-2 mt-8 mb-4 tracking-tight">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl md:text-2xl font-bold text-white font-mono mt-8 mb-3 tracking-tight">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg md:text-xl font-bold text-white font-mono mt-6 mb-2 tracking-tight">{children}</h3>,
                        p: ({ children }) => <p className="leading-relaxed mb-4 text-[#A1A1AA] font-light font-sans">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-6 space-y-1.5 text-[#A1A1AA] mb-4 font-sans font-light">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-6 space-y-1.5 text-[#A1A1AA] mb-4 font-sans font-light">{children}</ol>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        blockquote: ({ children }) => <blockquote className="border-l-2 border-[#3B82F6] pl-4 italic text-zinc-400 bg-black/20 py-2 rounded-r-sm my-4 font-sans font-light">{children}</blockquote>,
                        code: ({ children, className }) => {
                          const isInline = !className;
                          return isInline ? (
                            <code className="bg-[#1A1A1E] border border-[#262626] px-1.5 py-0.5 rounded-sm text-xs font-mono text-white">{children}</code>
                          ) : (
                            <pre className="bg-[#050505] border border-[#262626] p-4 rounded-sm overflow-x-auto text-xs font-mono text-emerald-400 leading-relaxed my-4">
                              <code>{children}</code>
                            </pre>
                          );
                        }
                      }}
                    >
                      {selectedPost.content}
                    </ReactMarkdown>
                  </div>

                  {/* Footer Author Row */}
                  <div className="border-t border-[#262626] pt-8 mt-12 flex items-center justify-between" id="reader-author-row">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-[#262626] flex items-center justify-center bg-[#1A1A1E]">
                        <span className="font-mono text-xs font-bold text-white">HV</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block font-mono">Hector Verdugo</span>
                        <span className="text-[10px] text-[#52525B] font-mono">Founder & Lead Architect, ESG Forge</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        window.scrollTo({ top: document.getElementById('personal-blog-section')?.offsetTop, behavior: 'smooth' });
                        setSelectedPost(null);
                      }}
                      className="text-[10px] font-mono text-[#3B82F6] hover:underline cursor-pointer"
                    >
                      Return to Feed &uarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ================= BLOG POSTS FEED (GRID) ================= */
              <motion.div
                key="feed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Search & Tags Filter Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F0F11] border border-[#262626] p-4 rounded-sm" id="blog-filter-bar">
                  {/* Search Input */}
                  <div className="flex-1 flex items-center bg-black border border-[#262626] focus-within:border-[#3B82F6] rounded-sm px-3 py-1.5 max-w-md transition-all">
                    <Search size={14} className="text-[#52525B] mr-2" />
                    <input 
                      type="text" 
                      placeholder="Search posts or topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none text-xs font-mono text-white outline-none placeholder-zinc-600"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-zinc-500 hover:text-white cursor-pointer">
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {/* Active Tags / Categories */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-mono uppercase text-zinc-500 mr-1">Filter:</span>
                    <button
                      onClick={() => setSelectedTag(null)}
                      className={`px-2.5 py-1 text-[9px] font-bold font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer ${!selectedTag ? 'bg-[#3B82F6] text-white' : 'bg-[#1A1A1E] text-zinc-400 border border-[#262626] hover:border-zinc-700'}`}
                    >
                      All Logs
                    </button>
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        className={`px-2.5 py-1 text-[9px] font-bold font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer ${selectedTag === tag ? 'bg-[#3B82F6] text-white' : 'bg-[#1A1A1E] text-zinc-400 border border-[#262626] hover:border-zinc-700'}`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Posts Feed Grid */}
                {filteredPosts.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-6" id="blog-feed-grid">
                    {filteredPosts.map((post) => {
                      const colorStyle = getColorClass(post.color);
                      return (
                        <motion.div
                          key={post.id}
                          layout
                          whileHover={{ y: -3 }}
                          onClick={() => setSelectedPost(post)}
                          className={`bg-[#0F0F11] border border-[#262626] ${colorStyle.hover} p-6 rounded-sm flex flex-col justify-between cursor-pointer transition-colors group relative`}
                        >
                          <div>
                            {/* Decorative side accent matching branding color */}
                            <div className={`absolute top-0 left-0 w-1 h-full ${colorStyle.dot}`} />

                            <div className="flex justify-between items-start mb-4">
                              <span className="text-[9px] font-mono text-[#52525B] flex items-center gap-1.5">
                                <Calendar size={10} />
                                {post.date}
                              </span>
                              <span className={`text-[8px] font-bold font-mono px-2 py-0.5 uppercase tracking-wider rounded-sm border ${colorStyle.bg} ${colorStyle.text} ${colorStyle.border}`}>
                                {post.color}
                              </span>
                            </div>

                            <h3 className="text-base font-bold text-white group-hover:text-[#3B82F6] transition-colors line-clamp-2 leading-snug mb-3">
                              {post.title}
                            </h3>

                            <p className="text-xs text-[#A1A1AA] line-clamp-3 mb-6 font-sans font-light leading-relaxed">
                              {post.summary}
                            </p>
                          </div>

                          <div className="border-t border-[#262626] pt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mt-auto">
                            <span className="text-[#3B82F6] flex items-center gap-1 font-bold">
                              Read Post <ChevronLeft size={10} className="rotate-180" />
                            </span>
                            <div className="flex gap-1">
                              {post.tags.slice(0, 2).map(t => (
                                <span key={t} className="text-[#52525B] text-[8px]">#{t}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border border-[#262626] bg-[#0F0F11] p-12 text-center rounded-sm" id="empty-blog-state">
                    <BookOpen size={32} className="mx-auto text-[#52525B] mb-3" />
                    <p className="text-xs font-mono text-[#A1A1AA] mb-4">No system logs or blog posts match your filter query.</p>
                    <button 
                      onClick={() => { setSelectedTag(null); setSearchQuery(''); }}
                      className="px-3 py-1.5 bg-[#1A1A1E] border border-[#262626] hover:border-[#3B82F6] text-white text-[10px] font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>

      {/* Floating Save Notification Banner */}
      <AnimatePresence>
        {showSavedNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#10B981] border border-emerald-400 text-black px-6 py-3 rounded-sm font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 z-50"
            id="save-notification-banner"
          >
            <Sparkles size={14} />
            <span>TRANSACTION SUCCESS // BLOG POST DEPLOYED SUCCESSFULLY TO THE VAULT</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
