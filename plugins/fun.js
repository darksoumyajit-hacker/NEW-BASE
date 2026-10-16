import { Module } from "../lib/plugins.js";
const endpoints = {
  advice: "https://api.adviceslip.com/advice",
  joke: "https://official-joke-api.appspot.com/random_joke",
  fact: "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en",
  dadjoke: "https://icanhazdadjoke.com/",
};
async function getJson(url, headers = {}) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(8000), cache: "no-store" });
  if (!response.ok) throw new Error(`Provider returned HTTP ${response.status}`);
  return response.json();
}
Module({ command: "advice", package: "fun", description: "Get a random piece of advice" })(async message => {
  try { const d=await getJson(endpoints.advice); const text=d?.slip?.advice; if(!text) throw new Error("No advice returned"); return message.send(`✦ 𝐀𝐃𝐕𝐈𝐂𝐄\n\n${text}`); }
  catch { return message.send("⚠️ Advice service is temporarily unavailable. Try again shortly."); }
});
Module({ command: "joke", package: "fun", description: "Get a random joke" })(async message => {
  try { const d=await getJson(endpoints.joke); if(!d?.setup||!d?.punchline) throw new Error("No joke returned"); return message.send(`✦ 𝐉𝐎𝐊𝐄\n\n${d.setup}\n\n${d.punchline}`); }
  catch { return message.send("⚠️ Joke service is temporarily unavailable. Try again shortly."); }
});
Module({ command: "fact", package: "fun", description: "Get a random fact" })(async message => {
  try { const d=await getJson(endpoints.fact); const text=d?.text; if(!text) throw new Error("No fact returned"); return message.send(`✦ 𝐑𝐀𝐍𝐃𝐎𝐌 𝐅𝐀𝐂𝐓\n\n${text}`); }
  catch { return message.send("⚠️ Fact service is temporarily unavailable. Try again shortly."); }
});
Module({ command: "dadjoke", package: "fun", description: "Get a family-friendly dad joke" })(async message => {
  try { const d=await getJson(endpoints.dadjoke,{Accept:"application/json"}); const text=d?.joke; if(!text) throw new Error("No joke returned"); return message.send(`✦ 𝐃𝐀𝐃 𝐉𝐎𝐊𝐄\n\n${text}`); }
  catch { return message.send("⚠️ Dad-joke service is temporarily unavailable. Try again shortly."); }
});
