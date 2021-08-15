const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const path = require('path');

module.exports.usersController = {
  registerUser: async (req, res) => {
    const { login, password } = req.body;
    if (!login) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Необходимо указать login",
      });
    }
    if (!password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Необходимо указать пароль",
      });
    }
    try {
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const registerUser = await new User({
        login: login,
        password: hash,
      });
      await registerUser.save();
      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      console.log(e.message);
      res.status(httpStatus.SERVICE_UNAVAILABLE).json({ message: e.message });
    }
  },
  login: async (req, res) => {
    const { login, password } = req.body;
    try {
      const candidate = await User.findOne({ login: login });
      if (!candidate) {
        return res.status(httpStatus.BAD_REQUEST).json("Неверный логин");
      }
      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(httpStatus.BAD_REQUEST).json("Неверный пароль");
      }
      const payload = {
        id: candidate._id,
        login: candidate.login,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "1h",
      });

      res.json({
        token,
      });
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
  uploadFile: (req, res) => {
    const file = req.files.file;
    const fileName = file.name;
    const url = path.resolve(__dirname, "../public/uploads/file/" + fileName);
    const urlForDB = "/uploads/file/" + fileName;
    try {
      file.mv(url, async (err) => {
        if (err) {
          console.log(err);
        } else {
          const user = await User.findById(req.user.id);

          user.file = urlForDB;
          await user.save();
          res.json({
            success: "Файл загружен",
            file: urlForDB,
          });
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  },
};
