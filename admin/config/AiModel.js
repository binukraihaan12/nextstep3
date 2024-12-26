import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDifjXf8N_rf2Jg6C_9s9lGkzFDM26ZcL8";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const EnchanceDescription = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Enhance the following teacher outline into a small but detailed professional description:\nA teacher of English, Counsellor, and Trainer.\nWent to Advance Technology Institute.\nWent to MES Campus\nStudied at University of Ruhuna, Matara, Sri Lanka\nLives in Badulla, Sri Lanka\nFrom Badulla",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "A highly motivated and experienced professional based in Badulla, Sri Lanka, offering expertise in English language instruction, counseling, and training.  My background encompasses studies at the University of Ruhuna, Matara, Sri Lanka, further enhanced by training at the Advance Technology Institute and MES Campus.  I am dedicated to providing supportive and effective learning experiences across diverse contexts.\n",
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
