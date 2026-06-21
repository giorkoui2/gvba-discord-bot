import { Client, GatewayIntentBits, PermissionFlagsBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const GUILD_ID = '1517508525339840665';

client.on('ready', async () => {
  try {
    console.log('🔧 Setting up channel permissions...');
    
    const guild = await client.guilds.fetch(GUILD_ID);
    console.log(`✅ Connected to guild: ${guild.name}`);

    // Get or create roles
    let unclearedRole = guild.roles.cache.find(r => r.name.toLowerCase().includes('uncleared visitor'));
    let verifiedRole = guild.roles.cache.find(r => r.name.toLowerCase().includes('verified'));

    if (!unclearedRole) {
      console.log('📝 Creating GVBA || Uncleared Visitor role...');
      unclearedRole = await guild.roles.create({
        name: 'GVBA || Uncleared Visitor',
        color: '#808080',
        reason: 'Auto-created for new members'
      });
      console.log(`✅ Created role: ${unclearedRole.name}`);
    } else {
      console.log(`✅ Found existing role: ${unclearedRole.name}`);
    }

    if (!verifiedRole) {
      console.log('⚠️ Verified role not found!');
    } else {
      console.log(`✅ Found verified role: ${verifiedRole.name}`);
    }

    // Find welcome and verify channels
    const welcomeChannel = guild.channels.cache.find(c => c.name.toLowerCase().includes('welcome'));
    const verifyChannel = guild.channels.cache.find(c => c.name.toLowerCase().includes('verif'));

    if (!welcomeChannel) {
      console.log('⚠️ Welcome channel not found!');
    } else {
      console.log(`✅ Found welcome channel: ${welcomeChannel.name}`);
    }

    if (!verifyChannel) {
      console.log('⚠️ Verify channel not found!');
    } else {
      console.log(`✅ Found verify channel: ${verifyChannel.name}`);
    }

    // Setup channel permissions
    console.log('\n📍 Setting up channel permissions...');

    if (welcomeChannel) {
      // Deny @everyone
      await welcomeChannel.permissionOverwrites.create(guild.roles.everyone, {
        ViewChannel: false
      });
      console.log(`✅ Denied @everyone from ${welcomeChannel.name}`);

      // Allow uncleared visitors
      await welcomeChannel.permissionOverwrites.create(unclearedRole, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true
      });
      console.log(`✅ Allowed ${unclearedRole.name} in ${welcomeChannel.name}`);

      // Allow verified
      if (verifiedRole) {
        await welcomeChannel.permissionOverwrites.create(verifiedRole, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true
        });
        console.log(`✅ Allowed ${verifiedRole.name} in ${welcomeChannel.name}`);
      }
    }

    if (verifyChannel) {
      // Deny @everyone
      await verifyChannel.permissionOverwrites.create(guild.roles.everyone, {
        ViewChannel: false
      });
      console.log(`✅ Denied @everyone from ${verifyChannel.name}`);

      // Allow uncleared visitors
      await verifyChannel.permissionOverwrites.create(unclearedRole, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true
      });
      console.log(`✅ Allowed ${unclearedRole.name} in ${verifyChannel.name}`);

      // Allow verified
      if (verifiedRole) {
        await verifyChannel.permissionOverwrites.create(verifiedRole, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true
        });
        console.log(`✅ Allowed ${verifiedRole.name} in ${verifyChannel.name}`);
      }
    }

    // Hide all other channels from uncleared visitors
    console.log('\n🔒 Hiding other channels from uncleared visitors...');
    const allChannels = guild.channels.cache.filter(c => c.isTextBased());
    
    for (const [, channel] of allChannels) {
      if (channel.name.toLowerCase().includes('welcome') || channel.name.toLowerCase().includes('verif')) {
        continue; // Skip welcome and verify channels
      }

      try {
        await channel.permissionOverwrites.create(unclearedRole, {
          ViewChannel: false
        });
        console.log(`✅ Hid ${channel.name} from uncleared visitors`);
      } catch (err) {
        console.error(`❌ Error hiding ${channel.name}:`, err.message);
      }
    }

    console.log('\n✅ Channel setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up channels:', error);
    process.exit(1);
  }
});

client.login(process.env.DISCORD_TOKEN);
