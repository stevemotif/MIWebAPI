const { User } = require("../models/UserModel");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();




router.post('/', async (req, res) => {

    try {
        
        const user = await User.findOne({email : req.body.email});
console.log(user);


        if(!user)
        {
            return res.status(401).json({error : "user doesn't exist"});
        }

        let token = await Token.findOne({ userId: user._id });
        console.log(token);
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }


        const link = `http://localhost:3005/password-reset/${user._id}/${token.token}`;
console.log(link);

        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");

    } catch (error) {
          res.send("An error occured");
        console.log(error);
    }
})


router.post("/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


module.exports = router;