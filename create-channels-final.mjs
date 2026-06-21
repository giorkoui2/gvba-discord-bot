import { Client, GatewayIntentBits, ChannelType } from 'discord.js';

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1517508525339840665';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const CHANNEL_STRUCTURE = [
  {
    name: '🔓 | UNLOCK ACCESS',
    channels: [
      { name: '🔓 | welcome', type: ChannelType.GuildText },
      { name: '✅ | verification', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🔰 | GVBA IMPORTANT BULLETIN',
    channels: [
      { name: '📜 | guidelines', type: ChannelType.GuildText },
      { name: '📋 | chain-of-command', type: ChannelType.GuildText },
      { name: '📢 | announcements', type: ChannelType.GuildText },
      { name: '📜 | history', type: ChannelType.GuildText },
      { name: '🎖️ | divisions', type: ChannelType.GuildText },
      { name: '🤝 | allies', type: ChannelType.GuildText },
      { name: '🔗 | socials', type: ChannelType.GuildText }
    ]
  },
  {
    name: '💬 | COMMUNITY',
    channels: [
      { name: '💬 | general', type: ChannelType.GuildText },
      { name: '📸 | media', type: ChannelType.GuildText },
      { name: '🗣️ | chat', type: ChannelType.GuildText },
      { name: '🤖 | commands', type: ChannelType.GuildText },
      { name: '🎖️ | rank-req', type: ChannelType.GuildText },
      { name: '🐞 | bug-reports', type: ChannelType.GuildText },
      { name: '🔢 | counting', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🎫 | SUPPORT',
    channels: [
      { name: '🎫 | open-ticket', type: ChannelType.GuildText },
      { name: '📩 | requests', type: ChannelType.GuildText },
      { name: '❓ | support', type: ChannelType.GuildText },
      { name: '⚠️ | reports', type: ChannelType.GuildText },
      { name: '🤝 | partnerships', type: ChannelType.GuildText },
      { name: '🧾 | archives', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🎯 | TRAINING',
    channels: [
      { name: '📢 | announcements', type: ChannelType.GuildText },
      { name: '📅 | schedule', type: ChannelType.GuildText },
      { name: '🎯 | tryouts', type: ChannelType.GuildText },
      { name: '🪖 | drills', type: ChannelType.GuildText },
      { name: '📘 | guide', type: ChannelType.GuildText },
      { name: '📜 | rules', type: ChannelType.GuildText },
      { name: '🎮 | practical', type: ChannelType.GuildText },
      { name: '📋 | attendance', type: ChannelType.GuildText },
      { name: '📈 | progress', type: ChannelType.GuildText },
      { name: '🎖️ | certifications', type: ChannelType.GuildText },
      { name: '👨‍🏫 | instructors', type: ChannelType.GuildText },
      { name: '🧾 | logs', type: ChannelType.GuildText },
      { name: '📁 | records', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🎤 | TRYOUTS & TRAININGS VC',
    channels: [
      { name: '🎯 | tryouts-1', type: ChannelType.GuildVoice },
      { name: '🎯 | tryouts-2', type: ChannelType.GuildVoice },
      { name: '🪖 | training-1', type: ChannelType.GuildVoice },
      { name: '🪖 | training-2', type: ChannelType.GuildVoice },
      { name: '👨‍🏫 | instructor', type: ChannelType.GuildVoice },
      { name: '🔊 | briefing', type: ChannelType.GuildVoice },
      { name: '⏳ | waiting', type: ChannelType.GuildVoice },
      { name: '🔇 | afk', type: ChannelType.GuildVoice }
    ]
  },
  {
    name: '🎖️ | OFFICERS+',
    channels: [
      { name: '📢 | briefings', type: ChannelType.GuildText },
      { name: '🪖 | operations', type: ChannelType.GuildText },
      { name: '📊 | overview', type: ChannelType.GuildText },
      { name: '📈 | performance', type: ChannelType.GuildText },
      { name: '📋 | reports', type: ChannelType.GuildText },
      { name: '⚖️ | discipline', type: ChannelType.GuildText },
      { name: '📂 | documents', type: ChannelType.GuildText },
      { name: '🧾 | records', type: ChannelType.GuildText },
      { name: '💬 | chat', type: ChannelType.GuildText }
    ]
  },
  {
    name: '👑 | HQ+',
    channels: [
      { name: '💬 | general', type: ChannelType.GuildText },
      { name: '🤖 | commands', type: ChannelType.GuildText },
      { name: '📋 | reports', type: ChannelType.GuildText },
      { name: '📢 | announcements', type: ChannelType.GuildText },
      { name: '⚖️ | decisions', type: ChannelType.GuildText },
      { name: '📊 | overview', type: ChannelType.GuildText },
      { name: '🧠 | planning', type: ChannelType.GuildText },
      { name: '📡 | operations', type: ChannelType.GuildText },
      { name: '🔐 | private', type: ChannelType.GuildText },
      { name: '📁 | archive', type: ChannelType.GuildText }
    ]
  },
  {
    name: '🎤 | HQ+ VOICE',
    channels: [
      { name: '🔊 | command', type: ChannelType.GuildVoice },
      { name: '🧠 | briefing', type: ChannelType.GuildVoice },
      { name: '🏢 | offices', type: ChannelType.GuildVoice },
      { name: '🔇 | afk', type: ChannelType.GuildVoice }
    ]
  },
  {
    name: '🏢 | OFFICES',
    channels: [
      { name: '👑 | king', type: ChannelType.GuildText },
      { name: '👑 | co-owner', type: ChannelType.GuildText },
      { name: '👑 | fm', type: ChannelType.GuildText },
      { name: '👑 | vfm', type: ChannelType.GuildText },
      { name: '🛡️ | cod', type: ChannelType.GuildText },
      { name: '🛡️ | vcod', type: ChannelType.GuildText },
      { name: '📊 | cgs', type: ChannelType.GuildText },
      { name: '📊 | dcgs', type: ChannelType.GuildText },
      { name: '📊 | acgs', type: ChannelType.GuildText },
      { name: '🪖 | asm', type: ChannelType.GuildText }
    ]
  },
  {
    name: '📊 | LOGS',
    channels: [
      { name: '📥 | joins', type: ChannelType.GuildText },
      { name: '📤 | leaves', type: ChannelType.GuildText },
      { name: '⚖️ | discipline', type: ChannelType.GuildText },
      { name: '📤 | discharge', type: ChannelType.GuildText },
      { name: '🤖 | bots', type: ChannelType.GuildText },
      { name: '🎯 | training', type: ChannelType.GuildText },
      { name: '📜 | transcripts', type: ChannelType.GuildText }
    ]
  }
];

client.once('ready', async () => {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    console.log(`✅ Found guild: ${guild.name}\n`);
    
    console.log('🗑️ Deleting old channels...');
    
    const allChannels = guild.channels.cache.filter(c => c.type === ChannelType.GuildText | c.type === ChannelType.GuildVoice);
    for (const [id, channel] of allChannels) {
      try {
        await channel.delete();
        console.log(`  ✅ Deleted: ${channel.name}`);
      } catch (error) {
        console.error(`  ❌ Error deleting ${channel.name}`);
      }
    }
    
    const allCategories = guild.channels.cache.filter(c => c.type === ChannelType.GuildCategory);
    for (const [id, category] of allCategories) {
      try {
        await category.delete();
        console.log(`  ✅ Deleted category: ${category.name}`);
      } catch (error) {
        console.error(`  ❌ Error deleting category ${category.name}`);
      }
    }
    
    console.log('\n🚀 Creating new channels with emoji||name format...\n');
    
    for (const categoryData of CHANNEL_STRUCTURE) {
      try {
        const category = await guild.channels.create({
          name: categoryData.name,
          type: ChannelType.GuildCategory
        });
        console.log(`✅ Created category: ${category.name}`);
        
        for (const channelData of categoryData.channels) {
          try {
            const channel = await guild.channels.create({
              name: channelData.name,
              type: channelData.type,
              parent: category.id
            });
            console.log(`  ✅ Created: ${channel.name}`);
          } catch (error) {
            console.error(`  ❌ Error creating ${channelData.name}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error creating category ${categoryData.name}`);
      }
    }
    
    console.log('\n✅ ALL CHANNELS CREATED SUCCESSFULLY!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
});

client.login(TOKEN);
