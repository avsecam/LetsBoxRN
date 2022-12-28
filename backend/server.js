const PORT = 27017
const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { MongoClient } = require("mongodb")

const appUri = process.env.APP_URI

const menuDbName = "menu-items"
const userDbName = "user-data"

const connectToClient = async () => {
	return await MongoClient.connect(appUri)
}

const connection = connectToClient()

const letsBoxApp = express()
letsBoxApp.use(express.static(__dirname + "/public"))

letsBoxApp.get("/", (req, res) => {
	res.render("index")
})

// Get any collection in menu-items
letsBoxApp.get("/menu-:collection", async (req, res) => {
	const collectionName = req.params.collection

	const client = await connection
	const collections = await client.db(menuDbName).listCollections().toArray()
	const collectionExists = collections.find(c => c.name === collectionName)?.info

	if (collectionExists) {
		const foundCollection = await client.db(menuDbName).collection(collectionName).find().toArray()
		return res.json(foundCollection)
	} else {
		return res.status(404).send(`Collection ${collectionName} not found!`)
	}
})

// Get orders of a user
letsBoxApp.get("/orders-user-:id", (req, res) => {
	const userId = req.params.id

	const ordersCollectionName = "orders"

	connection
	.then(client => client.db(userDbName).collection(ordersCollectionName).find({"user-id": {$eq: userId}}).toArray())
	.then(doc => res.json(doc))
})

// Post an order
letsBoxApp.post("/add-order-user-:id", async (req, res) => {
	const userId = req.params.id
	const order = JSON.parse(req.body)

	const client = await connection
	const collection = await client.db(userDbName).collection("orders")
	collection.insertOne(order)
	.then(() => {
		res.send("Order posted!")
		console.log("success. " + order)
	})
	.catch(() => {
		res.status(500).send("Error posting order.")
		console.error("error posting order.")
	})
})

letsBoxApp.use(cors())

letsBoxApp.listen(PORT, () => console.log(`Let's Box! RUNNING ON PORT ${PORT}`))
