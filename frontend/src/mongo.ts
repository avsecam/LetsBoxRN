import { Db, MongoClient } from "mongodb"

const appId: string = "lets-box-rn-puunt"
const appUri: string = "mongodb+srv://admin:admin@lets-box-rn.bhd4d26.mongodb.net/?retryWrites=true&w=majority"
 
let dbConnection: Db

export const connectToDb = (callback: Function = () => {}) => {
	MongoClient.connect(appUri)
		.then((client) => {
			dbConnection = client.db()
			return callback()
		})
		.catch((err) => {
			console.error(err)
			return callback(err)
		})
}

export const getDbConnection = () => dbConnection