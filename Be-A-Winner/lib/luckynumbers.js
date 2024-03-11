import { getLoginSession } from "../lib/auth";
import { v4 as uuidv4 } from "uuid";

// Lucky numbers essentially functions the same as the prize.js file, but with different data
const luckyNumbers = [];
const { MongoClient } = require("mongodb");
const uri = "mongodb://192.168.102.129:27017";

export async function luckyWinner(req, selectedNumber) {
    console.log("luckyWinner");
    const session = await getLoginSession(req);
    const userId = session.id;

    const luckyNumbers = {
      id: uuidv4(),
      luckyNumber: selectedNumber,
      hasClaimed: false,
      winnerId: userId,
    };
  
    const client = new MongoClient(uri);
    async function run() {
      try {
        console.log('Start the database stuff');
        var dbo = client.db("mydb");
        await dbo.collection("LuckyNumbers").insertOne(luckyNumbers, function(err, res) {
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
  
    return luckyNumbers;
  }

  // This function is used to get the lucky numbers from the database
export async function getLuckyNumbers() {
    const client = new MongoClient(uri);
    let luckyNumbers = [];
    
    try {
      await client.connect();
      const dbo = client.db("mydb");
      const cursor = dbo.collection("LuckyNumbers").find();
      
      while(await cursor.hasNext()) {
        const luckyNumber = await cursor.next();
        luckyNumbers.push(luckyNumber);
      }
    } finally {
      await client.close();
    }
  
    return luckyNumbers;
  }

  // This function is used to claim the prize (change bool to true)
  export async function claimLuckyNumber(req, id){
    const client = new MongoClient(uri);
    
    try {
  
      await client.connect();
      const database = client.db("mydb");
      const luckyNumbers = database.collection("LuckyNumbers");
  
      const filter = { id: id }; 
      const updateDocument = {
        $set: { hasClaimed: true },
      };
      
      const result = await luckyNumbers.updateOne(filter, updateDocument);
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    } catch (error) {
      console.error("An error occurred while claiming prize:", error);
      throw error; 
    } finally {
      await client.close();
    }
  }