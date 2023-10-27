import { NextResponse } from "next/server";


export async function GET() {
  try {
    // response
    const response = NextResponse.json({
      message: "Logout successful",
      succcess: true
    })
    
    // Cleare cookies and expiring it
    response.cookies.set("token", "", {
      httpOnly: true, expires: new Date(0)
    })

    // send the response and cookies
    return response;

  } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500})
  }
}
