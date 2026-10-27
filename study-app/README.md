# TCS NQT Aptitude Learning Application

An interactive, responsive aptitude study application built with **React**, **TypeScript**, **Vite**, and **KaTeX**, specifically structured around the official **TCS National Qualifier Test (NQT)** syllabus.

---

## 🎨 Visual Identity & Color Palette

Designed for calm, focused study with high legibility and zero decorative distraction:

- **Warm ivory:** `#E7DEC8` — page backgrounds and light surfaces
- **Sand:** `#CBAF87` — secondary highlights and supporting elements
- **Slate gray:** `#7E8A97` — borders, muted text, and secondary controls
- **Deep navy:** `#30475E` — primary text, navigation, and strong accents

---

## 📋 Syllabus Coverage & Topic Availability

The app supports the full hierarchical TCS NQT syllabus structure:

### 1. Foundation Section
- **Numerical Ability (Easy–Medium)**
  - *Number System*: Number System, LCM & HCF; Divisibility; Numbers & Decimal Fractions
  - *Mensuration*: Geometry; Area, Shapes & Perimeter
  - *Arithmetic Ability*:
    - **Percentages** (**Notes Available &bull; Ready to Study**) — 27 formulas, worked examples, fraction conversion table, and mental math shortcuts.
    - **Speed, Time and Distance** (**Notes Available &bull; Ready to Study**) — 12 modules, 16 formulas, relative speed, differential shortcut, interactive unit converter, and a 10-question placement quiz.
    - Allegations & Mixtures; Ratios & Proportion; Work & Time; Profit & Loss; Averages; Equations; Ages; Series & Progressions (**Notes Needed**)
  - *Elementary Statistics*: Mean, Median, Mode, Variance, and Standard Deviation
  - *Data Interpretation*: Pie Charts; Tabular DI; Graphical DI
  - *Simplifications & Approximations*: Simplifications and Calculations
  - *Other topics (Marked: "Not asked in past two years")*: Probability; Clocks & Calendar
- **Reasoning Ability (Medium)**
  - Identifying Word, Numeric Patterns, Problem Solving, Figural Analysis, Decision Making, Propositional Reasoning, Visual Reasoning
- **Verbal Ability (Easy–Medium)**
  - English Grammar, Reading Comprehension

### 2. Advance Section
- **Advanced Quantitative Ability (Hard)**: 15 topics (Averages, Profit Loss, Permutation & Combination, etc.)
- **Advanced Reasoning Ability (Hard)**: 10 topics (Data Arrangements, Venn Diagrams, Syllogisms, etc.)
- **Advanced Coding Ability (Hard)**: Shows an intentional empty state awaiting coding notes.

---

## 🚀 How to Run the App

### Development Server
From the root workspace directory, navigate to `study-app`:
```powershell
cd "d:\TCS NQT Resources\study-app"
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173).

### Production Preview
```powershell
cd "d:\TCS NQT Resources\study-app"
npm run build
npm run preview
```

Or double-click `launch-app.bat` in the workspace root to launch the development server automatically.

---

## 📝 How to Add Future Topic Notes

The application uses a decoupled content architecture:

1. **Add your Markdown file** in `Aptitude/Numarical/<TopicName>.md` (or `Aptitude/Reasoning/`).
2. **Open `src/data/syllabusData.ts`**:
   - Find the topic ID (e.g. `'work-and-time'`).
   - Change `status: 'needed'` to `status: 'ready'`.
   - Add `noteFile: 'Numarical/WorkAndTime.md'`.
3. The app automatically updates the sidebar status to **Ready to study** and renders the study page.
