const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  reportedOn: {
    type: String
  },
  ageEstimate: {
    type: String
  },
  gender: {
    type: String
  },
  state: {
    type: String
  },
  status: {
    type: String
  }
});

module.exports = mongoose.model('patients', schema);
