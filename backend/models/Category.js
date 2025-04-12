const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
  
        type: String,
        required: true,
        trim: true,
     
  },
  count: {
   
        type: Number,
        required: true,
        trim: true,
     
  },
  image: {
 
     
        type: String,
        required: true,
     
    

  },
});

module.exports = mongoose.model('Category', categorySchema); 
