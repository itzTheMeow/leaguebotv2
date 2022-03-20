const getMatchDetails = require("../helpers/getMatchDetails");
const getNamesFromIds = require("../helpers/getNamesFromIds");

module.exports = async (message) => {
  const nextMatch = getMatchDetails(matches[nMatch]);

  let playerNames = await getNamesFromIds(queue);
  let output = playerNames.join(" - ");

  if (queue.includes(message.author.id)) {
    message.channel.send(
      `You have already joined the ${nextMatch.name} match.\n**${queue.length} Players**: ${output}`
    );
    return;
  }

  queue.push(message.author.id);
  playerNames = await getNamesFromIds(queue);
  output = playerNames.join(" - ");

  console.log(queue.length);
  message.channel.send(
    `<@${message.author.id}> has joined the ${nextMatch.name} match\n**${queue.length} Players**: ${output}`
  );
};
