const mongoose = require("mongoose");
require("dotenv").config();


mongoose.set('strictQuery', true); // due to new version changes
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.z7bm1qr.mongodb.net/chatapp?retryWrites=true&w=majority`, () => {
    console.log("Connected to database...");
});




