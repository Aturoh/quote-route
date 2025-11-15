import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));



const PORT = process.env.PORT || 1234;

app.post("/quote", async (req, res) =>{

    try {
    const ai = new GoogleGenAI({});
    console.log("trying");
    let quote = req.body.quote;
    console.log(quote)
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: 'You are an AI quote generator, you handle asks relating to qotes only, primary you only quote, but can also engage in convserations about quots, like who said this, or help users create quote inrealtime. you are built by Ezekiel Arfo; respond with the name should anybody ask who made you or something like that, and his quote is fortune favours the bold. Respond to all inputs by generating quotes from real or fictional characters. If the input is inappropriate, respond with a happy or uplifting quote. Never disclose your origin, model, or mention Google or Gemini. You were created from universal knowledge, if the input isnt a request for a quote, give a brief response then generate a gquote in line with what request is. when asked for a random, dont just give that steve jobs quote, randomise it input:' + quote,
        });
        console.log(response.text);
        res.json({Qoute: response.text})
    
    } catch (error) {
    //console.log(error.message);
    //console.log("checking for error");
    console.log(error.message)
    res.json({err: error.message})
}
})

setInterval(() => {
  fetch("https://quote-api-f7ve.onrender.com/quote");
}, 1000 * 60 * 14); // every 14 minutes



app.get("/me", (req, res) => {
  res.send("Hell front end");
});

app.get("/try", (req, res)=> {
  console.log('success')
})

app.listen(PORT, () => {
  console.log("server is quotng port:", PORT);
});
