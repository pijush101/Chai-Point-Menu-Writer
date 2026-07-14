import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please configure it in your Secrets / Environment.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.post("/api/write-description", async (req, res) => {
  try {
    const { dishName, ingredients } = req.body;
    if (!dishName || !dishName.trim()) {
      return res.status(400).json({ error: "Dish name is required." });
    }
    if (!ingredients || !ingredients.trim()) {
      return res.status(400).json({ error: "Ingredients are required." });
    }

    const ai = getAIClient();
    
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Dish Name: ${dishName.trim()}\nKey Ingredients: ${ingredients.trim()}`,
      config: {
        systemInstruction: "You are a food copywriter for Chai Point, a cosy Kolkata café. Write ONE mouth-watering menu description (35-45 words) for the dish below. Warm, sensory, inviting. No emojis, no exaggerated claims.",
        temperature: 0.7,
      },
    });

    const description = response.text?.trim() || "";
    return res.json({ description });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return res.status(500).json({ error: err.message || "An unexpected error occurred." });
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Vite or static file serving
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

initializeServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
