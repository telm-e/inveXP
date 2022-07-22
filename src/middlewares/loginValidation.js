const clientService = require('../services/clientService');

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const getClient = await clientService.getClient(req.body);
  if (!getClient[0]) {
    return res.status(400).json({ message: 'Invalid fields' }); 
  }
  
  if (password !== getClient[0].password) {
    return res.status(404).json({ message: 'Invalid password' });
  }
     next();
  };
  
  module.exports = loginValidation;