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

// When the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add questions to the page
    const questionGroup = document.querySelector('.question-group');
    questions.forEach((question, index) => {
        questionGroup.innerHTML += `
            <div class="question-item">
                <div class="question-text">
                    <span class="question-number">Q${index + 1}.</span> ${question.text}
                </div>
                <div class="rating-scale">
                    ${[1,2,3,4,5,6,7,8,9,10].map(num => 
                        `<button type="button" class="rating-button" onclick="selectRating(this)">${num}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    });

    // Add click handler to the submit button
    const form = document.getElementById('cultureForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showResults();
        });
    }
});

// Handle rating button clicks
function selectRating(button) {
    // Remove selected class from all siblings
    const parent = button.parentElement;
    parent.querySelectorAll('.rating-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    // Add selected class to clicked button
    button.classList.add('selected');
    // Remove unanswered class if it exists
    button.closest('.question-item').classList.remove('unanswered');
}

// Calculate scores
function calculateScore() {
    const questions = document.querySelectorAll('.question-item');
    let total = 0;
    let answered = 0;
    
    questions.forEach(question => {
        const selected = question.querySelector('.rating-button.selected');
        if (selected) {
            total += parseInt(selected.textContent);
            answered++;
        }
    });
    
    return answered > 0 ? (total / answered) : 0;
}

// Show results page
function showResults() {
    // Check if all questions are answered
    const unanswered = document.querySelectorAll('.question-item:not(:has(.rating-button.selected))');
    if (unanswered.length > 0) {
        unanswered.forEach(item => item.classList.add('unanswered'));
        return; // Stop here if there are unanswered questions
    }

    const score = calculateScore();
    const percentage = Math.round((score / 10) * 100);
    
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="results-container">
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
                          id="engagementText">${percentage}%</text>
                </svg>
            </div>
            <div class="score-message">
                <h3>Your Organization's Health Status</h3>
                <p>Based on your responses, your organization shows strong potential with room for strategic improvements.</p>
            </div>
        </div>
    `;
}
