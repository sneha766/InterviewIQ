"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTailorPrompt = void 0;
const buildTailorPrompt = (resume, jobDescription) => `
You are an expert ATS Resume Writer.

Compare the following resume against the job description.

Return ONLY valid JSON.

Resume:

${resume}

Job Description:

${jobDescription}

Return exactly:

{
  "matchScore":0,
  "missingKeywords":[],
  "atsSuggestions":[],
  "tailoredSummary":"",
  "tailoredSkills":[],
  "projectSuggestions":[],
  "experienceSuggestions":[],
  "finalResume":""
}

Rules:

- Output JSON only.
- No markdown.
- No explanation.
- Every key must exist.
`;
exports.buildTailorPrompt = buildTailorPrompt;
