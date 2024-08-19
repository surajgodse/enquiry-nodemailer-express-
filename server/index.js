const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save",(req, res)=>{
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let query = req.body.query;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth : {
            user: "surajjgodset@gmail.com",
            pass: "eehibggcnygdbcxb",
        }
    })


    let mailOptions = {
        from: "surajjgodset@gmail.com",
        to: "surajjgodset@gmail.com",
        subject: "Enquiry from " + name,
        text: "Name: " + name + "\nPhone: " + "\nEmail: " + email + phone + "\nQuery: " + query
    };
    

transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
        console.log("Mail err ", err);
        res.status(500).json(err);
    }
    else{
        console.log("Mail send ", info.response);
        res.status(200).json("Mail send");
    }
})
});

app.listen(9000, ()=> {console.log("ready @ 9000");});