const jwt=require('jsonwebtoken');


const createToken=jwt.sign(payload,process.env.PRIVATE_KEY,(err,token)=>{
    if(err){
        console.log("INVALID: ",err.message)
    }
    else{
        console.log(token)
    }

})

const validateToken=jw.verify(token,process.env.PRIVATE_KEY);

jwt.verify(token,process.env.PRIVATE_KEY,function(err,decoded){
    console.log(decoded.foo);
});


try {
    const decoded = jwt.verify(token, 'wrong-secret');
    console.log("Decoded payload:", decoded);
} catch (err) {
    console.log("INVALID TOKEN: ", err.message);
}