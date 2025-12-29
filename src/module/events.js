const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: Number,
  EventName: String,
  EventPrice: String,
  EventLocation: String,
  imageUrl: String,
  description: String,
  organizedName: String,
  StartDate: Date,
  EndDate: Date
});



module.exports = mongoose.model('Event', eventSchema, 'event');