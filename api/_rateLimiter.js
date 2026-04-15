import { readFile, writeFile } from 'fs/promises';

const DATA_PATH = '/tmp/contact_submissions.json';

/** Returns the current month as a "YYYY-MM" string. */
function currentMonth() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${d.getFullYear()}-${mm}`;
}

/** Read stored data, gracefully falling back to defaults on any error. */
async function readData() {
  try {
    const raw = await readFile(DATA_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.month === 'string' && typeof parsed.count === 'number') {
      return parsed;
    }
  } catch {
    // File missing or corrupt — treat as fresh start
  }
  return { month: currentMonth(), count: 0 };
}

/** Write data back to the tmp file. Errors are logged but not re-thrown. */
async function writeData(data) {
  try {
    await writeFile(DATA_PATH, JSON.stringify(data), 'utf8');
  } catch (err) {
    console.error('[rateLimiter] Failed to write data:', err);
  }
}

/**
 * Check whether a new submission is allowed.
 * @returns {{ allowed: boolean, count: number, limit: number }}
 */
export async function checkRateLimit() {
  const limit = parseInt(process.env.MONTHLY_EMAIL_LIMIT ?? '80', 10);
  const data  = await readData();
  const month = currentMonth();

  // Reset counter if the calendar month has rolled over
  const count = data.month === month ? data.count : 0;

  if (count >= limit) {
    return { allowed: false, count, limit };
  }
  return { allowed: true, count, limit };
}

/**
 * Increment the submission counter by 1.
 * @returns {number} The new count.
 */
export async function incrementCount() {
  const data  = await readData();
  const month = currentMonth();

  const newCount = (data.month === month ? data.count : 0) + 1;
  await writeData({ month, count: newCount });
  return newCount;
}

/**
 * Get the current rate limit status without modifying anything.
 * @returns {{ month: string, count: number, limit: number, remaining: number }}
 */
export async function getStatus() {
  const limit = parseInt(process.env.MONTHLY_EMAIL_LIMIT ?? '80', 10);
  const data  = await readData();
  const month = currentMonth();
  const count = data.month === month ? data.count : 0;
  return { month, count, limit, remaining: limit - count };
}
