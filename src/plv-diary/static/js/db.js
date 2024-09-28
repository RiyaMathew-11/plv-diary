// db.js
import Dexie from 'https://unpkg.com/dexie@latest/dist/dexie.mjs';

const db = new Dexie('PLVDiaryDB');

db.version(1).stores({
  entries: '++id, intervention, subject, numClients, date, narration, documents, contact'
});

export const addEntry = async (entry) => {
  try {
    const id = await db.entries.add(entry);
    console.log(`Entry added with id ${id}`);
    return id;
  } catch (error) {
    console.error(`Error adding entry: ${error}`);
  }
};

export const getRecentEntries = async (limit = 3) => {
  try {
    return await db.entries.orderBy('date').reverse().limit(limit).toArray();
  } catch (error) {
    console.error(`Error fetching recent entries: ${error}`);
    return [];
  }
};

export default db;
