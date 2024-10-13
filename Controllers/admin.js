//Handling user login
const login = (req, res) => {
    console.log(req.body)
    const { username, password } = req.body
    try {
        // check if the user exists
        if (username == "Joseph" || password == "Sailor") {
            //check if password matches
            // res.status(200).json({ message: "Successful entry" })
            req.session.user = { id: 9292, username: "Joseph" }
            return res.redirect('/orders')

        } else {
            res.redirect('/')

        }
    } catch (error) {
        // req.flash('Failure', 'Try Again Later')
        return res.status(400).json({ error });
    }
};
const logout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            // req.flash('Failure', 'Try Again Later')
            return res.status(500).json({ message: "error " })
        } else {
            // req.flash('message', 'successful Logout')
            res.redirect('/')
            // res.status(200).json({ message: "suscess logging out" })
        }
    })
}

module.exports = { login, logout }
