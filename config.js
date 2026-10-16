import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===================== AETHER XMD — PUBLIC CONFIG =====================
// Change these non-secret values for your own bot. Never put API tokens/cookies here.
const BOT_NAME = "RAHUL XMD";
const BOT_TAGLINE = "POWERED BY RAHUL XMD.";
const OWNER_NAME = "BOT OWNER";
const OWNER_NUMBER = "919999999999"; // digits only, including country calling code
const DEVELOPER_NAME = "BOT DEVELOPER";
const DEVELOPER_NUMBER = "919999999998"; // digits only, including country calling code
const PREFIX = ".";
const VERSION = "1.0.0";
const THEME = "obsidian-neon";
const TIMEZONE = "Asia/Kolkata";
const SUPPORT_LINK = ""; // optional public support link
const TG_BOT_LINK = ""; // set your Telegram bot URL, e.g. https://t.me/your_bot
const TG_CHANNEL_ID = ""; // Telegram channel username or numeric ID
const TG_CHANNEL_LINK = ""; // Telegram channel invite/public link
const TG_GROUP_ID = ""; // optional official Telegram group ID
const TG_GROUP_LINK = ""; // optional official Telegram group invite link
const TG_ADMIN_LINK = ""; // optional owner/admin contact link
const WA_CHANNEL_LINK = ""; // set your channel invite link
const WA_CHANNEL_JID = ""; // optional newsletter JID, e.g. 1203...@newsletter
const WA_CHANNEL_NAME = BOT_NAME;
const BOT_PIC_URL = "https://placehold.co/900x900/09090f/e7d4ff?text=RAHUL XMD";
const MENU_AUDIO_URL = "https://files.catbox.moe/k24ny1.m4a"; // replace with your own menu audio if desired
const MENU_VIDEO_URL = "https://files.catbox.moe/555jhy.mp4"; // optional connected notification video URL
const WEBSITE_URL = "https://your-railway-domain.up.railway.app"; // replace with your deployed Railway domain
const MENU_URL = `${WEBSITE_URL.replace(/\/$/, "")}/menu`;
const WA_CHANNEL_JIDS = WA_CHANNEL_JID ? [WA_CHANNEL_JID] : [];
const WA_AUTOJOIN_GROUP_LINK = ""; // optional group invite link to auto-join
const NEXORACLE_API = "https://api.nexoracle.com/";
const SESSION_DIR = path.join(__dirname, "sessions");
const META_FILE = path.join(__dirname, "data", "sessions.json");
const TG_ADMIN_IDS = String(process.env.TG_ADMIN_IDS || "").split(",").map(v => v.trim()).filter(Boolean);
const BOT_TOKEN_TELEGRAM = process.env.BOT_TOKEN_TELEGRAM || "";
process.env.BOT_NAME = BOT_NAME;
process.env.OWNER_NAME = OWNER_NAME;

const API_KEYS = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || "",
  REMOVE_BG_API_KEY: process.env.REMOVE_BG_API_KEY || "",
};

export default {
  prefix: PREFIX, PREFIX, owner: OWNER_NUMBER, ownerNumber: OWNER_NUMBER, ownerContact: OWNER_NUMBER, sudo: OWNER_NUMBER,
  botName: BOT_NAME, BOT_NAME, BOT_TAGLINE, ownerName: OWNER_NAME, OWNER_NAME, OWNER_NUMBER,
  developerName: DEVELOPER_NAME, DEVELOPER_NAME, DEVELOPER_NUMBER,
  packname: BOT_NAME, author: DEVELOPER_NAME, version: VERSION, VERSION,
  mode: "public", workType: "public", WORK_TYPE: "public", theme: THEME, THEME,
  timezone: TIMEZONE, TIMEZONE, maxFileSize: 100 * 1024 * 1024,
  statusReact: false, STATUS_REACT: false,
  WA_CHANNEL_LINK, WA_CHANNEL_JID, WA_CHANNEL_JIDS, WA_CHANNEL_NAME, WA_AUTOJOIN_GROUP_LINK, BOT_PIC_URL, MENU_VIDEO_URL, MENU_AUDIO_URL,
  WEBSITE_URL, MENU_URL, SUPPORT_LINK, TG_BOT_LINK,
  whatsapp: { botPic: BOT_PIC_URL, channelLink: WA_CHANNEL_LINK, channelId: WA_CHANNEL_JID, menuVideo: MENU_VIDEO_URL, menuAudio: MENU_AUDIO_URL },
  BOT_TOKEN_TELEGRAM, TG_ADMIN_IDS, TG_ADMIN_ID: TG_ADMIN_IDS[0] || "", TG_ADMIN_LINK,
  TG_CHANNEL_ID, TG_CHANNEL_LINK, TG_GROUP_ID, TG_GROUP_LINK,
  tg: { token: BOT_TOKEN_TELEGRAM, adminIds: TG_ADMIN_IDS, adminId: TG_ADMIN_IDS[0] || "", adminLink: TG_ADMIN_LINK, channelId: TG_CHANNEL_ID, channelLink: TG_CHANNEL_LINK, groupId: TG_GROUP_ID, groupLink: TG_GROUP_LINK },
  API_KEYS, NEXORACLE_API, NEXORACLE_KEY: process.env.NEXORACLE_KEY || "",
  authDir: SESSION_DIR, AUTH_DIR: SESSION_DIR, SESSION_DIR, META_FILE, SESSION_ID: "",
  CONCURRENCY: 4, START_DELAY_MS: 800, RECONNECT_LIMIT: 10,
};
