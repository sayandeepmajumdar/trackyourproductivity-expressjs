const express = require('express');

const pgClient = require('./dbConnect.js');


const app = express();
app.use(express.json()); //middleware to handle data in json format

//routes
app.get('/users', (req, res)=>{
    pgClient.query('Select * from userprofile', (err, result)=>{
        if(!err){
            
            res.status(200).json(result.rows);
        }else{
         
            res.status(404).json(err.message);
        }
    });
    pgClient.end;
})

app.post('/create/users', (req, res)=>{
    const { id, name,address,phone_number,email_address,status,created_at } = req.body

    pgClient.query('INSERT INTO userprofile (id,name,address,phone_number,email_address,status,created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', [id, name,address,phone_number,email_address,status,created_at], (err, result)=>{
        if(!err){
            
            res.status(200).json(result.oid);
        }else{
         
            res.status(404).json({"message":err.message});
        }
    });
    pgClient.end;
})

app.get('/', function(req, res){
    res.send("Hello World!");
});



//starting point 
app.listen(3000, function(){
    console.log("Server started on port 3000!");
})


