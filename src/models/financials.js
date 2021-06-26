const mongoose = require("mongoose")

const financialsSchema = mongoose.Schema({
    Name : {
        type: String,
    },
    Revenue_million_USD : {
        type: String
    }
})

const Financials = mongoose.model("Financials",financialsSchema)

module.exports = Financials;
