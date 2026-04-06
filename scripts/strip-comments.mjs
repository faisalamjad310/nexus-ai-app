import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const require = createRequire(import.meta.url);
const ts = require(path.join(root, 'backend/node_modules/typescript'));

const roots = [path.join(root, 'frontend/src'), path.join(root, 'backend/src')];
const extraJs = [
  path.join(root, 'frontend/tailwind.config.js'),
  path.join(root, 'frontend/next.config.js'),
];

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name === 'dist') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function shouldProcess(filePath) {
  const norm = path.normalize(filePath);
  if (path.basename(norm) === 'next-env.d.ts') return false;
  if (norm.endsWith('.ts') || norm.endsWith('.tsx')) return true;
  if (norm.endsWith('.js') && extraJs.some((e) => path.normalize(e) === norm)) return true;
  return false;
}

function stripFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const kind = filePath.endsWith('.tsx')
    ? ts.ScriptKind.TSX
    : filePath.endsWith('.jsx')
      ? ts.ScriptKind.JSX
      : ts.ScriptKind.JS;
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, kind);
  const printer = ts.createPrinter({ removeComments: true, newLine: ts.NewLineKind.LineFeed });
  let out = printer.printFile(sourceFile);
  if (!out.endsWith('\n')) out += '\n';
  fs.writeFileSync(filePath, out, 'utf8');
}

const all = [...walk(roots[0]), ...walk(roots[1]), ...extraJs].filter(shouldProcess);
for (const f of all) {
  stripFile(f);
}
console.log(`Stripped comments in ${all.length} files.`);
