const mongoose =require("mongoose")

const productSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    }
})

const Product=mongoose.model("product",productSchema);
module.exports=Product;