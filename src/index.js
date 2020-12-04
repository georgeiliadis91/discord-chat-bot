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
      if (args.length === 0) {
        message.reply("Missing id");
      }
      // this wont work on owners
      const member = message.guild.members.cache.get(args[0]);
      console.log(args[0]);

      if (member) {
        member.kick();
      } else {
        message.channel.send("That member was not found");
      }

      message.channel.send("Kicking user");
    }

    // message.channel.send(cmdName);
  }
});

// client.on("message", (message) => {
//   if (message.author.bot) return;
//   console.log(`${message.author.tag} says: ${message.content}`);
//   if (message.content === "hello") {
//     message.channel.send("hello");
//   }
// });

// Have to login first.
client.login(process.env.DISCORD_BOT_TOKEN);
