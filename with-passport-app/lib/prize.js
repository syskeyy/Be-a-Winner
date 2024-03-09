import { v4 as uuidv4 } from "uuid";
import { useUser } from './hooks';
import { getLoginSession } from "../lib/auth";

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


export async function addRaffle(req, id){
    const client = new MongoClient(uri);
    
    try {
      const session = await getLoginSession(req);
      const userId = session.id;
      console.log(userId)

      await client.connect();
      const database = client.db("mydb");
      const prizes = database.collection("prizes");
  
      const filter = { id: id }; 
      const updateDocument = {
        $push: { userId: userId },
      };
      
      const result = await prizes.updateOne(filter, updateDocument);
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    } catch (error) {
      console.error("An error occurred while adding the raffle:", error);
      throw error; 
    } finally {
      await client.close();
    }
}
