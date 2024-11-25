// Question Data
const questions = [
    {
        text: "We have a clear picture of our cost of culture...",
        title: "Understanding Cultural Costs",
        description: "Evaluates your organization's ability to identify, understand, and manage the costs associated with culture."
    },
    {
        text: "We have clear metrics in place to determine the profit impact...",
        title: "HR Metrics and Profit Impact",
        description: "Assesses how effectively your organization measures the profit impact of HR activities."
    },
    {
        text: "Our mission, vision and values are easily translated...",
        title: "Mission, Vision, and Values in Action",
        description: "Examines how well your organization translates its mission, vision, and values into actionable behaviors."
    },
    {
        text: "We are confident that we are maximizing our efforts...",
        title: "Managing Employee Turnover Costs",
        description: "Reviews your organization's strategies for maximizing efforts to minimize turnover costs."
    },
    {
        text: "We have Culture KPIs and can ensure an effective ROI...",
        title: "Ensuring ROI for Cultural Initiatives",
        description: "Measures your organization's ability to establish Culture KPIs and connect cultural efforts to ROI."
    },
    {
        text: "Since COVID happened, there is a distinctive change...",
        title: "Post-COVID Workplace Changes",
        description: "Analyzes how effectively your organization has managed cultural changes following COVID-19."
    },
    {
        text: "When budget time comes around, culture is easily accounted for...",
        title: "Budgeting for Cultural Costs",
        description: "Looks at how well your organization incorporates cultural costs into budgeting processes."
    },
    {
        text: "We have an easy system and process for measuring...",
        title: "Measuring and Driving Engagement",
        description: "Evaluates the systems your organization uses to track and improve employee engagement."
    },
    {
        text: "The brand of our company matches the culture...",
        title: "Aligning Brand and Internal Culture",
        description: "Examines the alignment between external brand messaging and internal culture."
    },
    {
        text: "Most culture issues we have are Operations' related.",
        title: "Operations and Culture Interconnection",
        description: "Explores how well your organization understands the relationship between operations and culture."
    }
];

// Scoring Calculations
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

// Gauge Update Function
function updateRadialGauge(percentage) {
    const fillElement = document.querySelector('.gauge__fill');
    const textElement = document.querySelector('#engagementText');
    
    if (!fillElement || !textElement) {
        console.error('Gauge elements not found');
        return;
    }

    const strokeColor = calculateScores.getColor(percentage);
    fillElement.setAttribute('stroke', strokeColor);
    
    const circumference = 364.425; // 2 * π * 58 (radius)
    const offset = circumference * (1 - (percentage / 100));
    fillElement.style.strokeDashoffset = offset;
    textElement.textContent = `${Math.round(percentage)}%`;
}

// DOM Manipulation Functions
function createQuestionElement(question, index) {
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.innerHTML = `<span class="question-number">Q${index + 1}.</span> ${question.text}`;
    
    const ratingScale = document.createElement('div');
    ratingScale.className = 'rating-scale';
    
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
    
    return questionItem;
}

// Form Handling
function handleFormSubmit(e) {
    console.log('Form submission started');
    if (e) e.preventDefault();
    
    // Get all questions
    const questionItems = document.querySelectorAll('.question-item');
    let scores = [];
    let unanswered = false;

    // Check each question
    questionItems.forEach((item) => {
        const selectedButton = item.querySelector('.rating-button.selected');
        if (!selectedButton) {
            item.classList.add('unanswered');
            unanswered = true;
        } else {
            scores.push(parseInt(selectedButton.textContent));
        }
    });

    // If there are unanswered questions, stop here
    if (unanswered) {
        alert('Please answer all questions before submitting.');
        return;
    }

    // Calculate overall score
    const overallScore = calculateScores.getOverallScore(scores);
    const percentageScore = calculateScores.toPercentage(overallScore);

    // Create results HTML
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="results-container" style="display: block;">
            <div class="overall-score">
                <h2>Your Organizational Health Snapshot™ Results</h2>
                <div class="gauge">
                    <svg width="195" height="195" viewBox="0 0 195 195">
                        <path class="gauge__background" 
                              d="M39 162.5 A78 78 0 1 1 156 162.5" 
                              stroke-width="15"
                              transform="rotate(0, 97.5, 97.5)" />
                        <path class="gauge__fill" 
                              d="M39 162.5 A78 78 0 1 1 156 162.5" 
                              stroke-width="15"
                              transform="rotate(0, 97.5, 97.5)" />
                        <text x="97.5" y="115" 
                              text-anchor="middle" 
                              font-size="31px" 
                              font-weight="700"
                              fill="#173248" 
                              id="engagementText">0%</text>
                    </svg>
                </div>
                <div class="score-message">
                    ${getScoreMessage(percentageScore)}
                </div>
            </div>
        </div>
    `;

    // Update the gauge
    setTimeout(() => {
        updateRadialGauge(percentageScore);
    }, 100);

    // Log form data
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        scores: scores,
        overallScore: percentageScore
    };
    console.log('Form submitted:', formData);
}

// Message Generation
function getScoreMessage(percentage) {
    if (percentage <= 50) {
        return `<h3 style="color: #ED5C5C">Critical Condition</h3>
                <p>Your Organizational Health Snapshot™ indicates urgent challenges requiring immediate attention...</p>`;
    } else if (percentage <= 84) {
        return `<h3 style="color: #DFD691">At Risk and Needing Growth</h3>
                <p>Your Organizational Health Snapshot™ reveals areas of concern that require proactive intervention...</p>`;
    } else {
        return `<h3 style="color: #5EBD77">Strong but Needing Growth</h3>
                <p>Your Organizational Health Snapshot™ reflects a healthy organization with many systems functioning well...</p>`;
    }
}

// Share Functionality
function shareResults() {
    const sharePopup = document.createElement('div');
    sharePopup.className = 'share-popup';
    sharePopup.innerHTML = generateSharePopupHTML();
    document.body.appendChild(sharePopup);
    setTimeout(() => sharePopup.classList.add('active'), 10);
}

function shareViaEmail() {
    const subject = encodeURIComponent('My Organizational Health Snapshot™ Results');
    const body = encodeURIComponent(`Check out my Organizational Health Snapshot™ results!\n\nOverall Score: ${document.getElementById('engagementText').textContent}\nDate: ${new Date().toLocaleDateString()}\n\nView the full report: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function shareViaLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const message = document.createElement('div');
        message.className = 'copy-success';
        message.textContent = 'Link copied to clipboard!';
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 2000);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Create questions
    const questionGroup = document.querySelector('.question-group');
    questions.forEach((question, index) => {
        const questionElement = createQuestionElement(question, index);
        questionGroup.appendChild(questionElement);
    });

    // Add form submit handler
    const form = document.getElementById('cultureForm');
    if (form) {
        console.log('Form found, adding submit listener');
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Form not found!');
    }
});

// Popup Management
function showOptionsPopup() {
    const popup = document.getElementById('optionsPopup');
    popup.style.display = 'flex';
    popup.style.opacity = '1';
    window.history.pushState({ showPopup: true }, '');
}

function hideOptionsPopup() {
    const popup = document.getElementById('optionsPopup');
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
    window.history.back();
}

// Handle browser back button
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.showPopup) {
        showOptionsPopup();
    } else {
        const popup = document.getElementById('optionsPopup');
        if (popup) {
            popup.style.opacity = '0';
            setTimeout(() => popup.style.display = 'none', 300);
        }
    }
});
