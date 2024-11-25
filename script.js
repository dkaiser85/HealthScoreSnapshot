// Basic JavaScript to add questions and handle ratings
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

// Initialize the form with questions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const questionGroup = document.querySelector('.question-group');
    
    // Clear any existing content
    questionGroup.innerHTML = '';
    
    // Add each question
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
                // Remove selected class from all buttons in this rating scale
                ratingScale.querySelectorAll('.rating-button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                // Add selected class to clicked button
                button.classList.add('selected');
                // Remove unanswered class from question item
                questionItem.classList.remove('unanswered');
            };
            ratingScale.appendChild(button);
        }
        
        questionItem.appendChild(questionText);
        questionItem.appendChild(ratingScale);
        questionGroup.appendChild(questionItem);
    });
});

// First, let's create the scoring calculation functions
const calculateScores = {
    toPercentage: (score) => (score / 10) * 100,
    
    // Updated color function with new color codes
    getColor: (percentage) => {
        const score = Math.round(percentage);
        if (score <= 50) {
            return '#ED5C5C'; // New red
        } else if (score <= 84) {
            return '#DFD691'; // New yellow
        } else {
            return '#5EBD77'; // New green
        }
    },
    
    getOverallScore: (scores) => {
        const sum = scores.reduce((acc, curr) => acc + curr, 0);
        return sum / scores.length;
    }
};

// Add the update function
function updateRadialGauge(percentage) {
    const fillElement = document.getElementById('engagementFill');
    const textElement = document.getElementById('engagementText');
    
    if (!fillElement || !textElement) {
        console.error('Gauge elements not found');
        return;
    }
    
    // Calculate the stroke color based on percentage
    let strokeColor;
    if (percentage <= 50) {
        strokeColor = '#ED5C5C'; // Red
    } else if (percentage <= 84) {
        strokeColor = '#DFD691'; // Yellow
    } else {
        strokeColor = '#5EBD77'; // Green
    }
    
    // Update the fill color
    fillElement.setAttribute('stroke', strokeColor);
    
    // Calculate the dash offset for 270 degrees arc
    const pathLength = 367.566;
    const maxPercent = 270 / 360; // Use 270 degrees instead of full circle
    const percentageAdjusted = (percentage / 100) * maxPercent;
    const dashArray = `${pathLength * percentageAdjusted} ${pathLength}`;
    
    // Set the dash array
    fillElement.style.strokeDasharray = dashArray;
    
    // Update the text
    textElement.textContent = `${Math.round(percentage)}%`;
}

// Update the createResultsPage function to use this
function createResultsPage(scores) {
    // Create container for results
    const container = document.querySelector('.container');
    const form = document.getElementById('cultureForm');
    
    // Hide the form
    form.style.display = 'none';
    
    const overallPercentage = Math.round(
        calculateScores.getOverallScore(
            scores.map(score => calculateScores.toPercentage(score))
        )
    );
    
    // Create results HTML
    const resultsHTML = `
        <div class="results-container">
            <div class="close-button" onclick="showOptionsPopup()">×</div>
            
            <div class="overall-score">
                <h2>Your Organizational Health Snapshot™ Results</h2>
                <div class="gauge">
                    <svg width="195" height="195" viewBox="0 0 195 195">
                        <path class="gauge__background" 
                              d="M39 162.5 A78 78 0 1 1 156 162.5" 
                              stroke="#f0f0f0"
                              stroke-width="15"
                              fill="none"
                              transform="rotate(0, 97.5, 97.5)" />
                        <path class="gauge__fill" 
                              id="engagementFill" 
                              d="M39 162.5 A78 78 0 1 1 156 162.5" 
                              stroke="${calculateScores.getColor(overallPercentage)}"
                              stroke-width="15"
                              fill="none"
                              transform="rotate(0, 97.5, 97.5)" />
                        <text x="97.5" y="115" 
                              text-anchor="middle" 
                              font-size="31px" 
                              font-weight="700"
                              fill="#173248" 
                              id="engagementText">${overallPercentage}%</text>
                    </svg>
                </div>
            </div>
            
            <div class="individual-scores">
                <h3>Detailed Breakdown</h3>
                ${scores
                    .map((score, index) => ({
                        score: score,
                        percentage: Math.round(calculateScores.toPercentage(score)),
                        title: questions[index].title,
                        description: questions[index].description
                    }))
                    .sort((a, b) => a.percentage - b.percentage)
                    .map(item => `
                        <div class="score-section">
                            <div class="score-header">
                                <h4>${item.title}</h4>
                                <span class="score-value">${item.percentage}%</span>
                            </div>
                            <div class="pill-gauge" style="--percentage: ${item.percentage}; --color: ${calculateScores.getColor(item.percentage)}">
                            </div>
                            <p class="score-description">${item.description}</p>
                        </div>
                    `).join('')}
            </div>
            
            <div class="cta-section">
                <h3>Ready to Dive Deeper?</h3>
                <p>Schedule a demo to see how The Culture MRI® can help transform your organizational health.</p>
                <a href="https://theculturemri.com/schedule-a-demo" class="cta-button">Schedule Demo</a>
            </div>
        </div>
    `;
    
    // Add results to page
    container.insertAdjacentHTML('beforeend', resultsHTML);
    
    // Initialize the gauge animation
    setTimeout(() => {
        updateRadialGauge(overallPercentage);
    }, 100);
}

// Add helper function to show options popup
function showOptionsPopup() {
    const form = document.getElementById('cultureForm');
    const resultsContainer = document.querySelector('.results-container');
    
    if (form) form.style.display = 'block';
    if (resultsContainer) resultsContainer.remove();
}

// Update the form submission handler
document.getElementById('cultureForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check if all questions are answered
    const unansweredQuestions = document.querySelectorAll('.question-item:not(:has(.rating-button.selected))');
    if (unansweredQuestions.length > 0) {
        unansweredQuestions.forEach(q => q.classList.add('unanswered'));
        alert('Please answer all questions before submitting.');
        return;
    }
    
    // Collect scores
    const scores = Array.from(document.querySelectorAll('.question-item')).map(item => {
        const selectedButton = item.querySelector('.rating-button.selected');
        return parseInt(selectedButton.textContent);
    });
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        scores: scores
    };
    
    // Create results page
    createResultsPage(scores);
});

// Add this function at the start to get affiliate code
function getAffiliateCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    console.log('URL Ref Code:', refCode); // Debug log
    return refCode || 'CMRI';
}

// Update submitToGoogleSheet function
function submitToGoogleSheet(data) {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxajGsKT72THMEnjYeO_rBglhs4hFzrnBcgg8YMCWCDh57LqX2CQ_k7yQG1D22bu5uT/exec';
    
    const submissionData = {
        ...data,
        source: window.location.href,
        referrer: document.referrer || 'CMRI'
    };
    
    console.log('Submitting data:', submissionData); // Debug log
    
    fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(submissionData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Show questionnaire function
function showQuestionnaire() {
    const container = document.querySelector('.container');
    container.innerHTML = originalFormHTML;
    initializeForm();
}

function getStatus(percentage) {
    if (percentage <= 50) return 'Poor';
    if (percentage <= 84) return 'Fair';
    return 'Good';
}

function getRecommendations(percentage) {
    if (percentage <= 50) {
        return `
            <div class="recommendations">
                <h3>Priority Action Steps</h3>
                <p>Your Organizational Health Snapshot™ results indicate critical areas requiring immediate attention to protect and improve business performance:</p>
                <ul>
                    <li>
                        <strong>Urgent Intervention:</strong> 
                        Address significant cultural gaps that are impacting productivity, engagement, and retention
                    </li>
                    <li>
                        <strong>Risk Mitigation:</strong> 
                        Implement immediate strategies to realign teams and stabilize operational effectiveness
                    </li>
                    <li>
                        <strong>Recovery Planning:</strong> 
                        Develop a structured approach to rebuild cultural foundations and restore business performance
                    </li>
                </ul>
                <p class="recommendation-footer">Don't let cultural challenges limit your business potential.</p>
                <a href="https://theculturemri.com/schedule-a-demo" class="cta-button">Schedule The Culture MRI® Demo</a>
            </div>
        `;
    } else if (percentage <= 84) {
        return `
            <div class="recommendations">
                <h3>Growth Opportunities</h3>
                <p>Your Organizational Health Snapshot™ reveals key opportunities to strengthen your culture and enhance business outcomes:</p>
                <ul>
                    <li>
                        <strong>Performance Enhancement:</strong> 
                        Target specific areas where improved alignment can drive stronger team performance
                    </li>
                    <li>
                        <strong>Engagement Optimization:</strong> 
                        Strengthen key cultural drivers to boost employee satisfaction and productivity
                    </li>
                    <li>
                        <strong>Strategic Planning:</strong> 
                        Create a roadmap to transform moderate performance into exceptional results
                    </li>
                </ul>
                <p class="recommendation-footer">Ready to unlock your organization's full potential?</p>
                <a href="https://theculturemri.com/schedule-a-demo" class="cta-button">Schedule The Culture MRI® Demo</a>
            </div>
        `;
    } else {
        return `
            <div class="recommendations">
                <h3>Excellence Acceleration</h3>
                <p>Your Organizational Health Snapshot™ shows strong foundations. Here's how to leverage your cultural strengths for even greater success:</p>
                <ul>
                    <li>
                        <strong>Innovation Opportunities:</strong> 
                        Identify advanced strategies to push performance boundaries and maximize team potential
                    </li>
                    <li>
                        <strong>Competitive Advantage:</strong> 
                        Further strengthen your cultural differentiators to maintain market leadership
                    </li>
                    <li>
                        <strong>Sustainable Growth:</strong> 
                        Develop frameworks to ensure continued excellence and scalable success
                    </li>
                </ul>
                <p class="recommendation-footer">Discover how to transform strong performance into market dominance.</p>
                <a href="https://theculturemri.com/schedule-a-demo" class="cta-button">Schedule The Culture MRI® Demo</a>
            </div>
        `;
    }
}

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
    } else if (percentage <= 84) {
        return `
            <h3 style="color: #DFD691; margin-bottom: 1rem;">At Risk and Needing Growth</h3>
            <p style="line-height: 1.6; color: #333;">
                Your Organizational Health Snapshot™ reveals areas of concern that require proactive intervention. 
                While some systems are stable, gaps in meeting employee needs and optimizing performance place 
                your organization at risk of declining productivity and profitability. Timely action to address 
                these vulnerabilities can create a path toward stronger alignment, engagement, and growth.
            </p>
        `;
    } else {
        return `
            <h3 style="color: #5EBD77; margin-bottom: 1rem;">Strong but Needing Growth</h3>
            <p style="line-height: 1.6; color: #333;">
                Your Organizational Health Snapshot™ reflects a healthy organization with many systems functioning well. 
                However, even strong results can mask critical areas for improvement. Addressing overlooked 
                opportunities can push productivity and profitability even higher. Stay vigilant and refine 
                your strategy to ensure your organization operates at its peak potential.
            </p>
        `;
    }
}

// Add these JavaScript functions:
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

// Add popstate event listener after the existing event listeners
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.showPopup) {
        showOptionsPopup();
    } else {
        const popup = document.getElementById('optionsPopup');
        if (popup) {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    }
});

function createShareButton(overallPercentage, scores) {
    return `
        <div class="share-section">
            <button onclick="shareResults()" class="share-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                Share Results
            </button>
        </div>
    `;
}

function shareResults() {
    const sharePopup = document.createElement('div');
    sharePopup.className = 'share-popup';
    sharePopup.innerHTML = `
        <div class="share-popup-content">
            <h3>Share Your Results</h3>
            <div class="share-options">
                <button onclick="shareViaEmail()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Email
                </button>
                <button onclick="shareViaLink()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    Copy Link
                </button>
            </div>
            <button class="close-button" onclick="closeSharePopup()">×</button>
        </div>
    `;
    document.body.appendChild(sharePopup);

    // Show popup with animation
    setTimeout(() => sharePopup.classList.add('active'), 10);
}

function shareViaEmail() {
    const subject = encodeURIComponent('My Organizational Health Snapshot™ Results');
    const body = encodeURIComponent(`
        Check out my Organizational Health Snapshot™ results!
        
        Overall Score: ${document.getElementById('engagementText').textContent}
        Date: ${new Date().toLocaleDateString()}
        
        View the full report: ${window.location.href}
    `);
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function shareViaLink() {
    const shareUrl = window.location.href;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        const message = document.createElement('div');
        message.className = 'copy-success';
        message.textContent = 'Link copied to clipboard!';
        document.body.appendChild(message);
        
        setTimeout(() => message.remove(), 2000);
    });
}

function closeSharePopup() {
    const popup = document.querySelector('.share-popup');
    popup.classList.remove('active');
    setTimeout(() => popup.remove(), 300);
}
