import dotenv from "dotenv";
import { PREFIX } from "./constants";
import { Client, WebhookClient } from "discord.js";

dotenv.config();
const client = new Client({ partials: ["MESSAGE", "REACTION"] });
const webHookClient = new WebhookClient(
  process.env.DISCORD_WEBHOOK_ID,
  process.env.DISCORD_WEBHOOK_TOKEN
);

// Client takes events, on event instance triggers the callback function
client.on("ready", () => {
  console.log(
    `The ${client.user.username}, with id: ${client.user.id} just logged in!`
  );
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  // detect commands
  if (message.content.startsWith(PREFIX)) {
    const [cmdName, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    switch (cmdName) {
      case "kick":
        // check permissions and status of the one excecuting the command.
        if (!message.member.hasPermission("KICK_MEMBERS")) {
          returnmessage.reply("You do not have permissions");
        }

        if (args.length === 0) {
          return message.reply("Missing id");
        }

        // apparently this is async and you need to wait for it to resolve and get the data from cache
        const member = await message.guild.members.fetch(args[0]);

        if (member) {
          member
            .kick()
            .then((member) => message.channel.send(`${member} was kicked.`))
            .catch((error) =>
              message.channel.send(`I cannot kick that user :( ${error}`)
            );
          return;
        } else {
          return message.channel.send("That member was not found");
        }
      case "ban":
        if (!message.member.hasPermission("BAN_MEMBERS")) {
          return message.reply("You do not have permissions");
        }

        if (args.length === 0) {
          return message.reply("Please provide an ID");
        }

        try {
          const user = await message.guild.members.ban(args[0]);
          if (user) {
            return message.channel.send(`User with id: ${args[0]} was banned`);
          }
        } catch (err) {
          console.log(err);
          return message.channel.send("An error occured. Check Permissions");
        }

        return message.reply("Trying to ban someone?!");
      case "repeat":
        const msg = args.join(" ");
        webHookClient.send(msg);
        return;

      default:
        return message.reply("Command not recognised.");
    }
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji;
  // this is get for some reason and the above is fetch
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "785241668416569425") {
    switch (name) {
      case "🍎":
        member.roles.add("785241846686679071");
        break;
      case "🍌":
        member.roles.add("785241804210700308");
        break;
      case "🍇":
        member.roles.add("785241975527047268");
        break;
      case "🍑":
        member.roles.add("785241940412989496");
        break;
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "785241668416569425") {
    switch (name) {
      case "🍎":
        member.roles.remove("785241846686679071");
        break;
      case "🍌":
        member.roles.remove("785241804210700308");
        break;
      case "🍇":
        member.roles.remove("785241975527047268");
        break;
      case "🍑":
        member.roles.remove("785241940412989496");
        break;
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
