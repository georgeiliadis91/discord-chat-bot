import dotenv from "dotenv";
import { PREFIX } from "./constants";
import { Client } from "discord.js";

const client = new Client({ partials: ["MESSAGE", "REACTION"] });

dotenv.config();

// const webhookClient = new WebhookClient(
//   process.env.WEBHOOK_ID,
//   process.env.WEBHOOK_TOKEN
// );

// Client takes events, on event instance triggers the callback function
client.on("ready", () => {
  console.log(
    `The ${client.user.username}, with id: ${client.user.id} just logged in!`
  );
});

client.on("message", (message) => {
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

        const member = message.guild.members.cache.get(args[0]);

        console.log(member);

        if (member) {
          member
            .kick()
            .then((member) => message.channel.send(`${member} was kicked.`))
            .catch((error) =>
              message.channel.send(`I cannot kick that user :( ${error}`)
            );
        } else {
          return message.channel.send("That member was not found");
        }

      case "ban":
        if (!message.member.hasPermission("BAN_MEMBERS")) {
          returnmessage.reply("You do not have permissions");
        }

        if (args.length === 0) {
          return message.reply("Missing id");
        }

        return message.reply("Trying to ban someone?!");
      // case "announce":
      //   const msg = args.join(" ");
      //   webhookClient.send(msg);
      //   return;
      default:
        return message.reply("Command not recognised.");
    }
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  console.log("runs!");
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === 785241668416569425) {
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
  console.log("runs!");
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === 785241668416569425) {
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

// Have to login first.
client.login(process.env.DISCORD_BOT_TOKEN);
