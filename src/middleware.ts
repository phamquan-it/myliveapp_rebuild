import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req:NextRequest){
   
    //next request
 //   const response = NextResponse.next()
 //   return response;
 //   //get token
 //   if(req.nextUrl.pathname.includes("assets") || req.nextUrl.pathname.includes("/api")) return response;
 //   
 //   const token = req.cookies.get("token")
 //   try{
 //       const decoded:any = jwtDecode(token?.value+"");
 //       // console.log(decoded.role==="admin");
 //       //is validtoken
 //       if(req.nextUrl.pathname != "/login")
 //       switch(req.nextUrl.pathname){
 //           case "/profile":
 //           if (decoded.exp * 1000 < Date.now()) {
 //               return NextResponse.redirect(new URL("/login", req.url))
 //           }
 //       }
 //       
 //       if(decoded.role == "admin"){
 //          
 //           if(!req.nextUrl.pathname.includes("/dashboard"  ))
 //           return NextResponse.redirect(new URL("/dashboard", req.url))
 //           else return response
 //       }else{
 //           if(req.nextUrl.pathname.includes("/dashboard") || req.nextUrl.pathname =="/login" || req.nextUrl.pathname =="/register")
 //           return NextResponse.redirect(new URL("/", req.url))
 //       }
 //   }catch(e){
 //       if(!token && req.nextUrl.pathname == "/profile"){
 //           return NextResponse.redirect(new URL("/", req.url))
 //       }
 //           
 //       //console.log(req.nextUrl.pathname);
 //       // next request if do not token and is dashboard pages
 //       if(token && !req.nextUrl.pathname.includes("/dashboard")){
 //           return response;
 //       }
 //       console.log("invalid token");
 //       if(req.nextUrl.pathname !=="/login" && req.nextUrl.pathname.includes("/dashboard"))
 //       return NextResponse.redirect(new URL("/login", req.url))
 //   }
    
}

export const config = {
    matcher:[
    "/dashboard", 
    "/login", 
    "/register",
    "/dashboard/:path*",
    "/",
    "/:path*"
    ]
}
