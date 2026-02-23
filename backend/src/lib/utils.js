import jwt from 'jsonwebtoken';

export const generateToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.cookie('token', token, {
  httpOnly: true,
  secure: false,        // ✅ false for localhost
  sameSite: 'lax',      // ✅ IMPORTANT for localhost
  maxAge: 30 * 24 * 60 * 60 * 1000
});

  return token;
};