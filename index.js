const { Client, Events, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);

  cron.schedule(
    "0 12 * * Mon-Fri",
    async () => {
      const guild = client.guilds.cache.get("process.env.GUILD_ID");
      const member = await guild.members.fetch("process.env.USER_ID");
      await member.roles.set([]);
      await member.voice.disconnect();
    },
    {
      timezone: "America/Sao_Paulo",
    }
  );

  cron.schedule(
    "0 6 * * Mon-Fri",
    async () => {
      const guild = client.guilds.cache.get("process.env.GUILD_ID");
      const member = await guild.members.fetch("process.env.USER_ID");
      await member.roles.add([]);
    },
    {
      timezone: "America/Sao_Paulo",
    }
  );
});

require("dotenv").config();
client.login(process.env.DISCORD_TOKEN);
