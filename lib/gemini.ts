const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = process.env.EXPO_PUBLIC_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export const generateSentence = async (
  sourceLanguage: string,
  word: string,
  level: string
): Promise<string> => {
  const maxRetries = 3;
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Yeni prompt formatı
      const prompt = `Return only this: a short ${level}-level ${sourceLanguage} sentence that includes the word \"${word}\". No translation. No explanation. Output format: [${sourceLanguage} SENTENCE ONLY]`;
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 503 && attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 1000));
          lastError = new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data: GeminiResponse = await response.json();
      const result = data.candidates[0]?.content?.parts[0]?.text?.trim() || '';
      return result;
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 1000));
      }
    }
  }
  throw lastError;
};

export const checkTranslation = async (
  sourceSentence: string,
  userTranslation: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> => {
  const maxRetries = 3;
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const prompt = `Source (${sourceLanguage}) sentence: "${sourceSentence}"
User's (${targetLanguage}) translation: "${userTranslation}"
If the given ${sourceLanguage} sentence and the user's ${targetLanguage} translation match, just write me "True". If the user's translation is wrong, just write me the correct ${targetLanguage} translation of the sentence. No explanation.`;
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 503 && attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 1000));
          lastError = new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data: GeminiResponse = await response.json();
      const result = data.candidates[0]?.content?.parts[0]?.text?.trim() || '';
      return result;
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 1000));
      }
    }
  }
  throw lastError;
};

// Test fonksiyonu - kaldırıldı
// export const testGeminiAPI = async (): Promise<boolean> => {
//   ...
// }; 