import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: string,
    addess: string,
    planets: [{type: Schema.Types.ObjectId, ref: 'Planet'}],
    structures: [{type: Schema.Types.ObjectId, ref: 'Structure'}]
});

module.exports = mongoose.model("User", userSchema)