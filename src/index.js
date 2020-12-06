import dotenv from "dotenv";
import { PREFIX } from "./constants";
import { Client } from "discord.js";
const client = new Client();

dotenv.config();

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

    if (cmdName === "kick") {
      // check permissions and status of the one excecuting the command.
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        returnmessage.reply("You do not have permissions");
      }

      if (args.length === 0) {
        return message.reply("Missing id");
      }

      // this wont work on owners
      const member = message.guild.members.cache.get(args[0]);
      console.log(args[0]);

      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} has been kicked`))
          .catch((error) =>
            message.channel.send(`Error, something went wrong`)
          );
      } else {
        message.channel.send("That member was not found");
      }

      message.channel.send("Kicking user");
    }

    // message.channel.send(cmdName);
  }
});

// Have to login first.
client.login(process.env.DISCORD_BOT_TOKEN);
