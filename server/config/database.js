const mongoose = require("mongoose");

const ConnectingDB = () => {
    const DBUri = process.env.MONGODB;
    mongoose.connect(DBUri);
    mongoose.connection.on("connected", () => console.log("db is connected successfully"));
    mongoose.connection.on("error", (error) => console.log("db is not connected", error));
};

module.exports = ConnectingDB;