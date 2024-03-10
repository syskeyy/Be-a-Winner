import { v4 as uuidv4 } from "uuid";
import { useUser } from './hooks';
import { getLoginSession } from "../lib/auth";
import util from 'util';

const prize = [];
const { MongoClient } = require("mongodb");
const uri = "mongodb://192.168.102.129:27017";

export async function createPrize(formData) {
    console.log("createPrize");
  
    const prize = {
      id: uuidv4(),
      createdAt: Date.now(),
      hasWon: false,
      hasClaimed: false,
      userId: [],
      winnerId: [],
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

export async function claimPrize(req, id){
  const client = new MongoClient(uri);
  
  try {

    await client.connect();
    const database = client.db("mydb");
    const prizes = database.collection("prizes");

    const filter = { id: id }; 
    const updateDocument = {
      $set: { hasClaimed: true },
    };
    
    const result = await prizes.updateOne(filter, updateDocument);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
  } catch (error) {
    console.error("An error occurred while claiming prize:", error);
    throw error; 
  } finally {
    await client.close();
  }
}

export async function addRaffleNoLogin(req, id, email){
  const client = new MongoClient(uri);
  
  try {
    const userEmail = email;
    console.log("userEmail: ", userEmail);
    await client.connect();
    const database = client.db("mydb");
    const prizes = database.collection("prizes");

    const filter = { id: id }; 
    const updateDocument = {
      $push: { userId: userEmail },
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

export async function drawWinner (req, id) {
  const client = new MongoClient(uri);
  
  try {
      await client.connect();
      const database = client.db("mydb");
      const prizes = database.collection("prizes");
      const filter = { id: id }; 
      const prize = await prizes.findOne(filter);

    //check if the prize has already been won
    if (prize.hasWon == true) {
        console.log(`A winner has already been drawn for prize with id ${id}`);
        return;
    }
    
    //chheck the length of the array of the userIds to see if longer than 0
    const userIds = prize.userId;
    if (userIds.length === 0) {
        throw new Error(`No users in the raffle for prize with id ${id}`);
    }

    //Performs the random draw
    const winnerId = userIds[Math.floor(Math.random() * userIds.length)];
    
    //Updates the prize document with the winnerId, and update hasWon to true
    const updateDocument = {
        $set: { winnerId: winnerId, hasWon: true },
    };
    const result = await prizes.updateOne(filter, updateDocument);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
  } catch (error) {
      console.error("An error occurred while drawing the winner:", error);
      throw error; 
  } finally {
      await client.close();
  }
}

export async function deleteEntry(req, id){
  const client = new MongoClient(uri);
  
  try {
    const session = await getLoginSession(req);
    const userId = session.id;

    await client.connect();
    const database = client.db("mydb");
    const prizes = database.collection("prizes");

    const filter = { id: id }; 
    const updateDocument = {
      $pull: { userId: userId },
    };
    
    const result = await prizes.updateOne(filter, updateDocument);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
  } catch (error) {
    console.error("An error occurred while deleting the entry:", error);
    throw error; 
  } finally {
    await client.close();
  }
}