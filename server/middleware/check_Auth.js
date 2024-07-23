const jwt  = require('jsonwebtoken')

exports.checkAuth =  async (req,res,next)=> {
    try {
        const token = req.headers.authorization.split(" ")[1] // bearer token
     
        const decodedToken =  jwt.verify(token,process.env.Secret_token)
    
        req.user = decodedToken;
        
        next()

        //blood bank
        // JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        //     if(err){
        //         return res.status(401).send({
        //             success: false,
        //             message:'Auth Failed ho gya'
        //         })
        //     }
            
        //     else
        //     {
        //         req.body.userId= decode.userId;
        //         next();
        //     }
        // })
        
    } catch (error) {
        return res.status(401).json({
            'message' : "invalid  or expired token provided ",
            'error' : error
        })
        
    }
}
