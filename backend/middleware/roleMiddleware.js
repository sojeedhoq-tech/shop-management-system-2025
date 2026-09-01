const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'অনুমোদন প্রয়োজন' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'এই অপারেশনের অনুমতি আছে না' });
    }

    next();
  };
};

module.exports = roleMiddleware;
