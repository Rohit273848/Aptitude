/* ==========================================================================
   Placement Aptitude Quiz Module
   10 High-Yield TCS NQT / Campus Placement Questions with Step-by-Step KaTeX Solutions
   ========================================================================== */

(function () {
    'use strict';

    const quizQuestions = [
        {
            id: 1,
            topic: "Fundamentals & Unit Conversion",
            question: "A high-speed train travels at $90\\text{ km/h}$. What is its speed in $\\text{m/s}$?",
            options: [
                "20 m/s",
                "25 m/s",
                "30 m/s",
                "32.4 m/s"
            ],
            correctIndex: 1,
            explanation: `**Formula:** $\\text{Speed in m/s} = \\text{Speed in km/h} \\times \\frac{5}{18}$
$$\\Large 90 \\times \\frac{5}{18} = (90 \\div 18) \\times 5 = 5 \\times 5 = \\mathbf{25\\text{ m/s}}$$`
        },
        {
            id: 2,
            topic: "Trains Crossing Extended Objects",
            question: "A train $150\\text{ m}$ long is travelling at $54\\text{ km/h}$. How many seconds will it take to completely cross a platform $300\\text{ m}$ long?",
            options: [
                "25 seconds",
                "30 seconds",
                "35 seconds",
                "20 seconds"
            ],
            correctIndex: 1,
            explanation: `**Step 1:** Total distance $D = L_{\\text{train}} + L_{\\text{platform}} = 150 + 300 = 450\\text{ m}$.
**Step 2:** Convert speed to m/s:
$$S = 54 \\times \\frac{5}{18} = 3 \\times 5 = 15\\text{ m/s}$$
**Step 3:** Calculate time:
$$T = \\frac{D}{S} = \\frac{450}{15} = \\mathbf{30\\text{ seconds}}$$`
        },
        {
            id: 3,
            topic: "Trains Crossing Point Objects",
            question: "A train $240\\text{ m}$ long passes a standing telegraph pole in $12\\text{ s}$. What is the speed of the train in $\\text{km/h}$?",
            options: [
                "60 km/h",
                "72 km/h",
                "64 km/h",
                "80 km/h"
            ],
            correctIndex: 1,
            explanation: `**Key Concept:** A pole has negligible length, so distance $D = L_{\\text{train}} = 240\\text{ m}$.
$$S = \\frac{D}{T} = \\frac{240\\text{ m}}{12\\text{ s}} = 20\\text{ m/s}$$
Convert to km/h:
$$S = 20 \\times \\frac{18}{5} = 4 \\times 18 = \\mathbf{72\\text{ km/h}}$$`
        },
        {
            id: 4,
            topic: "Relative Speed (Opposite Directions)",
            question: "Two trains of lengths $120\\text{ m}$ and $80\\text{ m}$ run in opposite directions on parallel tracks at $42\\text{ km/h}$ and $30\\text{ km/h}$. In how many seconds will they clear each other?",
            options: [
                "10 seconds",
                "12 seconds",
                "15 seconds",
                "8 seconds"
            ],
            correctIndex: 0,
            explanation: `**Step 1:** Total distance $D = L_1 + L_2 = 120 + 80 = 200\\text{ m}$.
**Step 2:** In opposite directions, speeds add:
$$S_r = 42 + 30 = 72\\text{ km/h} = 72 \\times \\frac{5}{18} = 20\\text{ m/s}$$
**Step 3:** Crossing time:
$$T = \\frac{D}{S_r} = \\frac{200}{20} = \\mathbf{10\\text{ seconds}}$$`
        },
        {
            id: 5,
            topic: "Chasing Problems (Thief & Policeman)",
            question: "A policeman spots a thief $150\\text{ m}$ ahead. The policeman runs at $11\\text{ km/h}$ while the thief runs at $8\\text{ km/h}$. How far (in metres) will the thief run before being caught?",
            options: [
                "350 m",
                "400 m",
                "450 m",
                "550 m"
            ],
            correctIndex: 1,
            explanation: `**Method 1 (Relative Speed):**
$$S_r = 11 - 8 = 3\\text{ km/h} = 3 \\times \\frac{5}{18} = \\frac{5}{6}\\text{ m/s}$$
Catch time:
$$T = \\frac{\\text{Gap}}{S_r} = \\frac{150}{5/6} = 150 \\times \\frac{6}{5} = 180\\text{ seconds}$$
Thief's distance:
$$D_{\\text{thief}} = S_{\\text{thief}} \\times T = \\left(8 \\times \\frac{5}{18}\\right) \\times 180 = \\frac{20}{9} \\times 180 = \\mathbf{400\\text{ m}}$$
**Method 2 (Ratio Shortcut):**
Since time is constant, Distance $\\propto$ Speed $\\implies \\frac{D_{\\text{police}}}{D_{\\text{thief}}} = \\frac{11}{8}$.
Difference = $11 - 8 = 3\\text{ units} = 150\\text{ m} \\implies 1\\text{ unit} = 50\\text{ m}$.
Thief's distance = $8 \\times 50 = \\mathbf{400\\text{ m}}$.`
        },
        {
            id: 6,
            topic: "Carriage Overtaking & Visibility",
            question: "A man walks at $4\\text{ km/h}$. An automobile overtakes him and remains visible up to a distance of $200\\text{ m}$ for $3\\text{ minutes}$. Find the speed of the automobile.",
            options: [
                "6 km/h",
                "7 km/h",
                "8 km/h",
                "9 km/h"
            ],
            correctIndex: 2,
            explanation: `Time = $3\\text{ minutes} = 180\\text{ seconds}$.
Gap created in that time = $200\\text{ m}$.
Relative speed:
$$S_r = \\frac{200}{180} = \\frac{10}{9}\\text{ m/s}$$
Convert to km/h:
$$S_r = \\frac{10}{9} \\times \\frac{18}{5} = 2 \\times 2 = 4\\text{ km/h}$$
Since both move in the same direction:
$$S_{\\text{auto}} - S_{\\text{man}} = S_r \\implies S_{\\text{auto}} - 4 = 4 \\implies S_{\\text{auto}} = \\mathbf{8\\text{ km/h}}$$`
        },
        {
            id: 7,
            topic: "Logical Differential Shortcut",
            question: "A train crosses a pole in $12\\text{ s}$ and a platform $170\\text{ m}$ long in $22\\text{ s}$. What is the speed of the train in km/h?",
            options: [
                "54 km/h",
                "61.2 km/h",
                "72 km/h",
                "45 km/h"
            ],
            correctIndex: 1,
            explanation: `**Differential Shortcut:**
$$\\text{Speed} = \\frac{\\text{Difference in object lengths}}{\\text{Difference in crossing times}}$$
$$\\text{Extra distance} = 170\\text{ m} - 0\\text{ m} = 170\\text{ m}$$
$$\\text{Extra time} = 22 - 12 = 10\\text{ seconds}$$
$$S = \\frac{170}{10} = 17\\text{ m/s}$$
Convert to km/h:
$$S = 17 \\times \\frac{18}{5} = \\frac{306}{5} = \\mathbf{61.2\\text{ km/h}}$$`
        },
        {
            id: 8,
            topic: "Ratio & Inverse Proportionality",
            question: "Walking at $\\frac{5}{7}$ of his usual speed, a student arrives $20\\text{ minutes}$ late for his placement exam. Find his usual travel time.",
            options: [
                "45 minutes",
                "50 minutes",
                "60 minutes",
                "70 minutes"
            ],
            correctIndex: 1,
            explanation: `For fixed distance, speed and time are inversely proportional ($S \\propto \\frac{1}{T}$).
$$\\text{Speed ratio (usual : new)} = 7 : 5$$
$$\\text{Time ratio (usual : new)} = 5 : 7$$
Difference in ratio units = $7 - 5 = 2\\text{ units}$.
Given 2 units = $20\\text{ minutes} \\implies 1\\text{ unit} = 10\\text{ minutes}$.
Usual time = $5 \\times 10 = \\mathbf{50\\text{ minutes}}$.`
        },
        {
            id: 9,
            topic: "Average Speed Trap",
            question: "A car drives from Town A to Town B at $60\\text{ km/h}$ and returns along the same route at $40\\text{ km/h}$. What is the average speed for the entire round trip?",
            options: [
                "50 km/h",
                "48 km/h",
                "52 km/h",
                "46.5 km/h"
            ],
            correctIndex: 1,
            explanation: `**Beware the common trap!** The answer is NOT $\\frac{60 + 40}{2} = 50\\text{ km/h}$ because the car spends more time driving at the slower speed.
For equal distance trips, use the Harmonic Mean:
$$S_{\\text{avg}} = \\frac{2xy}{x + y} = \\frac{2 \\times 60 \\times 40}{60 + 40} = \\frac{4800}{100} = \\mathbf{48\\text{ km/h}}$$`
        },
        {
            id: 10,
            topic: "Boats and Streams",
            question: "A motorboat covers $24\\text{ km}$ downstream in $2\\text{ hours}$ and $18\\text{ km}$ upstream in $3\\text{ hours}$. Find the speed of the current/stream.",
            options: [
                "2 km/h",
                "3 km/h",
                "4 km/h",
                "6 km/h"
            ],
            correctIndex: 1,
            explanation: `**Downstream speed ($D$):**
$$D = \\frac{24}{2} = 12\\text{ km/h}$$
**Upstream speed ($U$):**
$$U = \\frac{18}{3} = 6\\text{ km/h}$$
**Stream speed ($W$):**
$$W = \\frac{D - U}{2} = \\frac{12 - 6}{2} = \\frac{6}{2} = \\mathbf{3\\text{ km/h}}$$
*(Note: Boat speed in still water $B = \\frac{12 + 6}{2} = 9\\text{ km/h}$)*`
        }
    ];

    let currentQuestionIndex = 0;
    let userScore = 0;
    let userAnswers = [];

    function initQuiz() {
        const quizCard = document.getElementById('quiz-active-card');
        const resultsCard = document.getElementById('quiz-results-card');
        const questionText = document.getElementById('quiz-question-text');
        const optionsContainer = document.getElementById('quiz-options-container');
        const explanationBox = document.getElementById('quiz-explanation-box');
        const explanationContent = document.getElementById('quiz-explanation-content');
        const nextBtn = document.getElementById('quiz-next-btn');
        const progressFill = document.getElementById('quiz-progress-fill');
        const qCountBadge = document.getElementById('quiz-question-count');
        const topicBadge = document.getElementById('quiz-topic-badge');
        const restartBtn = document.getElementById('quiz-restart-btn');

        if (!quizCard || !questionText || !optionsContainer) return;

        function renderCurrentQuestion() {
            const q = quizQuestions[currentQuestionIndex];
            if (!q) return;

            qCountBadge.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
            topicBadge.textContent = q.topic;
            progressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

            questionText.innerHTML = q.question;
            explanationBox.classList.remove('is-visible');
            nextBtn.classList.remove('is-visible');
            optionsContainer.innerHTML = '';

            const letters = ['A', 'B', 'C', 'D'];
            q.options.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'quiz-option-btn';
                btn.setAttribute('data-idx', idx);
                btn.innerHTML = `
          <span class="quiz-option-letter">${letters[idx]}</span>
          <span class="quiz-option-label">${optText}</span>
        `;
                btn.addEventListener('click', () => handleOptionSelect(idx));
                optionsContainer.appendChild(btn);
            });

            // Render math
            if (window.renderMathInElement) {
                window.renderMathInElement(questionText, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false }
                    ]
                });
            }
        }

        function handleOptionSelect(selectedIndex) {
            const q = quizQuestions[currentQuestionIndex];
            const buttons = optionsContainer.querySelectorAll('.quiz-option-btn');

            // Disable all options
            buttons.forEach(b => (b.disabled = true));

            const isCorrect = selectedIndex === q.correctIndex;
            userAnswers[currentQuestionIndex] = {
                selected: selectedIndex,
                isCorrect: isCorrect
            };

            if (isCorrect) {
                userScore++;
                buttons[selectedIndex].classList.add('correct');
            } else {
                buttons[selectedIndex].classList.add('incorrect');
                buttons[q.correctIndex].classList.add('correct');
            }

            // Show explanation
            explanationContent.innerHTML = q.explanation;
            explanationBox.classList.add('is-visible');
            if (window.renderMathInElement) {
                window.renderMathInElement(explanationContent, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false }
                    ]
                });
            }

            nextBtn.classList.add('is-visible');
            if (currentQuestionIndex === quizQuestions.length - 1) {
                nextBtn.innerHTML = 'View Full Results 📊';
            } else {
                nextBtn.innerHTML = 'Next Question →';
            }
        }

        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                renderCurrentQuestion();
            } else {
                showResults();
            }
        });

        function showResults() {
            quizCard.style.display = 'none';
            resultsCard.classList.add('is-visible');

            const scoreNum = document.getElementById('quiz-score-number');
            const verdictTitle = document.getElementById('quiz-verdict-title');
            const verdictDesc = document.getElementById('quiz-verdict-desc');

            scoreNum.textContent = `${userScore}`;

            const pct = (userScore / quizQuestions.length) * 100;
            if (pct >= 90) {
                verdictTitle.textContent = "Outstanding! TCS NQT Master 🏆";
                verdictTitle.style.color = "var(--success)";
                verdictDesc.textContent = "You solved nearly every problem with top-tier speed and precision. You are completely ready for placement aptitude rounds!";
            } else if (pct >= 70) {
                verdictTitle.textContent = "Great Job! Placement Ready 🚀";
                verdictTitle.style.color = "var(--primary)";
                verdictDesc.textContent = "Solid conceptual foundation! Revisit the differential method and average speed trap to secure a 100% score.";
            } else if (pct >= 50) {
                verdictTitle.textContent = "Good Effort! Revision Recommended 📚";
                verdictTitle.style.color = "var(--warning)";
                verdictDesc.textContent = "You understand the basics, but review unit conversions, relative speed signs, and boat & stream formulas.";
            } else {
                verdictTitle.textContent = "Keep Practicing! Review the Notes 💡";
                verdictTitle.style.color = "var(--danger)";
                verdictDesc.textContent = "Work through each section's collapsible examples and memorize the 16 core master formulas before re-attempting.";
            }
        }

        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                currentQuestionIndex = 0;
                userScore = 0;
                userAnswers = [];
                resultsCard.classList.remove('is-visible');
                quizCard.style.display = 'block';
                renderCurrentQuestion();
            });
        }

        // Start on load
        renderCurrentQuestion();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuiz);
    } else {
        initQuiz();
    }
})();
