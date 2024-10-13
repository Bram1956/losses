const sessionChecker = (req, res, next) => {

    if (req.session) {
        // res.json({ message: "Allowed " })
        next();
    } else {
        // res.json({ message: "unauthorized" })
    }
};
module.exports = { sessionChecker }