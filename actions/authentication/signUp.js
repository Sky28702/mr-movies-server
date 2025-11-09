import mongoose from "mongoose";
import User from "../../models/authentication/signUp.js";
import bcrypt from "bcryptjs";

async function signUp(req, res) {
  try {
    let data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const isEmailAlreadyExist = await User.findOne({
      email: data.email,
    });

    if (isEmailAlreadyExist) {
      res.send({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    const isUserAlreadyExist = await User.findOne({
      userName: data.userName,
    });

    if (isUserAlreadyExist) {
      res.send({
        success: false,
        message: "Username already taken",
      });
      return;
    }

    const user = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      password: hashedPassword,
    });

    res.send({
      success: true,
      message: "Registration successful!",
    });

    // *TODO: i am not using form data here so mi8 cause trouble later ve to check on it ok!!!!!!!!!!

    await user.save();
  } catch (error) {
    console.log(error);
  }
}

async function Fav(req, res) {
  try {
    let data = req.body;
    let userId = req.body.userId;
    let movieId = req.body.movieId;

    const user = await User.findById(userId);

    let index = user.favorites.indexOf(movieId);

    if (index === -1) {
      user.favorites.push(movieId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();

    res.send({
      data: data,
      click: user.favorites.includes(movieId),
    });
  } catch (error) {
    console.log(error);
  }
}

async function likeStatus(req, res) {
  try {
    let data = req.body;
    let userId = req.body.userId;
    let movieId = req.body.movieId;

    const user = await User.findById(userId);

    let index = user.favorites.indexOf(movieId);

    if (user.favorites.includes(movieId)) {
      res.send({
        data: data,
        click: true,
      });
    } else {
      res.send({
        data: data,
        click: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function readFavMovies(req, res) {
  try {
    let data = req.body;
    let userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.send({
        message: "cant find a thing",
      });
    }

    if (user) {
      const fav = user.favorites;
      res.send({
        success: true,
        favourites: fav,
        data: data,
      });
    } else {
      res.send({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export { signUp, Fav, likeStatus, readFavMovies };
