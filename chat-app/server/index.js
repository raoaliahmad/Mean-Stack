import socketIO from "socket.io"
import express from "express"
import bodyParser from "body-parser"
import multer from 'multer'

import dotenv from "dotenv"
dotenv.config()

import mongoConnect from "./config/mongo"
import Message from "./models/message"
import fileUploader from "./controllers/fileUploader"

const io = socketIO(process.env.SOCKET_PORT)
const app = express()

app.use((req, res, next) => {
	// allow acess from every, eliminate CORS
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.removeHeader('x-powered-by')

	// set the allowed HTTP methods to be requested
	res.setHeader('Access-Control-Allow-Methods', 'POST')
	
	// headers clients can use in their requests
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	
	// allow req to continue and be handled by routes
	next()
})
app.use(bodyParser.json())

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.post('api/upload', upload.single('avatar'), fileUploader)

const initApp = async () => {
	try {
		await mongoConnect()
		console.log("Db Conn established")
		app.listen(
			process.env.HTTP_PORT,
			() => {
				console.log(`HTTP Server listening on Port ${process.env.HTTP_PORT}`)
			}
		)
	}
	catch (err) {
		throw err
	}
}

initApp().catch(err => console.log(`Error on startUp! ${err}`))

async function getMostRecentMessages() {
	return await Message.find().sort({_id: -1}).limit(10)
}

io.on("connection", (socket) => {
	getMostRecentMessages()
		.then(results => {
			socket.emit("mostRecentMessages", results.reverse())
		})
		.catch(err => {
			socket.emit("mostRecentMessages", []);
		})
	
	socket.on("newChatMessage", (data) => {
		//send event to every single connected socket
		try {
			const message = new Message(
				{
					user_name: data.user_name,
					user_avatar: data.user_avatar,
					message_text: data.message
				}
			)
			message.save()
				.then(() => {
					io.emit(
						"newChatMessage",
						{
							user_name: data.user_name,
							user_avatar: data.user_avatar,
							message_text: data.message
						}
					)
				})
				.catch(err => {
					console.log("error: " + err);
				})
		}
		catch(err) {
			console.log("error: "+err);
		}
	})
	
	socket.on("disconnect",()=>{
		console.log("connection disconnected");
	});
})