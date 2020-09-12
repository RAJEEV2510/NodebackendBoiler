const express=require('express')
const userModel=require('../Model/User')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//signup
router.post('/signup',(req,res)=>{
    
    const {email,password} =req.body
    console.log(email,password)
    bcrypt.hash(password,10,(err,hash)=>{

        const user =new userModel({

            email:email,
            password:hash
        })
        user.save().then((err,data)=>{
            userModel.find({email:email}).then((data)=>{
                
               const token=jwt.sign({userId:data._id},'jupyter',{ expiresIn: 60 * 60 })
               req.session.data=data
               res.send({
                   token:token
               })
       
           })
           }).catch(err=>{
               res.status(422).send(err.message)
           })   

    })
   })

router.post('/signin',(req,res)=>{
    const {email,password} =req.body

    if(!email || !password)
    {
        return res.send('Give the complete details')
    }
    console.log(req.body)
    userModel.find({email:email}).then((data)=>{
        
        
        console.log(data[0].password)
        if(data){
           
            bcrypt.compare(password,data[0].password,(err,result)=>{
                console.log(result,err)
                if(result){
                const token=jwt.sign({userId:data._id},'jupyter',{ expiresIn: 60 * 60 })
                req.session.data=data
                res.send({
                    token:token
                })
            }
            else
            {
                return res.send('password is not correct');
            }
            
        })
            }
        else
        {
            return res.send('user not found')
        }

        }).catch(err=>{
        res.send(err)
    })
})
//requireLogin
const requirelogin=(req,res,next)=>{
   
                const {authorization} =req.headers
                console.log(authorization)
                if(!authorization)
                {
                    return res.status(401).send('you must be logged in')
                }
                const token=authorization.replace("Bearer ","")

                jwt.verify(token,'jupyter',(err,payload)=>{

                    if(err){
                        console.log(err)
                    return  res.send(401).send(err)
                    }
                })
                next()
}

//home
router.get('/home',requirelogin,(req,res)=>{
    console.log(req.session,'fgfdg')
    res.json({data:req.session.data})
})

module.exports=router