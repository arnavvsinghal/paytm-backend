const { userSignUpSchema } = require("../types");
const {User} = require("../db");

async function userSignUpMiddleware(req, res, next) {
  const userData = req.body;
  const parseResult = userSignUpSchema.safeParse(userData);
  if (!parseResult.success) {
    return res.status(411).send(parseResult.error);
  }
  const alreadyExists = await User.exists({username : userData.username});
  return alreadyExists ? res.status(411).send("User already exists") : next(); 
}

module.exports = userSignUpMiddleware;
