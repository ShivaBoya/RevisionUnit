module.exports = function roles(allowed = []) {
  if (typeof allowed === 'string') allowed = [allowed];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient rights.' });
    }
    next();
  };
};
