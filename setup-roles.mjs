import { Client, GatewayIntentBits } from 'discord.js';
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
    console.log('🔧 Setting up roles...');
    
    const guild = await client.guilds.fetch(GUILD_ID);
    console.log(`✅ Connected to guild: ${guild.name}`);

    // Check if verified role already exists
    let verifiedRole = guild.roles.cache.find(r => r.name.toLowerCase() === 'verified');
    
    if (!verifiedRole) {
      console.log('📝 Creating verified role...');
      verifiedRole = await guild.roles.create({
        name: 'GVBA || Verified ✔️',
        color: '#00FF00',
        reason: 'Auto-created verified role for /verify command'
      });
      console.log(`✅ Created role: ${verifiedRole.name} (ID: ${verifiedRole.id})`);
    } else {
      console.log(`✅ Verified role already exists: ${verifiedRole.name}`);
    }

    // Get all roles to find the civs category
    const allRoles = guild.roles.cache.sort((a, b) => b.position - a.position);
    console.log('\n📋 Current role hierarchy:');
    allRoles.forEach((role, index) => {
      console.log(`${index + 1}. ${role.name} (Position: ${role.position})`);
    });

    // Find the highest role position to place verified role at the top
    const highestRole = allRoles.first();
    if (highestRole) {
      const newPosition = highestRole.position + 1;
      console.log(`\n📍 Moving verified role to position ${newPosition}...`);
      
      await verifiedRole.setPosition(newPosition);
      console.log(`✅ Verified role moved to top position!`);
    }

    console.log('\n✅ Role setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up roles:', error);
    process.exit(1);
  }
});

client.login(process.env.DISCORD_TOKEN);
