const speakeasy = require('speakeasy');


const login = async (req, res) => {
  const { secret, numberCode } = req.body;
const isTokenValid = speakeasy.totp.verify({
  secret: secret,
  encoding: 'base32',
  token: numberCode,
  window: 1
});
  if (isTokenValid) {
    res.status(200).json({ message: "El código es correcto.", color: "green" });
  } else {
    res.status(400).json({ message: "El código no es correcto", color: "red" });
  }
 };


module.exports = login;