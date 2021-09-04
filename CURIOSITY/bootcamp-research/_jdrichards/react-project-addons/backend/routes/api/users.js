const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const fileUpload = require('express-fileupload');
const { singleMulterUpload } = require('../../utils/awsS3');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, images } = require('../../db/models');

//s3
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const uploaded = multer();
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const router = express.Router();
// router.use(uploaded.array());
router.use(fileUpload());

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

//soonmi&james setup aws
router.post(
  '/single',
  singleMulterUpload('image'),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const profileImageUrl = await singlePublicFileUpload(req.file);
    const user = await User.signup({
      username,
      email,
      password,
      profileImageUrl
    });

    setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

//my s3 setup
// const s3 = new aws.S3({
//   accessKeyId: process.env.KEY_ID,
//   secretAccessKey: process.env.SECRET,
//   region: process.env.REGION
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.BUCKET_NAME,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//     acl: 'public-read'
//   })
// });

// const uploader = upload.single('image');

// router.post('/uploads', (req, res) => {
//   uploader(req, res, function (error) {
//     if (error) {
//       console.log(error);
//     }
//     console.log('i hit but no upload');
//     // console.log(req);
//     console.log('no file', req.file);
//   });

//   console.log(req);

//   const id = uuidv4();
//   await images.create({
//     id,
//     key: req.file.location,
//     bucket: process.env.BUCKET_NAME
//   });
// });

router.get('/uploads', async (req, res) => {
  let uploadList = await images.findAll({});

  let list = await uploadList.map(async (upload) => {
    const getParams = {
      Bucket: upload.dataValues.bucket,
      Key: upload.dataValues.key
    };

    const imageUrl = s3.getSignedUrl(
      'putObject',
      getParams,
      function (err, url) {
        console.log('The URL is', url);
      }
    );
    return imageUrl;
  });
});

module.exports = router;
