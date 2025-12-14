import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";

connect(); // Ensure database connection is established

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findOne({_id: userId }).select("-password"); // Exclude password field and use _ID to match the schema and get data from database
        // console.log("Fetched user:", user);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }



        return NextResponse.json({
            message: "User data fetched successfully",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}
