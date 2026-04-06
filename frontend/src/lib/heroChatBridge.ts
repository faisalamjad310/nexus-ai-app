let stashedFiles: File[] | null = null;
export function stashHeroChatFiles(files: File[]) {
  stashedFiles = files.length > 0 ? [...files] : null;
}
export function takeHeroChatFiles(): File[] {
  const out = stashedFiles ?? [];
  stashedFiles = null;
  return out;
}
