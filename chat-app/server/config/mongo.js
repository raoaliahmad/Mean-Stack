import mg from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

/**
 * init db conn
 * to be called once, when starting the app
 * and use conn for all transactions
 * @returns { Promise<void>}
 */

const mongoConnect = async () => {
	await mg.connect(
		process.env.MONGODB_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	 )
}

export default mongoConnect