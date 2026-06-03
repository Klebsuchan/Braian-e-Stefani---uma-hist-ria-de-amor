export default async function handler(req, res) {
  try {
    const apiKey = process.env.PEXELS_API_KEY;
    if (!apiKey) {
      return res.status(401).json({ error: "PEXELS_API_KEY não configurada na Vercel" });
    }

    const response = await fetch("https://api.pexels.com/v1/search?query=romantic+couple+hugging&per_page=15&orientation=portrait", {
      headers: {
        'Authorization': apiKey
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Erro na API do Pexels" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro no serverless da Vercel:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
