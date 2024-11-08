// const jwt=require('jsonwebtoken');


// const createToken=jwt.sign(payload,process.env.PRIVATE_KEY,(err,token)=>{
//     if(err){
//         console.log("INVALID: ",err.message)
//     }
//     else{
//         console.log(token)
//     }

// })

// const validateToken=jw.verify(token,process.env.PRIVATE_KEY);

// jwt.verify(token,process.env.PRIVATE_KEY,function(err,decoded){
//     console.log(decoded.foo);
// });


// try {
//     const decoded = jwt.verify(token, 'wrong-secret');
//     console.log("Decoded payload:", decoded);
// } catch (err) {
//     console.log("INVALID TOKEN: ", err.message);
// }

var jwt=require('jsonwebtoken');

const generateToken=(userData)=>{
    //In this function we are creating new/fresh JWT Token to provide user, for login/session management or for authorization purpose.
    return jwt.sign(userData,process.env.PRIVATE_KEY)
}

const validateJwtToken=(req,res,next)=>{
    // first we are checking that JWT Token is available or not
    const authorization=req.headers.authorization;
    //Output: 1. Bearer asdfghjkl
    //Output: 2. asdfghjkl
    //Output: 3. 
    //Output: 4. TOKEN BANA HI NAHI HAI, LOCAL HO YA ENDPOINT TESTING SE BHEJA HO< WITHOUT TOKEN HEADER SEND KARNA HAI

    if(!authorization){
        return res.status(401).json({err:'Token not available'})
    }

    //We are storing the token value from headers and splitting to get "Bearer xyz.abc.kjh" to "xyz.abc.kjh"
    const token=req.headers.authorization.split(' ')[1]

    //If token provided is wrong , throw error message unauthorized user
    if(!token){
        return res.status(401).json({err:'Unauthorized user'});
    }

    try{
        //In this error handler try catch: we are handling , if token is validated or verified, then move to next middleware or respond back to client.
        const validateToken=jwt.verify(token,process.env.PRIVATE_KEY);
        req.user=validateToken;
        next();
    }catch(err){
        console.error("Error Occurred: ",err.message);
    }
}

module.exports={generateToken,validateJwtToken}