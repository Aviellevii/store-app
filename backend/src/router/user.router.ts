import {Router} from 'express';
import { sample_users } from '../data';
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';
const router = Router();

router.get("/seed",asyncHandler(
  async(req,res)=>{
    const countUser = await UserModel.countDocuments();
    if(countUser > 0){
      res.send('seed is already exist');
      return;
    }
    await UserModel.create(sample_users);
    res.send('user Added');
  } 
))

router.post("/login", asyncHandler(
  async(req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))) res.send(generateUserToken(user))
    else res.status(400).send('name or password invalid')
  }
));

router.post('/register',asyncHandler(
  async(req,res)=>{
    const {name,email,password,address} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(400).send('This Email has Exist');
      return;
    }
    const encryptedPassword = await bcrypt.hash(password,10);
    const newUser:User={
      id:'',
      name,
      email:email.toLowerCase(),
      password:encryptedPassword,
      address,
      isAdmin:false
    }   
    const dbUser = await UserModel.create(newUser);
    res.send(generateUserToken(dbUser)); 
  }
))
  
  const generateUserToken = (user: any) => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );
  
    return{
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    }
  };
  export default router;
