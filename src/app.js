const express= require('express');
const multer = require('multer')
const path = require('path');
const fs=require('fs');
const { request } = require('http');
const app = express();
app.use(express.json({extended: true}))
app.set("view engine","hbs"); 
const staticPath = path.join(__dirname,"../public")
app.use(express.static(staticPath));
const middleware=(req,res,next) =>{
    console.log("this is middleware")
    next();
}
middleware
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"))
});
app.post('/data_send',function(request,response,next){
  response.send(request.body)
    
})
app.get('/template',middleware,(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/email_template.html"))
})

app.post('/form_upload',function(request,response,next){
  
    const fileData= JSON.parse(fs.readFileSync(path.join(__dirname,"../src/cart.json")))
    fileData.push(request.body)
    response.send(fs.writeFileSync(path.join(__dirname,"../src/cart.json"), JSON.stringify(fileData, null, 2)))
    
})
app.post('/hr_data',(req,res)=>{
    console.log(req.body)
    const data=req.body;
    res.json({
        status:'Success',
        body:data
    })
    res.end();
})
//sending api
app.get('/userapi',(req,res)=>{
    res.send(JSON.stringify(jsonPath))
})
app.get('/test.js',(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/test.html"))
})

const port=3000;
app.listen(port,()=>{
    console.log(`I am listening to ${port}`);
})