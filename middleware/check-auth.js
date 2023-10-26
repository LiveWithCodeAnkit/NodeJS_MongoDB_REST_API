const jwt=require("jsonwebtoken")

module.exports=async(req,res,next)=>{
        
        try {

            const token=req.headers.authorization.split(" ")[1];
        console.log("i am token:=",token);

        const verify=await jwt.verify(token,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9)
        console.log(verify);

            next()
        } catch (error) {
            return res.status(401).json({msg:"not found authorization"})
        }
}