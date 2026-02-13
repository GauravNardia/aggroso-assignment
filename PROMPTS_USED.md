# PROMPTS_USED.md

This document contains representative prompts used during the development of SmartTracker.

Only prompts are included.  
LLM responses, API keys, and sensitive information are intentionally excluded.

---

## 1️⃣ Action Item Extraction Prompt

Extract action items from this meeting transcript.

```bash 
Return JSON in this exact format:

{
"actionItems": [
{
"task": "string",
"owner": "string | null",
"due_date": "string | null"
}
]
}

Important:

Always return valid JSON.

Always use the key name "actionItems".

Do not include explanations.

Do not wrap in markdown.

Do not add extra fields.

Transcript:
<transcript>
```

Purpose:
Used inside `/api/extract` to generate structured task data from raw meeting transcripts.



## 2️⃣ Database Schema Design Prompt

### Prompt
Design a minimal PostgreSQL schema for storing meeting transcripts and extracted action items with a one-to-many relationship.

Each transcript can have multiple tasks.
Each task should include:

 - task text
 - owner
 - due date
 - completion status
 - timestamps

 ### Purpose

Used during layout and component planning.

---

## Notes

- All AI suggestions were reviewed manually.
- No blind copy-pasting was done.
- All critical logic was tested locally.
- Schema design, API routes, and state management were verified independently.

