var mongoose = require('mongoose');

const password = encodeURIComponent("q1w2e3r4");

var query = `mongodb+srv://shubham:${password}@cluster0.mflz0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  
const db = (query);
mongoose.Promise = global.Promise;
  
exports.connect = ()=>{
    mongoose.connect(db, { useNewUrlParser : true, 
    useUnifiedTopology: true }, function(error) {
        if (error) {
            console.log("Error!" + error);
        }
        else{
            console.log('connected to mongoDB')
        }
    });
};