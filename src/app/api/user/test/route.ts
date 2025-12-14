import { NextRequest, NextResponse } from "next/server";

export async function POST(request:any){

    //receive json data from client
    const dataFromClient = await request.json()
    console.log("Received From Client:", dataFromClient);

    if(dataFromClient.name !== "Deepu"){
        return NextResponse.json({message: "Invalid Name"}, {status: 400});
    }

    //Create response 
    const response = NextResponse.json({
        message: `Hello, ${dataFromClient.name}! Your data has been received successfully. and Cookie is set.`
    });

    //Set a test cookie
    // response.cookies.set("setTestCookie", "12345", {httpOnly: true});
    response.cookies.set("token", "12345", {httpOnly: true});

    return response

}