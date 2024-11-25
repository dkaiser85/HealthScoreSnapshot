// Survey questions array
const questions = [
    "We have a clear picture of our cost of culture...",
    "We have clear metrics in place to determine the profit impact...",
    "Our mission, vision and values are easily translated...",
    "We are confident that we are maximizing our efforts...",
    "We have Culture KPIs and can ensure an effective ROI...",
    "Since COVID happened, there is a distinctive change...",
    "When budget time comes around, culture is easily accounted for...",
    "We have an easy system and process for measuring...",
    "The brand of our company matches the culture...",
    "Most culture issues we have are Operations' related."
];

// Function to create question elements
function createQuestions() {
    const questionsContainer = document.querySelector('.questions');
    questionsContainer.className = 'question-group';
    
    questions.forEach((question, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.innerHTML = `
            <span class="question-number">Q${index + 1}.</span> 
            ${question.text}
        `;
        
        const ratingScale = document.createElement('div');
        ratingScale.className = 'rating-scale';
        
        // Create rating buttons 1-10
        for (let i = 1; i <= 10; i++) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'rating-button';
            button.textContent = i;
            button.onclick = function() {
                ratingScale.querySelectorAll('.rating-button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
                questionItem.classList.remove('unanswered');
            };
            ratingScale.appendChild(button);
        }
        
        questionItem.appendChild(questionText);
        questionItem.appendChild(ratingScale);
        questionsContainer.appendChild(questionItem);
    });
}

// Add new scoring calculation functions
const calculateScores = {
    toPercentage: (score) => (score / 10) * 100,
    
    getColor: (percentage) => {
        const score = Math.round(percentage);
        if (score <= 50) return '#ED5C5C';
        if (score <= 84) return '#DFD691';
        return '#5EBD77';
    },
    
    getOverallScore: (scores) => {
        const sum = scores.reduce((acc, curr) => acc + curr, 0);
        return sum / scores.length;
    }
};

// Updated form submission handler
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const results = {
        personalInfo: {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            role: formData.get('role')
        },
        answers: {}
    };
    
    // Collect answers and calculate scores
    const scores = questions.map((_, index) => {
        const score = parseInt(formData.get(`q${index + 1}`));
        results.answers[`q${index + 1}`] = score;
        return score;
    });
    
    // Create and display results page
    createResultsPage(scores);
});

// Initialize questions when the page loads
document.addEventListener('DOMContentLoaded', createQuestions);
