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
// ... existing code until showLesson function ...

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
        `<div>
            <input type="radio" name="quiz" value="${i}" onchange="checkAnswer(${i}, ${lesson.quiz.correct})"> 
            ${opt}
            <span id="feedback-${i}" class="feedback"></span>
        </div>`
    ).join("");
    
    document.getElementById("quiz-options").innerHTML = optionsHTML;
}

function checkAnswer(selected, correct) {
    document.querySelectorAll('.feedback').forEach((el, index) => {
        if (index === correct) {
            el.innerHTML = ' ✓';
            el.style.color = 'green';
        } else {
            el.innerHTML = ' ✗';
            el.style.color = 'red';
        }
    });
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

function showFinalQuiz() {
    const quizContainer = document.getElementById("final-questions");
    quizContainer.innerHTML = finalQuizQuestions.map((q, i) => {
        const options = lessons[i].quiz.options;
        return `
        <div class="mt-3">
            <p><strong>${q.q}</strong></p>
            ${options.map((opt, j) =>
                `<div>
                    <input type="radio" name="final-${i}" value="${j}"> 
                    ${opt}
                    <span id="final-feedback-${i}-${j}" class="feedback"></span>
                </div>`
            ).join("")}
        </div>
        `;
    }).join("");
    
    quizContainer.innerHTML += `
        <div class="mt-4">
            <button onclick="submitFinalQuiz()" class="btn btn-primary">Submit Quiz</button>
        </div>
    `;
}

function submitFinalQuiz() {
    let score = 0;
    
    finalQuizQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="final-${i}"]:checked`);
        if (!selected) return;
        
        // Show correct/incorrect for all options
        document.querySelectorAll(`[id^="final-feedback-${i}"]`).forEach((el, index) => {
            if (index === q.a) {
                el.innerHTML = ' ✓';
                el.style.color = 'green';
            } else {
                el.innerHTML = ' ✗';
                el.style.color = 'red';
            }
        });

        if (parseInt(selected.value) === q.a) {
            score++;
        }

        // Disable inputs after submission
        document.querySelectorAll(`input[name="final-${i}"]`).forEach(input => {
            input.disabled = true;
        });
    });

    // Show simple score
    const scoreDiv = document.createElement('div');
    scoreDiv.className = 'mt-4 text-center';
    scoreDiv.innerHTML = `
        <h3>Score: ${score}/${finalQuizQuestions.length}</h3>
        <button onclick="goHome()" class="btn btn-primary mt-3">Return Home</button>
    `;

    // Remove submit button and add score
    document.querySelector('button[onclick="submitFinalQuiz()"]').remove();
    document.getElementById("final-questions").appendChild(scoreDiv);
}

function goHome() {
    document.getElementById("lesson").classList.add("d-none");
    document.getElementById("final-quiz").classList.add("d-none");
    document.getElementById("home").classList.remove("d-none");
    currentLesson = 0;
    userAnswers = [];
}