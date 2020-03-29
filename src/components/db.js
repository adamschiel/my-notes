import Dexie from 'dexie';

const db = new Dexie('MyNotesIDB');
db.version(1).stores({ notes: '++id,title,data' });

export default db;
