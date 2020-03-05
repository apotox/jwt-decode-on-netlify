
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    to: String,
    from: String,
    date: Date
});

const Customer = (conn)=>conn.model('Customer', schema)

module.exports = {
    schema,
    Customer
}