"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEvaluationPrompt = void 0;
const buildEvaluationPrompt = (questions, answers) => `
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
exports.buildEvaluationPrompt = buildEvaluationPrompt;
