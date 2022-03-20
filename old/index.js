const updateLeaderboard = require("./helpers/updateLeaderboard");
//Pollute global scope because lazy
global.config = require("./config.json");
global.leaderboard = require("./database.json");
global.award = { winners: [], kills: "", caps: "", noshows: [] };
global.nMatch = config.nextMatch;

client.on("ready", async () => {
  global.genChannel = client.channels.cache.get(config.genChannel);
  global.pointsChannel = client.channels.cache.get(config.pointsChannel);
  global.guild = await client.guilds.fetch(config.guild);
  updateLeaderboard();
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.member.id !== config.annaId) return;
  if (interaction.isButton()) {
    require("./core/buttonHandler")(interaction);
  }
  if (interaction.isSelectMenu()) {
    require("./core/menuHandler")(interaction);
  }
});

setInterval(require("./core/monitorTime"), 60000); //1 Minute Interval
