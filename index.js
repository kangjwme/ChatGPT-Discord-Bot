import discord from "discord.js";
import { ChatGPTAPI } from 'chatgpt'

const token = "";
const session = "";
const {Client, GatewayIntentBits} = discord;

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
];

const client = new Client({intents});
client.login(token);

client.on("messageCreate", (message) => {
    //Example: message.channel.id != 1049943749238739015
    if (message.channel.id != HERE IS YOUR CHANNE ID) {
        return;
    }
    //this is bot id, prevent bot reply itself
    if (message.author.id == HERE IS YOUR BOT ID) {
        return;
    }

    (async () => {
        const api = new ChatGPTAPI({ sessionToken: session })
        await api.ensureAuth()
        const response = await api.sendMessage(message.content)

        for (let i = 0; i < response.length; i += 2000) {
            const toSend = response.substring(i, Math.min(response.length, i + 2000));
            message.reply({content: toSend});
        }
    })()
});
