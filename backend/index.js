const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/market-summary", async (req, res) => {
  try {
    const tickers = ["PETR4", "VALE3", "ITUB4", "BBDC4", "ABEV3"];
    const response = await axios.get(`https://brapi.dev/api/quote/${tickers.join(",")}`);
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching from brapi.dev:", error.message);
    res.status(500).json({ error: "Erro ao buscar dados do mercado." });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
