const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please provide a company'],
        maxlenght: 50
    },
    position: {
        type: String,
        required: [true, 'please provide a position'],
        maxlenght: 80
    },
    status: {
        type: String,
        enum: ['Interview', 'declined', 'pending'],
        default: 'pending'
    },
    //1 to 1 link
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide an user'],
    }
}, {timestamps: true});

module.exports = mongoose.model('job', JobSchema);
