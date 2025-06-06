// models/Pc.js

const mongoose = require('mongoose');

const pcSchema = new mongoose.Schema({
  pc_id: { type: Number, required: true, unique: true },
  registerDate: { type: Date, required: true, default: Date.now },
  networkType: {
    type: String,
    enum: ['DRONA', 'CIAG', 'STANDALONE', 'NKN'],
    required: true
  },
  deptName: { type: String, required: true },
  username: { type: String, required: true },
  deviceName: { type: String, required: true },
  macAddress: { type: String, required: true },
  ipAddress: { type: String, required: true },
  osVersion: { type: String, required: true },
  cpuSerialNo: { type: String, required: true },
  pcModel: { type: String, required: true },
  pcSerialNo: { type: String, required: true },
  antivirusStatus: { type: String, enum: ['Yes', 'No'], required: true },
  firewallEnabled: { type: Boolean, required: true },
  wsusImplemented: { type: Boolean, required: true },
  ntpStatus: { type: Boolean, required: true },

  // Status tracking for requests:
  actionStatus: {
    type: String,
    enum: ['Approved', 'Pending', 'Rejected'],
    default: 'Approved' // By default, Admin actions are auto-approved
  },
  isDeleteRequest: { type: Boolean, default: false }, // Flag delete requests
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who made the request
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },   // Who approved it
}, {
  timestamps: true
});

const Pc = mongoose.model('Pc', pcSchema);

module.exports = Pc;
