import User from './../models/user';

function getProfile(req, res) {
    res.json({ data: req.user });
}

function updateProfile(req, res) {
    console.log('Update request',req.body);
    for (let key in req.body) {
        if (["firstName","lastName", "email","title","company"].indexOf(key)!=-1) {
            req.user[key] = req.body[key];
        }
    }
    console.log(req.user);
    req.user.save()
        .then((user) => {
            res.json({ data: user });
        }).catch((err) => {
            res.status(403).json({ message: "Something gone wrong" });
        });
}

export default { getProfile, updateProfile };
