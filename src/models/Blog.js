const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic:{type:String},
    Description:{type:String},
    postedby:String,
},{timestamps:true})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;