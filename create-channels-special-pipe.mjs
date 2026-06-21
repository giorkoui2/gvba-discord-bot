import { Client, GatewayIntentBits, ChannelType } from 'discord.js';

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1517508525339840665';
const SPECIAL_PIPE = '︱'; // U+FE31 Presentation Form for Vertical Line

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const CHANNEL_STRUCTURE = [
  {
    name: `🔓${SPECIAL_PIPE}UNLOCK ACCESS`,
    channels: [
      { name: `🔓${SPECIAL_PIPE}welcome`, type: ChannelType.GuildText },
      { name: `✅${SPECIAL_PIPE}verification`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🔰${SPECIAL_PIPE}GVBA IMPORTANT BULLETIN`,
    channels: [
      { name: `📜${SPECIAL_PIPE}guidelines`, type: ChannelType.GuildText },
      { name: `📋${SPECIAL_PIPE}chain-of-command`, type: ChannelType.GuildText },
      { name: `📢${SPECIAL_PIPE}announcements`, type: ChannelType.GuildText },
      { name: `📜${SPECIAL_PIPE}history`, type: ChannelType.GuildText },
      { name: `🎖️${SPECIAL_PIPE}divisions`, type: ChannelType.GuildText },
      { name: `🤝${SPECIAL_PIPE}allies`, type: ChannelType.GuildText },
      { name: `🔗${SPECIAL_PIPE}socials`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `💬${SPECIAL_PIPE}COMMUNITY`,
    channels: [
      { name: `💬${SPECIAL_PIPE}general`, type: ChannelType.GuildText },
      { name: `📸${SPECIAL_PIPE}media`, type: ChannelType.GuildText },
      { name: `🗣️${SPECIAL_PIPE}chat`, type: ChannelType.GuildText },
      { name: `🤖${SPECIAL_PIPE}commands`, type: ChannelType.GuildText },
      { name: `🎖️${SPECIAL_PIPE}rank-req`, type: ChannelType.GuildText },
      { name: `🐞${SPECIAL_PIPE}bug-reports`, type: ChannelType.GuildText },
      { name: `🔢${SPECIAL_PIPE}counting`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🎫${SPECIAL_PIPE}SUPPORT`,
    channels: [
      { name: `🎫${SPECIAL_PIPE}open-ticket`, type: ChannelType.GuildText },
      { name: `📩${SPECIAL_PIPE}requests`, type: ChannelType.GuildText },
      { name: `❓${SPECIAL_PIPE}support`, type: ChannelType.GuildText },
      { name: `⚠️${SPECIAL_PIPE}reports`, type: ChannelType.GuildText },
      { name: `🤝${SPECIAL_PIPE}partnerships`, type: ChannelType.GuildText },
      { name: `🧾${SPECIAL_PIPE}archives`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🎯${SPECIAL_PIPE}TRAINING`,
    channels: [
      { name: `📢${SPECIAL_PIPE}announcements`, type: ChannelType.GuildText },
      { name: `📅${SPECIAL_PIPE}schedule`, type: ChannelType.GuildText },
      { name: `🎯${SPECIAL_PIPE}tryouts`, type: ChannelType.GuildText },
      { name: `🪖${SPECIAL_PIPE}drills`, type: ChannelType.GuildText },
      { name: `📘${SPECIAL_PIPE}guide`, type: ChannelType.GuildText },
      { name: `📜${SPECIAL_PIPE}rules`, type: ChannelType.GuildText },
      { name: `🎮${SPECIAL_PIPE}practical`, type: ChannelType.GuildText },
      { name: `📋${SPECIAL_PIPE}attendance`, type: ChannelType.GuildText },
      { name: `📈${SPECIAL_PIPE}progress`, type: ChannelType.GuildText },
      { name: `🎖️${SPECIAL_PIPE}certifications`, type: ChannelType.GuildText },
      { name: `👨‍🏫${SPECIAL_PIPE}instructors`, type: ChannelType.GuildText },
      { name: `🧾${SPECIAL_PIPE}logs`, type: ChannelType.GuildText },
      { name: `📁${SPECIAL_PIPE}records`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🎤${SPECIAL_PIPE}TRYOUTS & TRAININGS VC`,
    channels: [
      { name: `🎯${SPECIAL_PIPE}tryouts-1`, type: ChannelType.GuildVoice },
      { name: `🎯${SPECIAL_PIPE}tryouts-2`, type: ChannelType.GuildVoice },
      { name: `🪖${SPECIAL_PIPE}training-1`, type: ChannelType.GuildVoice },
      { name: `🪖${SPECIAL_PIPE}training-2`, type: ChannelType.GuildVoice },
      { name: `👨‍🏫${SPECIAL_PIPE}instructor`, type: ChannelType.GuildVoice },
      { name: `🔊${SPECIAL_PIPE}briefing`, type: ChannelType.GuildVoice },
      { name: `⏳${SPECIAL_PIPE}waiting`, type: ChannelType.GuildVoice },
      { name: `🔇${SPECIAL_PIPE}afk`, type: ChannelType.GuildVoice }
    ]
  },
  {
    name: `🎖️${SPECIAL_PIPE}OFFICERS+`,
    channels: [
      { name: `📢${SPECIAL_PIPE}briefings`, type: ChannelType.GuildText },
      { name: `🪖${SPECIAL_PIPE}operations`, type: ChannelType.GuildText },
      { name: `📊${SPECIAL_PIPE}overview`, type: ChannelType.GuildText },
      { name: `📈${SPECIAL_PIPE}performance`, type: ChannelType.GuildText },
      { name: `📋${SPECIAL_PIPE}reports`, type: ChannelType.GuildText },
      { name: `⚖️${SPECIAL_PIPE}discipline`, type: ChannelType.GuildText },
      { name: `📂${SPECIAL_PIPE}documents`, type: ChannelType.GuildText },
      { name: `🧾${SPECIAL_PIPE}records`, type: ChannelType.GuildText },
      { name: `💬${SPECIAL_PIPE}chat`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `👑${SPECIAL_PIPE}HQ+`,
    channels: [
      { name: `💬${SPECIAL_PIPE}general`, type: ChannelType.GuildText },
      { name: `🤖${SPECIAL_PIPE}commands`, type: ChannelType.GuildText },
      { name: `📋${SPECIAL_PIPE}reports`, type: ChannelType.GuildText },
      { name: `📢${SPECIAL_PIPE}announcements`, type: ChannelType.GuildText },
      { name: `⚖️${SPECIAL_PIPE}decisions`, type: ChannelType.GuildText },
      { name: `📊${SPECIAL_PIPE}overview`, type: ChannelType.GuildText },
      { name: `🧠${SPECIAL_PIPE}planning`, type: ChannelType.GuildText },
      { name: `📡${SPECIAL_PIPE}operations`, type: ChannelType.GuildText },
      { name: `🔐${SPECIAL_PIPE}private`, type: ChannelType.GuildText },
      { name: `📁${SPECIAL_PIPE}archive`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `🎤${SPECIAL_PIPE}HQ+ VOICE`,
    channels: [
      { name: `🔊${SPECIAL_PIPE}command`, type: ChannelType.GuildVoice },
      { name: `🧠${SPECIAL_PIPE}briefing`, type: ChannelType.GuildVoice },
      { name: `🏢${SPECIAL_PIPE}offices`, type: ChannelType.GuildVoice },
      { name: `🔇${SPECIAL_PIPE}afk`, type: ChannelType.GuildVoice }
    ]
  },
  {
    name: `🏢${SPECIAL_PIPE}OFFICES`,
    channels: [
      { name: `👑${SPECIAL_PIPE}king`, type: ChannelType.GuildText },
      { name: `👑${SPECIAL_PIPE}co-owner`, type: ChannelType.GuildText },
      { name: `👑${SPECIAL_PIPE}fm`, type: ChannelType.GuildText },
      { name: `👑${SPECIAL_PIPE}vfm`, type: ChannelType.GuildText },
      { name: `🛡️${SPECIAL_PIPE}cod`, type: ChannelType.GuildText },
      { name: `🛡️${SPECIAL_PIPE}vcod`, type: ChannelType.GuildText },
      { name: `📊${SPECIAL_PIPE}cgs`, type: ChannelType.GuildText },
      { name: `📊${SPECIAL_PIPE}dcgs`, type: ChannelType.GuildText },
      { name: `📊${SPECIAL_PIPE}acgs`, type: ChannelType.GuildText },
      { name: `🪖${SPECIAL_PIPE}asm`, type: ChannelType.GuildText }
    ]
  },
  {
    name: `📊${SPECIAL_PIPE}LOGS`,
    channels: [
      { name: `📥${SPECIAL_PIPE}joins`, type: ChannelType.GuildText },
      { name: `📤${SPECIAL_PIPE}leaves`, type: ChannelType.GuildText },
      { name: `⚖️${SPECIAL_PIPE}discipline`, type: ChannelType.GuildText },
      { name: `📤${SPECIAL_PIPE}discharge`, type: ChannelType.GuildText },
      { name: `🤖${SPECIAL_PIPE}bots`, type: ChannelType.GuildText },
      { name: `🎯${SPECIAL_PIPE}training`, type: ChannelType.GuildText },
      { name: `📜${SPECIAL_PIPE}transcripts`, type: ChannelType.GuildText }
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
    
    console.log('\n🚀 Creating new channels with special pipe character...\n');
    
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
    
    console.log('\n✅ ALL CHANNELS CREATED WITH SPECIAL PIPE CHARACTER!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
});

client.login(TOKEN);
