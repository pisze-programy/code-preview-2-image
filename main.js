import { createHighlighter } from 'shiki';
import * as htmlToImage from 'html-to-image';

let highlighter;
const codeEl = document.getElementById('code');
const themeEl = document.querySelector('select[name="theme"]');
const bgUpload = document.querySelector('input[name="background"]');
const blurEl = document.querySelector('input[name="blur"]');
const paddingEl = document.querySelector('input[name="spacing"]');
const canvas = document.getElementById('canvas');
const exportBtn = document.querySelector('button[title="Save"]');

let currentTheme = 'github-dark';
let bgImage = null;

fetch('default-bg.jpg')
  .then(response => {
    if (response.ok) {
      return response.blob();
    }
    return null;
  })
  .then(blob => {
    if (blob) {
      bgImage = URL.createObjectURL(blob);
      blurEl.value = 5;
      paddingEl.value = 50;
      updatePreview();
    }
  });

function populateThemes() {}

async function updatePreview() {
  try {
    if (!highlighter) {
      highlighter = await createHighlighter({
        theme: currentTheme,
        langs: ['javascript']
      });
    }
    document.getElementById('preview').replaceChildren(canvas);

    const highlighted = highlighter.codeToHtml(codeEl.value, { lang: 'javascript' });

    const tempContainer = document.createElement('div');
    tempContainer.style.padding = `${getPaddingValue()}px`;
    tempContainer.style.backgroundImage = bgImage ? `url(${bgImage})` : 'none';
    tempContainer.style.backgroundSize = 'cover';
    tempContainer.style.backgroundPosition = 'center';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = highlighted;
    tempDiv.style.filter = `blur(${blurEl.value}px)`;

    tempContainer.appendChild(tempDiv);

    await htmlToImage.toCanvas(canvas, { backgroundColor: 'transparent' });
  } catch (e) {
    console.error('Error updating preview:', e);
    updatePreviewFallback();
  }
}

function getPaddingValue() {
  return parseInt(paddingEl.value) || 20;
}

function updatePreviewFallback() {
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '14px monospace';
  ctx.fillText(codeEl.value.substring(0, 100) + (codeEl.value.length > 100 ? '...' : ''), 20, 30);
}

codeEl.addEventListener('input', updatePreview);
themeEl.addEventListener('change', () => {
  currentTheme = themeEl.value;
  updatePreview();
});

bgUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    bgImage = URL.createObjectURL(file);
    updatePreview();
  }
});
[blurEl, paddingEl].forEach(el => el.addEventListener('input', updatePreview));

exportBtn.addEventListener('click', async () => {
  try {
    const dataUrl = await htmlToImage.toPng(canvas);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'code-snapshot.png';
    link.click();
  } catch (e) {
    console.error('Export failed:', e);
  }
});

populateThemes();
updatePreview();
