export interface ResearchItem {
  date: string;
  org: string;
  title: string;
  summary: string;
}

export const RESEARCH: ResearchItem[] = [
  { date: 'Mar 26', org: 'Google DeepMind', title: 'Gemini 2.5 Pro achieves new SOTA on reasoning benchmarks', summary: 'Scores 83.2% on AIME 2025 math competition, outperforming all prior models on reasoning-intensive tasks.' },
  { date: 'Mar 22', org: 'MIT CSAIL', title: 'Scaling laws for multimodal models: new empirical findings', summary: 'Research reveals unexpected scaling dynamics when combining vision and language — efficiency gains plateau earlier than expected.' },
  { date: 'Mar 18', org: 'Anthropic', title: 'Constitutional AI v2: improved alignment through iterative refinement', summary: 'New methodology achieves 40% reduction in harmful outputs while preserving capability on standard benchmarks.' },
  { date: 'Mar 15', org: 'Meta AI', title: 'Llama 4 Scout & Maverick: natively multimodal from the ground up', summary: '17B MoE architecture trained on 40 trillion tokens with native understanding across text, image, and video.' },
  { date: 'Mar 10', org: 'Stanford NLP', title: 'Long-context recall: how models handle 1M+ token windows', summary: 'Comprehensive evaluation shows sharp recall degradation beyond 200K tokens for most models tested.' },
  { date: 'Mar 5', org: 'DeepSeek', title: 'DeepSeek-R1 open weights: reproducing frontier reasoning at minimal cost', summary: 'Full weight release enables fine-tuning for domain-specific reasoning at a fraction of frontier model costs.' },
  { date: 'Feb 28', org: 'OpenAI', title: 'GPT-5.4 evaluation: real-world performance across enterprise tasks', summary: 'Internal evaluation shows 34% improvement over GPT-4o on enterprise coding and reasoning tasks.' },
  { date: 'Feb 20', org: 'Mistral AI', title: 'Devstral 2: pushing boundaries of code intelligence', summary: 'New benchmark results show Devstral 2 outperforms all open-source models on SWE-bench verified.' },
];

export const AGENT_TEMPLATES = [
  { icon: '🔍', title: 'Research Agent', desc: 'Automates web research, summarises findings, and generates structured reports on demand.', tags: ['GPT-4o', 'Web search', 'Reports'], modelId: 'gpt5' },
  { icon: '💼', title: 'Customer Support Agent', desc: 'Handles tickets, FAQs, and escalates complex issues with full conversation context.', tags: ['GPT-4o', 'Ticketing', 'Escalation'], modelId: 'gpt5' },
  { icon: '💻', title: 'Code Review Agent', desc: 'Reviews pull requests, flags bugs, suggests improvements, and explains changes inline.', tags: ['Claude 3.7', 'GitHub', 'Code'], modelId: 'claude-opus' },
  { icon: '📊', title: 'Data Analysis Agent', desc: 'Processes spreadsheets, generates insights, creates visualisations, and answers data questions.', tags: ['Gemini', 'Spreadsheets', 'Charts'], modelId: 'gemini31-pro' },
  { icon: '✍️', title: 'Content Writer Agent', desc: 'Creates blog posts, social content, and marketing copy with consistent brand voice.', tags: ['Claude 3.7', 'Marketing', 'SEO'], modelId: 'claude-opus' },
];
