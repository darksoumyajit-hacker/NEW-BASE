import { createRequire } from "module";
import config from "../config.js";
import { Module } from "../lib/plugins.js";
const require = createRequire(import.meta.url);
const catalog = require("../commandCatalog.json");

const runtime = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(sec).padStart(2, "0")}s`;
};
const MONO = Object.fromEntries([ ..."ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴩqʀꜱᴛᴜᴠᴡxʏᴢ" ].map((c, i) => [c, String.fromCodePoint(0x1D670 + i)]));
const style = (v = "") => [...String(v)].map(ch => MONO[ch.toUpperCase()] || ch).join("");

const CATEGORY_ALIASES = {
  anime: ["anime", "image", "images", "img"],
  media: ["media", "tool", "tools", "sticker"],
  group: ["group", "groups", "management", "gc"],
  ai: ["ai", "utility", "utilities", "util"],
  other: ["other", "misc", "miscellaneous"],
  download: ["download", "downloader", "downloaders", "dl"],
  dev: ["dev", "developer", "development", "coding"],
  protect: ["protect", "protection", "security", "anti"],
  general: ["general", "owner", "basic"],
  preference: ["preference", "preferences", "setting", "settings"],
  whatsapp: ["whatsapp", "wa", "owner whatsapp"],
  rahul-spc: ["rahul-spc", "extra", "extras"]
};

function findCategory(requested) {
  const q = String(requested || "").trim().toLowerCase().replace(/[._-]/g, " ");
  if (!q) return null;
  const exact = Object.entries(catalog).find(([name]) => name.toLowerCase() === q);
  if (exact) return exact;
  const aliasKey = Object.keys(CATEGORY_ALIASES).find(k => CATEGORY_ALIASES[k].includes(q));
  if (aliasKey) {
    const match = Object.entries(catalog).find(([name]) => {
      const n = name.toLowerCase();
      return (aliasKey === "anime" && n.includes("anime")) ||
        (aliasKey === "media" && n.includes("media")) ||
        (aliasKey === "group" && n.includes("group management")) ||
        (aliasKey === "ai" && n.includes("utility")) ||
        (aliasKey === "other" && n.includes("other")) ||
        (aliasKey === "download" && n.includes("download")) ||
        (aliasKey === "dev" && n.includes("dev tools")) ||
        (aliasKey === "protect" && n.includes("protect")) ||
        (aliasKey === "general" && n.includes("general")) ||
        (aliasKey === "preference" && n.includes("preference")) ||
        (aliasKey === "whatsapp" && n.includes("owner & whatsapp")) ||
        (aliasKey === "rahul-spc" && n.includes("rahul-spc"));
    });
    if (match) return match;
  }
  return Object.entries(catalog).find(([name]) => name.toLowerCase().includes(q) || q.includes(name.toLowerCase().replace("✦", "").trim())) || null;
}

function mainMenu() {
  const categories = Object.entries(catalog).map(([name, commands], i) => {
    const short = name.replace(/^✦\s*/, "").replace(/[ᴄᴀᴛɪᴏɴᴜᴅᴇʀꜱɢʜʏʟᴍᴘ&✦]/g, "").trim();
    return `*${String(i + 1).padStart(2, "0")}.* ${name}  _(${commands.length})_`;
  });
  return [
    `*╭━━〔 ✦ ${config.BOT_NAME || "𝐑ᴀʜᴜʟ 𝐗ᴍᴅ"} ✦ 〕━━╮*`,
    `*┃ ${config.BOT_TAGLINE || "Beyond ordinary automation."}*`,
    `*┃ Prefix: ${config.prefix || "."}*`,
    `*┃ Version: ${config.VERSION || config.version || "1.0.0"}*`,
    `*┃ Uptime: ${runtime(process.uptime())}*`,
    `*╰━━━━━━━━━━━━━━━━━━╯*`,
    "",
    "*┆✧┆⌯⌲ 𝐌ᴇɴᴜ'ꜱ 𝐂ᴀᴛᴇɢᴏʀʏ*",
    ...categories,
    "",
    `*𝐎ᴩᴇɴ 𝐀ɴʏ 𝟏:*`,
    `• ${config.prefix || "."}menu group`,
    `• ${config.prefix || "."}menu media`,
    `• ${config.prefix || "."}menu ai`,
    `• ${config.prefix || "."}menu download`,
    `• ${config.prefix || "."}menu rahul-spc`,
    "",
    "*┆✧┆⌯⌲ 𝐐ᴜɪᴄᴋ 𝐂ᴀᴛᴇɢᴏʀɪᴇꜱ*",
    `• ${config.prefix || "."}alive`,
    `• ${config.prefix || "."}ping`,
    `• ${config.prefix || "."}owner`,
    `• ${config.prefix || "."}developer`,
    "",
    "_Tip: command names in this menu are a catalog; availability depends on the installed plugin._",
    `*Powered by ${config.BOT_NAME || "𝐑ᴀʜᴜʟ 𝐗ᴍᴅ"}*`
  ].join("\n");
}

Module({ command: "menu", aliases: ["listmenu"], package: "general", description: "Open the WhatsApp category command menu" })(async (message, match) => {
  const requested = String(match || "").trim();
  const prefix = config.prefix || ".";
  if (requested) {
    const entry = findCategory(requested);
    if (!entry) {
      const available = Object.keys(catalog).map(k => k.replace(/^✦\s*/, "")).join("\n");
      return message.send(`*Unknown category:* ${requested}\n\n*Available categories:*\n${available}\n\nExample: ${prefix}menu group`);
    }
    const [category, commands] = entry;
    const body = [
      `*╭━━〔 ${category} 〕━━╮*`,
      `*Commands: ${commands.length}*`,
      "",
      ...commands.map(c => `┆✧┆⌯⌲ ${prefix}${style(c)}`),
      "",
      `*Back to categories:* ${prefix}menu`,
      `*Powered by ${config.BOT_NAME || "𝐑ᴀʜᴜʟ 𝐗ᴍᴅ"}*`
    ].join("\n");
    await message.react("📂").catch(() => {});
    return message.send(body);
  }

  const text = mainMenu();
  const contextInfo = config.WA_CHANNEL_JID ? {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: config.WA_CHANNEL_JID,
      newsletterName: config.WA_CHANNEL_NAME || config.BOT_NAME,
      serverMessageId: 1
    }
  } : {};
  const payload = {
    text,
    footer: `© ${config.BOT_NAME || "𝐑ᴀʜᴜʟ 𝐗ᴍᴅ"} · Category-wise menu`,
    buttons: [
      { buttonId: `${prefix}owner`, buttonText: { displayText: "👑 Owner" }, type: 1 },
      { buttonId: `${prefix}developer`, buttonText: { displayText: "🛠️ Developer" }, type: 1 }
    ],
    headerType: 1,
    contextInfo
  };
  try {
    if (config.BOT_PIC_URL) {
      await message.conn.sendMessage(message.from, { image: { url: config.BOT_PIC_URL }, caption: text, footer: payload.footer, buttons: payload.buttons, headerType: 4, contextInfo }, { quoted: message.gift });
    } else {
      await message.conn.sendMessage(message.from, payload, { quoted: message.gift });
    }
    await message.react("✨").catch(() => {});
  } catch (err) {
    console.error("[menu] send failed:", err?.message || err);
    await message.send(`${text}\n\n👑 Owner: ${prefix}owner\n🛠️ Developer: ${prefix}developer`).catch(() => {});
  }
});

Module({ command: "alive", package: "general", description: "Check bot status" })(async message => message.send(`✦ *${config.BOT_NAME || "𝐑ᴀʜᴜʟ 𝐗ᴍᴅ"}* is online\n\n⌁ Uptime: ${runtime(process.uptime())}\n⌁ RAM: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(1)} MB\n⌁ ${config.prefix || "."}menu`));
