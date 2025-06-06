// File for writing the initialising logic of data
const initData = require("./data");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

let dbUrl = 'mongodb://127.0.0.1:27017/RoomVault';
main().then(()=>{
    console.log("Connection stablise");
}).catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}

const initDb = async()=>{
    await Listing.deleteMany({});

    initData.data =  initData.data.map((obj)=>({...obj, owner:"683f41a4ca345a7ea5571558"}))
    await Listing.insertMany(initData.data);
    console.log("data was reinitialised");
}

initDb();