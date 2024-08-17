const jwt = require('jsonwebtoken')
const {secret} = require('./../config')

module.exports = function (roles){
    return function (req,res,next){
        if(req.method === 'OPTIONS'){
            next()
        }
        try{
          const token = req.headers.authorization.split(' ')[1]
          
          if(!token){
            res.status(403).json({message:'User is not autorized.1'})
          }
         const {roles:userRole} = jwt.verify(token,secret)
         let hasRole = false;
         userRole.forEach(role => {
            if(roles.includes(role)){
                hasRole =true
            }
         });
         if(!hasRole){
            res.status(403).json({message:'You dont have access.'})
         }
         
          next()
        }catch(e){
            console.log(e)
            res.status(403).json({message:'User is not autorized.2'})
        }
    }
}