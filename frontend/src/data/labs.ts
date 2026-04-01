export interface Lab {
  id: string;
  icon: string;
  name: string;
  count: number;
  color: string;
}

export const LABS: Lab[] = [
  { id: 'OpenAI', icon: '🧠', name: 'OpenAI', count: 3, color: '#EEF2FD' },
  { id: 'Anthropic', icon: '🤖', name: 'Anthropic', count: 3, color: '#FDF1EB' },
  { id: 'Google DeepMind', icon: '🔬', name: 'Google', count: 4, color: '#E8F5E9' },
  { id: 'xAI', icon: '𝕏', name: 'xAI', count: 2, color: '#F0F0F0' },
  { id: 'DeepSeek', icon: '🔵', name: 'DeepSeek', count: 3, color: '#E8F4FD' },
  { id: 'Meta', icon: '🦙', name: 'Meta', count: 2, color: '#FFF3E0' },
  { id: 'Alibaba', icon: '🀄', name: 'Alibaba', count: 2, color: '#FFF9E8' },
  { id: 'Mistral', icon: '🌀', name: 'Mistral', count: 2, color: '#EDF0FF' },
  { id: 'NVIDIA', icon: '🟢', name: 'NVIDIA', count: 2, color: '#E8F8F0' },
  { id: 'Moonshot', icon: '🌙', name: 'Moonshot', count: 2, color: '#EEF0FF' },
  { id: 'HuggingFace', icon: '🤗', name: 'HuggingFace', count: 2, color: '#FFF7E8' },
  { id: 'BigScience', icon: '🌍', name: 'BigScience', count: 2, color: '#FFF0F8' },
];
