const PORT = 27017
const express = require("express")
const cors = require("cors")

const { MongoClient } = require("mongodb")

const appId = "lets-box-rn-puunt"
const appUri = "mongodb+srv://admin:admin@lets-box-rn.bhd4d26.mongodb.net/?retryWrites=true&w=majority"

const menuDbName = "menu-items"
const userDbName = "user-data"

const connectToClient = async () => {
	return await MongoClient.connect(appUri)
}

const connection = connectToClient()

const letsBoxApp = express()

// Get any collection in menu-items
letsBoxApp.get("/menu-:collection", async (req, res) => {
	const collectionName = req.params.collection

	return connection
		.then(async client => { // Check if collection exists
			return {
				client: client,
				collectionExists: await client.db(menuDbName).listCollections().toArray()
					.then(array => array.find(c => c.name === collectionName))
			}
		}).then(({ client, collectionExists }) => { // Return data if collection exists
			if (collectionExists) {
				return client.db(menuDbName).collection(collectionName).find().toArray()
			} else {
				return `Collection named ${collectionName} does not exist!`
			}
		}).then(data =>
			res.json(data)
		).catch(e => {
			console.error(e)
		})
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
letsBoxApp.post("/add-order-user-:id")

letsBoxApp.use(cors())

letsBoxApp.listen(PORT, () => console.log(`Let's Box! RUNNING ON PORT ${PORT}`))
