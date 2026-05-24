import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const toBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });

export async function analyzeResume(
    file: File | Blob,
    prompt: string
): Promise<Feedback> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const base64 = await toBase64(file);

    const result = await model.generateContent([
        { inlineData: { data: base64, mimeType: "application/pdf" } },
        prompt,
    ]);

    const text = result.response.text().replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(text) as Feedback;
}
