import { v4 as uuidv4 } from "uuid";

const prize = [];
const { MongoClient } = require("mongodb");
const uri = "mongodb://192.168.102.129:27017";

export async function createPrize(formData) {
    console.log("createPrize");
  
    const prize = {
      id: uuidv4(),
      createdAt: Date.now(),
      hasWon: false,
      userId: [],
      entryId: [],
      ...formData
    };
  
    const client = new MongoClient(uri);
    async function run() {
      try {
        console.log('Start the database stuff');
        var dbo = client.db("mydb");
        await dbo.collection("prizes").insertOne(prize, function(err, res) {
          if (err) {
            console.log(err); 
            throw err;
          }
        }); 
        console.log('End the database stuff');
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  
    return prize;
  }

  
export async function getPrizes() {
    const client = new MongoClient(uri);
    let prizes = [];
    
    try {
      await client.connect();
      const dbo = client.db("mydb");
      const cursor = dbo.collection("prizes").find();
      
      while(await cursor.hasNext()) {
        const prize = await cursor.next();
        prizes.push(prize);
      }
    } finally {
      await client.close();
    }
  
    return prizes;
  }