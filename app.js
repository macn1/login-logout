 const { urlencoded } = require('express');
const express = require('express')
const app = express()
const cookie = require("cookie-parser")
const port = 3001
const morgan = require('morgan');
const path= require('path')
const methodOverride =require("method-override")
const bcrypt = require('bcrypt')
const session = require('express-session')
const users =[]

app.set('view engine', 'ejs');


app.use(cookie())
app.use(morgan('tiny'));
app.use(express.json());
app.use((req,res,next)=>{
    if(!req.user){
      res.header('cache-control','private,no-cache,no-store,must revalidate')
      res.header('Express','-3')
    }
    next();
  })
app.use(session({secret:"key",cookie:{},resave: true,
saveUninitialized: true}))

app.use(urlencoded({extended:true}))
app.use(express.static(__dirname+'./views'))/* to render out html page  */
app.use(methodOverride("_method"))

const emaildb='a@gmail.com'
const passworddb =1234


app.get('/',(req,res)=>{
   
    if (req.session.user) {
        res.render('index.ejs')
        
    }else{
        res.redirect('/login')
    }
   
 
})
app.get('/register',(req,res)=>{
    res.render('register.ejs')

})

app.get('/login',(req,res)=>{
    if (req.session.user) {
        res.redirect('/')
    }else{
        res.render('login.ejs')

    }
 
  
})


app.post('/login',(req,res)=>{
    const{email,password}=req.body 


console.log(email,password);
    if(email==emaildb && password==passworddb){
        req.session.user = true
        res.redirect('/')

    }else{
        req.session.user = false
        res.redirect('/login')
       
    }

})
// app.post('/register',async(req,res)=>{
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password,10)
//         users.push({
//             id:Date.now().toString(),
//             name:req.body.name,
//             email:req.body.email,
//             password:hashedPassword
//         })
//         res.redirect('/login')
        
//     } catch {
//         res.redirect('/login')
        
//     }
//     console.log(users);
// })
app.get('/logout',(req,res)=>{
    req.session.user=false
    res.redirect("/login")
})

app.listen(port)