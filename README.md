# Code Preview to Image

> **Create beautiful code screenshots with standard macOS window aesthetics, loba-style glassmorphism blur effects, and flawless Shiki syntax highlighting.**

This application allows you to edit code dynamically, apply syntax highlighting in real-time, customize spacing and background images (including uploading your own), adjust terminal glass opacity dynamically, and export high-resolution PNG renders with a single click.

🔗 **Live Preview:** [https://code-preview-2-image.vercel.app/](https://code-preview-2-image.vercel.app/)

---

## Feature Showcases

### 1. Fully Customizable (Python, Custom Background, Theme)
Select from a wide array of programming languages and professional Shiki themes. The terminal window automatically shrinks or grows to perfectly fit your code length, ensuring no artificial stretching.
![Python with Custom BG](docs/language-theme-python-example.png)

### 2. Smooth Translucent Opacity (Glassmorphism)
Control the background transparency of your terminal window. No matter what opacity you choose (even down to 0.4), a rich macOS-style glassmorphism blur is preserved, while the code text and title bar controls remain 100% sharp and legible.

| Opacity: 40% (opacity-0.4) | Opacity: 100% (opacity-1.0) |
| :---: | :---: |
| ![Opacity 0.4](docs/opacity-0.4.png) | ![Opacity 1.0](docs/opacity-1.png) |

---

## Key Features

- **macOS Window Aesthetic:** True macOS title bar styling with red, yellow, and green control dots on the left, and centered "PiszeProgramy.pl" window title.
- **Instant Syntax Highlighting:** Embedded Shiki highlighter dynamically colors code based on selected language and theme (defaults to TypeScript + github-dark).
- **Fit-to-Content Sizing:** Both terminal window and background image auto-fit exactly to the code length and line width, creating tailored crops.
- **Dynamic Spacing (Padding):** Customize the background margin surrounding your terminal. On mobile viewports, spacing dynamically scales down to keep the window perfectly framed.
- **Upload Custom Backgrounds:** Click the Lucide Image icon to trigger a file selector and apply any local image as your backdrop instantly.
- **IDE-Like Indentation:** Pressing Tab inside the code editor inserts exactly 4 spaces instead of shifting browser focus.
- **Responsive Layout:** Adaptive fonts scale dynamically on smaller viewports using CSS clamp(), keeping code readable on mobile devices.
- **High-Quality PNG Export:** The Save button (styled with macOS blue) renders the entire container with lossless quality using html-to-image and downloadjs.

---

## Technology Stack & Dependencies

Built with zero bloat and standard modern libraries for unmatched speed and reliability:
- **Vite:** Next-generation frontend tooling and bundler.
- **CSS3 & HTML5:** Standard clean classes, no bulky layout libraries.
- **Shiki (NPM):** Direct local bundler integration for lightning-fast syntax highlighting.
- **html-to-image:** Captured element canvas-to-PNG renderer.
- **downloadjs:** Seamless file downloads in client environment.

---

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Build for production (compiled to dist/ directory):
   ```bash
   npm run build
   ```
