import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  short_url: {
    type: String,
    required: true,
    index: true
  },

  browser: {
    type: String
  },

  device: {
    type: String
  },

  referrer: {
    type: String
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Analytics = mongoose.model(
  "Analytics",
  analyticsSchema
);

export default Analytics;