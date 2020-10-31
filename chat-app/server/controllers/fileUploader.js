import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config();

const uploadImage = (req, res) => {
	if (!req.file) {
		res.status(204)
	}
	else {
		try {
			cloudinary.config({
				cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
				api_key: process.env.CLOUDINARY_API_KEY,
				api_secret: process.env.CLOUDINARY_API_SECRET
			})

			cloudinary.uploader.upload_sream((result) => {
				res.status(201).json({
					user_avatar_url: result.secure_url
				})
			}).end(req.file.buffer)
		}
		catch (err) {
			res.staus(500).json({ status:err })
		}
	}
}
export default uploadImage