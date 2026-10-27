# Aptitude Study Portal: Time, Speed & Distance + Boats & Streams

An interactive, responsive study website built from comprehensive aptitude revision notes for placement preparation, including **TCS NQT**, **Cognizant**, **Infosys**, **Wipro**, and other campus quantitative aptitude exams.

---

## 🌟 Key Features

1. **Complete Content Preservation & Clean Typography**:
   - Preserves every single concept, definition, formula, example, explanation, and practice question from the original markdown notes across all 12 modules.
   - Beautiful, crisp mathematical rendering using **KaTeX** (`$ ... $` and `$$ ... $$`), ensuring zero raw LaTeX syntax.

2. **Interactive Collapsible Worked Examples**:
   - All 14 worked examples feature a clean question statement up-front with an accessible "Show Solution" toggle (`aria-expanded`, keyboard friendly).
   - Step-by-step mathematical reasoning with final answers highlighted in green success badges.
   - Global **"Expand All Solutions"** and **"Collapse All Solutions"** buttons in the top toolbar.

3. **Active Practice Checkpoints**:
   - Interactive checkpoint cards embedded across sections.
   - Includes "Show Hint" and "Reveal Solution" buttons for active retrieval practice.

4. **Live Unit Conversion Helper**:
   - Real-time two-way converter for $\text{km/h} \leftrightarrow \text{m/s}$.
   - Displays the **explicit step-by-step arithmetic breakdown** (e.g. $180 \times \frac{5}{18} = (180 \div 18) \times 5 = 50\text{ m/s}$).
   - Includes 9 one-click preset buttons for high-frequency aptitude speeds ($18$, $36$, $54$, $72$, $90$, $108$, $126$, $144$, $180\text{ km/h}$).

5. **Placement Aptitude Quiz Mode**:
   - 10 high-yield questions covering unit conversion, train crossings, relative speed directions, chasing problems, visibility/overtaking, logical differential shortcut, ratio lateness problems, average speed traps, and boats & streams.
   - Instant visual feedback on selection (green for correct, red for incorrect).
   - Comprehensive step-by-step mathematical explanation revealed after every question.
   - Dynamic score tracker, percentage calculation, performance assessment, and quiz retake option.

6. **Study Progress Tracker**:
   - Checkboxes on every section and in the Table of Contents.
   - Automatically saves completed modules to browser `localStorage` (persists across page reloads).
   - Visual progress bar and completion percentage indicator.
   - "Reset Progress" button.

7. **Fast Live Search**:
   - Real-time search across all formulas, concepts, and examples.
   - Press `/` or `Ctrl + K` anywhere on the page to jump directly to the search box.

8. **Master Formula Reference Area**:
   - Complete 16-formula quick reference sheet.
   - Interactive category filters: *All*, *Fundamentals*, *Trains*, *Relative Speed*, *Average Speed*, *Boats & Streams*.
   - One-click "Copy Formula" buttons for quick pasting into personal revision sheets.

9. **Premium Design & Accessibility**:
   - Calm, focused aesthetic designed for prolonged study sessions without cognitive fatigue.
   - Dark mode and Light mode with persistent user preference.
   - Fully responsive layout: desktop 2-column with sticky sidebar TOC, tablet, and mobile drawer.
   - Keyboard accessible, high contrast ratios, visible `:focus-visible` states, and `prefers-reduced-motion` compliance.
   - Print stylesheet optimized for printing offline formula and cheat sheets.

---

## 🔍 Corrections Made & Mathematical Audit

All formulas, constants, and solutions from the source notes were mathematically verified. The substantive clarifications include:

| # | Topic | Note / Clarification Made |
|---|---|---|
| 1 | **Symbol $D$ Disambiguation** | In Sections 1–9, $D$ denotes **Distance** ($D = S \times T$). In Section 10 (Boats & Streams), traditional literature reuses $D$ to mean **Downstream Speed** ($D = B + W$). To prevent confusion, cards explicitly label $D$ as distance vs downstream speed. |
| 2 | **Logical Differential Shortcut** | In Section 7, clarified that when one object is a standing person or pole, its physical length is $0\text{ m}$. Thus, $\text{Speed} = \frac{L_{\text{platform}} - 0}{T_{\text{platform}} - T_{\text{pole}}}$. |
| 3 | **Carriage Overtaking Problem** | In Section 4 (Example 2), clarified the physical setup: at $t = 0$, the carriage passes the walking pedestrian, and after $120\text{ s}$ the separation gap reaches the maximum sight distance of $100\text{ m}$, yielding relative speed $S_r = \frac{100}{120} = \frac{5}{6}\text{ m/s} = 3\text{ km/h}$. |
| 4 | **Universal Arithmetic Check** | Confirmed all 14 worked solutions are exact: $9\text{ s}$ platform crossing, $400\text{ m}$ equal length train, $200\text{ m}$ policeman pursuit, $6\text{ km/h}$ carriage, $27\text{ km/h}$ truck, $30\text{ min}$ meeting, $11\text{ s}$ opposite trains, $54\text{ km/h}$ differential shortcut, $36\text{ km}$ out-and-back meeting, $36\text{ min}$ lateness, $24\text{ km/h}$ & $96\text{ km/h}$ harmonic average speeds, $2.5\text{ km/h}$ stream speed, $3.625\text{ km/h}$ boat speed, and $200\text{ m}$ & $36\text{ km/h}$ for the two-bridges problem. |

---

## 🚀 How to Run the Website

The website is completely self-contained with **zero required build steps or complex runtime dependencies**.

### Option 1: Direct Browser Launch (Easiest)
Simply double-click `index.html` (or right-click $\to$ *Open with* $\to$ *Google Chrome* / *Microsoft Edge* / *Firefox*).

### Option 2: Using Python's Built-in HTTP Server
Open PowerShell or Command Prompt in this folder and run:
```powershell
python -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3: Using Node.js `npx serve`
```powershell
npx -y serve .
```

---

## 📁 File Structure

```text
Aptitude/study-portal/
├── index.html            # Main semantic HTML structure & notes
├── css/
│   └── styles.css        # Responsive styling, light/dark themes, formula cards
├── js/
│   ├── app.js            # KaTeX auto-render, theme toggle, TOC scrollspy, search, progress tracker
│   ├── converter.js      # Interactive km/h <-> m/s unit conversion helper
│   └── quiz.js           # Placement quiz engine with 10 questions & detailed solutions
├── vendor/
│   └── katex/            # Offline-ready KaTeX scripts & styles
└── README.md             # Documentation, feature guide & mathematical audit
```
