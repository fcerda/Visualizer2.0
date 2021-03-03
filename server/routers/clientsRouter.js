const pool = require("../db");
const router = require("express").Router();

// return an array of all clients
router.get('/', async (req, res) => {
    try {
        let response = await pool.query('SELECT * FROM clients')
        res.send(response.rows)
    } catch (e) {
        res.status(400).send(e)
    }
})



router.post('/create', async (req, res) => {
    const { username, password, email } = req.body
    try {
        const newUserRes = await pool.query('INSERT INTO clients (username, password, email) VALUES ($1,$2,$3) RETURNING id,username,email', [username, password, email])
        const newUser = newUserRes.rows[0]
        res.send(newUser)
    } catch (e) {
        res.status(500).send(e)
    }
    
})


module.exports = router;