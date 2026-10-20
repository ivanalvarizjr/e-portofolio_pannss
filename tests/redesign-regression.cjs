const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'about.html', 'projek.html', 'contact.html'];
const common = fs.readFileSync(path.join(root, 'assets/css/common.css'), 'utf8');
const nav = fs.readFileSync(path.join(root, 'assets/js/navigation.js'), 'utf8');

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  assert.match(html, /assets\/css\/common\.css/, `${page} loads shared design styles`);
  assert.match(html, /assets\/js\/navigation\.js/, `${page} loads navigation behavior`);
}
for (const page of ['navbar.html', 'footer.html']) {
  assert.ok(fs.existsSync(path.join(root, 'components', page)), `components/${page} exists`);
}
assert.match(common, /@supports\s*\(\s*view-transition-name\s*:\s*root\s*\)/, 'same-origin transitions have browser support gating');
assert.match(common, /prefers-reduced-motion\s*:\s*reduce[\s\S]*?view-transition/, 'transitions respect reduced-motion');
assert.doesNotMatch(nav, /preventDefault\s*\(/, 'native navigation retains keyboard and modified-click behavior');
assert.match(common, /@view-transition\s*\{\s*navigation\s*:\s*auto\s*;/, 'same-origin cross-document navigation enables native transitions');
assert.match(common, /::view-transition-old\(root\)[\s\S]*?animation[\s\S]*?::view-transition-new\(root\)[\s\S]*?animation/, 'old and new pages have perceptible transition effects');
assert.match(common, /\.index-page-content/, 'home risograph surface is scoped');
assert.match(common, /\.about-intro-surface/, 'about risograph surface is scoped before skills');
assert.match(common, /\.subtle-riso-accent/, 'project/contact use restrained accent');
const scopedRule = (selector) => common.match(new RegExp(`(?:^|\\n)${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? '';
const homeSurface = scopedRule('\\.index-page-content');
const aboutSurface = scopedRule('\\.about-intro-surface');
assert.match(homeSurface, /background\s*:\s*var\(--color-background\)\s*;/, 'home surface keeps its area with the restrained base background');
assert.doesNotMatch(homeSurface, /radial-gradient|box-shadow/, 'home surface has no strong texture or inset frame');
assert.match(aboutSurface, /background\s*:\s*var\(--color-surface\)\s*;/, 'about intro keeps its area with the restrained base surface');
assert.match(aboutSurface, /box-shadow\s*:\s*6px\s+6px\s+0\s+#FF9100\s*;/i, 'about intro has the approved orange layered shadow');
assert.doesNotMatch(aboutSurface, /radial-gradient|linear-gradient|border-left/, 'about intro has no strong texture, gradient, or accent border');
assert.match(common, /pointer-events\s*:\s*none/, 'texture layers do not intercept input');
console.log('Portfolio design regression checks passed.');
