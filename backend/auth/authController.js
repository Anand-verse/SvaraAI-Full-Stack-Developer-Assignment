import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res)=>{
   try { 
    const { name, email, password } = req.body;

    const user = await User.findOne({email:email});
    if(user){
        return res.status(400).json({msg:'Email already exist'})
    }
        const newUser = await User.create({
            name,
            email,
            password
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: newUser,
        });
    }catch(err) {
        console.error(err);
      res.status(400).json({msg:'Registration Error'});
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        
        const user = await User.findOne({ email });

       
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

       
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        
        user.password = undefined;

        res.status(200).json({
            message: 'Logged in successfully',
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
