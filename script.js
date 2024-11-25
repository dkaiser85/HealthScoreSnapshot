// Constants and Configuration
const questions = [
    {
        text: "We have a clear picture of our cost of culture...",
        title: "Understanding Cultural Costs",
        description: "Evaluates your organization's ability to identify, understand, and manage the costs associated with culture, including what drives those costs and how to minimize them effectively."
    },
    {
        text: "We have clear metrics in place to determine the profit impact...",
        title: "HR Metrics and Profit Impact",
        description: "Assesses how effectively your organization measures the profit impact of HR activities, such as performance management, coaching, and reviews."
    },
    {
        text: "Our mission, vision and values are easily translated...",
        title: "Mission, Vision, and Values in Action",
        description: "Examines how well your organization translates its mission, vision, and values into actionable behaviors and decisions across the organization."
    },
    {
        text: "We are confident that we are maximizing our efforts...",
        title: "Managing Employee Turnover Costs",
        description: "Reviews your organization's strategies for maximizing efforts and processes to minimize the total costs associated with employee turnover."
    },
    {
        text: "We have Culture KPIs and can ensure an effective ROI...",
        title: "Ensuring ROI for Cultural Initiatives",
        description: "Measures your organization's ability to establish Culture KPIs and connect cultural efforts to return on investment."
    },
    {
        text: "Since COVID happened, there is a distinctive change...",
        title: "Post-COVID Workplace Changes",
        description: "Analyzes how effectively your organization has managed cultural and operational changes following the impact of the COVID-19 pandemic."
    },
    {
        text: "When budget time comes around, culture is easily accounted for...",
        title: "Budgeting for Cultural Costs",
        description: "Looks at how well your organization incorporates cultural costs and related data into its budgeting and financial planning processes."
    },
    {
        text: "We have an easy system and process for measuring...",
        title: "Measuring and Driving Engagement",
        description: "Evaluates the systems and processes your organization uses to track, measure, and improve employee engagement and performance."
    },
    {
        text: "The brand of our company matches the culture...",
        title: "Aligning Brand and Internal Culture",
        description: "Examines the alignment between your organization's external brand messaging and the internal culture experienced by employees."
    },
    {
        text: "Most culture issues we have are Operations' related.",
        title: "Operations and Culture Interconnection",
        description: "Explores how well your organization understands and addresses the relationship between operational challenges and their cultural impact."
    }
];

// Store original form HTML
let originalFormHTML;

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

// DOM Manipulation Functions
function createQuestionElement(question, index) {
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

// Gauge and Results Functions
function updateRadialGauge(percentage) {
    const fillElement = document.getElementById('engagementFill');
    const textElement = document.getElementById('engagementText');
    
    if (!fillElement || !textElement) {
        console.error('Gauge elements not found');
        return;
    }
    
    let strokeColor = calculateScores.getColor(percentage);
    fillElement.setAttribute('stroke', strokeColor);
    
    const pathLength = 367.566;
    const maxPercent = 270 / 360;
    const percentageAdjusted = (percentage / 100) * maxPercent;
    const dashArray = `${pathLength * percentageAdjusted} ${pathLength}`;
    
    fillElement.style.strokeDasharray = dashArray;
    textElement.textContent = `${Math.round(percentage)}%`;
}

// Message Generation Functions
function getScoreMessage(percentage) {
    if (percentage <= 50) {
        return `
            <h3 style="color: #ED5C5C; margin-bottom: 1rem;">Critical Condition</h3>
            <p style="line-height: 1.6; color: #333;">
                Your Organizational Health Snapshot™ indicates urgent challenges requiring immediate attention. 
                Low scores suggest unmet employee needs, misalignment, and significant risks to productivity 
                and profitability. Addressing these issues quickly can stabilize operations, reengage your 
                workforce, and recover lost potential. Act now to begin transforming your organizational 
                health into a competitive advantage.
            </p>
        `;
    }
    // ... Add other score ranges here
}

// Form Handling
function handleFormSubmit() {
    // ... Your existing handleFormSubmit code
}

// Sharing Functions
function shareResults() {
    // ... Your existing shareResults code
}

function shareViaEmail() {
    // ... Your existing shareViaEmail code
}

function shareViaLink() {
    // ... Your existing shareViaLink code
}

// Popup Management
function showOptionsPopup() {
    const popup = document.getElementById('optionsPopup');
    popup.style.display = 'flex';
    popup.style.opacity = '1';
}

function hideOptionsPopup() {
    const popup = document.getElementById('optionsPopup');
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    originalFormHTML = document.querySelector('.container').innerHTML;
    initializeForm();
});

// Event Listeners
document.addEventListener('click', function(event) {
    const popup = document.getElementById('optionsPopup');
    if (event.target === popup) {
        hideOptionsPopup();
    }
});
