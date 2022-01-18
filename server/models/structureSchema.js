import mongoose from 'mongoose';
const { Schema } = mongoose;

const structureSchema = new Schema({

});

module.exports = mongoose.model("Structure", structureSchema)