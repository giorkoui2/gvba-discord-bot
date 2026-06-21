import sqlite3 from 'sqlite3';
import { promisify } from 'util';

const db = new sqlite3.Database('./gvba.db');

const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));

export async function initDatabase() {
  try {
    // Users table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        username TEXT,
        current_rank TEXT,
        warnings INTEGER DEFAULT 0,
        rank_restricted BOOLEAN DEFAULT 0,
        restriction_expires_at INTEGER,
        last_activity_check INTEGER,
        created_at INTEGER
      )
    `);

    // Warnings table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS warnings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        reason TEXT,
        moderator_id TEXT,
        created_at INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
      )
    `);

    // Tickets table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS tickets (
        ticket_id TEXT PRIMARY KEY,
        user_id TEXT,
        channel_id TEXT,
        type TEXT,
        status TEXT DEFAULT 'open',
        claimed_by TEXT,
        created_at INTEGER,
        closed_at INTEGER,
        close_reason TEXT
      )
    `);

    // Logs table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT,
        moderator_id TEXT,
        target_id TEXT,
        details TEXT,
        created_at INTEGER
      )
    `);

    // Activity table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS activity (
        user_id TEXT PRIMARY KEY,
        messages INTEGER DEFAULT 0,
        voice_minutes INTEGER DEFAULT 0,
        last_checked INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
      )
    `);

    // Role counts table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS role_counts (
        role_name TEXT PRIMARY KEY,
        member_count INTEGER DEFAULT 0,
        updated_by TEXT,
        updated_at INTEGER
      )
    `);

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
}

export async function addUser(userId, username, rank) {
  try {
    await dbRun(
      `INSERT OR IGNORE INTO users (user_id, username, current_rank, created_at) 
       VALUES (?, ?, ?, ?)`,
      [userId, username, rank, Math.floor(Date.now() / 1000)]
    );
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

export async function addWarning(userId, reason, moderatorId) {
  try {
    await dbRun(
      `INSERT INTO warnings (user_id, reason, moderator_id, created_at) 
       VALUES (?, ?, ?, ?)`,
      [userId, reason, moderatorId, Math.floor(Date.now() / 1000)]
    );

    const result = await dbGet(
      `SELECT COUNT(*) as count FROM warnings WHERE user_id = ?`,
      [userId]
    );

    return result.count;
  } catch (error) {
    console.error('Error adding warning:', error);
  }
}

export async function getWarnings(userId) {
  try {
    const result = await dbAll(
      `SELECT * FROM warnings WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );
    return result || [];
  } catch (error) {
    console.error('Error getting warnings:', error);
    return [];
  }
}

export async function getWarningCount(userId) {
  try {
    const result = await dbGet(
      `SELECT COUNT(*) as count FROM warnings WHERE user_id = ?`,
      [userId]
    );
    return result?.count || 0;
  } catch (error) {
    console.error('Error getting warning count:', error);
    return 0;
  }
}

export async function setRankRestriction(userId, durationMs) {
  try {
    const expiresAt = Math.floor(Date.now() / 1000) + Math.floor(durationMs / 1000);
    await dbRun(
      `UPDATE users SET rank_restricted = 1, restriction_expires_at = ? WHERE user_id = ?`,
      [expiresAt, userId]
    );
  } catch (error) {
    console.error('Error setting rank restriction:', error);
  }
}

export async function clearRankRestriction(userId) {
  try {
    await dbRun(
      `UPDATE users SET rank_restricted = 0, restriction_expires_at = NULL WHERE user_id = ?`,
      [userId]
    );
  } catch (error) {
    console.error('Error clearing rank restriction:', error);
  }
}

export async function isRankRestricted(userId) {
  try {
    const result = await dbGet(
      `SELECT rank_restricted, restriction_expires_at FROM users WHERE user_id = ?`,
      [userId]
    );

    if (!result) return false;
    if (!result.rank_restricted) return false;

    const now = Math.floor(Date.now() / 1000);
    if (result.restriction_expires_at && result.restriction_expires_at < now) {
      await clearRankRestriction(userId);
      return false;
    }

    return result.rank_restricted;
  } catch (error) {
    console.error('Error checking rank restriction:', error);
    return false;
  }
}

export async function createTicket(ticketId, userId, channelId, type) {
  try {
    await dbRun(
      `INSERT INTO tickets (ticket_id, user_id, channel_id, type, created_at) 
       VALUES (?, ?, ?, ?, ?)`,
      [ticketId, userId, channelId, type, Math.floor(Date.now() / 1000)]
    );
  } catch (error) {
    console.error('Error creating ticket:', error);
  }
}

export async function closeTicket(ticketId, reason, claimedBy) {
  try {
    await dbRun(
      `UPDATE tickets SET status = 'closed', close_reason = ?, claimed_by = ?, closed_at = ? 
       WHERE ticket_id = ?`,
      [reason, claimedBy, Math.floor(Date.now() / 1000), ticketId]
    );
  } catch (error) {
    console.error('Error closing ticket:', error);
  }
}

export async function logAction(action, moderatorId, targetId, details) {
  try {
    await dbRun(
      `INSERT INTO logs (action, moderator_id, target_id, details, created_at) 
       VALUES (?, ?, ?, ?, ?)`,
      [action, moderatorId, targetId, details, Math.floor(Date.now() / 1000)]
    );
  } catch (error) {
    console.error('Error logging action:', error);
  }
}

export async function updateUserRank(userId, newRank) {
  try {
    await dbRun(
      `UPDATE users SET current_rank = ? WHERE user_id = ?`,
      [newRank, userId]
    );
  } catch (error) {
    console.error('Error updating user rank:', error);
  }
}

export async function getUser(userId) {
  try {
    const result = await dbGet(
      `SELECT * FROM users WHERE user_id = ?`,
      [userId]
    );
    return result;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function setRoleCount(roleName, memberCount, updatedBy) {
  try {
    await dbRun(
      `INSERT OR REPLACE INTO role_counts (role_name, member_count, updated_by, updated_at)
       VALUES (?, ?, ?, ?)`,
      [roleName, memberCount, updatedBy, Math.floor(Date.now() / 1000)]
    );
  } catch (error) {
    console.error('Error setting role count:', error);
  }
}

export async function getRoleCount(roleName) {
  try {
    const result = await dbGet(
      `SELECT member_count FROM role_counts WHERE role_name = ?`,
      [roleName]
    );
    return result?.member_count || null;
  } catch (error) {
    console.error('Error getting role count:', error);
    return null;
  }
}

export async function getAllRoleCounts() {
  try {
    const result = await dbAll(`SELECT * FROM role_counts`);
    return result || [];
  } catch (error) {
    console.error('Error getting all role counts:', error);
    return [];
  }
}

export default { initDatabase, addUser, addWarning, getWarnings, getWarningCount, setRankRestriction, clearRankRestriction, isRankRestricted, createTicket, closeTicket, logAction, updateUserRank, getUser, setRoleCount, getRoleCount, getAllRoleCounts };
