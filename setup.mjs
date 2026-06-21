import { Client, GatewayIntentBits, REST, Routes, PermissionFlagsBits } from 'discord.js';

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1517508525339840665'; // GVBA Guild ID

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const ROLE_STRUCTURE = [
  // GVBA ROYALTY
  { name: '-------- GVBA ROYALTY --------', color: '#FFD700', hoist: true },
  { name: 'GVBA || Founder 👑', color: '#FFD700', hoist: true },
  { name: 'GVBA || Co-Founder 👑', color: '#FFA500', hoist: true },
  { name: 'GVBA || Queen 👑', color: '#FF69B4', hoist: true },
  { name: "GVBA || King's Secretary 👑", color: '#FF1493', hoist: true },
  { name: 'GVBA || Community Manager 🏛️', color: '#DC143C', hoist: true },
  
  // GVBA HQ RANK'S
  { name: '-------- GVBA HQ RANK\'S --------', color: '#4169E1', hoist: true },
  { name: 'CRE || Chief Engineer 🔧', color: '#4169E1', hoist: false },
  { name: 'FM || Field Marshal 🏛️', color: '#1E90FF', hoist: false },
  { name: 'VFM || Vice Field Marshal 🏛️', color: '#1E90FF', hoist: false },
  { name: 'CDS || Chief of Defence Staff ⚔️', color: '#1E90FF', hoist: false },
  { name: 'VCDS || Vice Chief of Defence Staff ⚔️', color: '#1E90FF', hoist: false },
  { name: 'CGS || Chief of General Staff 🏛️', color: '#1E90FF', hoist: false },
  { name: 'DCGS || Deputy Chief of General Staff 🏛️', color: '#1E90FF', hoist: false },
  { name: 'ASM || Army Sergeant Major 🪖', color: '#1E90FF', hoist: false },
  
  // GVBA OFFICER RANK'S
  { name: '-------- GVBA OFFICER RANK\'S --------', color: '#FF6347', hoist: true },
  { name: 'OF-9 || General', color: '#FF6347', hoist: false },
  { name: 'OF-8 || Lieutenant General', color: '#FF7F50', hoist: false },
  { name: 'OF-7 || Major General', color: '#FF8C00', hoist: false },
  { name: 'OF-6 || Brigadier', color: '#FFA500', hoist: false },
  { name: 'OF-5 || Colonel', color: '#FFB347', hoist: false },
  { name: 'OF-4 || Lieutenant Colonel', color: '#FFCC00', hoist: false },
  { name: 'OF-3 || Major', color: '#FFFF00', hoist: false },
  { name: 'OF-2 || Captain', color: '#FFFF99', hoist: false },
  { name: 'OF-1 || Lieutenant', color: '#FFFFCC', hoist: false },
  
  // GVBA ENLISTED RANK'S
  { name: '-------- GVBA ENLISTED RANK\'S --------', color: '#228B22', hoist: true },
  { name: 'OR-9 || Warrant Officer Class 1', color: '#228B22', hoist: false },
  { name: 'OR-8 || Warrant Officer Class 2', color: '#32CD32', hoist: false },
  { name: 'OR-7 || Elite Sergeant', color: '#00FF00', hoist: false },
  { name: 'OR-6 || Staff Sergeant', color: '#7FFF00', hoist: false },
  { name: 'OR-5 || Sergeant', color: '#ADFF2F', hoist: false },
  { name: 'OR-4 || Corporal', color: '#CDDC39', hoist: false },
  { name: 'OR-3 || Lance Corporal', color: '#D4EE00', hoist: false },
  { name: 'OR-2 || Private First Class', color: '#E6FF00', hoist: false },
  { name: 'OR-1 || Private', color: '#F0FF00', hoist: false },
  
  // GVBA CIVILIAN
  { name: '-------- GVBA CIVILIAN --------', color: '#808080', hoist: true },
  { name: 'GVBA || Civilian 👥', color: '#808080', hoist: false },
  { name: 'GVBA || Cleared Visitor', color: '#A9A9A9', hoist: false },
];

client.once('ready', async () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
  
  const guild = await client.guilds.fetch(GUILD_ID);
  console.log(`✅ Found guild: ${guild.name}`);
  
  console.log('🚀 Creating roles...');
  
  for (const roleData of ROLE_STRUCTURE) {
    try {
      const role = await guild.roles.create({
        name: roleData.name,
        color: roleData.color,
        hoist: roleData.hoist,
        reason: '[GVBA] Setup Bot'
      });
      console.log(`✅ Created role: ${role.name}`);
    } catch (error) {
      console.error(`❌ Error creating role ${roleData.name}:`, error.message);
    }
  }
  
  console.log('✅ All roles created!');
  process.exit(0);
});

client.login(TOKEN);
