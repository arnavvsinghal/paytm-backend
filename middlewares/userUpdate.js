const { userUpdateSchema } = require("../types");

function userUpdate(req, res, next) {
  const updateData = req.body;
  const parseResult = userUpdateSchema.safeParse(updateData);
  if (!parseResult.success) {
    return res.status(403).json({});
  }
  next();
}

module.exports = userUpdate;
