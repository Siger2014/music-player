const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test')

const contactSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  remark: { type: String, required: false }
})

module.exports = mongoose.model('Contact', contactSchema)
