import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path:'./.env'
})
const PORT = process.env.PORT
console.log("Port in index.js=>",PORT);

connectDB()
    .then(() => {
        app.listen(PORT || 8088, () => {
            console.log(`Server Runnning at port at ${PORT}`);
            
        })
    })
    .catch((error) => {
    console.log("MongoDB connection is fsiled!!!", error);
    
})
