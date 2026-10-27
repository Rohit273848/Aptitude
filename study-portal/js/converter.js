/* ==========================================================================
   Interactive Unit Conversion Helper
   km/h <-> m/s with step-by-step arithmetic breakdown
   ========================================================================== */

(function () {
    'use strict';

    function initConverter() {
        const inputVal = document.getElementById('converter-val');
        const fromUnit = document.getElementById('converter-from-unit');
        const swapBtn = document.getElementById('converter-swap');
        const resultMath = document.getElementById('converter-result-math');
        const stepsMath = document.getElementById('converter-steps-math');
        const presetBtns = document.querySelectorAll('.preset-btn');

        if (!inputVal || !fromUnit || !resultMath || !stepsMath) return;

        function formatNumber(num) {
            return Number.isInteger(num) ? num.toString() : num.toFixed(3).replace(/\.?0+$/, '');
        }

        function calculate() {
            const val = parseFloat(inputVal.value);
            if (isNaN(val) || val < 0) {
                resultMath.innerHTML = '<span style="color:var(--danger)">Please enter a valid non-negative number.</span>';
                stepsMath.innerHTML = '';
                return;
            }

            const unit = fromUnit.value; // 'kmh' or 'ms'

            if (unit === 'kmh') {
                // km/h to m/s: multiply by 5/18
                const inMs = (val * 5) / 18;
                const formattedMs = formatNumber(inMs);
                const factor18 = val / 18;
                const isMultipleOf18 = val % 18 === 0;

                let stepDetail = '';
                if (isMultipleOf18) {
                    stepDetail = `$$${val}\\text{ km/h} \\times \\frac{5}{18} = (${val} \\div 18) \\times 5 = ${val / 18} \\times 5 = \\mathbf{${formattedMs}\\text{ m/s}}$$`;
                } else {
                    stepDetail = `$$${val}\\text{ km/h} \\times \\frac{5}{18} = \\frac{${val} \\times 5}{18} = \\frac{${val * 5}}{18} \\approx \\mathbf{${formattedMs}\\text{ m/s}}$$`;
                }

                resultMath.innerHTML = `$$\\Large \\mathbf{${val}\\text{ km/h} = ${formattedMs}\\text{ m/s}}$$`;
                stepsMath.innerHTML = stepDetail;
            } else {
                // m/s to km/h: multiply by 18/5
                const inKmh = (val * 18) / 5;
                const formattedKmh = formatNumber(inKmh);
                const isMultipleOf5 = val % 5 === 0;

                let stepDetail = '';
                if (isMultipleOf5) {
                    stepDetail = `$$${val}\\text{ m/s} \\times \\frac{18}{5} = (${val} \\div 5) \\times 18 = ${val / 5} \\times 18 = \\mathbf{${formattedKmh}\\text{ km/h}}$$`;
                } else {
                    stepDetail = `$$${val}\\text{ m/s} \\times \\frac{18}{5} = \\frac{${val} \\times 18}{5} = \\frac{${val * 18}}{5} = \\mathbf{${formattedKmh}\\text{ km/h}}$$`;
                }

                resultMath.innerHTML = `$$\\Large \\mathbf{${val}\\text{ m/s} = ${formattedKmh}\\text{ km/h}}$$`;
                stepsMath.innerHTML = stepDetail;
            }

            // Render KaTeX for the dynamic output
            if (window.renderMathInElement) {
                window.renderMathInElement(resultMath, { delimiters: [{ left: "$$", right: "$$", display: true }] });
                window.renderMathInElement(stepsMath, { delimiters: [{ left: "$$", right: "$$", display: true }] });
            }
        }

        inputVal.addEventListener('input', calculate);
        fromUnit.addEventListener('change', calculate);

        if (swapBtn) {
            swapBtn.addEventListener('click', function () {
                fromUnit.value = fromUnit.value === 'kmh' ? 'ms' : 'kmh';
                calculate();
            });
        }

        presetBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const val = this.getAttribute('data-val');
                const unit = this.getAttribute('data-unit') || 'kmh';
                inputVal.value = val;
                fromUnit.value = unit;
                calculate();
            });
        });

        // Run initial calculation
        calculate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConverter);
    } else {
        initConverter();
    }
})();
