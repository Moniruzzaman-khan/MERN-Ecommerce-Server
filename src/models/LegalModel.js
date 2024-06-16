const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
        description : {type: String,required: true},
        type : {type: String,required: true},
    },
    {timestamps:true,versionKey:false}
)

const LegalModel = mongoose.model('legals',DataSchema)
module.exports = LegalModel;