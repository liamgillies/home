import mongoose from 'mongoose';
const { Schema } = mongoose;

const planetSchema = new Schema({
    numberId: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
    planetType: {
        type: String,
        required: true
    },
    planetRidgeSeed: {
        type: Number,
        required: True
    },
    planetSimplexSeed: {
        type: Number,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rarity: {
        type: Number,
        required: true
    },
    ridge: {
        type: Boolean,
        default: false
    },
    generation: {
        type: Number,
        required: true
    },
    maxSummons: {
        type: Number,
        required: true
    },
    summonedTime: {
        type: Date,
    },
    summons: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true,
    },
    currentExp: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    capacityGrowth: {
        type: Number,
        required: true
    },
    research: {
        type: Number,
        required: true
    },
    researchGrowth: {
        type: Number,
        required: true
    },
    extraction: {
        type: Number,
        required: true
    },
    extractionGrowth: {
        type: Number,
        required: true
    },
    fertility: {
        type: Number,
        required: true,
    },
    fertilityGrowth: {
        type: Number,
        required: true
    },
    minerality: {
        type: Number,
        required: true
    },
    mineralityGrowth: {
        type: Number,
        required: true
    },
    moonTraits: {
        frozen: {
            type: Number,
            required: true
        },
        quarry: {
            type: Number,
            required: true
        },
        jungle: {
            type: Number,
            required: true
        },
        alloy: {
            type: Number,
            required: true
        }
    },
    moonCount: {
        type: Number,
        required: true
    },
    ring: {
        type: Boolean,
        required: true,
        default: false
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Planet", planetSchema)