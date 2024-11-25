* {
    font-family: 'Inter', sans-serif;
}

:root {
    --primary-color: #5B5FC7;
    --background-color: #f5f5f5;
    --primary-color-light: rgba(91, 95, 199, 0.1);
}

body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 20px;
}

@media (max-width: 768px) {
    body {
        background-color: var(--background-color);
    }
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.personal-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    width: 100%;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(91, 95, 199, 0.1);
}

.assessment-grid {
    margin-top: 2rem;
}

.scale-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 0 2rem;
    color: var(--primary-color);
    font-weight: 500;
}

.question-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.question-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: #f8f8f8;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.question-item.unanswered {
    border: 2px solid #ED5C5C;
    background-color: rgba(237, 92, 92, 0.05);
}

.question-text {
    font-size: 14px;
    line-height: 1.4;
    color: #333;
    font-family: 'Inter', sans-serif;
}

.rating-scale {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 2px;
    margin-top: 0.5rem;
}

.rating-button {
    width: 100%;
    aspect-ratio: 1;
    padding: 2px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    border-radius: 4px;
    font-size: 12px;
    transition: all 0.2s ease-in-out;
    position: relative;
    font-family: 'Inter', sans-serif;
}

.rating-button:hover {
    background-color: var(--primary-color-light);
    border-color: var(--primary-color);
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(91, 95, 199, 0.2);
}

.rating-button.selected {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(91, 95, 199, 0.3);
}

.rating-button:active {
    transform: scale(0.95);
}

button[type="submit"] {
    margin-top: 2rem;
    padding: 1rem 2rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: opacity 0.2s ease;
}

button[type="submit"]:hover {
    opacity: 0.9;
}

header {
    text-align: center;
    margin-bottom: 2rem;
}

header h1 {
    color: #000000;
    font-size: 2rem;
    margin: 0 0 1rem 0;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
}

.logo {
    max-width: 250px;
    height: auto;
    margin: 1rem 0 2rem 0;
}

.form-group label {
    font-weight: 500;
    color: #333;
    font-family: 'Inter', sans-serif;
}

@media (max-width: 768px) {
    .personal-info {
        grid-template-columns: 1fr;
    }
    
    .container {
        padding: 1rem;
    }
    
    .question-text {
        font-size: 13px;
    }

    header h1 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .logo {
        max-width: 180px;
        margin: 0.5rem 0 1rem 0;
    }

    .instruction-text {
        font-size: 13px;
        margin: 1rem 0;
    }

    .cta-section h3 {
        font-size: 1.2rem;
    }

    .cta-section p {
        font-size: 0.9rem;
    }

    .score-message h3 {
        font-size: 1.1rem;
    }

    .score-message p {
        font-size: 0.9rem;
    }

    .recommendations h3 {
        font-size: 1.2rem;
    }

    .recommendations p,
    .recommendations li {
        font-size: 0.9rem;
    }
}

/* Add specific mobile adjustments for very small screens */
@media (max-width: 320px) {
    .container {
        padding: 0.75rem;
    }

    header h1 {
        font-size: 1.25rem;
    }

    .logo {
        max-width: 150px;
    }

    .rating-scale {
        gap: 1px;
    }
    
    .rating-button {
        padding: 1px;
        font-size: 11px;
        border-radius: 2px;
    }
    
    .question-item {
        padding: 0.75rem;
    }

    .form-group label {
        font-size: 0.9rem;
    }

    .form-group input {
        padding: 0.5rem;
        font-size: 0.9rem;
    }

    button[type="submit"] {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
    }

    .score-section {
        padding: 0.75rem;
    }

    .score-header h4 {
        font-size: 0.9rem;
    }

    .score-value {
        font-size: 0.9rem;
    }

    .score-description {
        font-size: 0.8rem;
    }

    .gauge {
        width: 150px;
        height: 150px;
    }

    #engagementText {
        font-size: 24px !important;
    }

    .cta-section {
        padding: 1rem;
    }

    .cta-section h3 {
        font-size: 1rem;
    }

    .cta-section p {
        font-size: 0.85rem;
    }

    .cta-button {
        padding: 0.75rem 1.25rem;
        font-size: 0.9rem;
    }

    .popup-content {
        padding: 1rem;
    }

    .popup-option {
        padding: 0.75rem;
        font-size: 0.9rem;
    }

    .close-button {
        width: 32px;
        height: 32px;
        font-size: 20px;
        top: 10px;
        right: 10px;
    }
}

.score-summary {
    display: none;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.average-score {
    text-align: center;
}

.score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: var(--primary-color);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    color: white;
}

/* Add style for the instruction text */
.instruction-text {
    text-align: center;
    margin: 2rem 0;
    color: #333; 
    font-size: 15px;
    font-weight: 500;
}

/* Results Page Styles */
.results-container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

/* Clean 270-degree Gauge Styles */
.gauge {
    position: relative;
    width: 195px;
    height: 195px;
    margin: 2rem auto;
}

.gauge__background {
    fill: none;
    stroke: #f0f0f0;
    stroke-width: 15;
    stroke-linecap: round;
}

.gauge__fill {
    fill: none;
    stroke-width: 15;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease;
}

/* Add status text below percentage */
.status {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Inter', sans-serif;
    font-size: 1.5rem;
    color: #64748B; /* Grey color for status */
    margin: 0;
}

/* Container styling */
.overall-score {
    text-align: center;
    margin: 3rem 0;
}

.overall-score h3 {
    margin-top: 2rem;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    color: #333;
}

/* Pill Gauges */
.score-pill {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.question-label {
    width: 120px;
    font-weight: 500;
}

.pill-gauge {
    height: 12px;
    background: #f0f0f0;
    border-radius: 6px;
    overflow: hidden;
    margin: 0.75rem 0;
    position: relative;
}

.pill-gauge::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: calc(var(--percentage) * 1%);
    background: var(--color);
    border-radius: 6px;
    transition: width 1s ease-in-out;
}

.pill-value {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #333;
    font-weight: 500;
    z-index: 1;
}

/* Updated styles for individual scores */
.individual-scores {
    margin-top: 3rem;
}

.score-section {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
}

.score-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.score-header h4 {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
    margin: 0;
}

.score-value {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: #333;
}

.pill-gauge {
    height: 12px;
    background: #f0f0f0;
    border-radius: 6px;
    overflow: hidden;
    margin: 0.75rem 0;
    position: relative;
}

.pill-gauge::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: calc(var(--percentage) * 1%);
    background: var(--color);
    border-radius: 6px;
    transition: width 1s ease-in-out;
}

.score-description {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #666;
    margin: 0.75rem 0 0 0;
}

.return-button {
    display: block;
    margin: 2rem auto;
    padding: 1rem 2rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: opacity 0.2s ease;
}

.return-button:hover {
    opacity: 0.9;
}

.results-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.percentage {
    font-family: 'Inter', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin: 2rem 0;
}

.cta-section {
    background: var(--primary-color-light);
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    margin: 2rem 0;
}

.cta-section h3 {
    color: var(--primary-color);
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.cta-section p {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.5;
}

.cta-button {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(91, 95, 199, 0.2);
}

.cta-section.bottom {
    background: #fff;
    border: 2px solid var(--primary-color-light);
}

.score-message {
    margin-top: 2rem;
    text-align: left;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 1.5rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.score-message h3 {
    margin-bottom: 1rem;
    font-weight: 600;
}

.score-message p {
    line-height: 1.6;
    color: #333;
    margin: 0;
}

/* Add specific mobile adjustments */
@media (max-width: 320px) {
    .rating-scale {
        gap: 1px;
    }
    
    .rating-button {
        padding: 1px;
        font-size: 11px;
        border-radius: 2px;
    }
    
    .question-item {
        padding: 0.75rem;
    }
}

.recommendations {
    margin: 3rem auto;
    padding: 2.5rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    max-width: 600px;
}

.recommendations h3 {
    color: #173248;
    margin-bottom: 1.25rem;
    font-weight: 600;
    font-size: 1.5rem;
}

.recommendations p {
    color: #333;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.recommendations ul {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
}

.recommendations li {
    margin-bottom: 1.25rem;
    padding-left: 1.75rem;
    position: relative;
    line-height: 1.5;
}

.recommendations li:before {
    content: "→";  /* Changed to arrow for more strategic feel */
    color: var(--primary-color);
    position: absolute;
    left: 0;
    font-weight: bold;
}

.recommendations li strong {
    color: var(--primary-color);
    font-weight: 600;
    display: block;  /* Put each header on its own line */
    margin-bottom: 0.25rem;
}

.recommendation-footer {
    font-weight: 500;
    color: #173248;
    text-align: center;
    margin: 2rem 0 1rem 0;
}

@media (max-width: 768px) {
    .recommendations {
        padding: 1.5rem;
        margin: 2rem auto;
    }
    
    .recommendations h3 {
        font-size: 1.25rem;
    }
}

.close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    background: white;
    color: #666;
    font-size: 28px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.close-button:hover {
    background: #f5f5f5;
    color: #333;
}

.results-container {
    position: relative;
}

.options-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: none;
    align-items: flex-start;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
    padding-top: 5vh;
}

.options-popup.active {
    display: flex;
    opacity: 1;
}

.popup-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    position: relative;
    width: 90%;
    max-width: 400px;
    transform: translateY(-20px);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.popup-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.popup-option {
    padding: 1rem;
    background: #f8f8f8;
    border-radius: 4px;
    text-decoration: none;
    color: #333;
    transition: all 0.2s ease;
    font-weight: 500;
}

.popup-option:hover {
    background: var(--primary-color);
    color: white;
}

.popup-close {
    margin-top: 1.5rem;
    padding: 0.75rem 2rem;
    border: none;
    background: none;
    color: #666;
    cursor: pointer;
    font-size: 0.9rem;
}

.popup-close:hover {
    color: #333;
}

@media (max-width: 768px) {
    .popup-content {
        width: 95%;
        padding: 1.5rem;
    }
}

/* Small mobile optimization */
@media (max-width: 320px) {
    .options-popup {
        padding-top: 2vh;
    }
}

.question-number {
    font-weight: 600;
    color: var(--primary-color);
    margin-right: 0.5rem;
}

/* Mobile optimization for question numbers */
@media (max-width: 320px) {
    .question-number {
        display: inline-block;
        margin-bottom: 0.25rem;
    }
}

.share-section {
    text-align: center;
    margin: 2rem 0;
}

.share-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: white;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: all 0.2s ease;
}

.share-button:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-2px);
}

.share-button svg {
    transition: transform 0.2s ease;
}

.share-button:hover svg {
    transform: translateY(-2px);
}

/* Mobile optimization */
@media (max-width: 768px) {
    .share-button {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
}

.share-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
}

.share-popup.active {
    opacity: 1;
}

.share-popup-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    position: relative;
    width: 90%;
    max-width: 400px;
    transform: translateY(20px);
    transition: transform 0.3s ease;
}

.share-popup.active .share-popup-content {
    transform: translateY(0);
}

.share-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1.5rem;
}

.share-options button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
}

.share-options button:hover {
    background: var(--primary-color-light);
    border-color: var(--primary-color);
}

.copy-success {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #4CAF50;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    animation: fadeInOut 2s ease;
}

@keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, 20px); }
    15% { opacity: 1; transform: translate(-50%, 0); }
    85% { opacity: 1; transform: translate(-50%, 0); }
    100% { opacity: 0; transform: translate(-50%, -20px); }
}

@media (max-width: 768px) {
    .share-popup-content {
        padding: 1.5rem;
    }
    
    .share-options {
        gap: 0.75rem;
    }
    
    .share-options button {
        padding: 0.75rem;
        font-size: 0.9rem;
    }
}

.share-section.bottom {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    margin-top: 2rem;
    text-align: center;
    border: 1px solid var(--primary-color-light);
}

.share-section.bottom p {
    color: #666;
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

/* Mobile optimization */
@media (max-width: 768px) {
    .share-section.bottom {
        padding: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .share-section.bottom p {
        font-size: 0.9rem;
    }
}
