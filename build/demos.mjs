// demos.mjs — aperçus affichés en iframe (console client sur l'accueil, parcours
// voyageur sur la page Lien voyageur). Les maquettes chargent React (développement)
// et Babel depuis unpkg pour compiler le JSX dans le navigateur ; ici on précompile
// au build et on sert React en version production depuis notre domaine.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { transform } from 'esbuild';

const require = createRequire(import.meta.url);
const NOINDEX = '<meta name="robots" content="noindex, nofollow" />';

export async function buildDemos(ROOT, OUT) {
  const D = path.join(OUT, 'demo');
  fs.mkdirSync(path.join(D, 'vendor'), { recursive: true });

  // --- Console client ------------------------------------------------------
  const CW = path.join(ROOT, 'design/client-web');
  const src = fs.readFileSync(path.join(CW, 'Console client - barre en haut.html'), 'utf8');
  const files = [...src.matchAll(/<script type="text\/babel" src="([^"]+)"><\/script>/g)].map(m => m[1]);
  const inline = [...src.matchAll(/<script type="text\/babel">([\s\S]*?)<\/script>/g)].map(m => m[1]);
  // Même sémantique que Babel standalone : scripts classiques exécutés à la suite, portée globale partagée.
  const jsx = files.map(f => `/* ${f} */\n` + fs.readFileSync(path.join(CW, f), 'utf8')).join('\n;\n') + '\n;\n' + inline.join('\n;\n');
  const { code } = await transform(jsx, { loader: 'jsx', jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment', target: 'es2019', minify: true, legalComments: 'none' });
  fs.writeFileSync(path.join(D, 'console.js'), code);
  fs.copyFileSync(path.join(CW, 'ob.css'), path.join(D, 'ob.css'));
  for (const [pkg, file] of [['react', 'umd/react.production.min.js'], ['react-dom', 'umd/react-dom.production.min.js']]) {
    const dir = path.dirname(require.resolve(`${pkg}/package.json`)); // « umd/ » n'est pas exporté
    fs.copyFileSync(path.join(dir, file), path.join(D, 'vendor', path.basename(file)));
  }
  const html = src
    .replace(/<script src="https:\/\/unpkg\.com[^>]*><\/script>\s*/g, '')
    .replace(/<script type="text\/babel"[^>]*>[\s\S]*?<\/script>\s*/g, '')
    .replace('href="ob.css"', 'href="/demo/ob.css"')
    .replace('</head>', `${NOINDEX}\n</head>`)
    .replace('</body>', '<script src="/demo/vendor/react.production.min.js"></script>\n<script src="/demo/vendor/react-dom.production.min.js"></script>\n<script src="/demo/console.js"></script>\n</body>');
  fs.writeFileSync(path.join(D, 'console.html'), html);

  // --- Parcours voyageur ----------------------------------------------------
  const VY = path.join(ROOT, 'design/site/voyageur');
  const v = fs.readFileSync(path.join(VY, 'C - Immersif.html'), 'utf8')
    .replace('src="lv-data.js"', 'src="/demo/lv-data.js"')
    .replace('src="../image-slot.js"', 'src="/demo/image-slot.js"')
    .replaceAll("url('../fonts/", "url('/assets/fonts/")
    .replace('</head>', `${NOINDEX}\n</head>`);
  fs.writeFileSync(path.join(D, 'voyageur.html'), v);
  fs.copyFileSync(path.join(VY, 'lv-data.js'), path.join(D, 'lv-data.js'));
  fs.copyFileSync(path.join(ROOT, 'design/site/image-slot.js'), path.join(D, 'image-slot.js'));
}
