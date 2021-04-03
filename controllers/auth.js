const User = require("../models/user") 
 const { errorHandler } = require("../helpers/dbErrorhandler");
 const expressJwt = require("express-jwt");
 const jwt = require("jsonwebtoken");
const user = require("../models/user");

 exports. signup = (req, res) =>{
   console.log("req.body", req.body);
   const user = new User(req.body);
   user.save((err, user) => {
        if(err)
        {
            return res.json(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined
        res.json({
            user
        });
   });
};

exports.signin =(req, res) => {
    //find user based on email:
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
       if(err || !user){  
       return res.status(400).json({
           err: "User With email and password does not exists. Please signup"
       });
   }
    //If user matches
    //create authenticate method in user model
if(!user.authenticate(password)){
    return res.status(401).json({
        error: "Email and Password don't match."
    })
}
    //generate a sign in token
  const token =jwt.sign({_id: user._id}, process.env.JWT_SECRET)
  //persist the token in cookiewith expiry date
  res.cookie('t', token, {expire: new Date() + 9999})
  //return response with user and token to frontend client
 const {_id, name, email, role} = user
 return res.json({token, user: {_id, email, name, role}});
});
}    


exports. signout = (req, res) =>{
res.clearCookie('t')
res.json({
    message: "Signout Success."
});
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });


  exports. isAuth = (req, res, next) =>{
 let user = req.profile && req.auth && req.profile._id == req.auth._id
 if(!user){  
    return res.status(403).json({
        err: "Access Denied"
    });
}
next();
  }

  exports.isAdmin = (req, res, next) =>{
    if(!req.profile.role === 0){  
       return res.status(403).json({
           err: "Access Denied"
       });
   }
   next();
     }