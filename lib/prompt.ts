export const extractionPrompt = (transcript: string) => `
Extract action items from this meeting transcript.

Return JSON in this format:
[
  {
    "task": "string",
    "owner": "string | null",
    "dueDate": "string | null"
  }
]

Transcript:
${transcript}
`;
