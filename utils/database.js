// utils/database.js
require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const mongoUriNative = process.env.MONGO_URI_NATIVE;
const mongoUriMongoose = process.env.MONGO_URI_MONGOOSE;

let _nativeDb;

async function mongoClientConnect() {
  if (_nativeDb) return _nativeDb;
  const client = await MongoClient.connect(mongoUriNative, {
    // options if needed
  });
  _nativeDb = client.db('airbnb-lite');
  console.log('Native MongoDB connected (MongoClient).');
  return _nativeDb;
}

function getDb() {
  if (!_nativeDb) {
    throw new Error('Native MongoDB not connected yet. Call mongoClientConnect first.');
  }
  return _nativeDb;
}

async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  await mongoose.connect(mongoUriMongoose, {
    // options if needed
  });
  console.log('Mongoose connected.');
  return mongoose;
}

module.exports = {
  mongoClientConnect,
  getDb,
  mongooseConnect
};
