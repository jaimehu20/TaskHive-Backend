import mongoose from 'mongoose';
import { GridFSBucket, Db } from 'mongodb';

export let gfs: GridFSBucket | null = null;

mongoose.connection.once('open', () => {
  const db: Db | undefined = mongoose.connection.db;

  if (db) {
    gfs = new GridFSBucket(db, {
      bucketName: 'profileImages',
    });
  } else {
    console.error("Failed to initialize GridFS: Database is undefined.");
  }
});

export const getGfs = (): GridFSBucket | null => {
  if (!gfs) {
    throw new Error('GridFS is not initialized. MongoDB connection may not be established yet.');
  }
  return gfs;
};
