"use client"
import axios from "axios";

export default function TestPage() {
    const sendData = async () => {
        const response = await axios.post('/api/user/test', {name:"Deepu"});
        console.log("Server Says: ", response.data.message);
    }

    return (
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={sendData}>Send Test Data</button>
    )
}