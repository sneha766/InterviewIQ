export const buildInterviewPrompt = (
  role: string,
  type: string,
  difficulty: string
) => `
You are an experienced technical interviewer.

Generate exactly 10 interview questions.

Role:
${role}

Interview Type:
${type}

Difficulty:
${difficulty}

Return ONLY valid JSON.

{
  "questions":[
    {
      "id":1,
      "question":"",
      "category":"",
      "expectedAnswer":""
    }
  ]
}

Rules:

- No markdown.
- No explanations.
- Only JSON.
`;