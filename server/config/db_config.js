const { mongoose } = require("mongoose")

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to database : ${conn.connection.name}`.bgYellow)
    } catch (error) {
        console.log(`Error in connecting database : ${error}`.bgRed)
    }
}

module.exports = connectDb