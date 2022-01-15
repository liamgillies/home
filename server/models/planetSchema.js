import mongoose from 'mongoose';
const { Schema } = mongoose;

const planetSchema = new Schema({

});

module.exports = mongoose.model("Planet", planetSchema)