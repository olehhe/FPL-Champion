var userRouter = require('express').Router();
var User = require('./userModel');
var userController = require('./userController')(User);

/* Middlware */
userRouter.param('userId', (req, res, next, userId) => {
    User.findById(userId, (err, user) => {
        if (err) {
            res.status(500);
            res.send(err);
        }
        else if (user) {
            req.user = user;
            next();
        }
        else {
            res.status(404);
            res.send('User not found');
        }
    });
});

/* Routes */
userRouter.route('/')
    .get(userController.get)
    .post(userController.post);

userRouter.route('/:userId')
    .get(userController.getWithId)
    .put(userController.putWithId)
    .patch(userController.patchWithId)
    .delete(userController.deleteWithId);


module.exports = userRouter;