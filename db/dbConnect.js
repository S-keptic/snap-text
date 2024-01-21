import mongoose from "mongoose";

const dbConnect = async (DATABASE_URL)=>{
    const DATABASE_OPTIONS = {
        dbname:"snaptext"
    }
    try{
        await mongoose.connect(DATABASE_URL,DATABASE_OPTIONS)
        console.log("database successfully connected")
    }catch(err){
        console.log(err)
    }
}

export default dbConnect