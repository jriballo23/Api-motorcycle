const mongoose = require('mongoose');
const pilotSchema = new mongoose.Schema(
   
    {
        name: { type: String, required: true, trim: true },
        nationality:{ type: String, trim: true, required: false },
        birthdate: { type: String, required: false, trim: true },
        category:{ type: String, trim: true, required: false },
        races:{ type: String, trim: true, required: false },
        victories:{ type: String, trim: true, required: false },
        img: { type: String, trim: true, required: false }
    },
  
    {
        timestamps: true
    }
);

const Pilot = mongoose.model('pilots', pilotSchema);
module.exports = Pilot;