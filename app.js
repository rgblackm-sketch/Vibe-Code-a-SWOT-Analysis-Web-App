// SWOT Analysis Form Validation and Submission
document.getElementById('swot-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const problemField = document.getElementById('problem');
    const problem = problemField.value.trim();

    // Remove any existing error message
    const existingError = problemField.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    if (!problem) {
        // Add error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Please describe the problem your organization is facing.';
        errorMsg.style.color = '#e74c3c';
        errorMsg.style.fontSize = '0.9rem';
        errorMsg.style.marginTop = '0.5rem';
        problemField.parentNode.appendChild(errorMsg);

        // Focus on the field
        problemField.focus();
        return;
    }

    // Collect form data
    const formData = {
        problem,
        strengths: document.querySelector('textarea[name="strengths"]').value.trim(),
        weaknesses: document.querySelector('textarea[name="weaknesses"]').value.trim(),
        opportunities: document.querySelector('textarea[name="opportunities"]').value.trim(),
        threats: document.querySelector('textarea[name="threats"]').value.trim()
    };

    // Show loading state
    const btn = document.getElementById('generate-btn');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Generating your SWOT report...';

    try {
        // Send data to backend
        const response = await fetch('/api/generate-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to generate report');
        }

        const data = await response.json();

        // Hide form and show report
        document.getElementById('build-swot').style.display = 'none';
        document.getElementById('report-section').style.display = 'block';

        // Render the detailed report
        renderDetailedReport(data);

        // Scroll to report
        document.getElementById('report-section').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        alert('Error generating report: ' + error.message);
    } finally {
        // Reset button
        btn.disabled = false;
        btn.textContent = originalText;
    }
});

// Render the detailed SWOT report
function renderDetailedReport(data) {
    const content = document.getElementById('report-content');

    content.innerHTML = `
        <div class="report-item">
            <h3>Problem Overview</h3>
            <p>${escapeHtml(data.problemSummary)}</p>
        </div>

        <div class="report-item">
            <h3>Your SWOT Inputs</h3>
            <div class="swot-summary-grid">
                <div class="summary-card strength">
                    <h4>Strengths</h4>
                    <p>${escapeHtml(data.swot.strengths) || '<em>None provided</em>'}</p>
                </div>
                <div class="summary-card weakness">
                    <h4>Weaknesses</h4>
                    <p>${escapeHtml(data.swot.weaknesses) || '<em>None provided</em>'}</p>
                </div>
                <div class="summary-card opportunity">
                    <h4>Opportunities</h4>
                    <p>${escapeHtml(data.swot.opportunities) || '<em>None provided</em>'}</p>
                </div>
                <div class="summary-card threat">
                    <h4>Threats</h4>
                    <p>${escapeHtml(data.swot.threats) || '<em>None provided</em>'}</p>
                </div>
            </div>
        </div>

        <div class="report-item">
            <h3>Strategic Analysis & Interpretation</h3>
            
            <div class="interpretation-section">
                <div class="interpretation-item strength-item">
                    <h4>Strengths: How Your Assets Support Success</h4>
                    <p>${escapeHtml(data.swotInterpretation.strengths)}</p>
                </div>
                
                <div class="interpretation-item weakness-item">
                    <h4>Weaknesses: Internal Constraints to Address</h4>
                    <p>${escapeHtml(data.swotInterpretation.weaknesses)}</p>
                </div>
                
                <div class="interpretation-item opportunity-item">
                    <h4>Opportunities: External Trends You Can Leverage</h4>
                    <p>${escapeHtml(data.swotInterpretation.opportunities)}</p>
                </div>
                
                <div class="interpretation-item threat-item">
                    <h4>Threats: External Risks to Monitor</h4>
                    <p>${escapeHtml(data.swotInterpretation.threats)}</p>
                </div>
            </div>
        </div>

        <div class="report-item">
            <h3>Strategic Insights & Implications</h3>
            <p>${escapeHtml(data.strategicInsights)}</p>
        </div>

        <div class="report-item">
            <h3>Recommended Action Steps</h3>
            <ol class="action-list">
                ${data.actionSteps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
            </ol>
        </div>

        <div class="report-item priority-section">
            <h3>Strategic Recommendation</h3>
            <p><strong>${escapeHtml(data.priorityRecommendation)}</strong></p>
        </div>
    `;
}

// Helper function to escape HTML special characters
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Edit inputs button
document.getElementById('edit-btn').addEventListener('click', () => {
    document.getElementById('report-section').style.display = 'none';
    document.getElementById('build-swot').style.display = 'block';
    // Scroll back to form
    document.getElementById('build-swot').scrollIntoView({ behavior: 'smooth' });
});

// Generate new report button
document.getElementById('new-report-btn').addEventListener('click', () => {
    // Clear the form
    document.getElementById('swot-form').reset();
    // Hide report and show form
    document.getElementById('report-section').style.display = 'none';
    document.getElementById('build-swot').style.display = 'block';
    // Scroll to form
    document.getElementById('build-swot').scrollIntoView({ behavior: 'smooth' });
});