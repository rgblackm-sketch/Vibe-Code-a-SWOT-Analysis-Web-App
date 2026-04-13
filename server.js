const express = require('express');
const { pipeline } = require('@xenova/transformers');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// No API key needed for local LLM
console.log('Using local LLM with Transformers.js - no API key required!');

// Initialize the text generation pipeline (will download model on first use)
let generator;
async function initModel() {
  try {
    console.log('Loading local LLM model... This may take a few minutes on first run.');
    generator = await pipeline('text-generation', 'Xenova/distilgpt2');
    console.log('Local LLM model loaded successfully!');
  } catch (error) {
    console.error('Error loading model:', error);
  }
}
initModel();

// Function to generate detailed analysis text
function generateDetailedAnalysis(factor, context, isOpportunity = false) {
  const sentences = [];
  
  if (!factor || factor.trim() === '') {
    return isOpportunity 
      ? 'No opportunities identified at this time. Consider exploring emerging market trends and potential partnerships.'
      : 'No concerns identified in this category. Continue to monitor this area regularly.';
  }

  sentences.push(`${context} the organization has identified: ${factor}.`);
  
  // Add context-specific analysis for each category
  if (context.includes('Strength')) {
    sentences.push('These assets can be leveraged as key differentiators in addressing the business challenge.');
    sentences.push('Consider how these capabilities can be amplified or extended to create competitive advantage.');
  } else if (context.includes('Weakness')) {
    sentences.push('These limitations may constrain the organization\'s ability to respond effectively to the challenge.');
    sentences.push('Addressing these gaps should be prioritized to improve operational resilience and capability.');
  } else if (context.includes('Opportunit')) {
    sentences.push('These external conditions present strategic openings that could accelerate growth and success.');
    sentences.push('The organization should evaluate how to position itself to capture maximum value from these trends.');
  } else if (context.includes('Threat')) {
    sentences.push('These external risks could negatively impact outcomes and require proactive mitigation strategies.');
    sentences.push('Developing contingency plans and defensive strategies will be important for protecting value.');
  }
  
  return sentences.join(' ');
}

// Function to generate strategic insights
function generateStrategicInsights(strengths, weaknesses, opportunities, threats) {
  const insights = [];
  
  // Connection between strengths and opportunities
  if ((strengths || '').trim() && (opportunities || '').trim()) {
    insights.push('The organization\'s identified strengths position it well to act on emerging opportunities, creating potential for strategic expansion and market share growth.');
  }
  
  // Weakness and threat analysis
  if ((weaknesses || '').trim() && (threats || '').trim()) {
    insights.push('However, existing internal weaknesses combined with external threats create vulnerability that should be addressed proactively through capability building and risk mitigation.');
  }
  
  // Tradeoff analysis
  if (insights.length > 0) {
    insights.push('The organization faces a classic strategic tradeoff: capitalizing on near-term opportunities while simultaneously investing in long-term capability development. Success requires effective resource allocation and prioritization of initiatives that address both opportunities and vulnerabilities.');
  }
  
  return insights.length > 0 
    ? insights.join(' ') 
    : 'The SWOT analysis highlights the need for balanced strategy that leverages internal strengths while mitigating internal weaknesses and external risks.';
}

// Function to generate detailed action steps
function generateActionSteps(problem, strengths, weaknesses, opportunities, threats) {
  const steps = [];
  
  // Step 1: Assessment
  steps.push({
    number: 1,
    title: 'Conduct a Comprehensive Capability and Resource Assessment',
    explanation: 'Before proceeding, evaluate existing resources, team capabilities, and organizational capacity to address this challenge. This assessment should validate the identified weaknesses and confirm available strengths for deployment.'
  });
  
  // Step 2: Opportunity-focused
  if ((opportunities || '').trim()) {
    steps.push({
      number: 2,
      title: 'Develop an Opportunity Capture Strategy',
      explanation: 'Identify specific actions to position the organization to benefit from the external opportunities identified. Align resource allocation and timelines with opportunity windows to maximize strategic advantage.'
    });
  } else {
    steps.push({
      number: 2,
      title: 'Research Market and External Conditions',
      explanation: 'Conduct market research to identify emerging opportunities and trends that could support the organization\'s strategic objectives and help address the core problem.'
    });
  }
  
  // Step 3: Strength leveraging
 if ((strengths || '').trim()) {
    steps.push({
      number: 3,
      title: 'Design Actions That Leverage Core Strengths',
      explanation: 'Create specific initiatives that activate the organization\'s identified strengths to directly address the problem. This focused approach increases success probability and ROI.'
    });
  } else {
    steps.push({
      number: 3,
      title: 'Identify and Recruit Critical Capabilities',
      explanation: 'Determine what capabilities are essential for success and develop sourcing strategies (hiring, partnerships, training) to acquire them quickly.'
    });
  }
  
  // Step 4: Risk mitigation
  if ((threats || '').trim() || (weaknesses || '').trim()) {
    steps.push({
      number: 4,
      title: 'Implement Risk Mitigation and Contingency Planning',
      explanation: 'Develop proactive safeguards against identified threats and mitigating plans for internal weaknesses. Include early warning indicators and trigger-based response protocols.'
    });
  } else {
    steps.push({
      number: 4,
      title: 'Establish Performance Monitoring Framework',
      explanation: 'Create KPIs and monitoring mechanisms to track progress and identify emerging risks or opportunities that may require strategy adjustment.'
    });
  }
  
  // Step 5: Implementation
  steps.push({
    number: 5,
    title: 'Create a Phased Implementation Roadmap',
    explanation: 'Develop a detailed timeline with milestones, responsibilities, and resource requirements. Consider starting with a pilot or proof-of-concept to validate assumptions before full-scale deployment.'
  });
  
  // Step 6: Review and Adapt
  steps.push({
    number: 6,
    title: 'Establish Ongoing Review and Adaptation Cycles',
    explanation: 'Build in regular review points (monthly or quarterly) to assess progress, validate assumptions, and adapt tactics based on real-world results and changing conditions.'
  });
  
  return steps;
}

// Function to generate priority recommendation
function generatePriorityRecommendation(strengths, weaknesses, opportunities, threats, problem) {
  let recommendation = '';
  const hasStrengths = (strengths || '').trim().length > 0;
  const hasWeaknesses = (weaknesses || '').trim().length > 0;
  const hasOpportunities = (opportunities || '').trim().length > 0;
  const hasThreats = (threats || '').trim().length > 0;
  
  // Assess readiness level
  const readinessScore = (hasStrengths ? 1 : 0) + (hasOpportunities ? 1 : 0);
  const riskScore = (hasWeaknesses ? 1 : 0) + (hasThreats ? 1 : 0);
  
  if (readinessScore > riskScore) {
    recommendation = 'The organization\'s strengths and market opportunities generally outweigh internal weaknesses and external threats. Recommendation: Proceed with strategic initiative, potentially starting with a pilot phase to validate assumptions and build organizational momentum. Ensure robust monitoring and contingency plans are in place for identified risks.';
  } else if (riskScore > readinessScore) {
    recommendation = 'Internal weaknesses and external threats represent significant concerns that could impede success. Recommendation: Invest in addressing critical capability gaps before full-scale implementation. Consider smaller, lower-risk initiatives first to build organizational capability and confidence, then expand scope as readiness increases.';
  } else {
    recommendation = 'The organization faces balanced opportunities and constraints. Recommendation: Pursue a measured approach with emphasis on building necessary capabilities while capitalizing on near-term opportunities. Use early successes to generate momentum and organizational buy-in for larger initiatives. Maintain flexibility to adjust course based on results.';
  }
  
  return recommendation;
}

// API endpoint for generating SWOT report
app.post('/api/generate-report', async (req, res) => {
  try {
    const { problem, strengths, weaknesses, opportunities, threats } = req.body;

    // Validate required fields
    if (!problem || problem.trim() === '') {
      return res.status(400).json({
        error: 'Please provide a problem description.'
      });
    }

    // Generate detailed, professional report using intelligent templates
    const problemSummary = `The organization is addressing the following strategic challenge: ${problem}. This challenge requires careful analysis of internal capabilities and external market conditions to develop an effective response strategy. Understanding the interplay between organizational strengths, limitations, external opportunities, and competitive threats is essential for developing an informed action plan.`;
    
    // Generate SWOT interpretations
    const swotInterpretation = {
      strengths: generateDetailedAnalysis(strengths, 'Among its key internal assets'),
      weaknesses: generateDetailedAnalysis(weaknesses, 'The organization recognizes'),
      opportunities: generateDetailedAnalysis(opportunities, 'Looking outward, the organization has identified', true),
      threats: generateDetailedAnalysis(threats, 'External risks that deserve attention include')
    };
    
    // Generate strategic insights
    const strategicInsights = generateStrategicInsights(strengths, weaknesses, opportunities, threats);
    
    // Generate action steps
    const actionStepsData = generateActionSteps(problem, strengths, weaknesses, opportunities, threats);
    const actionSteps = actionStepsData.map(step => `${step.title}: ${step.explanation}`);
    
    // Generate priority recommendation
    const priorityRecommendation = generatePriorityRecommendation(strengths, weaknesses, opportunities, threats, problem);

    // Return structured data
    res.json({
      problemSummary,
      swot: {
        strengths: strengths || '',
        weaknesses: weaknesses || '',
        opportunities: opportunities || '',
        threats: threats || ''
      },
      swotInterpretation,
      strategicInsights,
      actionSteps,
      priorityRecommendation
    });

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      error: 'Failed to generate SWOT report. Please try again.'
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SWOT Analysis App running on http://localhost:${PORT}`);
  console.log('Make sure GEMINI_API_KEY is set in your environment variables');
});