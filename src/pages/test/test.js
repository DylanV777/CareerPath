import { getQuestions } from "../../services/questionService.js";
import { submitTest } from "../../services/resultService.js";
import { isLoggedIn } from "../../utils/storage.js";
import { navigate } from "../../router/router.js";

let questions = [];
let currentIndex = 0;
let answers = [];

export function Test() {

    if (!isLoggedIn()) {

        navigate("/login");

        return `<p>Redirecting to login...</p>`;

    }

    return `
        <section class="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
            <div class="w-full max-w-5xl space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
                <div class="rounded-[28px] border border-slate-200 bg-slate-100 px-8 py-7">
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p class="text-sm uppercase tracking-[0.35em] text-slate-400">Test vocacional</p>
                            <h1 class="mt-2 text-3xl font-semibold text-slate-900">Descubre tu perfil profesional</h1>
                        </div>
                        <div class="inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                            <span class="h-2 w-2 rounded-full bg-slate-900"></span>
                            <span>Progreso:</span>
                            <span id="progressLabel">0/20</span>
                        </div>
                    </div>
                    <p class="mt-4 max-w-2xl text-slate-500">Responde cada pregunta con claridad; tu perfil se construirá con base en tus intereses y habilidades.</p>
                </div>

                <div class="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                    <div class="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
                        <div class="h-3 rounded-full bg-slate-200 overflow-hidden">
                            <div id="progressFill" class="h-full w-0 bg-slate-900 transition-all duration-300"></div>
                        </div>
                    </div>

                    <div id="questionArea" class="min-h-[220px] rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                        <p class="text-slate-500">Cargando preguntas...</p>
                    </div>

                    <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <button id="prevBtn" class="rounded-[24px] border border-slate-300 bg-white px-6 py-3 text-slate-700 font-semibold transition hover:bg-slate-100" disabled>
                            Atrás
                        </button>
                        <div class="flex flex-col gap-3 sm:flex-row">
                            <button id="nextBtn" class="rounded-[24px] bg-slate-900 px-6 py-3 text-white font-semibold transition hover:bg-slate-800" disabled>
                                Siguiente
                            </button>
                            <button id="finishBtn" class="rounded-[24px] bg-slate-100 px-6 py-3 text-slate-700 font-semibold transition hover:bg-slate-200" style="display:none" disabled>
                                Finalizar
                            </button>
                        </div>
                    </div>

                    <p id="testError" class="mt-4 min-h-[1.25rem] text-sm text-red-600"></p>
                </div>
            </div>
        </section>
    `;

}

export async function testEvents() {

    if (!isLoggedIn()) {
        return;
    }

    currentIndex = 0;
    answers = [];

    const response = await getQuestions();

    const questionArea = document.getElementById("questionArea");
    const testError = document.getElementById("testError");

    if (!response.success) {

        testError.textContent = "Could not load the questions. Please try again.";

        return;

    }

    questions = response.questions || [];
    answers = new Array(questions.length).fill(null);

    renderQuestion();

    document.getElementById("nextBtn").addEventListener("click", () => {

        if (currentIndex < questions.length - 1) {

            currentIndex++;
            renderQuestion();

        }

    });

    document.getElementById("prevBtn").addEventListener("click", () => {

        if (currentIndex > 0) {

            currentIndex--;
            renderQuestion();

        }

    });

    document.getElementById("finishBtn").addEventListener("click", async () => {

        const finishBtn = document.getElementById("finishBtn");

        finishBtn.disabled = true;

        const payload = questions.map((question, index) => ({
            questionId: question.id,
            optionId: answers[index]
        }));

        const result = await submitTest(payload);

        if (result.success) {

            navigate("/results");

        } else {

            testError.textContent = result.message || "Error submitting the test.";
            finishBtn.disabled = false;

        }

    });

}

function renderQuestion() {

    const question = questions[currentIndex];

    const questionArea = document.getElementById("questionArea");
    const progressFill = document.getElementById("progressFill");
    const progressLabel = document.getElementById("progressLabel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const finishBtn = document.getElementById("finishBtn");

    if (!question) {
        return;
    }

    questionArea.innerHTML = `
        <h2 class="text-2xl font-semibold text-slate-900 mb-6">${question.text}</h2>

        <div class="grid gap-4">
            ${question.options.map(option => `
                <label class="group block cursor-pointer rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 transition hover:border-sky-400 hover:bg-sky-50">
                    <input
                        type="radio"
                        name="option"
                        value="${option.id}"
                        ${answers[currentIndex] === option.id ? "checked" : ""}
                        class="mr-3 h-5 w-5 text-sky-600 accent-sky-600"
                    >
                    <span class="text-base leading-6 group-hover:text-slate-900">${option.text}</span>
                </label>
            `).join("")}
        </div>
    `;

    const answeredCount = answers.filter(value => value !== null).length;

    progressFill.style.width = `${(answeredCount / questions.length) * 100}%`;
    progressLabel.textContent = `${answeredCount}/${questions.length}`;

    prevBtn.disabled = currentIndex === 0;

    const isLast = currentIndex === questions.length - 1;

    nextBtn.style.display = isLast ? "none" : "inline-block";
    finishBtn.style.display = isLast ? "inline-block" : "none";

    updateNavButtons();

    const optionInputs = questionArea.querySelectorAll("input[name='option']");

    optionInputs.forEach(input => {

        input.addEventListener("change", (event) => {

            answers[currentIndex] = event.target.value;

            const answeredCountNow = answers.filter(value => value !== null).length;

            progressFill.style.width = `${(answeredCountNow / questions.length) * 100}%`;
            progressLabel.textContent = `${answeredCountNow}/${questions.length}`;

            updateNavButtons();

        });

    });

}

function updateNavButtons() {

    const nextBtn = document.getElementById("nextBtn");
    const finishBtn = document.getElementById("finishBtn");

    const hasAnswer = answers[currentIndex] !== null;

    nextBtn.disabled = !hasAnswer;

    const allAnswered = answers.every(value => value !== null);

    finishBtn.disabled = !allAnswered;

}
