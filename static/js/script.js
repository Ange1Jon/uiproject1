
const lessons = [
    {
        title: "Stance",
        description: "Your feet should be shoulder-width apart. Knees bent. Balance is key.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "What's the best stance to keep your shot stable and balanced?",
            options: ["Feet touching each other", "Feet shoulder-width apart with knees bent", "One foot way ahead of the other", "Standing stiff and tall"],
            correct: 1
        }
    },
    {
        title: "Hand Placement",
        description: "Shooting hand under the ball, guide hand on the side.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "Which hand placement helps you guide the ball without messing up the shot?",
            options: ["Both hands under the ball", "Guide hand under, shooting hand on top", "Shooting hand under, guide hand on the side", "Thumbs pressed together in the middle"],
            correct: 2
        }
    },
    {
        title: "Shooting Motion",
        description: "Push up, elbow under the ball, release at the top of your jump.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "When should you release the basketball for best accuracy and arc?",
            options: ["Before jumping", "While falling down", "At the top of your jump", "Right after catching it"],
            correct: 2
        }
    },
    {
        title: "Follow Through",
        description: "Snap your wrist and hold the gooseneck position.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "What does a solid follow-through look like?",
            options: ["Hands to the side", "Wrists snapped with fingers pointing down like reaching in a cookie jar", "Both hands by your ears", "Straight arms with fists clenched"],
            correct: 1
        }
    },
    {
        title: "Common Mistakes",
        description: "Avoid thumbing the ball, leaning back, or not jumping.",
        video: "[INSERT VIDEO HERE]",
        quiz: {
            question: "Which habit messes up your shot form the most?",
            options: ["Using your legs for power", "Snapping your wrist", "Leaning backward and thumbing the ball", "Jumping straight up"],
            correct: 2
        }
    }
];

const finalQuizQuestions = [
    { q: "What kind of stance helps you stay balanced before shooting?", a: 1, key: "Stance" },
    { q: "Where should your guide hand be while shooting?", a: 2, key: "Hand Placement" },
    { q: "When is the perfect time to release the ball during your jump?", a: 2, key: "Shooting Motion" },
    { q: "How should your hands finish after a good follow-through?", a: 1, key: "Follow Through" },
    { q: "Which of these is a shooting mistake you want to avoid?", a: 2, key: "Common Mistakes" }
];

let currentLesson = 0;
let userAnswers = [];

function startLesson() {
    document.getElementById("home").classList.add("d-none");
    document.getElementById("lesson").classList.remove("d-none");
    showLesson();
}

function goHome() {
    document.getElementById("lesson").classList.add("d-none");
    document.getElementById("final-quiz").classList.add("d-none");
    document.getElementById("results").classList.add("d-none");
    document.getElementById("home").classList.remove("d-none");
    currentLesson = 0;
    userAnswers = [];
}

function showLesson() {
    const lesson = lessons[currentLesson];
    const progress = ((currentLesson) / lessons.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("progress-text").innerText = `Lesson ${currentLesson + 1} of ${lessons.length} (${Math.round(progress)}%)`;
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
    quizContainer.innerHTML = finalQuizQuestions.map((q, i) => {
        const options = lessons[i].quiz.options;
        return `
        <div class="mt-3">
            <p><strong>${q.q}</strong></p>
            ${options.map((opt, j) =>
                `<div><input type="radio" name="final-${i}" value="${j}"> ${opt}</div>`
            ).join("")}
        </div>
        `;
    }).join("");
}

function submitFinalQuiz() {
    const feedbackMessages = {
        "Stance": "Work on your stance – balance starts from the ground up. Revisit Lesson 1!",
        "Hand Placement": "Check your grip – your guide hand is there to help, not mess up your shot. Back to Lesson 2!",
        "Shooting Motion": "Your timing is off. Release at the peak of your jump for that smooth arc. Revisit Lesson 3!",
        "Follow Through": "You're missing that shooter’s finish. Snap that wrist like you're reaching into a cookie jar – Lesson 4’s got you.",
        "Common Mistakes": "Some habits kill your shot. Let’s clean them up – jump into Lesson 5 again."
    };

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
        `<li>${feedbackMessages[k]}</li>`
    ).join("");
    document.getElementById("final-feedback").innerHTML = feedbackList || "<li>Great job! You’re ready to hit the court.</li>";
}
