export const buildEvaluationPrompt = (
  questions: unknown,
  answers: unknown
) => `
Evaluate these interview answers.

Questions:

${JSON.stringify(questions)}

Answers:

${JSON.stringify(answers)}

Return ONLY JSON.

{
  "score":90,

  "strengths":[],

  "weaknesses":[],

  "feedback":[],

  "improvements":[]

}
`;