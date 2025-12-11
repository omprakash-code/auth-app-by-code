import {connect} from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {NextRequest, NextResponse } from "next/server";

connect() // Ensure DB is connected

export async function POST(request: NextRequest){
    try {
        //Take data from form submission
        const reqBody = await request.json() //request.json() provide the data in json format from the server
        // destructure the data
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if the user exists in the database
        const user = await User.findOne({email});

        //Send response if user not found
        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return NextResponse.json({message: "Invalid credentials"}, {status: 401});
        }

        //Create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        //Create the JWT token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "24h" });

        //Create response
        const response = NextResponse.json({message: "Login Successful", success:true});

        //Set cookie in the response
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    }catch (error: any) {
        return NextResponse.json({message: "Internal Server Erro", error: error.message}, {status: 500});
    }
}