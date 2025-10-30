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
    const { userId, movieId } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    const movieIndex = user.favorites.indexOf(movieId);

    if (movieIndex > -1) {
      user.favorites.splice(movieIndex, 1);
      /this will removie it as wel know/;
      await user.save();

      res.send({
        message: "Removed from favorites",
        isFavorite: false,
        favorites: user.favorites,
      });
    } else {
      user.favorites.push(movieId); // else add it like we know
      await user.save();

      res.send({
        message: "Added to favorites",
        isFavorite: true,
        favorites: user.favorites,
      });
    }

    // basic code
  } catch (error) {
    console.log(error);
  }
}

export { signUp, Fav };
