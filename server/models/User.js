
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
username: {
   type: String,
   required: true,
   unique:true,
},
email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email address']
},
password: {
    type: String,
    required: true,
},
role: { type: String, enum: ['user', 'admin'], default: 'user' },
favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});


    
const User = mongoose.model('User', userSchema)

module.exports = User;
