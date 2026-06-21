import { SlashCommandBuilder } from 'discord.js';

export const commands = [
  new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption(option => option.setName('user').setDescription('User to warn').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for warning').setRequired(true)),

  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(option => option.setName('user').setDescription('User to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for ban')),

  new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a user')
    .addUserOption(option => option.setName('user').setDescription('User to mute').setRequired(true))
    .addIntegerOption(option => option.setName('duration').setDescription('Duration in minutes').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for mute')),

  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user')
    .addUserOption(option => option.setName('user').setDescription('User to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for kick')),

  new SlashCommandBuilder()
    .setName('promote')
    .setDescription('Promote a user')
    .addUserOption(option => option.setName('user').setDescription('User to promote').setRequired(true))
    .addStringOption(option => option.setName('rank').setDescription('New rank').setRequired(true)),

  new SlashCommandBuilder()
    .setName('demote')
    .setDescription('Demote a user')
    .addUserOption(option => option.setName('user').setDescription('User to demote').setRequired(true))
    .addStringOption(option => option.setName('rank').setDescription('New rank').setRequired(true)),

  new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('Check user warnings')
    .addUserOption(option => option.setName('user').setDescription('User to check').setRequired(true)),

  new SlashCommandBuilder()
    .setName('activity')
    .setDescription('Check your activity status'),

  new SlashCommandBuilder()
    .setName('handbook')
    .setDescription('View server handbook'),

  new SlashCommandBuilder()
    .setName('chain-of-command')
    .setDescription('View chain of command'),

  new SlashCommandBuilder()
    .setName('support-ticket')
    .setDescription('Create a support ticket'),

  new SlashCommandBuilder()
    .setName('appeals-ticket')
    .setDescription('Create an appeals ticket'),

  new SlashCommandBuilder()
    .setName('rank-appeals-ticket')
    .setDescription('Create a rank appeals ticket'),

  new SlashCommandBuilder()
    .setName('staffing-ticket')
    .setDescription('Apply for staffing position'),

  new SlashCommandBuilder()
    .setName('prd-ticket')
    .setDescription('Create a partnership/PRD request'),

  new SlashCommandBuilder()
    .setName('logs')
    .setDescription('View action logs')
    .addStringOption(option => 
      option.setName('type')
        .setDescription('Log type')
        .setRequired(true)
        .addChoices(
          { name: 'Warnings', value: 'WARN' },
          { name: 'Bans', value: 'BAN' },
          { name: 'Mutes', value: 'MUTE' },
          { name: 'Kicks', value: 'KICK' },
          { name: 'Promotions', value: 'PROMOTE' },
          { name: 'Demotions', value: 'DEMOTE' }
        )
    ),

  new SlashCommandBuilder()
    .setName('set-role-count')
    .setDescription('Set custom member count for a role')
    .addStringOption(option => option.setName('role').setDescription('Role name').setRequired(true))
    .addIntegerOption(option => option.setName('count').setDescription('Number of members').setRequired(true)),

  new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify your identity to access the server')
];
