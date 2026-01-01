import { Client, GatewayIntentBits } from 'discord.js';
import OpenAI from 'openai';

// Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Hex replies only in #ai-hangout
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // ignore other bots
  if (message.channel.name !== 'ai-hangout') return; // only respond in this channel

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-5-mini',
      messages: [
        {
          role: 'system',
          content: 'You are Hex, a chill, anime-style AI friend. Calm, funny, sarcastic sometimes, and a mediator in group chats.'
        },
        { role: 'user', content: message.content }
      ]
    });

    message.channel.send(response.choices[0].message.content);
  } catch (err) {
    console.log('Error:', err);
  }
});

// Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN);
