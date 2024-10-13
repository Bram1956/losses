const express = require('express')
const router = express.Router()
const Product = require('../Models/product')
const { sessionChecker } = require('../Middleware/auth')


router.post('/add', async (req, res) => {
    const { product, quantity, customer, phoneNumber } = req.body
    try {
        const newproduct = await Product.create({ product, quantity, customer, phoneNumber });
        // res.status(201).json({ newproduct })
        // req.flash('Success', 'Order Complete')
        return res.redirect('/')
    } catch (err) {
        // req.flash('Failure', 'Order Failure')
        res.json({ message: err })
    }
})
router.get('/', async (req, res) => {
    const products = await Product.find()
    res.json(products)
})


router.delete('/delete/:id', sessionChecker, async (req, res) => {

    try {
        await Product.findByIdAndDelete({ _id: req.params.id })
        // res.json({ message: "Successful delete" })
        res.redirect('/orders')
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

module.exports = router 