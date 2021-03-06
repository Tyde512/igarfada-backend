const { Schema, model } = require("mongoose");

const Restaurant = new Schema({
    company_name: String,
    cnpj: String,
    whatsapp: String,
    instagram: String,
    address: String,
    owner_id: String,
    image: Buffer,
    category: String,
    verify: Boolean
})

module.exports = model("restaurants", Restaurant);