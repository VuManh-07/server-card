const { MongoClient } = require('mongodb');

const uri =
  process.env.URI_DB ||
  "mongodb+srv://manh1507:manh1507@cluster0.hl6q5ua.mongodb.net/User?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectDB(name) {
  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db(name);
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}


module.exports = connectDB;
