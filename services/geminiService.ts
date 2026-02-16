
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAdvisorReport = async (prompt: string, template: string, context: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `
      You are the "MY-BIZ ADVISOR AI", a senior consultant for Malaysian SMEs.
      Template Type: ${template}
      Contextual Data: ${JSON.stringify(context)}
      User Request: ${prompt}
      
      Instructions:
      1. Analyze the demographic breakdown provided.
      2. Suggest specific Item Categories that would thrive in this segment.
      3. Propose a WhatsApp-first campaign strategy.
      4. Use Malaysian business terminology (SST, Halal, Cash-on-Delivery, e-wallet).
      
      Format your response as a structured executive brief with:
      - Executive Summary
      - Demographic Opportunity Analysis
      - WhatsApp Campaign Blueprint
      - Risk Mitigation (e.g., Scams, Logistics)
    `,
    config: {
      temperature: 0.8,
      thinkingConfig: { thinkingBudget: 8000 }
    }
  });
  return response.text;
};

export const getAdStrategyInsights = async (businessNiche: string, targetClass: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Compare WhatsApp Business, TikTok, and FB Ads for a Malaysian business in the "${businessNiche}" niche targeting the "${targetClass}" group. Provide a prioritized 1-2-3 implementation plan.`,
    config: {
      temperature: 0.7
    }
  });
  return response.text;
};

export const generateAudienceData = async (niche: string) => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a target audience profile for a Malaysian SME selling ${niche}. Include location, age, social class, and WhatsApp behavior.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            location: { type: Type.STRING },
            ageRange: { type: Type.STRING },
            spendingClass: { type: Type.STRING },
            behavior: { type: Type.STRING },
            strategy: { type: Type.STRING }
          },
          required: ["name", "location", "ageRange", "spendingClass", "behavior", "strategy"]
        }
      }
    });
    return JSON.parse(response.text);
};
