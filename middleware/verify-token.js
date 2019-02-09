const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(token){
        jwt.verify(token, res.app.get('secret_key'), (err, decoded) => {
            if(err){
                res.json({
                    status: false,
                    message: "Token Wrong or Expired!"
                });
            }else{
                req.decode = decoded;
                next();
            }
        });

    }else{
        res.json({
            status: false,
            message: "Token required!"
        });
    }
};