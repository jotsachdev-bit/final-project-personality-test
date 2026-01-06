// ===============================
// SELECT ELEMENTS
// ===============================
const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('nextBtn');
const resultBtn = document.getElementById('resultBtn');
const progressFill = document.getElementById('progressFill');
const currentQ = document.getElementById('currentQ');

// ===============================
// VARIABLES
// ===============================
let currentQuestion = 0;
const totalQuestions = questions.length;

// ===============================
// INITIAL SETUP
// ===============================
questions[currentQuestion].classList.add('active');
resultBtn.style.display = 'none';
progressFill.style.width = '0%';
currentQ.textContent = `0 / ${totalQuestions}`;

// ===============================
// UPDATE PROGRESS BAR
// ===============================
function updateProgress() {
    const answered = currentQuestion + 1;
    const percent = (answered / totalQuestions) * 100;

    progressFill.style.width = percent + '%';
    currentQ.textContent = `${answered} / ${totalQuestions}`;
}

// ===============================
// NEXT BUTTON CLICK
// ===============================
nextBtn.addEventListener('click', () => {
    const selectedOption = questions[currentQuestion].querySelector(
        'input[type="radio"]:checked'
    );

    // Prevent moving without selection
    if (!selectedOption) {
        alert('Please select an option before moving to the next question.');
        return;
    }

    // Update progress after answering
    updateProgress();

    // Hide current question
    questions[currentQuestion].classList.remove('active');
    currentQuestion++;

    // Show next question OR show result button
    if (currentQuestion < totalQuestions) {
        questions[currentQuestion].classList.add('active');
    } else {
        nextBtn.style.display = 'none';
        resultBtn.style.display = 'inline-block';
    }
});

// ===============================
// SUBMIT TEST
// ===============================
function submitTest() {
    let introvert = 0;
    let extrovert = 0;

    const answers = document.querySelectorAll("input[type='radio']:checked");

    answers.forEach(ans => {
        if (ans.value === "A") introvert++;
        if (ans.value === "B") extrovert++;
    });

    let personalityType = "AMBIVERT";

    if (introvert > extrovert) {
        personalityType = "INTROVERT";
    } else if (extrovert > introvert) {
        personalityType = "EXTROVERT";
    }

    // Store result and move to result page
    localStorage.setItem("personalityType", personalityType);
    window.location.href = "result.html";
}
