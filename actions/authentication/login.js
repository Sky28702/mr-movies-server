import User from "../../models/authentication/signUp.js";
import bcrypt from "bcryptjs";
async function signin(req, res) {
  let data = req.body;

  try {
    // checking userName
    const isUserExist = await User.findOne({
      userName: data.userName,
    });

    if (!isUserExist) {
      res.send({
        success: false,
        message: "inncorret credintals",
      });
      return;
    }

    // checking password of data pass and user s pass
    const isPasswordMatched = await bcrypt.compare(
      data.password,
      isUserExist.password
    );

    if (isPasswordMatched) {
      res.send({
        success: true,
        message: "Login successfull !",
        user: {
          userName: isUserExist.userName,
          id: isUserExist._id.toString(),
          firstName: isUserExist.firstName,
          lastName: isUserExist.lastName,
          image: isUserExist.image,
        },
      });
      return;
    } else {
      return {
        success: false,
        message: "Incorrect credintals",
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export { signin };
