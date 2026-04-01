export interface Model {
  id: string;
  icon: string;
  bg: string;
  name: string;
  lab: string;
  org: string;
  desc: string;
  tags: string[];
  badge: string;
  badgeClass: string;
  rating: number;
  reviews: number;
  price: string;
  types: string[];
  price_start: number;
}

export const MODELS: Model[] = [
  // OpenAI
  { id: 'gpt5', icon: '🧠', bg: '#EEF2FD', name: 'GPT-5.4', lab: 'OpenAI', org: 'OpenAI', desc: 'Native computer-use agents, 1M+ context, improved reasoning. Best for high-precision professional tasks.', tags: ['Computer Use', '1M+ Context', 'Agents', 'Reasoning'], badge: 'hot', badgeClass: 'badge-hot', rating: 4.9, reviews: 12480, price: '$2.50/$15/1M tk', types: ['language', 'vision', 'code'], price_start: 2.5 },
  { id: 'gpt-image', icon: '🖼', bg: '#EEF2FD', name: 'gpt-image-1.5', lab: 'OpenAI', org: 'OpenAI', desc: 'Studio-quality image generation and editing for professional creatives and commercial asset production.', tags: ['Image Gen', 'Editing', 'Commercial'], badge: 'new', badgeClass: 'badge-new', rating: 4.8, reviews: 8320, price: '$8/$32/1M tk', types: ['image'], price_start: 8 },
  { id: 'sora2', icon: '🎬', bg: '#EEF2FD', name: 'Sora 2 Pro', lab: 'OpenAI', org: 'OpenAI', desc: 'Synced audio-video generation with 400K context. Cinematic-grade output for professional video content.', tags: ['Video', 'Audio', 'Cinematic'], badge: 'new', badgeClass: 'badge-new', rating: 4.7, reviews: 4210, price: '$30/1M tk', types: ['image', 'audio'], price_start: 30 },
  // Anthropic
  { id: 'claude-opus', icon: '👑', bg: '#FDF1EB', name: 'Claude Opus 4.6', lab: 'Anthropic', org: 'Anthropic', desc: 'Adaptive Thinking, 1M Token Context (beta), 128K max output, Extended Thinking. Best for professional software engineering.', tags: ['Extended Thinking', '1M Context', 'Coding', 'Agents'], badge: 'hot', badgeClass: 'badge-hot', rating: 4.8, reviews: 9840, price: '$5/$25/1M tk', types: ['language', 'vision', 'code'], price_start: 5 },
  { id: 'claude-sonnet', icon: '⚡', bg: '#FDF1EB', name: 'Claude Sonnet 4.6', lab: 'Anthropic', org: 'Anthropic', desc: 'Best balance of speed and intelligence. Adaptive Thinking, 1M context (beta), 64K max output, Extended Thinking.', tags: ['Balanced', 'Fast', 'Extended Thinking'], badge: '', badgeClass: '', rating: 4.7, reviews: 15620, price: '$3/$15/1M tk', types: ['language', 'vision', 'code'], price_start: 3 },
  { id: 'claude-haiku', icon: '🚀', bg: '#FDF1EB', name: 'Claude Haiku 4.5', lab: 'Anthropic', org: 'Anthropic', desc: 'Lowest cost, 200K context, Extended Thinking. Real-time applications and high-volume intelligent processing.', tags: ['Fastest', 'Low Cost', '200K Context'], badge: '', badgeClass: '', rating: 4.5, reviews: 11230, price: '$1/$5/1M tk', types: ['language', 'code'], price_start: 1 },
  // Google
  { id: 'gemini31-pro', icon: '🔬', bg: '#E8F5E9', name: 'Gemini 3.1 Pro', lab: 'Google DeepMind', org: 'Google', desc: 'Thought Signatures for enhanced reasoning transparency. Up to 5M context. Ideal for deep analysis and long-document tasks.', tags: ['5M Context', 'Deep Reasoning', 'Multimodal'], badge: 'new', badgeClass: 'badge-new', rating: 4.8, reviews: 7840, price: '$2/$12/1M tk', types: ['language', 'vision', 'code'], price_start: 2 },
  { id: 'gemini3-flash', icon: '⚡', bg: '#E8F5E9', name: 'Gemini 3 Flash', lab: 'Google DeepMind', org: 'Google', desc: 'Sub-second latency for high-volume chat and coding. 1M context window, multimodal support.', tags: ['1M Context', 'Sub-second', 'Multimodal'], badge: 'hot', badgeClass: 'badge-hot', rating: 4.6, reviews: 18920, price: '$2/$12/1M tk', types: ['language', 'vision', 'code'], price_start: 2 },
  { id: 'gemini31-flash-lite', icon: '💡', bg: '#E8F5E9', name: 'Gemini 3.1 Flash-Lite', lab: 'Google DeepMind', org: 'Google', desc: 'Thinking Mode for smarter responses at ultra-low cost. Best for agents and translation.', tags: ['Ultra Cheap', 'Thinking Mode', 'Agents'], badge: '', badgeClass: '', rating: 4.4, reviews: 9280, price: '$0.10/$0.40/1M tk', types: ['language'], price_start: 0.1 },
  { id: 'veo3', icon: '🎥', bg: '#E8F5E9', name: 'Veo 3.1', lab: 'Google DeepMind', org: 'Google', desc: 'Cinematic camera control for high-end video production. 8s to 3-minute clips.', tags: ['Video', 'Cinematic', 'Camera Control'], badge: 'new', badgeClass: 'badge-new', rating: 4.6, reviews: 3140, price: '$0.50/sec', types: ['image'], price_start: 0.5 },
  // xAI
  { id: 'grok4', icon: '𝕏', bg: '#F0F0F0', name: 'Grok-4-1', lab: 'xAI', org: 'xAI', desc: '4-agent architecture with real-time X data access. Top for analysis and real-time information tasks.', tags: ['Real-time X', '4-Agent', '2000K Context'], badge: 'new', badgeClass: 'badge-new', rating: 4.6, reviews: 5820, price: '$0.20/$0.50/1M tk', types: ['language', 'vision'], price_start: 0.2 },
  // DeepSeek
  { id: 'deepseek-v3', icon: '💻', bg: '#E8F4FD', name: 'DeepSeek-V3', lab: 'DeepSeek', org: 'DeepSeek', desc: '1T params, 40% less memory, 1.8× faster. Best budget general-purpose model for coding and analysis.', tags: ['Budget', '1T Params', 'Fast', 'Coding'], badge: '', badgeClass: '', rating: 4.5, reviews: 8640, price: '~$0.07/$0.28/1M tk', types: ['language', 'code'], price_start: 0.07 },
  { id: 'deepseek-r1', icon: '🔬', bg: '#E8F4FD', name: 'DeepSeek-R1', lab: 'DeepSeek', org: 'DeepSeek', desc: 'Formal theorem proving in Lean 4. Best for academic math proofs with open weights.', tags: ['Open Weights', 'Math', 'Reasoning'], badge: 'open', badgeClass: 'badge-open', rating: 4.4, reviews: 6240, price: '$0.14/$2.19/1M tk', types: ['language', 'open'], price_start: 0.14 },
  // Meta
  { id: 'llama4-maverick', icon: '🦙', bg: '#FFF3E0', name: 'Llama 4 Maverick', lab: 'Meta', org: 'Meta', desc: '400B parameter Mixture-of-Experts with multimodal understanding. Best open-source for multilingual and agentic tasks.', tags: ['Open Source', '400B MoE', 'Multimodal', '119 Languages'], badge: 'open', badgeClass: 'badge-open', rating: 4.6, reviews: 12480, price: 'Free (self-host)', types: ['language', 'vision', 'open'], price_start: 0 },
  { id: 'llama4-scout', icon: '🌟', bg: '#FFF3E0', name: 'Llama 4 Scout', lab: 'Meta', org: 'Meta', desc: 'Efficient MoE model for long-context tasks. 128K context, great for retrieval and summarization.', tags: ['Open Source', 'Long Context', 'Efficient'], badge: 'open', badgeClass: 'badge-open', rating: 4.5, reviews: 9840, price: 'Free (self-host)', types: ['language', 'open'], price_start: 0 },
  // Alibaba (Qwen)
  { id: 'qwen3-max', icon: '🀄', bg: '#FFF9E8', name: 'Qwen3-Max', lab: 'Alibaba', org: 'Alibaba', desc: '1T params MoE, beats GPT-4o on benchmarks. Best for multilingual APAC scale deployments.', tags: ['1T MoE', '119 Languages', 'APAC'], badge: 'new', badgeClass: 'badge-new', rating: 4.5, reviews: 4820, price: '$0.40/$1.20/1M tk', types: ['language', 'code'], price_start: 0.4 },
  { id: 'qwen3-coder', icon: '💡', bg: '#FFF9E8', name: 'Qwen3-Coder-480B', lab: 'Alibaba', org: 'Alibaba', desc: '480B MoE coding specialist. Best for professional software development tasks at scale.', tags: ['480B', 'Code', 'MoE'], badge: '', badgeClass: '', rating: 4.4, reviews: 3620, price: '$0.60/$1.80/1M tk', types: ['code'], price_start: 0.6 },
  // Mistral
  { id: 'devstral', icon: '🌀', bg: '#EDF0FF', name: 'Devstral 2', lab: 'Mistral', org: 'Mistral', desc: 'Chat Completions, Function Calling, Structured Outputs. Best for multi-file edits and codebase navigation.', tags: ['256K Context', 'Code Agent', 'Function Calling'], badge: 'new', badgeClass: 'badge-new', rating: 4.6, reviews: 5280, price: '$0.40/$2/1M tk', types: ['language', 'code'], price_start: 0.4 },
  { id: 'mistral-medium', icon: '⚙️', bg: '#EDF0FF', name: 'Mistral Medium 3.1', lab: 'Mistral', org: 'Mistral', desc: 'Chat Completions, Agents, Structured Outputs, Document QnA. Fast and multimodal at low cost.', tags: ['Multimodal', 'Agents', 'Document QnA'], badge: '', badgeClass: '', rating: 4.4, reviews: 7140, price: '$0.10/$0.30/1M tk', types: ['language', 'vision'], price_start: 0.1 },
  // NVIDIA
  { id: 'nemotron-ultra', icon: '🟢', bg: '#E8F8F0', name: 'Nemotron Ultra 253B', lab: 'NVIDIA', org: 'NVIDIA', desc: 'Neural Architecture Search compression for enterprise reasoning and RAG. 131K context.', tags: ['Enterprise', 'RAG', '131K Context'], badge: '', badgeClass: '', rating: 4.5, reviews: 3840, price: '$0.60/$1.80/1M tk', types: ['language'], price_start: 0.6 },
  // Moonshot (Kimi)
  { id: 'kimi-k2', icon: '🌙', bg: '#EEF0FF', name: 'kimi-k2.5', lab: 'Moonshot', org: 'Moonshot', desc: 'Agent Swarm Orchestration with 262K context. Fastest for visual coding and multi-agent RAG.', tags: ['Agent Swarm', '262K Context', 'Visual Coding'], badge: 'new', badgeClass: 'badge-new', rating: 4.5, reviews: 2840, price: '$0.60/$3.00/1M tk', types: ['language', 'vision', 'code'], price_start: 0.6 },
  // Zhipu (GLM)
  { id: 'glm5', icon: '🔷', bg: '#EEF6FF', name: 'GLM-5', lab: 'Zhipu AI', org: 'Zhipu', desc: 'DeepSeek Sparse Attention for fastest agentic engineering and coding. 200K context.', tags: ['200K Context', 'Agentic', 'Coding', 'Fast'], badge: 'new', badgeClass: 'badge-new', rating: 4.4, reviews: 2480, price: '$1.00/$3.20/1M tk', types: ['language', 'code'], price_start: 1 },
  // EleutherAI
  { id: 'pythia-12b', icon: '⚡', bg: '#FFF9E8', name: 'Pythia 12B', lab: 'EleutherAI', org: 'EleutherAI', desc: 'Research-first open model with full training transparency and checkpoints.', tags: ['Open Source', 'Research', 'Transparent'], badge: 'open', badgeClass: 'badge-open', rating: 4.0, reviews: 340, price: 'Free (open)', types: ['language', 'open'], price_start: 0 },
  // BigScience
  { id: 'bloom', icon: '🌍', bg: '#FFF0F8', name: 'BLOOM', lab: 'BigScience', org: 'BigScience', desc: '176B multilingual open model trained on 46 languages and 13 programming languages.', tags: ['Open Source', '176B', '46 Languages', 'Multilingual'], badge: 'open', badgeClass: 'badge-open', rating: 4.0, reviews: 760, price: 'Free (open)', types: ['language', 'code', 'open'], price_start: 0 },
  // MiniMax
  { id: 'minimax-m25', icon: '🟡', bg: '#FFFDE8', name: 'MiniMax-M2.5', lab: 'MiniMax', org: 'MiniMax', desc: 'Advanced Chinese multimodal model with agent orchestration capabilities.', tags: ['Chinese', 'Multimodal', 'Agents'], badge: 'new', badgeClass: 'badge-new', rating: 4.3, reviews: 280, price: '$0.40/1M tk', types: ['language', 'vision'], price_start: 0.4 },
  // HuggingFace
  { id: 'zephyr', icon: '🤗', bg: '#FFF7E8', name: 'H4-Zephyr', lab: 'HuggingFace', org: 'HuggingFace', desc: 'Fine-tuned Mistral model for helpfulness without RLHF. Top for open chat.', tags: ['Open Source', 'Chat', 'Fine-Tuned'], badge: 'open', badgeClass: 'badge-open', rating: 4.2, reviews: 980, price: 'Free (open)', types: ['language', 'open'], price_start: 0 },
];

export const MODEL_VARS: Record<string, Array<{
  id: string; icon: string; name: string; tag: string; desc: string;
  ctx: string; speed: string; price: string; updated: string; badge: string; benefits: string[];
}>> = {
  gpt5: [
    { id: 'gpt5-full', icon: '🧠', name: 'GPT-5.4', tag: 'Flagship · computer use agents', desc: 'Native computer-use agents, improved reasoning efficiency, 1M+ context support.', ctx: '1.05M', speed: '~1.2s', price: '$2.50/$15/1M', updated: 'Mar 2026', badge: '🔥 Most Popular', benefits: ['Native computer-use agents', '1M+ context window', 'Improved reasoning efficiency', 'High-precision tasks'] },
    { id: 'gpt5-mini', icon: '⚡', name: 'GPT-5.4 Mini', tag: 'Fast & affordable', desc: 'High-volume variant. Best value for standard tasks at scale.', ctx: '512K', speed: '~0.6s', price: '$0.40/$2/1M', updated: 'Mar 2026', badge: '💰 Best Value', benefits: ['Lower cost than flagship', 'Great for high-volume', 'Fast response times', 'Commercial licence'] },
  ],
  'claude-opus': [
    { id: 'claude-opus-46', icon: '👑', name: 'Claude Opus 4.6', tag: 'Most intelligent · agents & coding', desc: 'Adaptive Thinking, 1M Token Context (beta), 128K max output, Extended Thinking.', ctx: '200K / 1M beta', speed: '~2s', price: '$5/$25/1M', updated: 'Mar 2026', badge: '🏆 Most Intelligent', benefits: ['Adaptive Thinking', '1M token context (beta)', '128K max output', 'Extended Thinking mode'] },
  ],
  'claude-sonnet': [
    { id: 'claude-sonnet-46', icon: '⚡', name: 'Claude Sonnet 4.6', tag: 'Speed/intelligence balance', desc: 'Best balance of speed and intelligence. Adaptive Thinking, 1M context (beta), 64K max output.', ctx: '200K / 1M beta', speed: '~1.2s', price: '$3/$15/1M', updated: 'Mar 2026', badge: '✨ Best Balance', benefits: ['Adaptive Thinking', '64K max output', 'Extended Thinking', '1M context beta'] },
  ],
  'gemini31-pro': [
    { id: 'gemini31-pro-full', icon: '🔬', name: 'Gemini 3.1 Pro', tag: 'Deep reasoning · 5M context', desc: 'Thought Signatures for enhanced reasoning transparency. Up to 5M context.', ctx: '2M – 5M', speed: 'Moderate', price: '$2/$12/1M', updated: 'Mar 2026', badge: '🧩 Deep Reasoning', benefits: ['Thought Signatures', 'Up to 5M context', 'Deep reasoning', 'Long-document analysis'] },
  ],
  'llama4-maverick': [
    { id: 'llama4-maverick-full', icon: '🦙', name: 'Llama 4 Maverick', tag: '400B MoE · multimodal', desc: '400B parameter Mixture-of-Experts with multimodal understanding.', ctx: '128K', speed: 'Moderate', price: 'Free (self-host)', updated: 'Mar 2026', badge: '🔥 Popular', benefits: ['400B MoE architecture', 'Multimodal understanding', 'Multilingual (119 langs)', 'Fully self-hostable'] },
  ],
};

export const FEATURED_MODELS = MODELS.slice(0, 6);
