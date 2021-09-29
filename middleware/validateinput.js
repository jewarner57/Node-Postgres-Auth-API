module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  // check a valid email has been entered by using a regex function
  function validEmail(userEmail) {
    // eslint-disable-next-line no-useless-escape
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if ((![email, password].every(Boolean)) || (!name && req.path === '/signup')) {
    return res.status(400).json({ error: 'Missing Credentials' });
  }

  if (!validEmail(email)) {
    return res.status(400).json({ error: 'Invalid Email' });
  }

  next();
}
