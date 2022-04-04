const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema(

    {
        name: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        fundationYear: { type: Number, required: true, trim: true },
        base: { type: String, required: true, trim: true },
        championships: { type: String, required: true, trim: true },
        currentBike: { type: String, required: true, trim: true },
        pilots: [{ type: mongoose.Schema.Types.ObjectId, ref: "pilots", required: true }],
        img: { type: String, trim: true, required: false }
    },

    {
        timestamps: true
    }
);

const Team = mongoose.model('teams', teamSchema);
module.exports = Team;