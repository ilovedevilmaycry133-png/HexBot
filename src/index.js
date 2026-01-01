import { Client, GatewayIntentBits } from "discord.js";
import OpenAI from "openai";

// Make sure your env vars exist
if (!process.env.DISCORD_BOT_TOKEN || !process.env.OPENAI_API_KEY) {
  console.error("Missing environment variables!");
  process.exit(1);
}

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// When bot is ready
client.once("ready", () => {
  console.log(`Hex is online! Logged in as ${client.user.tag}`);
});
