import { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits } from 'discord.js';

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

// All Verified roles (Civilian + Enlisted)
const VERIFIED_ROLES = [
  ROLE_NAMES.CIVILIAN,
  ROLE_NAMES.CLEARED_VISITOR,
  ROLE_NAMES.PRIVATE,
  ROLE_NAMES.PFC,
  ROLE_NAMES.LANCE_CORPORAL,
  ROLE_NAMES.CORPORAL,
  ROLE_NAMES.SERGEANT,
  ROLE_NAMES.STAFF_SGT,
  ROLE_NAMES.ELITE_SGT,
  ROLE_NAMES.WO2,
  ROLE_NAMES.WO1
];

// Officer roles
const OFFICER_ROLES = [
  ROLE_NAMES.LIEUTENANT,
  ROLE_NAMES.CAPTAIN,
  ROLE_NAMES.MAJOR,
  ROLE_NAMES.LT_COLONEL,
  ROLE_NAMES.COLONEL,
  ROLE_NAMES.BRIGADIER,
  ROLE_NAMES.MAJ_GENERAL,
  ROLE_NAMES.LT_GENERAL,
  ROLE_NAMES.GENERAL
];

// HQ roles (excluding ASM for LOGS)
const HQ_ROLES = [
  ROLE_NAMES.CRE,
  ROLE_NAMES.ASM,
  ROLE_NAMES.DCGS,
  ROLE_NAMES.CGS,
  ROLE_NAMES.VCDS,
  ROLE_NAMES.CDS,
  ROLE_NAMES.VFM,
  ROLE_NAMES.FM
];

// HQ roles that can see LOGS (excluding ASM)
const HQ_LOGS_ROLES = [
  ROLE_NAMES.CRE,
  ROLE_NAMES.DCGS,
  ROLE_NAMES.CGS,
  ROLE_NAMES.VCDS,
  ROLE_NAMES.CDS,
  ROLE_NAMES.VFM,
  ROLE_NAMES.FM
];

// Royalty roles
const ROYALTY_ROLES = [
  ROLE_NAMES.COMMUNITY_MANAGER,
  ROLE_NAMES.KINGS_SECRETARY,
  ROLE_NAMES.QUEEN,
  ROLE_NAMES.CO_FOUNDER,
  ROLE_NAMES.FOUNDER
];

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
      ...VERIFIED_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...OFFICER_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...HQ_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }))
    ]
  },
  
  // Category 3: COMMUNITY - Verified+ can see
  'community': {
    categoryName: '💬 || COMMUNITY',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      ...VERIFIED_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...OFFICER_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...HQ_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }))
    ]
  },
  
  // Category 4: SUPPORT - Verified+ can see
  'support': {
    categoryName: '🎫 || SUPPORT',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      ...VERIFIED_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...OFFICER_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...HQ_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }))
    ]
  },
  
  // Category 5: TRAINING - Verified+ can see
  'training': {
    categoryName: '🎯 || TRAINING',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      ...VERIFIED_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...OFFICER_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...HQ_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }))
    ]
  },
  
  // Category 6: TRYOUTS & TRAININGS VC - Verified+ can see
  'tryouts_vc': {
    categoryName: '🎤 || TRYOUTS & TRAININGS VC',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      ...VERIFIED_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] })),
      ...OFFICER_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] })),
      ...HQ_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] })),
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] }))
    ]
  },
  
  // Category 7: OFFICERS+ - Officers+ can see
  'officers': {
    categoryName: '🎖️ || OFFICERS+',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      ...OFFICER_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...HQ_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }))
    ]
  },
  
  // Category 8: HQ+ - HQ+ can see
  'hq': {
    categoryName: '👑 || HQ+',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      ...HQ_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }))
    ]
  },
  
  // Category 9: HQ+ VOICE - HQ+ can see
  'hq_voice': {
    categoryName: '🎤 || HQ+ VOICE',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      ...HQ_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] })),
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect], deny: [] }))
    ]
  },
  
  // Category 10: OFFICES - Royalty only
  'offices': {
    categoryName: '🏢 || OFFICES',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }))
    ]
  },
  
  // Category 11: LOGS - HQ+ (excluding ASM) and Royalty only
  'logs': {
    categoryName: '📊 || LOGS',
    permissions: [
      { role: '@everyone', allow: [], deny: [PermissionFlagsBits.ViewChannel] },
      ...HQ_LOGS_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] })),
      ...ROYALTY_ROLES.map(role => ({ role, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] }))
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
