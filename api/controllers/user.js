function editProfile(req, res) {
    for (let key in req.body) {
        if (["firstName","lastName", "email"].indexOf(key)!=-1) {
            req.user[key] = req.body[key];
        }
    }
    req.user.save()
        .then((user) => {
            res.json({ data: user });
        }).catch((err) => {
            res.status(403).json({ message: "Something gone wrong" });
        });
}


export default { editProfile};
