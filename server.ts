import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Endpoint para buscar fotos do Pexels
  app.get("/api/photos", async (req, res) => {
    try {
      const apiKey = process.env.PEXELS_API_KEY;
      if (!apiKey) {
        return res.status(401).json({ error: "PEXELS_API_KEY não configurada" });
      }

      // Buscar imagens de casais românticos
      const response = await fetch("https://api.pexels.com/v1/search?query=romantic+couple+hugging&per_page=15&orientation=portrait", {
        headers: {
          'Authorization': apiKey
        }
      });
      
      if (!response.ok) {
        return res.status(response.status).json({ error: "Erro na API do Pexels" });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
