import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    Date:{type:Date,default:Date.now}
})


const textModel = new mongoose.model('text',textSchema)

export default textModel