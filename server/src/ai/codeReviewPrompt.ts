interface CodeReviewPromptInput {
  language: string;
  code: string;
  problemTitle?: string;
  problemDescription?: string;
}

export const buildCodeReviewPrompt = ({
  language,
  code,
  problemTitle,
  problemDescription,
}: CodeReviewPromptInput) => `
You are a senior software engineer conducting a technical interview code
review. Be honest and specific — do not inflate scores for weak solutions.

${problemTitle ? `Problem: ${problemTitle}` : ""}
${problemDescription ? `Problem description:\n${problemDescription}` : ""}

Language: ${language}

Candidate's code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY valid JSON matching EXACTLY this schema:

{
  "score": 0,
  "readability": 0,
  "maintainability": 0,
  "bugs": 0,
  "complexity": "",
  "spaceComplexity": "",
  "security": "",
  "strengths": [],
  "improvements": [],
  "recommendations": [
    { "type": "success", "title": "", "description": "" }
  ]
}

Rules:
- "score", "readability", "maintainability" are integers from 0-100.
- "bugs" is a count of likely bugs or correctness issues (0 if none found).
- "complexity" and "spaceComplexity" are Big-O strings, e.g. "O(n)", "O(n^2)", "O(1)".
- "security" is one of: "Excellent", "Good", "Needs Improvement", "Poor".
- "strengths" and "improvements" are short, specific bullet points (max 5 each).
- "recommendations" has 2-4 items; "type" is one of "success", "warning", "info".
- Never return markdown.
- Never wrap the JSON in \`\`\`.
- Never omit a field.
`;
