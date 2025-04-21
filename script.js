
const lessons = [
    {
        title: "Stance",
        description: "Your feet should be shoulder-width apart. Knees bent. Balance is key.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "What is the proper stance?",
            options: ["Feet together", "Feet wide apart", "One foot in front of the other", "Shoulder-width apart"],
            correct: 3
        }
    },
    {
        title: "Hand Placement",
        description: "Shooting hand under the ball, guide hand on the side.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "Where should your shooting hand go?",
            options: ["On top", "On the side", "Under the ball", "Behind the ball"],
            correct: 2
        }
    },
    {
        title: "Shooting Motion",
        description: "Push up, elbow under the ball, release at the top of your jump.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "When should you release the ball?",
            options: ["As you start your jump", "At the top of your jump", "Before you jump", "When landing"],
            correct: 1
        }
    },
    {
        title: "Follow Through",
        description: "Snap your wrist and hold the gooseneck position.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "What does follow-through look like?",
            options: ["Arms down", "Fists clenched", "Wrist snapped, arm extended", "No movement"],
            correct: 2
        }
    },
    {
        title: "Common Mistakes",
        description: "Avoid thumbing the ball, leaning back, or not jumping.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "Which of these is a common mistake?",
            options: ["Balanced stance", "Elbow under ball", "Not jumping", "Guide hand on side"],
            correct: 2
        }
    }
];

const finalQuizQuestions = [
    { q: "What’s the most important part of your stance?", a: 3, key: "Stance" },
    { q: "Where should your guide hand go?", a: 1, key: "Hand Placement" },
    { q: "When should you release the ball?", a: 1, key: "Shooting Motion" },
    { q: "What does a good follow-through look like?", a: 2, key: "Follow Through" },
    { q: "Which is NOT a common mistake?", a: 0, key: "Common Mistakes" }
];

let currentLesson = 0;
let userAnswers = [];

function startLesson() {
    document.getElementById("home").classList.add("d-none");
    document.getElementById("lesson").classList.remove("d-none");
    showLesson();
}

function showLesson() {
    const lesson = lessons[currentLesson];
    const progress = ((currentLesson + 1) / lessons.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("progress-text").innerText = `Lesson ${currentLesson + 1} of ${lessons.length}`;
    document.getElementById("lesson-title").innerText = lesson.title;
    document.getElementById("lesson-description").innerText = lesson.description;
    document.getElementById("video-placeholder").innerText = lesson.video;
    document.getElementById("quiz-question").innerText = lesson.quiz.question;
    const optionsHTML = lesson.quiz.options.map((opt, i) =>
        `<div><input type="radio" name="quiz" value="${i}"> ${opt}</div>`
    ).join("");
    document.getElementById("quiz-options").innerHTML = optionsHTML;
}

function nextLesson() {
    const selected = document.querySelector('input[name="quiz"]:checked');
    if (!selected) return alert("Please select an answer");
    userAnswers[currentLesson] = parseInt(selected.value);
    currentLesson++;
    if (currentLesson >= lessons.length) {
        document.getElementById("lesson").classList.add("d-none");
        document.getElementById("final-quiz").classList.remove("d-none");
        showFinalQuiz();
    } else {
        showLesson();
    }
}

function prevLesson() {
    if (currentLesson === 0) return;
    currentLesson--;
    showLesson();
}

function showFinalQuiz() {
    const quizContainer = document.getElementById("final-questions");
    quizContainer.innerHTML = finalQuizQuestions.map((q, i) => `
        <div class="mt-3">
            <p><strong>${q.q}</strong></p>
            ${["Balance", "On the side", "At the top", "Snap wrist", "Balanced stance"].map((opt, j) =>
                `<div><input type="radio" name="final-${i}" value="${j}"> ${opt}</div>`
            ).join("")}
        </div>
    `).join("");
}

function submitFinalQuiz() {
    const feedback = {};
    let score = 0;
    finalQuizQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="final-${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.a) {
            score++;
        } else {
            feedback[q.key] = true;
        }
    });

    document.getElementById("final-quiz").classList.add("d-none");
    document.getElementById("results").classList.remove("d-none");
    document.getElementById("final-score").innerText = `You got ${score} out of ${finalQuizQuestions.length} correct.`;

    const feedbackList = Object.keys(feedback).map(k =>
        `<li>You should revisit: <strong>${k}</strong></li>`
    ).join("");
    document.getElementById("final-feedback").innerHTML = feedbackList || "<li>Great job! You’re ready to hit the court.</li>";
}
