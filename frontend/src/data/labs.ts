export interface Lab {
  id: string;
  icon: string;
  name: string;
  count: number;
  color: string;
}
export const LABS: Lab[] = [
  { id: "OpenAI", icon: "🧠", name: "OpenAI", count: 3, color: "#F3F4F6" },
  {
    id: "Anthropic",
    icon: "🤖",
    name: "Anthropic",
    count: 3,
    color: "#EEEEEE",
  },
  {
    id: "Google DeepMind",
    icon: "🔬",
    name: "Google",
    count: 4,
    color: "#E4E4E4",
  },
  { id: "xAI", icon: "𝕏", name: "xAI", count: 2, color: "#F0F0F0" },
  { id: "DeepSeek", icon: "🔵", name: "DeepSeek", count: 3, color: "#E6E6E6" },
  { id: "Meta", icon: "🦙", name: "Meta", count: 2, color: "#EBE8E4" },
  { id: "Alibaba", icon: "🀄", name: "Alibaba", count: 2, color: "#E8E6E2" },
  { id: "Mistral", icon: "🌀", name: "Mistral", count: 2, color: "#E8E8E8" },
  { id: "NVIDIA", icon: "🟢", name: "NVIDIA", count: 2, color: "#E2E5E3" },
  { id: "Moonshot", icon: "🌙", name: "Moonshot", count: 2, color: "#E5E5E5" },
  {
    id: "HuggingFace",
    icon: "🤗",
    name: "HuggingFace",
    count: 2,
    color: "#E8E6E2",
  },
  {
    id: "BigScience",
    icon: "🌍",
    name: "BigScience",
    count: 2,
    color: "#EAE6E8",
  },
];
