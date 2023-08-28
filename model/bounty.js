const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bountySchema = new Schema({
        name:{type : String},
        location:{type: String},
        bountyAmmount:{type : Number},
        jediSith: {type: Boolean, default: false},
        living : {type: Boolean, default: true},
        image: {type: String},
        skills:{type:Array},
        weapon: {type: String},
        active: {type:Boolean, default: false},
        huntersNotes: {type: String}
});

module.exports = mongoose.model("bounty", bountySchema);