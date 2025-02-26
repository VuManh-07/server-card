"use strict";

const mongoose = require("mongoose");

const MONGODB_URL_CONNECT =
  "mongodb+srv://fidec_db:eVB2e87fKvOYpu7P@fidec.qdlbpgl.mongodb.net";
const MONGODB_NAME = "PtitDbCardSV";

// const connectStr = `${MONGODB_URL_CONNECT}/${MONGODB_NAME}`;

const connectStr = `mongodb://127.0.0.1:27017/${MONGODB_NAME}`;

class Database {
  static instance;

  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });

    mongoose
      .connect(connectStr, { maxPoolSize: 50 })
      .then(() => {
        console.log("Connected to MongoDB");
        // countConnect();
      })
      .catch((err) => console.log("Failed to connect to MongoDB:", err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
