import { Client, GatewayIntentBits, Collection, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, REST, Routes } from 'discord.js';
import { initDatabase, addUser, addWarning, getWarningCount, setRankRestriction, isRankRestricted, logAction, getUser, updateUserRank, createTicket, closeTicket, getWarnings, setRoleCount, getRoleCount, getAllRoleCounts } from './db.mjs';
import { commands } from './commands.mjs';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const channelConfig = JSON.parse(readFileSync('./channel-config.json', 'utf8'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const GUILD_ID = '1517508525339840665';
const WELCOME_CHANNEL = channelConfig.WELCOME_CHANNEL;
const GUIDELINES_CHANNEL = channelConfig.GUIDELINES_CHANNEL;
const SUPPORT_CHANNEL = channelConfig.SUPPORT_CHANNEL;

// Log channels from LOGS category
const JOINS_LOGS_CHANNEL = channelConfig.ALL_CHANNELS.LOGS.joins;
const LEAVES_LOGS_CHANNEL = channelConfig.ALL_CHANNELS.LOGS.leaves;
const DISCIPLINE_LOGS_CHANNEL = channelConfig.ALL_CHANNELS.LOGS.discipline;
const BOTS_LOGS_CHANNEL = channelConfig.ALL_CHANNELS.LOGS.bots;

// Register slash commands
async function registerCommands() {
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    console.log('🔄 Registering slash commands...');
    
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, GUILD_ID), {
      body: commands.map(cmd => cmd.toJSON())
    });
    
    console.log('✅ Slash commands registered!');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
}

// ===== ALL COMMAND HANDLERS (INSTANT REPLY PATTERN) =====

async function handleWarn(interaction) {
  await interaction.deferReply({ ephemeral: false });
  
  // Process in background with timeout
  setTimeout(async () => {
  
  try {
    if (!interaction.member.permissions.has('ModerateMembers')) {
      return await interaction.editReply({ content: '❌ You don\'t have permission!' });
    }

    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    const warningCount = await addWarning(target.id, reason, interaction.user.id);
    await addUser(target.id, target.username, 'Member');
    await logAction('WARN', interaction.user.id, target.id, reason);

    let response = `⚠️ **${target.username}** has been warned!\n**Reason:** ${reason}\n**Total Warnings:** ${warningCount}`;

    if (warningCount === 3) {
      await setRankRestriction(target.id, 24 * 60 * 60 * 1000);
      response += '\n🔒 **Rank restriction applied for 24 hours!**';
    } else if (warningCount === 6) {
      response += '\n📉 **User will be demoted from current rank!**';
    } else if (warningCount === 8) {
      response += '\n⬇️ **User demoted to OR-1!**';
    } else if (warningCount === 9) {
      response += '\n🚫 **User permanently banned and staff blacklisted!**';
    }

    await interaction.editReply({ content: response });
    
    // Log to discipline channel
    const logChannel = client.channels.cache.get(DISCIPLINE_LOGS_CHANNEL);
    if (logChannel) {
      const embed = new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle('⚠️ User Warned')
        .addFields(
          { name: 'User', value: `${target.username} (${target.id})`, inline: true },
          { name: 'Moderator', value: `${interaction.user.username}`, inline: true },
          { name: 'Reason', value: reason, inline: false },
          { name: 'Total Warnings', value: warningCount.toString(), inline: true }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.error('Warn error:', error);
    if (interaction.deferred) {
      await interaction.editReply({ content: '❌ Failed to warn user!' });
    }
  }
  }, 100);
}

async function handleBan(interaction) {
  await interaction.deferReply({ ephemeral: false });
  setTimeout(async () => {
  
  try {
    if (!interaction.member.permissions.has('BanMembers')) {
      return await interaction.editReply({ content: '❌ You don\'t have permission!' });
    }

    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    await interaction.guild.members.ban(target, { reason });
    await logAction('BAN', interaction.user.id, target.id, reason);
    
    const logChannel = client.channels.cache.get(DISCIPLINE_LOGS_CHANNEL);
    if (logChannel) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('🚫 User Banned')
        .addFields(
          { name: 'User', value: `${target.username} (${target.id})`, inline: true },
          { name: 'Moderator', value: `${interaction.user.username}`, inline: true },
          { name: 'Reason', value: reason }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [embed] });
    }
    
    await interaction.editReply({ content: `✅ **${target.username}** has been banned!\n**Reason:** ${reason}` });
  } catch (error) {
    console.error('Ban error:', error);
    if (interaction.deferred) {
      await interaction.editReply({ content: '❌ Failed to ban user!' });
    }
  }
  }, 100);
}

async function handleMute(interaction) {
  await interaction.deferReply({ ephemeral: false });
  setTimeout(async () => {
  
  try {
    if (!interaction.member.permissions.has('ModerateMembers')) {
      return await interaction.editReply({ content: '❌ You don\'t have permission!' });
    }

    const target = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration') || 60;
    const reason = interaction.options.getString('reason') || 'No reason provided';

    const member = await interaction.guild.members.fetch(target.id);
    await member.timeout(duration * 60 * 1000, reason);
    await logAction('MUTE', interaction.user.id, target.id, `${duration}min - ${reason}`);
    
    const logChannel = client.channels.cache.get(DISCIPLINE_LOGS_CHANNEL);
    if (logChannel) {
      const embed = new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle('🔇 User Muted')
        .addFields(
          { name: 'User', value: `${target.username} (${target.id})`, inline: true },
          { name: 'Duration', value: `${duration} minutes`, inline: true },
          { name: 'Moderator', value: `${interaction.user.username}`, inline: true },
          { name: 'Reason', value: reason }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [embed] });
    }
    
    await interaction.editReply({ content: `🔇 **${target.username}** has been muted for ${duration} minutes!\n**Reason:** ${reason}` });
  } catch (error) {
    console.error('Mute error:', error);
    if (interaction.deferred) {
      await interaction.editReply({ content: '❌ Failed to mute user!' });
    }
  }
  }, 100);
}

async function handleKick(interaction) {
  await interaction.deferReply({ ephemeral: false });
  setTimeout(async () => {
  
  try {
    if (!interaction.member.permissions.has('KickMembers')) {
      return await interaction.editReply({ content: '❌ You don\'t have permission!' });
    }

    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    const member = await interaction.guild.members.fetch(target.id);
    await member.kick(reason);
    await logAction('KICK', interaction.user.id, target.id, reason);
    
    const logChannel = client.channels.cache.get(DISCIPLINE_LOGS_CHANNEL);
    if (logChannel) {
      const embed = new EmbedBuilder()
        .setColor('#FF6600')
        .setTitle('👢 User Kicked')
        .addFields(
          { name: 'User', value: `${target.username} (${target.id})`, inline: true },
          { name: 'Moderator', value: `${interaction.user.username}`, inline: true },
          { name: 'Reason', value: reason }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [embed] });
    }
    
    await interaction.editReply({ content: `👢 **${target.username}** has been kicked!\n**Reason:** ${reason}` });
  } catch (error) {
    console.error('Kick error:', error);
    if (interaction.deferred) {
      await interaction.editReply({ content: '❌ Failed to kick user!' });
    }
  }
  }, 100);
}

async function handlePromote(interaction) {
  await interaction.deferReply({ ephemeral: false });
  setTimeout(async () => {
  
  try {
    if (!interaction.member.permissions.has('ManageRoles')) {
      return await interaction.editReply({ content: '❌ You don\'t have permission!' });
    }

    const target = interaction.options.getUser('user');
    const newRank = interaction.options.getString('rank');

    const role = interaction.guild.roles.cache.find(r => r.name === newRank);
    if (!role) {
      return await interaction.editReply({ content: `❌ Role **${newRank}** not found!` });
    }

    const member = await interaction.guild.members.fetch(target.id);
    
    const oldRankRole = member.roles.cache
      .filter(r => r.name !== '@everyone')
      .sort((a, b) => b.position - a.position)
      .first();
    
    if (oldRankRole) {
      await member.roles.remove(oldRankRole);
    }
    
    await member.roles.add(role);
    await updateUserRank(target.id, newRank);
    await logAction('PROMOTE', interaction.user.id, target.id, `Promoted to ${newRank}`);
    
    const logChannel = client.channels.cache.get(DISCIPLINE_LOGS_CHANNEL);
    if (logChannel) {
      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('⬆️ User Promoted')
        .addFields(
          { name: 'User', value: `${target.username} (${target.id})`, inline: true },
          { name: 'Old Rank', value: oldRankRole ? oldRankRole.name : 'None', inline: true },
          { name: 'New Rank', value: newRank, inline: true },
          { name: 'Moderator', value: `${interaction.user.username}`, inline: true }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [embed] });
    }
    
    await interaction.editReply({ content: `⬆️ **${target.username}** has been promoted to **${newRank}**!` });
  } catch (error) {
    console.error('Promote error:', error);
    if (interaction.deferred) {
      await interaction.editReply({ content: '❌ Failed to promote user!' });
    }
  }
  }, 100);
}

async function handleDemote(interaction) {
  await interaction.deferReply({ ephemeral: false });
  setTimeout(async () => {
  
  try {
    if (!interaction.member.permissions.has('ManageRoles')) {
      return await interaction.editReply({ content: '❌ You don\'t have permission!' });
    }

    const target = interaction.options.getUser('user');
    const newRank = interaction.options.getString('rank');

    const role = interaction.guild.roles.cache.find(r => r.name === newRank);
    if (!role) {
      return await interaction.editReply({ content: `❌ Role **${newRank}** not found!` });
    }

    const member = await interaction.guild.members.fetch(target.id);
    
    const oldRankRole = member.roles.cache
      .filter(r => r.name !== '@everyone')
      .sort((a, b) => b.position - a.position)
      .first();
    
    if (oldRankRole) {
      await member.roles.remove(oldRankRole);
    }
    
    await member.roles.add(role);
    await updateUserRank(target.id, newRank);
    await logAction('DEMOTE', interaction.user.id, target.id, `Demoted to ${newRank}`);
    
    const logChannel = client.channels.cache.get(DISCIPLINE_LOGS_CHANNEL);
    if (logChannel) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('⬇️ User Demoted')
        .addFields(
          { name: 'User', value: `${target.username} (${target.id})`, inline: true },
          { name: 'Old Rank', value: oldRankRole ? oldRankRole.name : 'None', inline: true },
          { name: 'New Rank', value: newRank, inline: true },
          { name: 'Moderator', value: `${interaction.user.username}`, inline: true }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [embed] });
    }
    
    await interaction.editReply({ content: `⬇️ **${target.username}** has been demoted to **${newRank}**!` });
  } catch (error) {
    console.error('Demote error:', error);
    if (interaction.deferred) {
      await interaction.editReply({ content: '❌ Failed to demote user!' });
    }
  }
  }, 100);
}

async function handleWarnings(interaction) {
  await interaction.deferReply({ ephemeral: false });
  setTimeout(async () => {
  
  try {
    const target = interaction.options.getUser('user');
    const warnings = await getWarnings(target.id);

    if (warnings.length === 0) {
      return await interaction.editReply({ content: `✅ **${target.username}** has no warnings!` });
    }

    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle(`📋 Warnings for ${target.username}`)
      .setDescription(`Total Warnings: **${warnings.length}**`);

    warnings.forEach((w, i) => {
      const date = new Date(w.created_at * 1000).toLocaleDateString();
      embed.addFields({
        name: `Warning #${i + 1}`,
        value: `**Reason:** ${w.reason}\n**Moderator:** <@${w.moderator_id}>\n**Date:** ${date}`,
        inline: false
      });
    });

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error('Warnings error:', error);
    if (interaction.deferred) {
      await interaction.editReply({ content: '❌ Failed to fetch warnings!' });
    }
  }
  }, 100);
}

async function handleActivity(interaction) {
  try {
    const embed = new EmbedBuilder()
      .setColor('#0099FF')
      .setTitle('📊 Activity Check')
      .setDescription('Click the button below to verify your activity!')
      .addFields(
        { name: '✅ Status', value: 'Ready to verify', inline: true },
        { name: '⏱️ Next Check', value: 'In 3 days', inline: true }
      )
      .setTimestamp();

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('activity_verify')
        .setLabel('Verify Activity')
        .setStyle(ButtonStyle.Success)
        .setEmoji('📊')
    );

    await interaction.reply({ embeds: [embed], components: [button] });
  } catch (error) {
    console.error('Activity error:', error);
    await interaction.reply({ content: '❌ Failed to show activity check!', ephemeral: true });
  }
}

async function handleHandbook(interaction) {
  try {
    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('📖 GVBA Server Handbook')
      .setDescription('Complete guide to server rules and regulations')
      .addFields(
        {
          name: '⚠️ Warning System',
          value: '• **3 Warnings:** Rank restriction for 24 hours\n• **6 Warnings:** Demotion from current rank\n• **8 Warnings:** Demotion to OR-1\n• **9 Warnings:** Permanent ban + staff blacklist',
          inline: false
        },
        {
          name: '📋 Rules',
          value: '1. Respect all members\n2. Follow chain of command\n3. No spam or harassment\n4. Maintain professionalism\n5. Follow moderator instructions',
          inline: false
        },
        {
          name: '🎖️ Ranks',
          value: 'Check your server roles for current rank structure',
          inline: false
        },
        {
          name: '📞 Support',
          value: 'Use `/support-ticket` to create a support ticket',
          inline: false
        }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Handbook error:', error);
    await interaction.reply({ content: '❌ Failed to show handbook!', ephemeral: true });
  }
}

async function handleChainOfCommand(interaction) {
  await interaction.deferReply();
  
  try {
    const guild = interaction.guild;
    const roles = guild.roles.cache.sort((a, b) => b.position - a.position).filter(r => r.name !== '@everyone');

    if (roles.size === 0) {
      return await interaction.editReply({ content: '❌ No roles found!' });
    }

    const embeds = [];
    let currentEmbed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('🎖️ Chain of Command')
      .setDescription('Server hierarchy and command structure');
    
    let fieldCount = 0;
    let embedCount = 1;
    const fieldsPerEmbed = 20;
    const partNames = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

    for (const [, role] of roles) {
      if (fieldCount >= fieldsPerEmbed) {
        embeds.push(currentEmbed);
        embedCount++;
        const partName = partNames[embedCount - 1] || embedCount;
        currentEmbed = new EmbedBuilder()
          .setColor('#FFD700')
          .setTitle(`🎖️ Chain of Command (Part ${partName})`);
        fieldCount = 0;
      }

      try {
        const memberCount = role.members.size;
        currentEmbed.addFields({
          name: role.name,
          value: `👥 ${memberCount}`,
          inline: true
        });
        fieldCount++;
      } catch (err) {
        console.error(`Error processing role ${role.name}:`, err);
      }
    }

    if (fieldCount > 0) {
      embeds.push(currentEmbed);
    }

    if (embeds.length === 0) {
      return await interaction.editReply({ content: '❌ Failed to generate chain of command!' });
    }

    await interaction.editReply({ embeds });
  } catch (error) {
    console.error('Chain of command error:', error);
    if (interaction.deferred) {
      await interaction.editReply({ content: '❌ Error displaying chain of command!' });
    }
  }
}

async function handleSupportTicket(interaction, ticketType = 'support') {
  try {
    const ticketId = `${ticketType}-${Date.now()}`;
    
    const ticketTitles = {
      'support': 'Support Ticket',
      'appeals': 'Appeals Ticket',
      'rank-appeals': 'Rank Appeals Ticket',
      'staffing': 'Staffing Application',
      'prd': 'Partnership/PRD Request'
    };

    const ticketEmojis = {
      'support': '🎫',
      'appeals': '⚖️',
      'rank-appeals': '🎖️',
      'staffing': '👔',
      'prd': '🤝'
    };
    
    const embed = new EmbedBuilder()
      .setColor('#0099FF')
      .setTitle(`${ticketEmojis[ticketType]} ${ticketTitles[ticketType]} Created`)
      .setDescription(`Your ticket ID: **${ticketId}**\n\nA staff member will assist you shortly.`)
      .setTimestamp();

    const closeButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`close_ticket_${ticketId}`)
        .setLabel('Close Ticket')
        .setStyle(ButtonStyle.Danger)
        .setEmoji('❌')
    );

    await interaction.reply({ embeds: [embed], components: [closeButton] });
    await createTicket(ticketId, interaction.user.id, interaction.channelId, ticketType);

    const logChannel = client.channels.cache.get(SUPPORT_CHANNEL);
    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setColor('#0099FF')
        .setTitle(`${ticketEmojis[ticketType]} New ${ticketTitles[ticketType]}`)
        .addFields(
          { name: 'Ticket ID', value: ticketId, inline: true },
          { name: 'Type', value: ticketTitles[ticketType], inline: true },
          { name: 'User', value: `${interaction.user.username} (${interaction.user.id})`, inline: true }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [logEmbed] });
    }
  } catch (error) {
    console.error('Ticket error:', error);
    await interaction.reply({ content: '❌ Failed to create ticket!', ephemeral: true });
  }
}

async function handleVerify(interaction) {
  try {
    const verifiedRole = interaction.guild.roles.cache.find(r => r.name.toLowerCase().includes('verified'));
    
    if (!verifiedRole) {
      console.error('Verified role not found! Available roles:', interaction.guild.roles.cache.map(r => r.name).join(', '));
      return await interaction.reply({ content: '❌ Verified role not found! Please contact an admin.', ephemeral: true });
    }

    if (interaction.member.roles.cache.has(verifiedRole.id)) {
      return await interaction.reply({ content: '✅ You are already verified!', ephemeral: true });
    }

    await interaction.member.roles.add(verifiedRole);
    console.log(`✅ Added verified role to ${interaction.user.username}`);

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('✅ Verification Complete!')
      .setDescription(`Welcome **${interaction.user.username}**!\n\nYou now have access to all server channels.`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });

    const logChannel = client.channels.cache.get(BOTS_LOGS_CHANNEL);
    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('✅ Member Verified')
        .addFields(
          { name: 'User', value: `${interaction.user.username} (${interaction.user.id})`, inline: true },
          { name: 'Verified At', value: new Date().toLocaleString(), inline: true }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [logEmbed] });
    }
  } catch (error) {
    console.error('Verify error:', error);
    await interaction.reply({ content: '❌ Failed to verify!', ephemeral: true });
  }
}

async function handleLogs(interaction) {
  try {
    const logType = interaction.options.getString('type');
    const embed = new EmbedBuilder()
      .setColor('#0099FF')
      .setTitle(`📑 Action Logs - ${logType}`)
      .setDescription(`Showing recent ${logType} actions`);

    embed.addFields({
      name: 'Status',
      value: 'Logs feature coming soon!',
      inline: false
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    console.error('Logs error:', error);
    await interaction.reply({ content: '❌ Failed to fetch logs!', ephemeral: true });
  }
}

async function handleSetRoleCount(interaction) {
  await interaction.deferReply({ ephemeral: false });
  setTimeout(async () => {
  
  try {
    if (!interaction.member.permissions.has('ManageRoles')) {
      return await interaction.editReply({ content: '❌ You need ManageRoles permission!' });
    }

    const roleName = interaction.options.getString('role');
    const count = interaction.options.getInteger('count');

    if (count < 0) {
      return await interaction.editReply({ content: '❌ Count must be 0 or higher!' });
    }

    await setRoleCount(roleName, count, interaction.user.id);

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('✅ Role Count Updated')
      .addFields(
        { name: 'Role', value: roleName, inline: true },
        { name: 'Member Count', value: count.toString(), inline: true }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });

    const logChannel = client.channels.cache.get(BOTS_LOGS_CHANNEL);
    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('✅ Role Count Updated')
        .addFields(
          { name: 'Role', value: roleName, inline: true },
          { name: 'Count', value: count.toString(), inline: true },
          { name: 'Updated By', value: `${interaction.user.username} (${interaction.user.id})`, inline: true }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [logEmbed] });
    }
  } catch (error) {
    console.error('Set role count error:', error);
    if (interaction.deferred) {
      await interaction.editReply({ content: '❌ Failed to update role count!' });
    }
  }
  }, 100);
}

// ===== EVENT LISTENERS =====

client.on('ready', async () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
  await initDatabase();
  await registerCommands();
});

client.on('guildMemberAdd', async (member) => {
  if (member.user.bot) return;

  try {
    // Assign GVBA || Uncleared Visitor role to new members
    const unclearedRole = member.guild.roles.cache.find(r => r.name.toLowerCase().includes('uncleared visitor'));
    if (unclearedRole) {
      await member.roles.add(unclearedRole);
      console.log(`✅ Assigned uncleared visitor role to ${member.user.username}`);
    } else {
      console.warn(`⚠️ Uncleared visitor role not found for ${member.user.username}`);
    }
  } catch (error) {
    console.error('Error assigning role to new member:', error);
  }

  const welcomeChannel = client.channels.cache.get(WELCOME_CHANNEL);
  if (welcomeChannel) {
    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('🎖️ Welcome to GVBA!')
      .setDescription(`Welcome **${member.user.username}** to the server!\n\nPlease read the rules and verify to unlock all channels.`)
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();

    await welcomeChannel.send({ embeds: [embed] });
  }

  const joinsLogsChannel = client.channels.cache.get(JOINS_LOGS_CHANNEL);
  if (joinsLogsChannel) {
    const logEmbed = new EmbedBuilder()
      .setColor('#0099FF')
      .setTitle('📥 Member Joined')
      .addFields(
        { name: 'User', value: `${member.user.username} (${member.id})`, inline: true },
        { name: 'Account Age', value: `${Math.floor((Date.now() - member.user.createdTimestamp) / 86400000)} days`, inline: true },
        { name: 'Role Assigned', value: 'GVBA || Uncleared Visitor', inline: true }
      )
      .setTimestamp();

    await joinsLogsChannel.send({ embeds: [logEmbed] });
  }

  await addUser(member.id, member.user.username, 'Uncleared Visitor');
});

client.on('guildMemberRemove', async (member) => {
  const leavesLogsChannel = client.channels.cache.get(LEAVES_LOGS_CHANNEL);
  if (leavesLogsChannel) {
    const logEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('📤 Member Left')
      .addFields(
        { name: 'User', value: `${member.user.username} (${member.id})`, inline: true },
        { name: 'Time in Server', value: `${Math.floor((Date.now() - member.joinedTimestamp) / 86400000)} days`, inline: true }
      )
      .setTimestamp();

    await leavesLogsChannel.send({ embeds: [logEmbed] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    try {
      switch (interaction.commandName) {
        case 'warn': await handleWarn(interaction); break;
        case 'ban': await handleBan(interaction); break;
        case 'mute': await handleMute(interaction); break;
        case 'kick': await handleKick(interaction); break;
        case 'promote': await handlePromote(interaction); break;
        case 'demote': await handleDemote(interaction); break;
        case 'warnings': await handleWarnings(interaction); break;
        case 'activity': await handleActivity(interaction); break;
        case 'handbook': await handleHandbook(interaction); break;
        case 'chain-of-command': await handleChainOfCommand(interaction); break;
        case 'support-ticket': await handleSupportTicket(interaction, 'support'); break;
        case 'appeals-ticket': await handleSupportTicket(interaction, 'appeals'); break;
        case 'rank-appeals-ticket': await handleSupportTicket(interaction, 'rank-appeals'); break;
        case 'staffing-ticket': await handleSupportTicket(interaction, 'staffing'); break;
        case 'prd-ticket': await handleSupportTicket(interaction, 'prd'); break;
        case 'set-role-count': await handleSetRoleCount(interaction); break;
        case 'logs': await handleLogs(interaction); break;
        case 'verify': await handleVerify(interaction); break;
        default: await interaction.reply({ content: '❌ Unknown command!', ephemeral: true });
      }
    } catch (error) {
      console.error(error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: '❌ Error executing command!', ephemeral: true });
      }
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'activity_verify') {
      try {
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('✅ Activity Verified')
          .setDescription(`**${interaction.user.username}**, your activity has been verified!\n\nNext check: In 3 days`)
          .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });

        const logChannel = client.channels.cache.get(BOTS_LOGS_CHANNEL);
        if (logChannel) {
          const logEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✅ Activity Verified')
            .addFields(
              { name: 'User', value: `${interaction.user.username} (${interaction.user.id})`, inline: true }
            )
            .setTimestamp();
          await logChannel.send({ embeds: [logEmbed] });
        }
      } catch (error) {
        console.error('Activity verify button error:', error);
        await interaction.reply({ content: '❌ Failed to verify activity!', ephemeral: true });
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
