const jwt = require("jsonwebtoken")

function authManager() {
    verify = function (req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                console.log("NOPE");
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            console.log("YUP");

            const verified = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.log("OH NO");
            console.error(err);
            return res.status(401).json({
                errorMessage: "Unauthorized"
            });
        }
    }

    signToken = function (user) {
        return jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
    }

    return this;
}

const auth = authManager();
module.exports = auth;