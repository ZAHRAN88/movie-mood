import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyCx0UzKnv4w-k0bBhLeSZfjvOW7CM7qljk");

const validMoods = ['happy', 
  'sad', 
  'excited', 
  'anxious', 
  'romantic', 
  'angry', 
  'nostalgic',
  'inspired',
  'adventurous',
  'relaxed',
  'mysterious',
  'thoughtful',
  'hopeful',
  'melancholic',
  'energetic',
  'scared',
  'peaceful',
  'curious'] as const;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Analyze this feeling and respond ONLY and ONLYYYY with one of these moods: ${validMoods.join(', ')}. Feeling: ${message}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawMood = response.text().toLowerCase();
    
    const validatedMood = validMoods.find(m => m === rawMood) || 'happy';
    
    return new Response(JSON.stringify({ mood: validatedMood }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      error: 'Mood analysis failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}