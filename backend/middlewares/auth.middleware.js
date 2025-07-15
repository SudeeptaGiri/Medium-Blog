const jwt = require('jsonwebtoken');

function authentication(req,res,next){
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({message:"Invalid Token"});
            }
            req.userId = decoded.id;
            next();
        });
    }else{
        res.status(401).send({message:"Unauthorized"});
    }
}

module.exports = {authentication};