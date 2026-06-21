import { Client, GatewayIntentBits, PermissionFlagsBits, ChannelType } from 'discord.js';

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1517508525339840665'; // GVBA Guild ID

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// Role names to match
const ROLE_NAMES = {
  // Royalty
  FOUNDER: 'GVBA || Founder 👑',
  CO_FOUNDER: 'GVBA || Co-Founder 👑',
  QUEEN: 'GVBA || Queen 👑',
  KINGS_SECRETARY: "GVBA || King's Secretary 👑",
  COMMUNITY_MANAGER: 'GVBA || Community Manager 🏛️',
  
  // HQ Ranks
  FM: 'FM || Field Marshal 🏛️',
  VFM: 'VFM || Vice Field Marshal 🏛️',
  CDS: 'CDS || Chief of Defence Staff ⚔️',
  VCDS: 'VCDS || Vice Chief of Defence Staff ⚔️',
  CGS: 'CGS || Chief of General Staff 🏛️',
  DCGS: 'DCGS || Deputy Chief of General Staff 🏛️',
  ASM: 'ASM || Army Sergeant Major 🪖',
  CRE: 'CRE || Chief Engineer 🔧',
  
  // Officer Ranks
  GENERAL: 'OF-9 || General',
  LT_GENERAL: 'OF-8 || Lieutenant General',
  MAJ_GENERAL: 'OF-7 || Major General',
  BRIGADIER: 'OF-6 || Brigadier',
  COLONEL: 'OF-5 || Colonel',
  LT_COLONEL: 'OF-4 || Lieutenant Colonel',
  MAJOR: 'OF-3 || Major',
  CAPTAIN: 'OF-2 || Captain',
  LIEUTENANT: 'OF-1 || Lieutenant',
  
  // Enlisted Ranks
  WO1: 'OR-9 || Warrant Officer Class 1',
  WO2: 'OR-8 || Warrant Officer Class 2',
  ELITE_SGT: 'OR-7 || Elite Sergeant',
  STAFF_SGT: 'OR-6 || Staff Sergeant',
  SERGEANT: 'OR-5 || Sergeant',
  CORPORAL: 'OR-4 || Corporal',
  LANCE_CORPORAL: 'OR-3 || Lance Corporal',
  PFC: 'OR-2 || Private First Class',
  PRIVATE: 'OR-1 || Private',
  
  // Civilian
  CIVILIAN: 'GVBA || Civilian 👥',
  CLEARED_VISITOR: 'GVBA || Cleared Visitor'
};

// Permission structure
const PERMISSION_STRUCTURE = {
  // Category 1: UNLOCK ACCESS - Everyone can see
  'unlock_access': {
    categoryName: '🔓 || UNLOCK ACCESS',
    permissions: [
      { role: '@everyone', allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }
    ]
  },
  
  // Category 2: GVBA IMPORTANT BULLETIN - Verified+ can see
  'bulletin': {
    categoryName: '🔰 || GVBA IMPORTANT BULLETIN',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.CIVILIAN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.PRIVATE, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.GENERAL, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }
    ]
  },
  
  // Category 3: COMMUNITY - Verified+ can see
  'community': {
    categoryName: '💬 || COMMUNITY',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.CIVILIAN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.PRIVATE, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.GENERAL, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }
    ]
  },
  
  // Category 4: SUPPORT - Verified+ can see
  'support': {
    categoryName: '🎫 || SUPPORT',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.CIVILIAN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.PRIVATE, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.GENERAL, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }
    ]
  },
  
  // Category 5: TRAINING - Verified+ can see
  'training': {
    categoryName: '🎯 || TRAINING',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.CIVILIAN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.PRIVATE, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.GENERAL, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }
    ]
  },
  
  // Category 6: TRYOUTS & TRAININGS VC - Verified+ can see
  'tryouts_vc': {
    categoryName: '🎤 || TRYOUTS & TRAININGS VC',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.CIVILIAN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.PRIVATE, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.GENERAL, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.FM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] }
    ]
  },
  
  // Category 7: OFFICERS+ - Officers+ can see
  'officers': {
    categoryName: '🎖️ || OFFICERS+',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.GENERAL, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }
    ]
  },
  
  // Category 8: HQ+ - HQ+ can see
  'hq': {
    categoryName: '👑 || HQ+',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.FM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }
    ]
  },
  
  // Category 9: HQ+ VOICE - HQ+ can see
  'hq_voice': {
    categoryName: '🎤 || HQ+ VOICE',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.FM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] }
    ]
  },
  
  // Category 10: OFFICES - Royalty only
  'offices': {
    categoryName: '🏢 || OFFICES',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }
    ]
  },
  
  // Category 11: LOGS - HQ+ (excluding lowest HQ rank) and Royalty only
  'logs': {
    categoryName: '📊 || LOGS',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      { role: ROLE_NAMES.FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CO_FOUNDER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.QUEEN, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.KINGS_SECRETARY, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.COMMUNITY_MANAGER, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.FM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.VFM, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CDS, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.VCDS, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.CGS, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] },
      { role: ROLE_NAMES.DCGS, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }
      // ASM (lowest HQ rank) is excluded - no permissions
    ]
  }
};

async function setupPermissions() {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    console.log(`✅ Found guild: ${guild.name}`);
    
    console.log('🚀 Setting up channel permissions...\n');
    
    for (const [key, permConfig] of Object.entries(PERMISSION_STRUCTURE)) {
      const category = guild.channels.cache.find(c => c.name === permConfig.categoryName && c.type === ChannelType.GuildCategory);
      
      if (!category) {
        console.error(`❌ Category not found: ${permConfig.categoryName}`);
        continue;
      }
      
      console.log(`📂 Setting permissions for: ${category.name}`);
      
      for (const permData of permConfig.permissions) {
        try {
          let roleId;
          
          if (permData.role === '@everyone') {
            roleId = guild.id; // @everyone role ID is the guild ID
          } else {
            const role = guild.roles.cache.find(r => r.name === permData.role);
            if (!role) {
              console.error(`  ❌ Role not found: ${permData.role}`);
              continue;
            }
            roleId = role.id;
          }
          
          // Set permissions for category
          await category.permissionOverwrites.create(roleId, {
            ViewChannel: permData.allow.includes(PermissionFlagsBits.ViewChannel) ? true : permData.deny.includes(PermissionFlagsBits.ViewChannel) ? false : null,
            ReadMessageHistory: permData.allow.includes(PermissionFlagsBits.ReadMessageHistory) ? true : permData.deny.includes(PermissionFlagsBits.ReadMessageHistory) ? false : null,
            Connect: permData.allow.includes(PermissionFlagsBits.Connect) ? true : permData.deny.includes(PermissionFlagsBits.Connect) ? false : null
          });
          
          console.log(`  ✅ Set permissions for: ${permData.role === '@everyone' ? '@everyone' : permData.role}`);
        } catch (error) {
          console.error(`  ❌ Error setting permissions for ${permData.role}:`, error.message);
        }
      }
      
      console.log('');
    }
    
    console.log('✅ All permissions configured!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

client.once('ready', setupPermissions);
client.login(TOKEN);
