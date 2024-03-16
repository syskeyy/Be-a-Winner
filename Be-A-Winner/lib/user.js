import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

const users = [];
// The database
const { MongoClient } = require("mongodb");

// Connecting to local host
const uri = "mongodb://127.0.0.1:27017";

export async function createUser({ username, password }) {
  console.log("createUser")
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    username: username,
    hash: hash,
    salt: salt,
  };

  // This is an in memory store for users, there is no data persistence without a proper DB
  // users.push(user);
  // Replaced with a call to a database
  
  const client = new MongoClient(uri);
  async function run() {
    try {
        console.log('Start the database stuff');
        //Write databse Insert/Update/Query code here..
        var dbo = client.db("mydb");
        await dbo.collection("users").insertOne(user, function(err, res) {
            if (err) {
                console.log(err); 
                throw err;
            }
        }); 
        console.log('End the database stuff');

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
  }
  run().catch(console.dir);


  return { username, createdAt: Date.now() };
}

// Here you should lookup for the user in your DB
export async function findUser({ username }) {
  // This is an in memory store for users, there is no data persistence without a proper DB
  // return users.find((user) => user.username === username);
  const client = new MongoClient(uri);
  async function run() {
    try {
        console.log('Finding a user');
        //Write databse Insert/Update/Query code here..
        var dbo = client.db("mydb");
        
        let user_db = await dbo.collection("users").findOne({"username": username}, function(err, res) {
            if (err) {
                console.log("Didn't find the user")
                console.log(err); 
                throw err;
            }
        }); 
        if (!user_db) {
          console.log("User not found")
          return false;
        }
        else{
          console.log("User found")
          return user_db;
        }
        console.log('End the database stuff');

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
  }
  return (run().catch(console.dir));



}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}

