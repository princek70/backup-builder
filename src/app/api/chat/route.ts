import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[API SETUP ERROR]: GEMINI_API_KEY is missing from the environment variables.');
      return NextResponse.json(
        { error: 'AI Assistant is offline (API Key Missing)' },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { messages, resumeData } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: 'You are a professional Career Coach. RULES:\n1. Brevity: No long explanations, conversational intros, or general tips.\n2. Direct Edits: When asked to improve a section, provide the exact rewritten bullet points immediately (3-5 high-impact options).\n3. Contextual Focus: Base changes ONLY on the provided resume data. Do not invent hypothetical roles like "Senior Designer" unless they exist in the text.\n4. Format: Use a clean, minimal bullet-point format. strictly NO MORE than 100 words per response.',
    });

    const aiHistory = [
      {
        role: 'user',
        parts: [{ text: `Here is my live resume data snapshot for context throughout our session:\n\n${JSON.stringify(resumeData, null, 2)}\n\nPlease aggressively base your advice around this dataset. Acknowledge and wait for my instruction.` }]
      },
      {
        role: 'model',
        parts: [{ text: 'Acknowledged. I have consumed your resume structure mapping your personal details, sections, and items. I am securely operating as your AI Career Coach. How can I refine this for you today?' }]
      }
    ];

    // Push the chat history up until the last message
    for (let i = 0; i < messages.length - 1; i++) {
        // Exclude system/mock initial
        if (messages[i].role === 'system' || messages[i].text.includes('Hi! I can instantly modify')) continue;
        
        aiHistory.push({
            role: messages[i].role === 'agent' ? 'model' : 'user',
            parts: [{ text: messages[i].text }]
        });
    }

    const chat = model.startChat({ history: aiHistory });

    const userLastMessage = messages[messages.length - 1].text;
    const result = await chat.sendMessage(userLastMessage);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error('Gemini API Integration Error:', error);
    return NextResponse.json({ error: error.message || 'An undocumented error occurred executing the generative model request.' }, { status: 500 });
  }
}
