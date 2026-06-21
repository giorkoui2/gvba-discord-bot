import { Client, GatewayIntentBits, ChannelType } from 'discord.js';

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1517508525339840665';
const THIN_SPACE = '\u2009'; // U+2009 thin space

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const CHANNEL_STRUCTURE = [
  {
    name: `🔓${THIN_SPACE}|${THIN_SPACE}UNLOCK ACCESS`,
    channels: [
      { name: `🔓${THIN_SPACE}|${THIN_SPACE}welcome`, type: ChannelType.GuildText },
      { name: `✅${THIN_SPACE}|${THIN_SPACE}verification`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🔰${THIN_SPACE}|${THIN_SPACE}GVBA IMPORTANT BULLETIN`,
    channels: [
      { name: `📜${THIN_SPACE}|${THIN_SPACE}guidelines`, type: ChannelType.GuildText },
      { name: `📋${THIN_SPACE}|${THIN_SPACE}chain-of-command`, type: ChannelType.GuildText },
      { name: `📢${THIN_SPACE}|${THIN_SPACE}announcements`, type: ChannelType.GuildText },
      { name: `📜${THIN_SPACE}|${THIN_SPACE}history`, type: ChannelType.GuildText },
      { name: `🎖️${THIN_SPACE}|${THIN_SPACE}divisions`, type: ChannelType.GuildText },
      { name: `🤝${THIN_SPACE}|${THIN_SPACE}allies`, type: ChannelType.GuildText },
      { name: `🔗${THIN_SPACE}|${THIN_SPACE}socials`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `💬${THIN_SPACE}|${THIN_SPACE}COMMUNITY`,
    channels: [
      { name: `💬${THIN_SPACE}|${THIN_SPACE}general`, type: ChannelType.GuildText },
      { name: `📸${THIN_SPACE}|${THIN_SPACE}media`, type: ChannelType.GuildText },
      { name: `🗣️${THIN_SPACE}|${THIN_SPACE}chat`, type: ChannelType.GuildText },
      { name: `🤖${THIN_SPACE}|${THIN_SPACE}commands`, type: ChannelType.GuildText },
      { name: `🎖️${THIN_SPACE}|${THIN_SPACE}rank-req`, type: ChannelType.GuildText },
      { name: `🐞${THIN_SPACE}|${THIN_SPACE}bug-reports`, type: ChannelType.GuildText },
      { name: `🔢${THIN_SPACE}|${THIN_SPACE}counting`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🎫${THIN_SPACE}|${THIN_SPACE}SUPPORT`,
    channels: [
      { name: `🎫${THIN_SPACE}|${THIN_SPACE}open-ticket`, type: ChannelType.GuildText },
      { name: `📩${THIN_SPACE}|${THIN_SPACE}requests`, type: ChannelType.GuildText },
      { name: `❓${THIN_SPACE}|${THIN_SPACE}support`, type: ChannelType.GuildText },
      { name: `⚠️${THIN_SPACE}|${THIN_SPACE}reports`, type: ChannelType.GuildText },
      { name: `🤝${THIN_SPACE}|${THIN_SPACE}partnerships`, type: ChannelType.GuildText },
      { name: `🧾${THIN_SPACE}|${THIN_SPACE}archives`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🎯${THIN_SPACE}|${THIN_SPACE}TRAINING`,
    channels: [
      { name: `📢${THIN_SPACE}|${THIN_SPACE}announcements`, type: ChannelType.GuildText },
      { name: `📅${THIN_SPACE}|${THIN_SPACE}schedule`, type: ChannelType.GuildText },
      { name: `🎯${THIN_SPACE}|${THIN_SPACE}tryouts`, type: ChannelType.GuildText },
      { name: `🪖${THIN_SPACE}|${THIN_SPACE}drills`, type: ChannelType.GuildText },
      { name: `📘${THIN_SPACE}|${THIN_SPACE}guide`, type: ChannelType.GuildText },
      { name: `📜${THIN_SPACE}|${THIN_SPACE}rules`, type: ChannelType.GuildText },
      { name: `🎮${THIN_SPACE}|${THIN_SPACE}practical`, type: ChannelType.GuildText },
      { name: `📋${THIN_SPACE}|${THIN_SPACE}attendance`, type: ChannelType.GuildText },
      { name: `📈${THIN_SPACE}|${THIN_SPACE}progress`, type: ChannelType.GuildText },
      { name: `🎖️${THIN_SPACE}|${THIN_SPACE}certifications`, type: ChannelType.GuildText },
      { name: `👨‍🏫${THIN_SPACE}|${THIN_SPACE}instructors`, type: ChannelType.GuildText },
      { name: `🧾${THIN_SPACE}|${THIN_SPACE}logs`, type: ChannelType.GuildText },
      { name: `📁${THIN_SPACE}|${THIN_SPACE}records`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🎤${THIN_SPACE}|${THIN_SPACE}TRYOUTS & TRAININGS VC`,
    channels: [
      { name: `🎯${THIN_SPACE}|${THIN_SPACE}tryouts-1`, type: ChannelType.GuildVoice },
      { name: `🎯${THIN_SPACE}|${THIN_SPACE}tryouts-2`, type: ChannelType.GuildVoice },
      { name: `🪖${THIN_SPACE}|${THIN_SPACE}training-1`, type: ChannelType.GuildVoice },
      { name: `🪖${THIN_SPACE}|${THIN_SPACE}training-2`, type: ChannelType.GuildVoice },
      { name: `👨‍🏫${THIN_SPACE}|${THIN_SPACE}instructor`, type: ChannelType.GuildVoice },
      { name: `🔊${THIN_SPACE}|${THIN_SPACE}briefing`, type: ChannelType.GuildVoice },
      { name: `⏳${THIN_SPACE}|${THIN_SPACE}waiting`, type: ChannelType.GuildVoice },
      { name: `🔇${THIN_SPACE}|${THIN_SPACE}afk`, type: ChannelType.GuildVoice }
    ]
  },
  {
    name: `🎖️${THIN_SPACE}|${THIN_SPACE}OFFICERS+`,
    channels: [
      { name: `📢${THIN_SPACE}|${THIN_SPACE}briefings`, type: ChannelType.GuildText },
      { name: `🪖${THIN_SPACE}|${THIN_SPACE}operations`, type: ChannelType.GuildText },
      { name: `📊${THIN_SPACE}|${THIN_SPACE}overview`, type: ChannelType.GuildText },
      { name: `📈${THIN_SPACE}|${THIN_SPACE}performance`, type: ChannelType.GuildText },
      { name: `📋${THIN_SPACE}|${THIN_SPACE}reports`, type: ChannelType.GuildText },
      { name: `⚖️${THIN_SPACE}|${THIN_SPACE}discipline`, type: ChannelType.GuildText },
      { name: `📂${THIN_SPACE}|${THIN_SPACE}documents`, type: ChannelType.GuildText },
      { name: `🧾${THIN_SPACE}|${THIN_SPACE}records`, type: ChannelType.GuildText },
      { name: `💬${THIN_SPACE}|${THIN_SPACE}chat`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `👑${THIN_SPACE}|${THIN_SPACE}HQ+`,
    channels: [
      { name: `💬${THIN_SPACE}|${THIN_SPACE}general`, type: ChannelType.GuildText },
      { name: `🤖${THIN_SPACE}|${THIN_SPACE}commands`, type: ChannelType.GuildText },
      { name: `📋${THIN_SPACE}|${THIN_SPACE}reports`, type: ChannelType.GuildText },
      { name: `📢${THIN_SPACE}|${THIN_SPACE}announcements`, type: ChannelType.GuildText },
      { name: `⚖️${THIN_SPACE}|${THIN_SPACE}decisions`, type: ChannelType.GuildText },
      { name: `📊${THIN_SPACE}|${THIN_SPACE}overview`, type: ChannelType.GuildText },
      { name: `🧠${THIN_SPACE}|${THIN_SPACE}planning`, type: ChannelType.GuildText },
      { name: `📡${THIN_SPACE}|${THIN_SPACE}operations`, type: ChannelType.GuildText },
      { name: `🔐${THIN_SPACE}|${THIN_SPACE}private`, type: ChannelType.GuildText },
      { name: `📁${THIN_SPACE}|${THIN_SPACE}archive`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🎤${THIN_SPACE}|${THIN_SPACE}HQ+ VOICE`,
    channels: [
      { name: `🔊${THIN_SPACE}|${THIN_SPACE}command`, type: ChannelType.GuildVoice },
      { name: `🧠${THIN_SPACE}|${THIN_SPACE}briefing`, type: ChannelType.GuildVoice },
      { name: `🏢${THIN_SPACE}|${THIN_SPACE}offices`, type: ChannelType.GuildVoice },
      { name: `🔇${THIN_SPACE}|${THIN_SPACE}afk`, type: ChannelType.GuildVoice }
    ]
  },
  {
    name: `🏢${THIN_SPACE}|${THIN_SPACE}OFFICES`,
    channels: [
      { name: `👑${THIN_SPACE}|${THIN_SPACE}king`, type: ChannelType.GuildText },
      { name: `👑${THIN_SPACE}|${THIN_SPACE}co-owner`, type: ChannelType.GuildText },
      { name: `👑${THIN_SPACE}|${THIN_SPACE}fm`, type: ChannelType.GuildText },
      { name: `👑${THIN_SPACE}|${THIN_SPACE}vfm`, type: ChannelType.GuildText },
      { name: `🛡️${THIN_SPACE}|${THIN_SPACE}cod`, type: ChannelType.GuildText },
      { name: `🛡️${THIN_SPACE}|${THIN_SPACE}vcod`, type: ChannelType.GuildText },
      { name: `📊${THIN_SPACE}|${THIN_SPACE}cgs`, type: ChannelType.GuildText },
      { name: `📊${THIN_SPACE}|${THIN_SPACE}dcgs`, type: ChannelType.GuildText },
      { name: `📊${THIN_SPACE}|${THIN_SPACE}acgs`, type: ChannelType.GuildText },
      { name: `🪖${THIN_SPACE}|${THIN_SPACE}asm`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `📊${THIN_SPACE}|${THIN_SPACE}LOGS`,
    channels: [
      { name: `📥${THIN_SPACE}|${THIN_SPACE}joins`, type: ChannelType.GuildText },
      { name: `📤${THIN_SPACE}|${THIN_SPACE}leaves`, type: ChannelType.GuildText },
      { name: `⚖️${THIN_SPACE}|${THIN_SPACE}discipline`, type: ChannelType.GuildText },
      { name: `📤${THIN_SPACE}|${THIN_SPACE}discharge`, type: ChannelType.GuildText },
      { name: `🤖${THIN_SPACE}|${THIN_SPACE}bots`, type: ChannelType.GuildText },
      { name: `🎯${THIN_SPACE}|${THIN_SPACE}training`, type: ChannelType.GuildText },
      { name: `📜${THIN_SPACE}|${THIN_SPACE}transcripts`, type: ChannelType.GuildText }
    ]
  }
];

client.once('ready', async () => {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    console.log(`✅ Found guild: ${guild.name}\n`);
    
    console.log('🗑️ Deleting old channels...');
    
    const allChannels = guild.channels.cache.filter(c => c.type === ChannelType.GuildText || c.type === ChannelType.GuildVoice);
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
    
    console.log('\n🚀 Creating new channels with thin space...\n');
    
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
    
    console.log('\n✅ ALL CHANNELS CREATED WITH THIN SPACE!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
});

client.login(TOKEN);
