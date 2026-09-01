const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'ভ্যালিডেশন ত্রুটি',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'অবৈধ ID ফরম্যাট' });
  }

  if (err.code === 11000) {
    return res.status(400).json({ error: 'এই তথ্য ইতিমধ্যে বিদ্যমান' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'সার্ভার ত্রুটি',
    status: err.status || 500
  });
};

module.exports = errorMiddleware;
