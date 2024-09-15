const { userSignInSchema } = require("../types");
const {User} = require("../db");

async function userSignInMiddleware(req, res, next) {
  const userData = req.body;
  const parseResult = userSignInSchema.safeParse(userData);
  if (!parseResult.success) {
    return res.status(411).send(parseResult.error);
  }
  const alreadyExists = await User.exists(userData);
  if(alreadyExists){
    req.userId = alreadyExists._id;
    return next();
  }
  return res.status(411).send("Incorrect Username/Password");
}

module.exports = userSignInMiddleware;
