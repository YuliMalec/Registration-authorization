const User = require('./models/User')
const Role = require('./models/Role')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {validationResult} =  require('express-validator')
const {secret} = require('./config')


const genereteAccessToken=(id,roles)=>{
  const payload = {
    id,
    roles
  }
return jwt.sign(payload,secret,{expiresIn:'24h'})

}
class authController{
  async  register(req,res,next){
     try{
    const errors = validationResult(req)
     console.log(errors)
      if(!errors.isEmpty()){
      return res.status(400).json({errors})
      }
       const {username,password} = req.body;
       const candidate =await User.findOne({username});
       if(candidate){
        res.status(400).json({message:'User with this name already exist.'})
       }
       const hashPassword = bcrypt.hashSync(password, 7); 
       const userRole = await Role.findOne({Rolename:'USER'})
       const user=new User({username,password:hashPassword,roles:userRole.Rolename})
       await user.save()
      next()
       return res.json('User has been successfully registered.')
       

     }catch(e){
      console.log(e)

      res.status(400).json({message:'Registration failed'})
     }
      
    }
      async getUsers(req,res){
      try{
      const users = await User.find()
      res.json({users})
    
  
res.json('Worked')

      }catch(e){
        console.log(e)
      }
        
     }
      async login(req,res){
        try{
          const {username,password}=req.body;
          const user = await User.findOne({username})
          if(!user){
            return res.status(400).json({message:"User with this username not found."})
          }
          const validPassword = bcrypt.compareSync(password,user.password)
          if(!validPassword){
            return res.status(400).json({message:"Incorrect password entered."})
          }
      const token = genereteAccessToken(user._id,user.roles)
      return res.json({token})

     }catch(e){
      console.log(e)
      res.status(400).json({message:'Login failed'})
     }
}
}
module.exports = new authController()