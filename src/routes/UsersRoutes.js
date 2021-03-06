const express = require("express");
const sharp = require("sharp");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/Auth");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
const router = express.Router();

const multer = require("multer");

// create user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.name, user.email);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// logout
router.post("/logout", authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// logout all
router.post("/logoutAll", authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// getting all users
router.get("/me", authMiddleware, async (req, res) => {
  res.send(req.user);
});
// getting user by id
// router.get("/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send();
//   }
// });
// update user
router.patch("/me", authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // in other to acknowledge middlewares before save
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete user
router.delete("/me", authMiddleware, async (req, res) => {
  try {
    sendCancelationEmail(req.user.name, req.user.email);
    req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("The file must a jpg,jpeg or a png"));
    }
    cb(undefined, true);
  },
});

// uploding user profile picture

router.post(
  "/me/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    // req.user.avatar = req.file.buffer;
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// deleting the profile picture
router.delete("/me/avatar", authMiddleware, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// getting the uploaded picture
router.get("/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

module.exports = router;
