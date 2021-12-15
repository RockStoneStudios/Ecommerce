const app = require('./app');
const db = require('./database.connect');


app.listen(process.env.PORT,()=>{
    console.log('Starting Port . . .');
    db;
});


