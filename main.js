import { createHighlighter } from 'shiki';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import defaultBg from './default-bg.jpg';

const codeEl = document.getElementById('code');
const highlightEl = document.getElementById('code-highlight');
const languageEl = document.querySelector('select[name="language"]');
const themeEl = document.querySelector('select[name="theme"]');
const bgUpload = document.querySelector('input[name="background"]');
const paddingEl = document.querySelector('input[name="spacing"]');
const opacityEl = document.querySelector('.opacity-control input[type="range"]');
const terminalWindow = document.querySelector('.terminal-window');
const exportBtn = document.querySelector('button[title="Save"]');
const bgPreview = document.querySelector('.editor-background');
const opacityLabelText = document.querySelector('.opacity-control .control-label-text');
const uploadBgBtn = document.getElementById('upload-bg-btn');

let highlighter;
let currentLanguage = 'typescript';
let currentTheme = 'github-dark';
let bgImage = defaultBg;

languageEl.value = currentLanguage;
themeEl.value = currentTheme;
opacityEl.value = '0.5';
terminalWindow.style.setProperty('--terminal-opacity', opacityEl.value);

async function ensureHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [currentTheme],
      langs: [currentLanguage],
    });
  }
}

function updateBackground() {
  bgPreview.style.backgroundImage = bgImage ? `url(${bgImage})` : 'none';
}

async function updatePreview() {
  try {
    await ensureHighlighter();
    highlightEl.innerHTML = highlighter.codeToHtml(codeEl.value, { lang: currentLanguage, theme: currentTheme });
  } catch (error) {
    console.error('Error updating preview:', error);
    highlightEl.textContent = codeEl.value;
  }
}

function updateSpacing() {
  const spacing = Number.parseInt(paddingEl.value, 10) || 20;
  bgPreview.style.setProperty('--bg-spacing', `${spacing}px`);
}

function updateOpacity() {
  terminalWindow.style.setProperty('--terminal-opacity', opacityEl.value);
  if (opacityLabelText) {
    opacityLabelText.textContent = `Opacity (${opacityEl.value})`;
  }
}

codeEl.addEventListener('input', updatePreview);
codeEl.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = codeEl.selectionStart;
    const end = codeEl.selectionEnd;
    const value = codeEl.value;
    codeEl.value = value.substring(0, start) + '    ' + value.substring(end);
    codeEl.selectionStart = codeEl.selectionEnd = start + 4;
    updatePreview();
  }
});
languageEl.addEventListener('change', async () => {
  currentLanguage = languageEl.value;
  highlighter = null;
  await updatePreview();
});

themeEl.addEventListener('change', async () => {
  currentTheme = themeEl.value;
  highlighter = null;
  await updatePreview();
});

bgUpload.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  bgImage = URL.createObjectURL(file);
  updateBackground();
});

paddingEl.addEventListener('input', updateSpacing);
opacityEl.addEventListener('input', () => {
    updateOpacity();
    terminalWindow.style.setProperty('--terminal-opacity', opacityEl.value);
});

if (uploadBgBtn) {
  uploadBgBtn.addEventListener('click', () => bgUpload.click());
}

exportBtn.addEventListener('click', async () => {
  const originalContent = exportBtn.innerHTML;
  try {
    exportBtn.disabled = true;
    exportBtn.innerHTML = '<div class="spinner"></div>';

    await new Promise((resolve) => setTimeout(resolve, 50));

    const dataUrl = await htmlToImage.toPng(bgPreview, { backgroundColor: 'transparent' });
    download(dataUrl, 'code-snapshot.png', 'image/png');
  } catch (error) {
    console.error('Export failed:', error);
  } finally {
    exportBtn.innerHTML = originalContent;
    exportBtn.disabled = false;
  }
});

updateBackground();
updateSpacing();
updateOpacity();
updatePreview();
