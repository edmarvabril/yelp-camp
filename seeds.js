var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Hilltop Fairview",
        image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
        description: "No prejudice, just a fair view of the hills."
    },
    {
        name: "Sunny Plains",
        image: "https://farm4.staticflickr.com/3662/3626619617_6713a533dc.jpg",
        description: "Catch all the sun's rays in this wide plain."
    },
    {
        name: "Misty Mystery",
        image: "https://farm6.staticflickr.com/5197/7150626639_aa8d7999c0.jpg",
        description: "Trek into the mysterious mists of this forest."
    },
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("removed campgrounds!");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a campground.");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but no wifi XD. Just Kidding, this is the best place so far, I really liked it in here the view is just simply relaxing, great for unwinding. Just make sure to bring your tent, and a thick blanket and jacket, the wind gets really chilly especially during the night.",
                                author: "Dirty Trekker"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            });
                    }
                });
            });
        }
    });
    
    
    
}

module.exports = seedDB;
