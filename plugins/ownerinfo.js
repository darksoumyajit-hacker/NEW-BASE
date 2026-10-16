import config from "../config.js";
import { Module } from "../lib/plugins.js";
const digits = v => String(v || "").replace(/\D/g, "");
function card(name, number, role) { const n=digits(number); return `BEGIN:VCARD\nVERSION:3.0\nFN:${String(name||role).replace(/[\r\n;]/g," ")}\nORG:${String(config.BOT_NAME||"WhatsApp Bot").replace(/[\r\n;]/g," ")}\nTITLE:${role}\nTEL;type=CELL;type=VOICE;waid=${n}:+${n}\nEND:VCARD`; }
async function sendContact(message,name,number,role) {
 const n=digits(number); if (!/^\d{8,15}$/.test(n)) return message.send(`⚠️ Configure ${role.toUpperCase()}_NUMBER in config.js before using this command.`);
 const vcard=card(name,n,role);
 try { await message.conn.sendMessage(message.from,{contacts:{displayName:name,contacts:[{displayName:name,vcard}]},contextInfo:{externalAdReply:{title:`${config.BOT_NAME} · ${role}`,body:`Tap to save ${role} contact`,thumbnailUrl:config.BOT_PIC_URL,sourceUrl:`https://wa.me/${n}`,mediaType:1,renderLargerThumbnail:true,showAdAttribution:false}}},{quoted:message.gift}); }
 catch(e) { console.error(`[contact] ${role} failed:`,e?.message||e); await message.send(`Contact card unavailable. WhatsApp: https://wa.me/${n}`); }
}
Module({command:"owner",aliases:["ownerinfo","creator"],package:"general",description:"Send the owner vCard"})(async message=>sendContact(message,config.OWNER_NAME,config.OWNER_NUMBER,"Owner"));
Module({command:"developer",aliases:["dev","developerinfo"],package:"general",description:"Send the developer vCard"})(async message=>sendContact(message,config.DEVELOPER_NAME,config.DEVELOPER_NUMBER,"Developer"));
