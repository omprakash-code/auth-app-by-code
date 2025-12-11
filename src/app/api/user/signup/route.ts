import {connect} from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import {NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

connect() // Ensure DB is connected

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Add new user to database
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            verifyToken: crypto.randomBytes(32).toString('hex'),
            verifyTokenExpiry: Date.now() + 3600000 // 1 hour
        });

        const savedUser = await newUser.save();

        console.log('New user created:', savedUser);

        return NextResponse.json({message: "User created successfully", success:true, user: savedUser}, {status: 201});


    } catch (error: any) {
        return NextResponse.json({message: "Internal Server Error", error: error.message}, {status: 500});
    }

};