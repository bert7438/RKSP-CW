const {Schema, model} = require('mongoose')

const schema = new Schema({
    owner: {type: Schema.Types.ObjectID, ref: 'User'},
    text: {type: String},
    completed: false,
    important: false
})

module.exports = model('Post', schema)