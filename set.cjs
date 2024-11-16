const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_IDF =>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0RwUHFhOGloY1BNZXcrZ1FPVTFpUDQyZEdVRXJoUlBISVVsT2hjZERrST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWZ5YzkzTElJcW9sekdDZCtYcUFQc25HWU9WeE8xYVV3SjNrU1F3dXRYWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RmtNd2ZuNWR6cldaNytwZ0FrTXBJZWlHU0d2UHg2bHFNTUdqRDhCUG5VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPUjZ0aFN2dXFvSVE1R3drY2tId3FXdjJnbWlIWjE0SjRKOXladXI5VlQwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNNdWJwWUJBVDlsbWlRV2FuZE1jOFFLbEtvZEpLTWZSZU53eXNQcEMzbWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNDQkR1djUzUTlMc2xNU0RRMjBTcnQyVHhoMWdXZSszL0phaVJjM09rd1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0x1M2E2bGt4MnRLMUZOTGNiRG1MN1VMRGhsTm0zdlI0KzJHMkVSVGFrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTlJb0toZHZUTjlTVGJFUmVLWUlPL2g2VmR4YVZuRUhQTFFqcG4reC9pWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtVSzJpeDVHamN4NFBSb1pZV1VRelNWUHdNZGllUUdOY0lncUdPWE1PbjdvRUd1SllGNlJUZWpvcVR0K2VPeEhhYm5pS01yZ0dKTzRobm5WcXViZUR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE0LCJhZHZTZWNyZXRLZXkiOiJxeVR1V241aHR5R3RRM3ZIdmZqTTVjNlUzV25GaERRVHVDeFVqY1llVEEwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKSWo1US1qU1MtcWlqbm9xWGFBeDVnIiwicGhvbmVJZCI6IjJhZDhiNmNiLWUyMjYtNDE1My1hZjAwLTE0OGIyZWFiMThkMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNSThXalZ5dUtyakErY3JzSjJqRCtnNWJ1Mms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidExoMG1zeW9MNVRZb29PczJMTWxVZDYxeWdvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjU3U05SQjFNIiwibWUiOnsiaWQiOiIyNTQ3OTA5MjIxNzY6NTBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQmFiYWtlOmJhYmFrbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVcwMC9NQ0VPSEIzYmtHR0E0Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVG5vL0drZTdlcU1SL0VtRkVCTyt3YnRoMG1OUzF3VHhpOENiS0laenF4TT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibDFrUGp5bWtIdWJvbUpabk94emNmRWt2OVlEOVdRclIzSDBDalV4ekc0QStjSGk2a045L2I0S0lVaTBvRVFmbDhBYTlEbnhUeXR3UzhYc2JJZHRoRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IllBR2hHeWhpMkZjRzBNYWdMYVNJenI2K2hMdzdmczg3VjV6MzlyNkZ3cWc2SWtTYzFwZGRkdDFVS0ZRTFR6eCs4OXdkRFJVRE1URGNLay9uVEhxaUFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzkwOTIyMTc2OjUwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlU1NlB4cEh1M3FqRWZ4SmhSQVR2c0c3WWRKalV0Y0U4WXZBbXlpR2M2c1QifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzE2ODI1NDR9 || "",
  PREFIX: process.env.PREFIX || '.',
  AUTOLIKE_EMOJI: process.env.AUTOLIKE_EMOJI || '💚', // For liking whatsapp status updates(stories)
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS !== undefined ? process.env.AUTO_READ_STATUS === 'true' : true,
  AUTOLIKE_STATUS: process.env.AUTOLIKE_STATUS !== undefined ? process.env.AUTOLIKE_STATUS === 'true' : false,
  AUTO_REPLY_STATUS: process.env.AUTO_REPLY_STATUS !== undefined ? process.env.AUTO_REPLY_STATUS === 'true' : false,
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || '✅️ Status Viewed by Gifted-Md',
  AUTO_DOWNLOAD: process.env.AUTO_DOWNLOAD !== undefined ? process.env.AUTO_DOWNLOAD === 'true' : false,
  AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES !== undefined ? process.env.AUTO_READ_MESSAGES === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
  ANTIDELETE: process.env.ANTIDELETE !== undefined ? process.env.ANTIDELETE === 'true' : false,
  
  
  AUTO_REJECT_CALLS: process.env.AUTO_REJECT_CALLS !== undefined ? process.env.AUTO_REJECT_CALLS === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "private",
  OWNER_NAME: process.env.OWNER_NAME || "ɢɪғᴛᴇᴅ ᴛᴇᴄʜ",
  AUTO_BLOCK: process.env.AUTO_BLOCK || "212,99,90",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254762016957",
  SUDO_NUMBERS: process.env.SUDO_NUMBERS || "254728746852,254742063632",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyAkHGe6qWMujR2BjM468vQbY2RIbp0VXyc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
