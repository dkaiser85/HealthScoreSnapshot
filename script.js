    // Constants and Configuration
    const questions = [
        "Our organization has a clear and compelling purpose that inspires employees.",
        "Leaders consistently demonstrate our stated values.",
        "Employees feel safe to speak up and share their honest opinions.",
        "We have effective systems for giving and receiving feedback.",
        "Our teams collaborate well across departments and functions.",
        "We celebrate success and recognize good performance.",
        "Innovation and new ideas are encouraged and supported.",
        "Our workplace promotes employee well-being and work-life balance.",
        "We have opportunities for professional growth and development.",
        "Employees feel valued and respected in our organization."
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
    function handleFormSubmit(e) {
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
                item.classList.remove('unanswered');
                scores.push(parseInt(selectedButton.textContent));
            }
        });

        // If there are unanswered questions, stop here
        if (unanswered) {
            alert('Please answer all questions before submitting.');
            return;
        }

        // Calculate score (assuming 1-10 scale)
        const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        const percentageScore = (averageScore / 10) * 100;

        // Hide the form container
        document.querySelector('.container').style.display = 'none';

        // Show and update the results container
        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.style.display = 'block';

        // Update the gauge
        const gaugeFill = document.querySelector('.gauge__fill');
        const gaugeText = document.querySelector('.gauge__text');
        
        // Calculate the stroke offset for the gauge (565.48 is the circumference of the circle)
        const offset = 565.48 * (1 - (percentageScore / 100));
        gaugeFill.style.strokeDashoffset = offset;
        gaugeFill.style.stroke = getScoreColor(percentageScore);
        gaugeText.textContent = `${Math.round(percentageScore)}%`;

        // Update results message
        const messageContainer = document.querySelector('.results-message');
        messageContainer.innerHTML = getScoreMessage(percentageScore);
    }

    // Helper function to get color based on score
    function getScoreColor(score) {
        if (score >= 80) return '#4CAF50';
        if (score >= 60) return '#FFC107';
        return '#F44336';
    }

    // Helper function to get message based on score
    function getScoreMessage(score) {
        if (score >= 80) {
            return '<h3>Excellent Culture!</h3><p>Your organization shows strong cultural alignment.</p>';
        } else if (score >= 60) {
            return '<h3>Good Foundation</h3><p>There are positive aspects to build upon.</p>';
        } else {
            return '<h3>Room for Growth</h3><p>Consider focusing on cultural development.</p>';
        }
    }

    // Add event listener when page loads
    document.addEventListener('DOMContentLoaded', () => {
        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.addEventListener('click', handleFormSubmit);
        }
    });

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

    // Function to create the questions in the form
    function createQuestions() {
        const questionGroup = document.querySelector('.question-group');
        
        questions.forEach((questionText, index) => {
            const questionElement = createQuestionElement({text: questionText}, index);
            questionGroup.appendChild(questionElement);
        });
    }

    // Call the function when the page loads
    document.addEventListener('DOMContentLoaded', createQuestions);
