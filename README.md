# Vibe-Code-a-SWOT-Analysis-Web-App

An interactive SWOT analysis web application that helps users analyze business problems and generate AI-powered strategic recommendations.

## Features

- **Educational Section**: Learn what SWOT analysis is and how it works
- **Interactive Form**: Input your organization's problem and SWOT factors
- **AI-Powered Reports**: Generate personalized action steps using Google Gemini AI
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```
**Note**: First run will download the AI model (~200MB), which may take a few minutes.

### 2. Run the Application
```bash
npm start
```

### 3. Open in Browser
Navigate to `http://localhost:3000`

## How It Works

This app uses a **local AI model** that runs entirely on your machine:
- **No API keys required**
- **No internet connection needed** for AI generation
- **Completely free** - no usage costs
- **Privacy-focused** - all data stays local

The local model (DistilGPT-2) provides intelligent SWOT analysis while keeping everything private and cost-free.

## How to Use

1. **Read the Educational Content**: Learn about SWOT analysis fundamentals
2. **Describe Your Problem**: Enter the business challenge you're facing
3. **Fill in SWOT Factors**: Add your organization's strengths, weaknesses, opportunities, and threats
4. **Generate Report**: Click "Generate Report" to get AI-powered recommendations
5. **Review Results**: Get actionable steps, risk assessments, and next move suggestions

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **AI**: Local LLM using Transformers.js (DistilGPT-2)
- **Styling**: Custom CSS with responsive design

## Development

This project was built in phases:
- **Phase 1**: Educational content about SWOT analysis
- **Phase 2**: Interactive form for user input
- **Phase 3**: AI-powered report generation