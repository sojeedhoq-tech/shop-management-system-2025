const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'ইনপুট ভ্যালিডেশন ব্যর্থ',
      details: errors.array()
    });
  }
  next();
};

const authValidation = [
  body('email').isEmail().withMessage('বৈধ ইমেইল প্রদান করুন'),
  body('password').isLength({ min: 6 }).withMessage('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে'),
  body('name').notEmpty().withMessage('নাম প্রয়োজন')
];

const productValidation = [
  body('name').notEmpty().withMessage('পণ্যের নাম প্রয়োজন'),
  body('code').notEmpty().withMessage('পণ্যের কোড প্রয়োজন'),
  body('category').notEmpty().withMessage('ক্যাটাগরি প্রয়োজন'),
  body('purchasePrice').isFloat({ gt: 0 }).withMessage('ক্রয় মূল্য শূন্যের চেয়ে বড় হতে হবে'),
  body('sellingPrice').isFloat({ gt: 0 }).withMessage('বিক্রয় মূল্য শূন্যের চেয়ে বড় হতে হবে')
];

const customerValidation = [
  body('name').notEmpty().withMessage('গ্রাহকের নাম প্রয়োজন'),
  body('phone').isMobilePhone().withMessage('বৈধ ফোন নম্বর প্রদান করুন')
];

module.exports = {
  validate,
  authValidation,
  productValidation,
  customerValidation
};
