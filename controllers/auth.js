const bcrypt = require('bcryptjs')
const jwtGenerator = require('../utils/jwtGenerator');
const pool = require('../db');

// SIGN UP
exports.signup = async (req, res) => {
  const { name, password } = req.body
  const email = req.body.email.toLowerCase()

  try {
    // Does the user already exist?
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use.' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const bcryptPassword = await bcrypt.hash(password, salt)

    // Insert the new user
    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bcryptPassword],
    );

    // Generate the jwt token
    jwtToken = jwtGenerator(newUser.rows[0].user_id)
    res.cookie('authToken', jwtToken, { maxAge: 900000, httpOnly: true })

    // Return the new user's id
    return res.json({ id: newUser.rows[0].user_id })
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ error: err.message })
  }
}

// SIGN IN
exports.signin = async (req, res) => {
  const { password } = req.body
  const email = req.body.email.toLowerCase()

  try {
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(403).json({ error: 'Invalid Cedentials' })
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password,
    );

    if (!validPassword) {
      return res.status(403).json({ error: 'Invalid Credentials' })
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id)
    res.cookie('authToken', jwtToken, { maxAge: 900000, httpOnly: true });

    return res.json({ message: 'Login Successful' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ error: err.message })
  }
}

// SIGN OUT
exports.signout = (req, res) => {
  res.clearCookie('authToken')
  res.json({ message: 'Logout Successful' })
}
