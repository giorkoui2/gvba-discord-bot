import { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits } from 'discord.js';

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1517508525339840665'; // GVBA Guild ID

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const CHANNEL_STRUCTURE = [
  {
    name: '🔓 || UNLOCK ACCESS',
    channels: [
      { name: '🔓 || welcome', type: ChannelType.GuildText },
      { name: '✅ || verification', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🔰 || GVBA IMPORTANT BULLETIN',
    channels: [
      { name: '𓊈📜𓊉 • guidelines', type: ChannelType.GuildText },
      { name: '𓊈📋𓊉 • chain-of-command', type: ChannelType.GuildText },
      { name: '𓊈📢𓊉 • announcements', type: ChannelType.GuildText },
      { name: '𓊈📜𓊉 • history', type: ChannelType.GuildText },
      { name: '𓊈🎖️𓊉 • divisions', type: ChannelType.GuildText },
      { name: '𓊈🤝𓊉 • allies', type: ChannelType.GuildText },
      { name: '𓊈🔗𓊉 • socials', type: ChannelType.GuildText }
    ]
  },
  {
    name: '💬 || COMMUNITY',
    channels: [
      { name: '𓊈💬𓊉 • general', type: ChannelType.GuildText },
      { name: '𓊈📸𓊉 • media', type: ChannelType.GuildText },
      { name: '𓊈🗣️𓊉 • chat', type: ChannelType.GuildText },
      { name: '𓊈🤖𓊉 • commands', type: ChannelType.GuildText },
      { name: '𓊈🎖️𓊉 • rank-req', type: ChannelType.GuildText },
      { name: '𓊈🐞𓊉 • bug-reports', type: ChannelType.GuildText },
      { name: '𓊈🔢𓊉 • counting', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🎫 || SUPPORT',
    channels: [
      { name: '𓊈🎫𓊉 • open-ticket', type: ChannelType.GuildText },
      { name: '𓊈📩𓊉 • requests', type: ChannelType.GuildText },
      { name: '𓊈❓𓊉 • support', type: ChannelType.GuildText },
      { name: '𓊈⚠️𓊉 • reports', type: ChannelType.GuildText },
      { name: '𓊈🤝𓊉 • partnerships', type: ChannelType.GuildText },
      { name: '𓊈🧾𓊉 • archives', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🎯 || TRAINING',
    channels: [
      { name: '𓊈📢𓊉 • announcements', type: ChannelType.GuildText },
      { name: '𓊈📅𓊉 • schedule', type: ChannelType.GuildText },
      { name: '𓊈🎯𓊉 • tryouts', type: ChannelType.GuildText },
      { name: '𓊈🪖𓊉 • drills', type: ChannelType.GuildText },
      { name: '𓊈📘𓊉 • guide', type: ChannelType.GuildText },
      { name: '𓊈📜𓊉 • rules', type: ChannelType.GuildText },
      { name: '𓊈🎮𓊉 • practical', type: ChannelType.GuildText },
      { name: '𓊈📋𓊉 • attendance', type: ChannelType.GuildText },
      { name: '𓊈📈𓊉 • progress', type: ChannelType.GuildText },
      { name: '𓊈🎖️𓊉 • certifications', type: ChannelType.GuildText },
      { name: '𓊈👨‍🏫𓊉 • instructors', type: ChannelType.GuildText },
      { name: '𓊈🧾𓊉 • logs', type: ChannelType.GuildText },
      { name: '𓊈📁𓊉 • records', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🎤 || TRYOUTS & TRAININGS VC',
    channels: [
      { name: '𓊈🎯𓊉 • tryouts-1', type: ChannelType.GuildVoice },
      { name: '𓊈🎯𓊉 • tryouts-2', type: ChannelType.GuildVoice },
      { name: '𓊈🪖𓊉 • training-1', type: ChannelType.GuildVoice },
      { name: '𓊈🪖𓊉 • training-2', type: ChannelType.GuildVoice },
      { name: '𓊈👨‍🏫𓊉 • instructor', type: ChannelType.GuildVoice },
      { name: '𓊈🔊𓊉 • briefing', type: ChannelType.GuildVoice },
      { name: '𓊈⏳𓊉 • waiting', type: ChannelType.GuildVoice },
      { name: '𓊈🔇𓊉 • afk', type: ChannelType.GuildVoice }
    ]
  },
  {
    name: '🎖️ || OFFICERS+',
    channels: [
      { name: '𓊈📢𓊉 • briefings', type: ChannelType.GuildText },
      { name: '𓊈🪖𓊉 • operations', type: ChannelType.GuildText },
      { name: '𓊈📊𓊉 • overview', type: ChannelType.GuildText },
      { name: '𓊈📈𓊉 • performance', type: ChannelType.GuildText },
      { name: '𓊈📋𓊉 • reports', type: ChannelType.GuildText },
      { name: '𓊈⚖️𓊉 • discipline', type: ChannelType.GuildText },
      { name: '𓊈📂𓊉 • documents', type: ChannelType.GuildText },
      { name: '𓊈🧾𓊉 • records', type: ChannelType.GuildText },
      { name: '𓊈💬𓊉 • chat', type: ChannelType.GuildText }
    ]
  },
  {
    name: '👑 || HQ+',
    channels: [
      { name: '𓊈💬𓊉 • general', type: ChannelType.GuildText },
      { name: '𓊈🤖𓊉 • commands', type: ChannelType.GuildText },
      { name: '𓊈📋𓊉 • reports', type: ChannelType.GuildText },
      { name: '𓊈📢𓊉 • announcements', type: ChannelType.GuildText },
      { name: '𓊈⚖️𓊉 • decisions', type: ChannelType.GuildText },
      { name: '𓊈📊𓊉 • overview', type: ChannelType.GuildText },
      { name: '𓊈🧠𓊉 • planning', type: ChannelType.GuildText },
      { name: '𓊈📡𓊉 • operations', type: ChannelType.GuildText },
      { name: '𓊈🔐𓊉 • private', type: ChannelType.GuildText },
      { name: '𓊈📁𓊉 • archive', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🎤 || HQ+ VOICE',
    channels: [
      { name: '𓊈🔊𓊉 • command', type: ChannelType.GuildVoice },
      { name: '𓊈🧠𓊉 • briefing', type: ChannelType.GuildVoice },
      { name: '𓊈🏢𓊉 • offices', type: ChannelType.GuildVoice },
      { name: '𓊈🔇𓊉 • afk', type: ChannelType.GuildVoice }
    ]
  },
  {
    name: '🏢 || OFFICES',
    channels: [
      { name: '𓊈👑𓊉 • king', type: ChannelType.GuildText },
      { name: '𓊈👑𓊉 • co-owner', type: ChannelType.GuildText },
      { name: '𓊈👑𓊉 • fm', type: ChannelType.GuildText },
      { name: '𓊈👑𓊉 • vfm', type: ChannelType.GuildText },
      { name: '𓊈🛡️𓊉 • cod', type: ChannelType.GuildText },
      { name: '𓊈🛡️𓊉 • vcod', type: ChannelType.GuildText },
      { name: '𓊈📊𓊉 • cgs', type: ChannelType.GuildText },
      { name: '𓊈📊𓊉 • dcgs', type: ChannelType.GuildText },
      { name: '𓊈📊𓊉 • acgs', type: ChannelType.GuildText },
      { name: '𓊈🪖𓊉 • asm', type: ChannelType.GuildText }
    ]
  },
  {
    name: '📊 || LOGS',
    channels: [
      { name: '𓊈📥𓊉 • joins', type: ChannelType.GuildText },
      { name: '𓊈📤𓊉 • leaves', type: ChannelType.GuildText },
      { name: '𓊈⚖️𓊉 • discipline', type: ChannelType.GuildText },
      { name: '𓊈📤𓊉 • discharge', type: ChannelType.GuildText },
      { name: '𓊈🤖𓊉 • bots', type: ChannelType.GuildText },
      { name: '𓊈🎯𓊉 • training', type: ChannelType.GuildText },
      { name: '𓊈📜𓊉 • transcripts', type: ChannelType.GuildText }
    ]
  }
];

client.once('ready', async () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
  
  const guild = await client.guilds.fetch(GUILD_ID);
  console.log(`✅ Found guild: ${guild.name}`);
  
  console.log('🚀 Creating categories and channels...');
  
  for (const categoryData of CHANNEL_STRUCTURE) {
    try {
      // Create category
      const category = await guild.channels.create({
        name: categoryData.name,
        type: ChannelType.GuildCategory,
        reason: '[GVBA] Setup Bot - Channel Structure'
      });
      console.log(`✅ Created category: ${category.name}`);
      
      // Create channels in category
      for (const channelData of categoryData.channels) {
        try {
          const channel = await guild.channels.create({
            name: channelData.name,
            type: channelData.type,
            parent: category.id,
            reason: '[GVBA] Setup Bot - Channel Structure'
          });
          console.log(`  ✅ Created channel: ${channel.name}`);
        } catch (error) {
          console.error(`  ❌ Error creating channel ${channelData.name}:`, error.message);
        }
      }
    } catch (error) {
      console.error(`❌ Error creating category ${categoryData.name}:`, error.message);
    }
  }
  
  console.log('✅ All categories and channels created!');
  process.exit(0);
});

client.login(TOKEN);
