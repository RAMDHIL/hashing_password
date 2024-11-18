import bcrypt from "bcryptjs";
import express from "express";
import {db} from "./connection.js"
const app = express();
const port = 3000;


// const hashPassword  = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password,salt);
// }

app.use(express.json());

app.post('/register', async (req,res) => {
    const {username,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10);
    const query = `insert into users (id,username,email,password) values (null,'${username}','${email}','${hashedPassword}')`
    db.query(query,(err,result) => {
        if(err) console.error(err);
        res.status(200).json({
            message:"succes register"
        });
    })
});


app.post('/login', async(req,res) => {
    const {email,password} = req.body
    const query = `select password from users where email = ?`
    db.query(query, [email] , async (err,result) => {
        if(err) console.error(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }


        const isValidPassword = await bcrypt.compare(password,result[0].password)
        if(isValidPassword){
            res.status(200).json({
                message: "succes"
            })
        }else{
            res.status(401).json({
                message: "password is wrong"
            })
        }
    })
})


app.listen(port, (err)=> {
    if (err) console.log('failed running server');
    console.log(`server runing in port ${port}...`);
})
