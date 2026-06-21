import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const GUILD_ID = process.env.GUILD_ID;

client.once('ready', async () => {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channels = await guild.channels.fetch();

    console.log('\n🔍 FETCHING CHANNEL IDs...\n');

    const channelMap = {};
    const channelsByCategory = {};

    channels.forEach(channel => {
      if (channel.type === 0 || channel.type === 2) { // Text or Voice
        const categoryName = channel.parent?.name || 'No Category';
        
        if (!channelsByCategory[categoryName]) {
          channelsByCategory[categoryName] = [];
        }

        channelsByCategory[categoryName].push({
          name: channel.name,
          id: channel.id,
          type: channel.type === 0 ? 'Text' : 'Voice'
        });

        // Store by channel name for easy lookup
        channelMap[channel.name] = channel.id;
      }
    });

    // Display organized output
    console.log('═══════════════════════════════════════════════════════════');
    console.log('CHANNELS BY CATEGORY:');
    console.log('═══════════════════════════════════════════════════════════\n');

    Object.entries(channelsByCategory).forEach(([category, chans]) => {
      console.log(`📁 ${category}`);
      chans.forEach(ch => {
        console.log(`   ${ch.type === 'Text' ? '#' : '🔊'} ${ch.name} → ${ch.id}`);
      });
      console.log();
    });

    // Create config file
    const config = {
      LOG_CHANNEL: channelMap['logs'] || 'UPDATE_ME',
      WELCOME_CHANNEL: channelMap['welcome'] || 'UPDATE_ME',
      JOINS_LOGS_CHANNEL: channelMap['joins'] || 'UPDATE_ME',
      LEAVES_LOGS_CHANNEL: channelMap['leaves'] || 'UPDATE_ME',
      GUIDELINES_CHANNEL: channelMap['guidelines'] || 'UPDATE_ME',
      SUPPORT_CHANNEL: channelMap['openticket'] || 'UPDATE_ME'
    };

    // Write to config file
    fs.writeFileSync('./channel-config.json', JSON.stringify(config, null, 2));
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ Channel IDs saved to channel-config.json\n');
    console.log('DETECTED CHANNELS:');
    console.log(JSON.stringify(config, null, 2));
    console.log('\n═══════════════════════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Error fetching channels:', error.message);
  }

  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
