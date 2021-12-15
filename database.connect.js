const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DB,{
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(()=>{
    console.log('Connected Database Sucessfull');
}).catch(error=>{
    console.log(error);
});