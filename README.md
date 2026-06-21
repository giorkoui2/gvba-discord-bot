# GVBA Discord Bot 🪖

Complete Discord bot for GVBA British Army server with moderation, warnings, activity tracking, and support tickets.

## Features ✅

- **Moderation Commands:** Ban, mute, kick, warn, promote, demote
- **Warning System:** 3→rank restrict, 6→demote, 8→OR-1, 9→perm ban
- **Activity Check:** Interactive embed for members to verify activity (every 3 days)
- **Support Tickets:** Create support tickets with logging
- **Handbook:** Rules and regulations in embed format
- **Chain of Command:** Display server hierarchy
- **Comprehensive Logging:** All actions logged to appropriate channels
- **Welcome/Leave Messages:** Automatic join/leave logging

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Update `.env` with:
- `DISCORD_TOKEN`: Your bot token
- `CLIENT_ID`: Your bot's client ID
- `GUILD_ID`: Your server ID

### 3. Update Channel IDs in bot.mjs
Replace these with your actual channel IDs:
```javascript
const LOG_CHANNEL = '1234567890';
const WELCOME_CHANNEL = '1234567890';
const JOINS_LOGS_CHANNEL = '1234567890';
const LEAVES_LOGS_CHANNEL = '1234567890';
const GUIDELINES_CHANNEL = '1234567890';
const SUPPORT_CHANNEL = '1234567890';
```

### 4. Start Bot
```bash
npm start
```

## Commands

- `/warn <user> <reason>` - Warn a user
- `/ban <user> [reason]` - Ban a user
- `/mute <user> <duration> [reason]` - Mute a user
- `/kick <user> [reason]` - Kick a user
- `/promote <user> <rank>` - Promote a user
- `/demote <user> <rank>` - Demote a user
- `/warnings <user>` - Check user warnings
- `/activity` - Check activity status
- `/handbook` - View server handbook
- `/chain-of-command` - View chain of command
- `/support-ticket` - Create a support ticket

## Database

SQLite database (`gvba.db`) stores:
- User data and ranks
- Warnings and moderation history
- Tickets
- Activity logs

## Logging

All actions are logged to designated channels:
- Moderation actions → LOG_CHANNEL
- Member joins → JOINS_LOGS_CHANNEL
- Member leaves → LEAVES_LOGS_CHANNEL
- Support tickets → SUPPORT_CHANNEL

## Permissions

- **Warn/Mute:** Requires ModerateMembers
- **Ban/Kick:** Requires BanMembers/KickMembers
- **Promote/Demote:** Requires ManageRoles

## Future Features

- Rank Appeals ticket panel
- Staffing Department panel
- PRD (Partnerships/Relations Department) panel
- Appeals (Bans/Mutes/Kicks) panel
- 120-character admin prompt command
- Enhanced activity tracking
