export type AgentExploreTabId =
  | 'use_cases'
  | 'build_business'
  | 'learn'
  | 'monitor'
  | 'research'
  | 'create'
  | 'analyze';
export interface AgentExploreTabDto {
  id: AgentExploreTabId;
  label: string;
}
export interface AgentExploreSuggestionDto {
  icon: string;
  text: string;
}
export interface AgentUseCaseAppDto {
  name: string;
  emoji: string;
  type: string;
  desc: string;
}
export const AGENT_EXPLORE_TABS: AgentExploreTabDto[] = [
  { id: 'use_cases', label: 'Starter ideas' },
  { id: 'build_business', label: 'Grow a business' },
  { id: 'learn', label: 'Learn faster' },
  { id: 'monitor', label: 'Stay on top' },
  { id: 'research', label: 'Dig into sources' },
  { id: 'create', label: 'Make content' },
  { id: 'analyze', label: 'Crunch the numbers' },
];
export const AGENT_EXPLORE_SUGGESTIONS: Record<
  AgentExploreTabId,
  AgentExploreSuggestionDto[]
> = {
  use_cases: [
    { icon: '🚀', text: 'Prototype a habit-tracking PWA with reminders' },
    { icon: '📊', text: 'Wire up a live portfolio dashboard mock' },
    { icon: '🤖', text: 'Ship a FAQ bot wired to your help center' },
    { icon: '📋', text: 'Stand up a lightweight Kanban for a two-person team' },
  ],
  build_business: [
    { icon: '📈', text: 'Model MRR, churn, and runway in one sheet' },
    { icon: '💼', text: 'Draft a 10-slide narrative for seed investors' },
    { icon: '💰', text: 'Build a hiring plan with cost per role' },
    { icon: '🎯', text: 'Segment ICPs with messaging hooks' },
  ],
  learn: [
    { icon: '🧠', text: 'Teach transformers with diagrams and analogies' },
    { icon: '🌍', text: 'Design spaced-repetition flashcards for Spanish B1' },
    { icon: '📚', text: 'Turn lecture notes into a one-page cheat sheet' },
    { icon: '🎓', text: 'Generate practice exams with rationales' },
  ],
  monitor: [
    { icon: '📰', text: 'Aggregate niche headlines into a morning digest' },
    { icon: '📉', text: 'Plot sector ETFs against your watchlist' },
    { icon: '🔔', text: 'Track mentions of your brand across Reddit and X' },
    { icon: '📊', text: 'Roll up team KPIs into a Friday email' },
  ],
  research: [
    { icon: '🔬', text: 'Map 2026 papers on efficient attention' },
    { icon: '📖', text: 'Outline a lit review on retrieval safety' },
    { icon: '📊', text: 'Compare public datasets for climate risk' },
    { icon: '📑', text: 'Produce a brief with citations and gaps' },
  ],
  create: [
    { icon: '✍️', text: 'Draft pillar posts from a keyword list' },
    { icon: '📱', text: 'Plan a two-week LinkedIn cadence with hooks' },
    { icon: '🎬', text: 'Write a 90-second product demo script' },
    { icon: '📧', text: 'Sequence a welcome flow for trial signups' },
  ],
  analyze: [
    { icon: '📊', text: 'Profile a messy CSV for nulls and skew' },
    { icon: '📉', text: 'Highlight trend breaks in weekly sales' },
    {
      icon: '📑',
      text: 'Turn experiment results into a decision memo',
    },
    { icon: '💡', text: 'Recommend next tests from funnel drop-offs' },
  ],
};
export const AGENT_USE_CASE_APPS: Record<
  AgentExploreTabId,
  AgentUseCaseAppDto[]
> = {
  use_cases: [
    {
      name: 'City Bike Map',
      emoji: '🚲',
      type: 'Map App',
      desc: 'Live bike lanes, docks, and weather overlays for commuters',
    },
    {
      name: 'Recipe Pairing Lab',
      emoji: '🍳',
      type: 'Interactive',
      desc: 'Match pantry items to weeknight dinners with nutrition tags',
    },
    {
      name: 'Retro Terminal UI',
      emoji: '🖥️',
      type: 'Demo',
      desc: 'CRT-style shell for teaching CLI basics in the browser',
    },
    {
      name: 'Museum Audio Tour',
      emoji: '🎧',
      type: 'Experience',
      desc: 'Branching stories tied to exhibit QR codes',
    },
    {
      name: 'Watchlist Pulse',
      emoji: '📊',
      type: 'Dashboard',
      desc: 'Mock prices with alerts when mock thresholds trip',
    },
    {
      name: 'Carbon Footprint Quiz',
      emoji: '🌍',
      type: 'Quiz',
      desc: 'Estimate weekly impact with local grid factors',
    },
    {
      name: 'Support Copilot',
      emoji: '🤖',
      type: 'AI App',
      desc: 'Draft replies from your past tickets and macros',
    },
    {
      name: 'Sprint Poker Board',
      emoji: '🏆',
      type: 'Team App',
      desc: 'Anonymous estimates with reveal and export to Jira-style JSON',
    },
    {
      name: 'Focus Timer Garden',
      emoji: '🌱',
      type: 'Productivity',
      desc: 'Pomodoro streaks grow a tiny virtual garden',
    },
    {
      name: 'Pixel Rhythm Game',
      emoji: '🎮',
      type: 'Game',
      desc: 'Tap lanes synced to generative chiptune loops',
    },
  ],
  build_business: [
    {
      name: 'Runway Radar',
      emoji: '📈',
      type: 'Dashboard',
      desc: 'Cash, burn, and hiring scenarios on one canvas',
    },
    {
      name: 'Quote Builder',
      emoji: '🧾',
      type: 'Business Tool',
      desc: 'Line items, tax, and PDF export for services',
    },
    {
      name: 'Partner Pipeline',
      emoji: '👥',
      type: 'CRM Lite',
      desc: 'Stages, owners, and next-touch reminders',
    },
    {
      name: 'Launch Calendar',
      emoji: '📧',
      type: 'Marketing',
      desc: 'Coordinate email, webinar, and changelog drops',
    },
    {
      name: 'Narrative Deck',
      emoji: '💼',
      type: 'Pitch',
      desc: 'Story beats with placeholder charts for traction',
    },
    {
      name: 'Competitive Grid',
      emoji: '⚖️',
      type: 'Research',
      desc: 'Feature matrix with price bands and notes',
    },
    {
      name: 'Channel Mix Planner',
      emoji: '🗺️',
      type: 'Strategy',
      desc: 'Budget split across paid, organic, and community',
    },
    {
      name: 'Unit Economics Lab',
      emoji: '💰',
      type: 'Finance',
      desc: 'CAC, LTV, and payback sliders with guardrails',
    },
    {
      name: 'One-Pager Builder',
      emoji: '🏢',
      type: 'Business',
      desc: 'Problem, solution, traction, ask — export to PDF',
    },
    {
      name: 'Persona Cards',
      emoji: '🎯',
      type: 'Marketing',
      desc: 'Three personas with pains, jobs, and proof points',
    },
  ],
  learn: [
    {
      name: 'Transformer Zoo',
      emoji: '🧠',
      type: 'Educational',
      desc: 'Animated blocks for attention, KV cache, and LoRA',
    },
    {
      name: 'Phrase Coach',
      emoji: '🌍',
      type: 'Language',
      desc: 'Shadowing drills with instant pronunciation feedback',
    },
    {
      name: 'Lab Safety Bingo',
      emoji: '🧪',
      type: 'Game',
      desc: 'Checklist-style prep before wet labs',
    },
    {
      name: 'Syllabus Splitter',
      emoji: '📚',
      type: 'Planner',
      desc: 'Turn a PDF syllabus into weekly milestones',
    },
    {
      name: 'Arxiv Skimmer',
      emoji: '🔬',
      type: 'AI Tool',
      desc: 'Five-bullet summaries with links to sections',
    },
    {
      name: 'Concept Lattice',
      emoji: '💡',
      type: 'Visual',
      desc: 'Link prerequisites for any topic you paste in',
    },
    {
      name: 'Mock Exam Studio',
      emoji: '🎓',
      type: 'Assessment',
      desc: 'Adaptive difficulty with worked solutions',
    },
    {
      name: 'Style Linter',
      emoji: '✍️',
      type: 'Writing',
      desc: 'Flags passive voice and jargon against a rubric',
    },
    {
      name: 'Chapter Condenser',
      emoji: '📖',
      type: 'AI Tool',
      desc: 'Turn dense chapters into flashcards',
    },
    {
      name: 'Topic Duel',
      emoji: '🧩',
      type: 'Quiz',
      desc: 'Head-to-head prompts with score breakdowns',
    },
  ],
  monitor: [
    {
      name: 'Sector Brief',
      emoji: '📰',
      type: 'Dashboard',
      desc: 'Top headlines grouped by ticker and sentiment',
    },
    {
      name: 'Pair Trade View',
      emoji: '📉',
      type: 'Charts',
      desc: 'Spread between two symbols with z-score bands',
    },
    {
      name: 'Site Diff Watch',
      emoji: '🌐',
      type: 'Monitoring',
      desc: 'Highlight pricing or copy changes on competitor pages',
    },
    {
      name: 'Keyword Radar',
      emoji: '⚡',
      type: 'Alerts',
      desc: 'Notify when niche terms spike in news or forums',
    },
    {
      name: 'Social Echo',
      emoji: '🔔',
      type: 'Listening',
      desc: 'Track handles and hashtags in one stream',
    },
    {
      name: 'Endpoint Pulse',
      emoji: '📡',
      type: 'DevOps',
      desc: 'Latency, error rate, and SLO burn for APIs you own',
    },
    {
      name: 'Finding Triage',
      emoji: '🛡️',
      type: 'Security',
      desc: 'Severity-sorted issues from static scans',
    },
    {
      name: 'Topic Velocity',
      emoji: '🗞️',
      type: 'Analytics',
      desc: 'See which themes accelerate week over week',
    },
    {
      name: 'Ops Scoreboard',
      emoji: '📊',
      type: 'Dashboard',
      desc: 'Lead time, throughput, and incidents in one row',
    },
    {
      name: 'SERP Watchlist',
      emoji: '🔍',
      type: 'SEO',
      desc: 'Track rank for a basket of keywords by locale',
    },
  ],
  research: [
    {
      name: 'Paper Radar',
      emoji: '🔬',
      type: 'AI Tool',
      desc: 'Cluster new uploads by method and dataset',
    },
    {
      name: 'Source Basket',
      emoji: '🌐',
      type: 'Research',
      desc: 'Save URLs, tag claims, export BibTeX',
    },
    {
      name: 'Review Skeleton',
      emoji: '📖',
      type: 'Academic',
      desc: 'IMRAD-style outline with gap prompts',
    },
    {
      name: 'Citations Graph',
      emoji: '🧩',
      type: 'Visualisation',
      desc: 'Who cites whom in a chosen subfield',
    },
    {
      name: 'Dataset Bench',
      emoji: '📊',
      type: 'Data',
      desc: 'Compare licenses, size, and task fit',
    },
    {
      name: 'Claim Checker',
      emoji: '🔍',
      type: 'AI Tool',
      desc: 'Cross-check numbers against tables in PDFs',
    },
    {
      name: 'Market Lens',
      emoji: '🌍',
      type: 'Business',
      desc: 'TAM/SAM/SOM worksheet with sources',
    },
    {
      name: 'Evidence Memo',
      emoji: '📑',
      type: 'AI Tool',
      desc: 'Structured brief with confidence labels',
    },
    {
      name: 'Plain Paper',
      emoji: '🎓',
      type: 'Explainer',
      desc: 'Rewrite jargon-heavy abstracts for newcomers',
    },
    {
      name: 'Gap Hunter',
      emoji: '💬',
      type: 'Academic',
      desc: 'List unanswered questions from a reading set',
    },
  ],
  create: [
    {
      name: 'Pillar Writer',
      emoji: '✍️',
      type: 'Content',
      desc: 'Outline, draft, and FAQ from one keyword cluster',
    },
    {
      name: 'Channel Planner',
      emoji: '📱',
      type: 'Marketing',
      desc: 'Hooks, formats, and CTA per day',
    },
    {
      name: 'Shot List Studio',
      emoji: '🎬',
      type: 'Video',
      desc: 'Scene beats with on-screen text and b-roll notes',
    },
    {
      name: 'Creative Matrix',
      emoji: '🖼️',
      type: 'Ads',
      desc: 'Headline × visual concept grid for testing',
    },
    {
      name: 'Lifecycle Emails',
      emoji: '📧',
      type: 'Marketing',
      desc: 'Onboarding, nurture, and win-back with timing',
    },
    {
      name: 'Show Notes',
      emoji: '🎙️',
      type: 'Audio',
      desc: 'Timestamps, quotes, and resources from a transcript',
    },
    {
      name: 'Voice Guide',
      emoji: '💬',
      type: 'Brand',
      desc: 'Do/don’t examples for tone and banned phrases',
    },
    {
      name: 'Scope Writer',
      emoji: '📝',
      type: 'Business',
      desc: 'SOW sections with assumptions and deliverables',
    },
    {
      name: 'Hero Copy Lab',
      emoji: '🎯',
      type: 'Web',
      desc: 'Headline/subhead variants with proof bar ideas',
    },
    {
      name: 'Origin Story',
      emoji: '🌟',
      type: 'Brand',
      desc: 'Mission, milestones, and manifesto draft',
    },
  ],
  analyze: [
    {
      name: 'CSV Health Scan',
      emoji: '📊',
      type: 'Analytics',
      desc: 'Nulls, dtypes, duplicates, and top correlations',
    },
    {
      name: 'Shift Finder',
      emoji: '📉',
      type: 'Charts',
      desc: 'Detect level shifts and seasonality in series',
    },
    {
      name: 'Significance Helper',
      emoji: '🧮',
      type: 'Stats',
      desc: 'Choose tests, report effect sizes in plain language',
    },
    {
      name: 'Table Extractor',
      emoji: '🔎',
      type: 'AI Tool',
      desc: 'Pull grids from PDFs into tidy CSV',
    },
    {
      name: 'Review Sentiment',
      emoji: '🌐',
      type: 'NLP',
      desc: 'Themes and polarity across a review export',
    },
    {
      name: 'Correlation Hunt',
      emoji: '🧩',
      type: 'Analytics',
      desc: 'Spot surprising pairs with controls for confounds',
    },
    {
      name: 'Decision Memo',
      emoji: '📑',
      type: 'AI Tool',
      desc: 'Options, risks, and recommendation from metrics',
    },
    {
      name: 'North Star Board',
      emoji: '💡',
      type: 'Insights',
      desc: 'Connect inputs to lagging outcomes with narratives',
    },
    {
      name: 'Exec Snapshot',
      emoji: '📈',
      type: 'Dashboard',
      desc: 'Three KPIs, trend, and one callout per tile',
    },
    {
      name: 'Peer Lens',
      emoji: '🔍',
      type: 'Benchmark',
      desc: 'Compare ratios to a hand-picked peer set',
    },
  ],
};
