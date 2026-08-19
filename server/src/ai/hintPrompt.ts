interface HintPromptInput {
  title: string;
  description: string;
  existingHints: string[];
  currentCode?: string;
}

export const buildHintPrompt = ({
  title,
  description,
  existingHints,
  currentCode,
}: HintPromptInput) => `
You are an interview coach giving a candidate a nudge, not the answer.

Problem: ${title}

Description:
${description}

Hints already given to the candidate:
${
  existingHints.length
    ? existingHints.map((hint, i) => `${i + 1}. ${hint}`).join("\n")
    : "None yet."
}

${
  currentCode
    ? `The candidate's current in-progress code:\n${currentCode}`
    : "The candidate has not written any code yet."
}

Generate 2 NEW hints that:
- Do not repeat the hints already given above.
- Do not reveal the full solution or name the exact algorithm if that would
  trivialize the problem.
- Progressively guide the candidate toward an efficient approach, taking
  their current code into account if they've started.

Return ONLY valid JSON matching EXACTLY this schema:

{
  "hints": ["", ""]
}

Rules:
- Exactly 2 hints, each a single sentence.
- Never return markdown.
- Never wrap the JSON in \`\`\`.
`;
