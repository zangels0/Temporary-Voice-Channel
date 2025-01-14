const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ChannelType,
  PermissionsBitField,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  UserSelectMenuBuilder,
  MessageFlags,
} = require("discord.js");
const chalk = require("chalk");
const db = require("pro.db");
const BotConfig = require("./BotConfig.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
  allowedMentions: {
    parse: ["users", "roles", "everyone"],
    repliedUser: true,
  },
});

client.on("ready", async () => {
  console.log(
    chalk.blue("The Client has been Connected to : ") +
      chalk.red(client.user.username),
  );
});

client.on("messageCreate", async (Message) => {
  if (!BotConfig.OwnersId.includes(Message.author.id)) return;
  if (!Message.content.startsWith(BotConfig.Prefix)) return;
  const Cmd = Message.content.slice(BotConfig.Prefix.length).trim().split(" ");
  const Command = Cmd.shift();
  if (Command == "setup") {
    Message.delete();
    const Embed = new EmbedBuilder()
      .setAuthor({
        name: "Temporary Voice Dashboard",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`Click on the Button to Control your Temporary Channel`)
      .setColor(`#303136`)
      .setTimestamp()
      .setFooter({
        text: Message.guild.name,
        iconURL: Message.guild.iconURL(),
      });

    const Menu = new StringSelectMenuBuilder()
      .setCustomId("Menu")
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("Limit Users")
      .addOptions([
        {
          label: "0",
          value: "0",
        },
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
        {
          label: "4",
          value: "4",
        },
        {
          label: "5",
          value: "5",
        },
        {
          label: "10",
          value: "10",
        },
        {
          label: "15",
          value: "15",
        },
        {
          label: "20",
          value: "20",
        },
        {
          label: "25",
          value: "25",
        },
        {
          label: "30",
          value: "30",
        },
        {
          label: "35",
          value: "35",
        },
        {
          label: "40",
          value: "40",
        },
        {
          label: "45",
          value: "45",
        },
        {
          label: "50",
          value: "50",
        },
        {
          label: "55",
          value: "55",
        },
        {
          label: "60",
          value: "60",
        },
        {
          label: "65",
          value: "65",
        },
        {
          label: "70",
          value: "70",
        },
        {
          label: "75",
          value: "75",
        },
        {
          label: "80",
          value: "80",
        },
        {
          label: "85",
          value: "85",
        },
        {
          label: "90",
          value: "90",
        },
        {
          label: "95",
          value: "95",
        },
        {
          label: "99",
          value: "99",
        },
      ]);

    const regionRow = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("Region")
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder("Choose Region")
        .addOptions([
          {
            label: "Brazil",
            value: "brazil",
          },
          {
            label: "Rotterdam",
            value: "rotterdam",
          },
          {
            label: "Hongkong",
            value: "hongkong",
          },
          {
            label: "India",
            value: "india",
          },
          {
            label: "Japan",
            value: "japan",
          },
          {
            label: "Russia",
            value: "russia",
          },
          {
            label: "Singapore",
            value: "singapore",
          },
          {
            label: "South Africa",
            value: "southafrica",
          },
          {
            label: "Sydney",
            value: "sydney",
          },
          {
            label: "US Central",
            value: "us-central",
          },
          {
            label: "US East",
            value: "us-east",
          },
          {
            label: "US West",
            value: "us-west",
          },
          {
            label: "US South",
            value: "us-south",
          },
        ]),
    );

    const lock = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1079515867374698538")
      .setLabel("Lock")
      .setCustomId("LockChannel");
    const unlock = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1079515869320855624")
      .setLabel("Unlock")
      .setCustomId("UnlockChannel");
    const hide = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1084858277730455683")
      .setLabel("Hide")
      .setCustomId("HideChannel");
    const unhide = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1084859746605076480")
      .setLabel("Unhide")
      .setCustomId("UnhideChannel");
    const mute = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1079515864891674694")
      .setLabel("Mute")
      .setCustomId("Mute");
    const unmute = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1079515872118444062")
      .setLabel("Unmute")
      .setCustomId("Unmute");
    const limit = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1084915797463404614")
      .setLabel("Limit")
      .setCustomId("Customize_UserLimit");
    const editUser = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1085174405895835699")
      .setLabel("Users Manager")
      .setCustomId("UsersManager");
    const rename = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1029823591329579039")
      .setLabel("Rename")
      .setCustomId("RenameChannel");
    const bitrate = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1029823554574884997")
      .setLabel("Bitrate")
      .setCustomId("BitrateChannel");
    const del = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setEmoji("1079515862928740363")
      .setLabel("Close")
      .setCustomId("Delete_Channel");
    const dc = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setEmoji("1079515860516999290")
      .setLabel("Disconnect")
      .setCustomId("Disconnect");
    const bm = new ButtonBuilder()
      .setEmoji(`🎵`)
      .setLabel(`Music Bot`)
      .setCustomId("Music_Bot")
      .setStyle(ButtonStyle.Secondary);

    const limitRow = new ActionRowBuilder().addComponents([Menu]);

    const row1 = new ActionRowBuilder().addComponents([rename, bitrate, bm]);
    const row2 = new ActionRowBuilder().addComponents([
      lock,
      unlock,
      hide,
      unhide,
      limit,
    ]);
    const row3 = new ActionRowBuilder().addComponents([
      mute,
      unmute,
      editUser,
      dc,
      del,
    ]);

    Message.channel.send({
      embeds: [Embed],
      components: [row1, row2, row3, limitRow, regionRow],
    });
  }
});

// · · ─────── ·𖥸· ─────── · · //

client.on("voiceStateUpdate", async (OldVoice, NewVoice) => {
  if (NewVoice.channelId == BotConfig.ChannelId1) {
    await NewVoice.guild.channels
      .create({
        name: `${NewVoice.member.user.username}'s Channel`,
        type: ChannelType.GuildVoice,
        parent: BotConfig.CategoryId1 || NewVoice.member.voice.channel.parentId,
        userLimit:
          BotConfig.MaxUsers || NewVoice.member.voice.channel.userLimit,
      })
      .then(async (Channel) => {
        db.set(
          `Temporary_${Channel.id}_${OldVoice.member.user.id}`,
          Channel.id,
        );

        const channel = NewVoice.guild.channels.cache.get(Channel.id);
        await NewVoice.member.voice.setChannel(Channel);
      });
  }

  setInterval(async () => {
    if (
      OldVoice.channelId !== null &&
      db.has(`Temporary_${OldVoice.channelId}_${OldVoice.member.user.id}`)
    ) {
      if (OldVoice.channel.members.filter((x) => !x.user.bot).size == 0) {
        let channel = OldVoice.guild.channels.cache.get(OldVoice.channelId);
        await channel.delete();
        await db.delete(
          `Temporary_${OldVoice.channelId}_${OldVoice.member.user.id}`,
        );
      }
    }
  }, 1000);
});

// · · ─────── ·𖥸· ─────── · · //

client.on("voiceStateUpdate", async (OldVoice, NewVoice) => {
  if (NewVoice.channelId == BotConfig.ChannelId2) {
    await NewVoice.guild.channels
      .create({
        name: `${NewVoice.member.user.username}'s Channel`,
        type: ChannelType.GuildVoice,
        parent: BotConfig.CategoryId2 || NewVoice.member.voice.channel.parentId,
        userLimit:
          BotConfig.MaxUsers || NewVoice.member.voice.channel.userLimit,
      })
      .then(async (Channel) => {
        db.set(
          `Temporary_${Channel.id}_${OldVoice.member.user.id}`,
          Channel.id,
        );

        const channel = NewVoice.guild.channels.cache.get(Channel.id);
        await NewVoice.member.voice.setChannel(Channel);
      });
  }

  setInterval(async () => {
    if (
      OldVoice.channelId !== null &&
      db.has(`Temporary_${OldVoice.channelId}_${OldVoice.member.user.id}`)
    ) {
      if (OldVoice.channel.members.filter((x) => !x.user.bot).size == 0) {
        let channel = OldVoice.guild.channels.cache.get(OldVoice.channelId);
        await channel.delete();
        await db.delete(
          `Temporary_${OldVoice.channelId}_${OldVoice.member.user.id}`,
        );
      }
    }
  }, 1000);
});

// · · ─────── ·𖥸· ─────── · · //

client.on("interactionCreate", async (Interaction) => {
  if (
    !Interaction.member.voice.parent?.id == BotConfig.CategoryId1 ||
    !Interaction.member.voice.parent?.id == BotConfig.CategoryId2
  ) {
    return Interaction.reply({
      content: `### You can't use this Component in this Channel`,
      flags: [MessageFlags.Ephemeral],
    });
  }
  if (Interaction.isButton()) {
    const Channel = Interaction.member.voice.channel;
    if (!Channel) {
      return Interaction.reply({
        content: `You are not in voice channel.`,
        flags: [MessageFlags.Ephemeral],
      });
    }
    const Data = db.get(`Temporary_${Channel.id}_${Interaction.user.id}`);
    if (Data !== Channel.id) {
      return Interaction.reply({
        content: `You are not a owner if the temporary channel`,
        flags: [MessageFlags.Ephemeral],
      });
    }
    switch (Interaction.customId) {
      case "LockChannel":
        {
          await Interaction.deferUpdate().catch(() => {});
          Interaction.member.voice.channel.permissionOverwrites.set([
            {
              id: Interaction.guild.roles.everyone.id,
              deny: [PermissionsBitField.Flags.Connect],
            },
            {
              id: Interaction.user.id,
              allow: [PermissionsBitField.Flags.Connect],
            },
          ]);
        }
        break;
      case "UnlockChannel":
        {
          await Interaction.deferUpdate().catch(() => {});
          Interaction.member.voice.channel.permissionOverwrites.set([
            {
              id: Interaction.guild.roles.everyone.id,
              allow: [PermissionsBitField.Flags.Connect],
            },
          ]);
        }
        break;
      case "HideChannel":
        {
          await Interaction.deferUpdate().catch(() => {});
          Interaction.member.voice.channel.permissionOverwrites.set([
            {
              id: Interaction.guild.roles.everyone.id,
              deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: Interaction.user.id,
              allow: [PermissionsBitField.Flags.ViewChannel],
            },
          ]);
        }
        break;
      case "UnhideChannel":
        {
          await Interaction.deferUpdate().catch(() => {});
          Interaction.member.voice.channel.permissionOverwrites.set([
            {
              id: Interaction.guild.roles.everyone.id,
              allow: [PermissionsBitField.Flags.ViewChannel],
            },
          ]);
        }
        break;
      case "RenameChannel":
        {
          const Modal = new ModalBuilder()
            .setCustomId("RenameModal")
            .setTitle("Rename Channel");
          const Name = new TextInputBuilder()
            .setStyle(TextInputStyle.Short)
            .setLabel("THE NEW NAME")
            .setMaxLength(50)
            .setCustomId("Name")
            .setRequired(true);
          const Row = new ActionRowBuilder().addComponents(Name);
          Modal.addComponents(Row);
          Interaction.showModal(Modal);
        }
        break;
      case "BitrateChannel":
        {
          const Modal = new ModalBuilder()
            .setCustomId("BitrateModal")
            .setTitle("Bitrate Channel");
          const Bitrate = new TextInputBuilder()
            .setStyle(TextInputStyle.Short)
            .setLabel("THE NEW BITRATE: (8 -96) kbps")
            .setMinLength(1)
            .setMaxLength(3)
            .setCustomId("Bitrate")
            .setRequired(true);
          const Row = new ActionRowBuilder().addComponents(Bitrate);
          Modal.addComponents(Row);
          Interaction.showModal(Modal);
        }
        break;
      case "Mute":
        {
          await Interaction.deferUpdate().catch(() => {});
          Channel.members.forEach(async (Members) => {
            const Member = Interaction.guild.members.cache.get(Members.id);
            if (Member.id !== Interaction.user.id) Member.voice.setMute(true);
          });
        }
        break;
      case "Unmute":
        {
          await Interaction.deferUpdate().catch(() => {});
          Channel.members.forEach(async (Members) => {
            const Member = Interaction.guild.members.cache.get(Members.id);
            if (Member.id !== Interaction.user.id) Member.voice.setMute(false);
          });
        }
        break;
      case "Disconnect":
        {
          await Interaction.deferUpdate().catch(() => {});
          Channel.members.forEach(async (Members) => {
            const Member = Interaction.guild.members.cache.get(Members.id);
            if (Member.id !== Interaction.user.id) Member.voice.disconnect();
          });
        }
        break;
      case "Delete_Channel":
        {
          await Interaction.deferUpdate().catch(() => {});
          db.delete(`Temporary_${Channel.id}_${Interaction.user.id}`);
          await Channel.delete();
        }
        break;
      case "Ban_Member":
        {
          const User = new UserSelectMenuBuilder()
            .setPlaceholder("Select the User")
            .setCustomId("UserMenu")
            .setMaxValues(1);
          const Row = new ActionRowBuilder().addComponents(User);
          Interaction.reply({
            content: `_ _`,
            components: [Row],
            flags: [MessageFlags.Ephemeral],
          });
        }
        break;
      case "UsersManager":
        {
          const Row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1085177845065728062")
              .setLabel("Mute")
              .setCustomId("UsersManager_Mute"),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1085177849322946612")
              .setLabel("Unmute")
              .setCustomId("UsersManager_Unmute"),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1085177846911221770")
              .setLabel("Deafen")
              .setCustomId("UsersManager_Deafen"),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1085177842016452698")
              .setLabel("Undeafen")
              .setCustomId("UsersManager_Undeafen"),
          );
          Interaction.reply({
            content: "_ _",
            components: [Row],
            flags: [MessageFlags.Ephemeral],
          });
        }
        break;
      case "Customize_UserLimit":
        {
          const Modal = new ModalBuilder()
            .setCustomId("Customize_UsersLimit")
            .setTitle("Customize Users Limit");
          const Number = new TextInputBuilder()
            .setStyle(TextInputStyle.Short)
            .setLabel("The Number")
            .setMaxLength(2)
            .setCustomId("The_Number")
            .setRequired(true);
          const Row = new ActionRowBuilder().addComponents(Number);
          Modal.addComponents(Row);
          Interaction.showModal(Modal);
        }
        break;
      case "Music_Bot": {
        const roleId = BotConfig.MusicRoleId;
        let botWithSpecificRole = client.guilds.cache.flatMap((guild) => {
          return guild.members.cache.filter(
            (m) => m.user.bot && m.roles.cache.has(roleId),
          );
        });

        let sendembed = new EmbedBuilder()
          .setTitle("List of Available & Unavailable Music Bots!")
          .setColor(`#303136`)
          .setDescription(
            `_Here are the bots available or unavailable for you to use. Check it out...! _`,
          )
          .setFooter({
            text: Interaction.guild.name,
            iconURL: Interaction.guild.iconURL(),
          });

        let inVoice = [];
        let notInVoice = [];

        botWithSpecificRole.forEach((bot) => {
          if (bot.voice && bot.voice.channel) {
            inVoice.push(`❌ : <@${bot.id}> - (\`${bot.user.username}\`)`);
          } else {
            notInVoice.push(`✅ : <@${bot.id}> - (\`${bot.user.username}\`)`);
          }
        });

        if (notInVoice.length > 0) {
          sendembed.addFields({
            name: `Available Bots [${notInVoice.length}] :`,
            value: `**${notInVoice.join("\n")}**`,
            inline: true,
          });
        }

        if (inVoice.length > 0) {
          sendembed.addFields({
            name: `Unavailable Bots [${inVoice.length}] :`,
            value: `**${inVoice.join("\n")}**`,
            inline: true,
          });
        }

        Interaction.reply({
          embeds: [sendembed],
          flags: [MessageFlags.Ephemeral],
        });
      }
      /////////////
    }
  } else if (Interaction.isStringSelectMenu()) {
    const Channel = Interaction.member.voice.channel;
    if (!Channel)
      return Interaction.reply({
        content: `You are not in voice channel.`,
        flags: [MessageFlags.Ephemeral],
      });
    const Data = db.get(`Temporary_${Channel.id}_${Interaction.user.id}`);
    if (Data !== Channel.id)
      return Interaction.reply({
        content: `You are not a owner if the temporary channel`,
        flags: [MessageFlags.Ephemeral],
      });
    if (Interaction.customId == "Menu") {
      await Interaction.deferUpdate().catch(() => {});
      if (
        Interaction.guild.channels.cache.get(Channel.id).type ===
        ChannelType.GuildVoice
      ) {
        Interaction.guild.channels.cache
          .get(Channel.id)
          .setUserLimit(Interaction.values[0]);
      }
    } else if (Interaction.customId == "Region") {
      await Interaction.deferUpdate().catch(() => {});
      if (
        Interaction.guild.channels.cache.get(Channel.id).type ===
        ChannelType.GuildVoice
      ) {
        Interaction.guild.channels.cache
          .get(Channel.id)
          .setRTCRegion(Interaction.values[0]);
      }
    }
  } else if (Interaction.isModalSubmit()) {
    const Channel = Interaction.member.voice.channel;
    if (!Channel)
      return Interaction.reply({
        content: `You are not in voice channel.`,
        flags: [MessageFlags.Ephemeral],
      });
    const Data = db.get(`Temporary_${Channel.id}_${Interaction.user.id}`);
    if (Data !== Channel.id)
      return Interaction.reply({
        content: `You are not a owner if the temporary channel`,
        flags: [MessageFlags.Ephemeral],
      });
    if (Interaction.customId == "RenameModal") {
      const Name = Interaction.fields.getTextInputValue("Name");
      await Channel.setName(Name);
      Interaction.reply({
        content: `The channel has been successfully changed.`,
        flags: [MessageFlags.Ephemeral],
      });
    } else if (Interaction.customId == "Customize_UsersLimit") {
      const Number = Interaction.fields.getTextInputValue("The_Number");
      if (Channel.userLimit == Number)
        return Interaction.reply({
          content: `The users limit is already \`${Number}\``,
          flags: [MessageFlags.Ephemeral],
        });
      Interaction.reply({
        content: `The users limit has been changed from \`${
          Channel.userLimit || "0"
        }\` to \`${Number}\``,
        flags: [MessageFlags.Ephemeral],
      });
      await Channel.setUserLimit(Number);
    } else if (Interaction.customId == "BitrateModal") {
      const Bitrate = Interaction.fields.getTextInputValue("Bitrate");
      const br = Bitrate;
      if (br > 96)
        return Interaction.reply({
          content: `The bitrate must be less than 96kbps.`,
          flags: [MessageFlags.Ephemeral],
        });
      if (br < 8 && br > 0)
        return Interaction.reply({
          content: `The bitrate must be more than 8kbps.`,
          flags: [MessageFlags.Ephemeral],
        });
      if (br < 0)
        return Interaction.reply({
          content: `The bitrate must be more than 0kbps.`,
          flags: [MessageFlags.Ephemeral],
        });
      await Channel.setBitrate(br * 1000);
      Interaction.reply({
        content: `The channel bitrate has been successfully changed to ${Bitrate}kbps.`,
        flags: [MessageFlags.Ephemeral],
      });
    }
  }
});

/* Users Manager */

client.on("interactionCreate", async (Interaction) => {
  if (
    !Interaction.member.voice.parent?.id == BotConfig.CategoryId1 ||
    !Interaction.member.voice.parent?.id == BotConfig.CategoryId2
  ) {
    return Interaction.reply({
      content: `### You can't use this Component in this Channel`,
      flags: [MessageFlags.Ephemeral],
    });
  }
  if (Interaction.isButton()) {
    const Channel = Interaction.member.voice.channel;
    if (!Channel)
      return Interaction.reply({
        content: `You are not in voice channel.`,
        flags: [MessageFlags.Ephemeral],
      });
    const Data = db.get(`Temporary_${Channel.id}_${Interaction.user.id}`);
    if (Data !== Channel.id)
      return Interaction.reply({
        content: `You are not a owner if the temporary channel`,
        flags: [MessageFlags.Ephemeral],
      });
    switch (Interaction.customId) {
      case "UsersManager_Mute":
        {
          const Row = new ActionRowBuilder().addComponents(
            new UserSelectMenuBuilder()
              .setPlaceholder("Select the User from the Menu")
              .setCustomId("UserManager_Mute")
              .setMaxValues(1),
          );
          Interaction.reply({
            content: "_ _",
            components: [Row],
            flags: [MessageFlags.Ephemeral],
          });
        }
        break;
      case "UsersManager_Unmute":
        {
          const Row = new ActionRowBuilder().addComponents(
            new UserSelectMenuBuilder()
              .setPlaceholder("Select the User from the Menu")
              .setCustomId("UserManager_Unmute")
              .setMaxValues(1),
          );
          Interaction.reply({
            content: "_ _",
            components: [Row],
            flags: [MessageFlags.Ephemeral],
          });
        }
        break;
      case "UsersManager_Deafen":
        {
          const Row = new ActionRowBuilder().addComponents(
            new UserSelectMenuBuilder()
              .setPlaceholder("Select the User from the Menu")
              .setCustomId("UserManager_Deafen")
              .setMaxValues(1),
          );
          Interaction.reply({
            content: "_ _",
            components: [Row],
            flags: [MessageFlags.Ephemeral],
          });
        }
        break;
      case "UsersManager_Undeafen": {
        const Row = new ActionRowBuilder().addComponents(
          new UserSelectMenuBuilder()
            .setPlaceholder("Select the User from the Menu")
            .setCustomId("UserManager_Undeafen")
            .setMaxValues(1),
        );
        Interaction.reply({
          content: "_ _",
          components: [Row],
          flags: [MessageFlags.Ephemeral],
        });
      }
    }
  } else if (Interaction.isUserSelectMenu()) {
    const Channel = Interaction.member.voice.channel;
    if (!Channel)
      return Interaction.reply({
        content: `You are not in voice channel.`,
        flags: [MessageFlags.Ephemeral],
      });
    const Data = db.get(`Temporary_${Channel.id}_${Interaction.user.id}`);
    if (Data !== Channel.id)
      return Interaction.reply({
        content: `You are not a owner if the temporary channel`,
        flags: [MessageFlags.Ephemeral],
      });
    switch (Interaction.customId) {
      case "UserManager_Mute":
        {
          await Interaction.deferUpdate().catch(() => {});
          Interaction.member.voice.channel.members
            .filter((Member) => Member.user.id == Interaction.values[0])
            .forEach((User) => {
              const Member = Interaction.guild.members.cache.get(User.id);
              Member.voice.setMute(true);
            });
        }
        break;
      case "UserManager_Unmute":
        {
          await Interaction.deferUpdate().catch(() => {});
          Interaction.member.voice.channel.members
            .filter((Member) => Member.user.id == Interaction.values[0])
            .forEach((User) => {
              const Member = Interaction.guild.members.cache.get(User.id);
              Member.voice.setMute(false);
            });
        }
        break;
      case "UserManager_Deafen":
        {
          await Interaction.deferUpdate().catch(() => {});
          Interaction.member.voice.channel.members
            .filter((Member) => Member.user.id == Interaction.values[0])
            .forEach((User) => {
              const Member = Interaction.guild.members.cache.get(User.id);
              Member.voice.setDeaf(true);
            });
        }
        break;
      case "UserManager_Undeafen": {
        await Interaction.deferUpdate().catch(() => {});
        Interaction.member.voice.channel.members
          .filter((Member) => Member.user.id == Interaction.values[0])
          .forEach((User) => {
            const Member = Interaction.guild.members.cache.get(User.id);
            Member.voice.setDeaf(false);
          });
      }
    }
  }
});

client.login(BotConfig.Token).catch(() => {
  console.log(chalk.red("The Token is not valid"));
});
process.on("uncaughtException", async (err) => {
  console.log(chalk.red("[ Uncaught Exception ]"));
  console.error(err);
});
process.on("uncaughtExceptionMonitor", async (err) => {
  console.log(chalk.red("[ Uncaught Exception ]"));
  console.error(err);
});
process.on("unhandledRejection", async (err) => {
  console.log(chalk.red("[ Unhandled Rejection "));
  console.error(err);
});
