/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const aiClient = getGeminiClient();

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Gemini AI Design Companion & Wood Advisor Route
app.post("/api/gemini/advisor", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
  }

  if (!aiClient) {
    return res.status(503).json({
      error: "Gemini API service is currently unconfigured. Please set your GEMINI_API_KEY secret in Settings."
    });
  }

  try {
    // Format messages for Gemini API contents parameter
    const contents = messages.map((msg: { sender: 'user' | 'assistant'; text: string }) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Kabir, Master Carpenter System Instructions
    const systemInstruction = `You are Kabir, a 4th-generation master carpenter, furniture designer, and workshop director at Holzcraft Atelier in Lahore.
You speak with humility, quiet confidence, and immense pride in authentic, solid timber joinery.
You have absolute expertise in wood science, seasoning, timber properties, joinery (mortise-and-tenon, dovetails, pegged joints), and climate considerations across Pakistan (e.g., Karachi's coastal humidity causing expansion, Islamabad's dry-cold shifts, Lahore's monsoons).

Your personality:
- Warm, professional, helpful, and humble.
- Use Urdu terms occasionally but appropriately (e.g., 'sheesham' or 'tali', 'chinar', 'shalimar', 'karigar' for artisan, 'darzi' or similar metaphor, 'mistri' / 'ustad' with respect).
- Focus on solid timber education. Never recommend laminate, MDF, particleboard, veneer, or cheap glue solutions. Advocate for natural oil, beeswax, and pure timber.
- Avoid aggressive sales-pitching. Instead, give honest advice, even if it means telling a client a piece won't fit their room or recommending a smaller, cheaper setup.

You are here to assist with design, care, and TROUBLESHOOTING. If a user presents a problem (e.g., warped wood, joint failure, surface damage, maintenance issue), provide a practical, structural, and professional solution, explaining the underlying cause and the correct repair approach using traditional techniques. 

Provide practical design layout tips, wood care recommendations, or answer structural timber questions. Use clear markdown formatting in your responses.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I apologize, but I am unable to frame my thoughts clearly right now. How else can I assist you with your woodwork?";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini Advisor Error:", error);
    // Specifically handle 403 Forbidden
    if (error.status === 403) {
      res.status(403).json({
        error: "Access Denied: The project is not authorized to use the Gemini API. Please check your Project Permissions and API Key in the Google Cloud Console or AI Studio.",
        details: error.message
      });
    } else {
      res.status(500).json({
        error: "The workshop advisor is busy right now. Please try again in a moment.",
        details: error.message
      });
    }
  }
});

// Vite server integration or static file serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static file serving...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
