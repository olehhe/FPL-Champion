const userController = (User) => {

    const get = (req, res) => {
        var query = { };

        User.find(query, (err, users) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else {
                res.status(200);
                res.json(users);
            }
        });
    };

    const post = (req, res) => {
        var user = new User(req.body);
        if (!req.body.name || !req.body.email) {
            res.status(400);
            res.send('Name and Email is required');
        }
        else {
            user.save();
            res.status(201);
            res.send(user);
        }
    };

    const getWithId = (req, res) => {
        res.json(req.user);
    };

    const putWithId = (req, res) => {
        req.user.name = req.body.name;
        req.user.email = req.body.email;

        req.user.save((err) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else {
                res.json(req.user);
            }
        });
    };

    const patchWithId = (req, res) => {
        if (req.body._id)
            delete req.body._id;

        for (var p in req.body)
            req.user[p] = req.body[p];

        req.user.save((err) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else {
                res.status(200);
                res.json(req.user);
            }
        });
    };

    const deleteWithId = (req, res) => {
        req.user.remove((err) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else {
                res.status(204);
                res.send('User removed');
            }
        });
    };

    return {
        get: get,
        post: post,
        getWithId: getWithId,
        putWithId: putWithId,
        patchWithId: patchWithId,
        deleteWithId: deleteWithId
    }
};

export = userController;