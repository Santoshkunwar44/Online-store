const Order =require("../../model/Order")

function statusController(){
    return {
        
        update:(req,res)=>{
                console.log(req.body)
            Order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,result)=>{
                if(err){
                    console.log(result)
                    return  res.redirect("/admin/orders")
                }else{
                   return  res.redirect("/admin/orders")
                }
            

            })
        }
        
    }
}

module.exports =statusController