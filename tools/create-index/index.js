const MongoClient = require("mongodb").MongoClient
const assert = require("assert")

let collectionName = process.argv[2]
let fields = process.argv[3]

// Connection URL
const url = "mongodb://localhost:27017"

// Database Name
const dbName = "compdev"

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true })

// Use connect method to connect to the Server
client.connect((err, client) => {
  assert.equal(null, err)
  console.log("Connected correctly to server")

  const db = client.db(dbName)
  // Get the restaurants collection
  const collection = db.collection(collectionName)
  let indexOptions = {}
  fields.split(',').forEach((field) => {
    indexOptions[field] = "text"
  })

  // Create the index
  collection.createIndex(
    indexOptions, (err, result) => {
    console.log(result)
    client.close()
  })
})
