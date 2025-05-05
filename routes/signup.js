const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const signup = async (req, res) => {
  try {
    const { secretLength } = req.body;

    const length = +secretLength;
    const secretOptions = {
      length: length,
      name: 'M8T1 - MCSG UCAM'
    }
    const secret = speakeasy.generateSecret(secretOptions);
    const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url);

    res.json({
      qrCode: qrCodeDataURL,
      secret: secret.base32
    });
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = signup;
