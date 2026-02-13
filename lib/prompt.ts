export const extractionPrompt = (transcript: string) => `
Extract action items from the meeting transcript below.

You MUST return ONLY valid JSON.
Do NOT include explanations.
Do NOT wrap the result in markdown.
Do NOT add extra keys.
Do NOT rename keys.
Do NOT use snake_case.
Do NOT use different casing.

The JSON MUST match this exact structure:

{
  "actionItems": [
    {
      "task": string,
      "owner": string | null,
      "due_date": string | null
    }
  ]
}

Rules:
- Use camelCase exactly as shown.
- The top-level key must be "actionItems".
- If no tasks are found, return:
  { "actionItems": [] }

Transcript:
${transcript}
`;
