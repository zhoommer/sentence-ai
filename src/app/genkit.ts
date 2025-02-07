"use server";

import { gemini15Flash, googleAI } from "@genkit-ai/googleai";
import { genkit, z } from "genkit";

import dotenv from "dotenv";

dotenv.config();

const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash,
});

export const createTurkishSentese = ai.defineFlow(
  {
    name: "createTurkishSentese",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (word: string) => {
    const { text } = await ai.generate({
      model: gemini15Flash,
      system:
        "Gelen promptla ilgili türkçe bir cümle kur. Bu cümle ingilizce orta seviyesinde olsun ve yalnızca Türkçe cümle kur. İngilizce karşılığını oluşturma.",
      prompt: `${word}`,
    });
    return text;
  },
);
