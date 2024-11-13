import { compare } from 'bcrypt';
import User from '../models/User.js'; // Adjust the import based on your folder structure
import pkg from 'jsonwebtoken';
import { request, response } from 'express';
const { sign } = pkg;



const maxAge = 3* 24 * 60 * 60 * 100 ; 

const createToken = (email, userId) => {
  return sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};




export const register = async (req, res, next) => {
  try {
    // Destructure email and password from req.body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Create a new user
    const user = await User.create({ email, password });

    // Create a JWT token and set the cookie
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    // Return the user details in the response
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and Password are required.");
    }

    // Correct the User model reference here
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User with the given email is not found.");
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).send("Password is incorrect.");
    }

    // Correct the 'res' object usage
    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};




export const getUserInfo = async (req, res) => {
  try {
    console.log("Request received with userID:", req.userID);  

    const userData = await User.findById(req.userID); 
    if (!userData) {
      return res.status(404).send("User with this ID not found");
    }

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstname,
      lastName: userData.lastname,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return res.status(500).send("Internal server error");
  }
};


export const updateProfile = async (req, res) => {
  const { userID } = req;
  const { firstname, lastname, color } = req.body;  // Use lowercase here

  if (!firstname || !lastname) {
    return res.status(400).json({ error: "First Name and Last Name are required" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { $set: { firstname, lastname, profileSetup: true, color } },  // Use lowercase here
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      id: updatedUser._id,
      email: updatedUser.email,
      firstname: updatedUser.firstname,  // Use lowercase here
      lastname: updatedUser.lastname,    // Use lowercase here
      color: updatedUser.color,
      profileSetup: updatedUser.profileSetup,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Add profile image
export const addProfileImage = async (req, res) => {
  const { userID } = req;
  const profileImage = req.file;

  if (!profileImage) {
    return res.status(400).json({ error: "No profile image uploaded" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { image: profileImage.path },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      color: updatedUser.color,
      profileImage: updatedUser.image,
    });
  } catch (error) {
    console.error("Error adding profile image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Remove profile image
export const removeProfileImage = async (req, res) => {
  const { userID } = req;
  const defaultImageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEVmZmb////u7u7t7e35+fn19fX29vbx8fH8/PxhYWFkZGRZWVleXl5aWlpWVlZoaGhRUVGGhoZ5eXmwsLCnp6fX19fe3t6RkZG+vr7ExMSYmJhwcHDMzMzk5OS4uLiioqJ1dXWCgoKLi4ucnJxva3cNAAAMbklEQVR4nO1dDbeiKhRNQUFAtO/MrKn+/398eEv03kxBAe2t9pqZtYas4/Yc4RzA7cKrAIH/AICyza+AZFMoD8OyTTYFsglV3wRTG1hMfQJfhl+GX4Zfhl+GH8UQt33+bAP6JwDUTsC6AX8Bn8AQBQ+gEFdtgYRsCuVhEKt8E+FXA9CkgaDHwAJUqK9iINsaDq4QNq7iE37jKlZoXP8K9fV3amAh74Tm5y8BUIdw4wTkV1vi5DXCmgZe7yF7BloZujyBaRh+ffj5DK370GWQfH1o5wSc+vD/Px5WOQ0MZZIQyrY6cWg5DL4eFnYdNpGBZl5aoZk2vjg4VLuK8vo308YJDADgsLbAfnVhZdP/q3oKiu0p2xzWm+ySnba7x7FVbfHJDH96iV12XK6SmMaMUsYZ5THJV/vzCWKM0GczRBjsshVLOY2iaNFAFJGYp3G+ORU4+FSGwA+hv/5H4ogkizYkCxKxOLnsAog+kCEQ/crpynnUSq4Jmubn+vc/hmGA/XMeR4t27/1xZUSTI9A0MGiexuRwhc85Z/3sJGK+AX8NeF0G1MdD6aaWrK7OlrBsakkba/rw+VPhaZVGCu5rgvEzwIoGBOrr28NAMgTmEmMP3CjT5CcQ8XwrXDM4837DwHz1FIRnrfhsgKRHP5x7fQgg2NP+/vMd+L+t123ADMMRUYpPOdUPUIkkSjfz9iHO2HAHPkDvuMPA1D7E95SMJLhIeO7Pl+Gdj+X348UrsMFwwGghf7o66JKaIFh6sRjA8N1ogSoEuEIg22QTlE3hu8M8fDTiwRL0H/DKwurlPELZBGVbDwNzWRs05MESCf+HoKmsrSUABmXe8GiOoKBIVwWaVW0BvIOxEH1SXNYunAFDADNqlGAZqPc5MURgMXoc/AvCT/Nh6MN9PCJVe4MokqPE5AzDzOxN+AQ7zobhdkQ10QWZhU8+i7EfWA/2geTP0x81Hoaj4WUmR8ImEr734NjTG7+6horEeD8qkZ7KmJl2twnA69gawQVb/tz3DYavvYDtChj5zJ4LRZweSlLGGWr4EOAzNz8U1mArz4YPtaLUJj/hxPQEwaRRGp5MJ6R/EC3RtD70LA32NegOTenDYGdrLKyQ8DWecrcJvFgcKh6IFrixbjFgPGyZiumcAgkbUyDYQyuLQ8UTdOf1zxK9Z9CzC7pqepd576wUFb8gwnTcLuiez594x3BjPUhFmK7q28p99XS1VFX8QlxUdNwzDB24sEy/q4VR9wyNzz+1gu6rG9E9w7P9jkYgyjGaiuHFxW0oan0wFcPgan80LMG2wSvDAaOFpFN/3rIbIpSHYc/CLGkr6Lk6uc4NI20MBMPhWZtISp10NMKH69pNTmcxgq2Tjkb4UK7tO66eoJ2J4FdE1yrsHFdPcO0qSpemGSr6EH8uw9n5cDWRD50xJKw6Occ+dBalJBrDcMQshjsfNhjqj4dqj6O0PbUSOPNhtFR67qadwajVNVcM4yV8cZOb3SbORvxlS+b92llYqC0czEP9gN2mYljYng5+gq6ffblzhsBNASxqCziRD1Hupj7kh6miFC5tL8s8EBVTMfQ2ToaLKEFG5mmG7DaxvXj4AFvJvGXIeNi5+AJfFz2aayOhm2mMeOON2UErnT1kFzR0MhWV7loC0c0zMwDfXYwXrFBiaGOVu9yI4YDgvr6tnK9yo8K+D8stNZP50PfhzTpFwhun5n6nQmh3v1AJdh25U2GcDwM/tt2bphmckiGwv879b+y+thHzND/f2loOU7qBI3dftpDQ2yO8H/O8YS8IB+0kHD4zU6Q2GcbrZiBOtJP9ZuFJBImomAHDrb30O3muq03M0LtY62xI6s2CIaK2xkR6mAdDb22pOxXpzEwYwqWV7JSwaiA0w3CEQiuyMjVcbkrsYKi42wTUamYtKxwNGdTOZRuEM27+VuQ3D789tYYOGn5tky0GFVqPxm/FKC9Qw0DlJv2sTd5q457Hh6b3YZJoJ6NuHqoRQWSWIj/NTlOhyHU1dzpA0sMMVSNO2rJC78EvLQYmZ+hlsSmKj4dHZ6jeciJmKP54cI4+FGVGbKC7IdXjv3NUaPXAavS0TRSd3hsYpdDanTgobkXx0H7cyndC0xPuMKB2au8UWivPjhP2X7MRkRrxI6oiUe3NAaA7L7Wi0LrNB+fhjB9Ul5em1U3cDJPDIul++ynKkEWiX/aTODpgVQOTM/Rwlijoejb50XjjaxiYnKH46jmJVTkmhJKjr2dgcoYIYXTIU6WJRsbJvdA2MDlD4KMg2N0JZ12ZXCLGB3Y9ABhoG9BnaEOxHOEi25OUvpFdiGia5uttCP1WA16/gV+HDVBobclL2wRUW57LaU7EoWJz+7fgjLHoASL+MsZZvjpusYqBFoXWWb0bAYm8yt9lm/0xIpTHKUvZghyP2bYZBgbejaCz28Qsw0cLrFuexyKzBmzWh83H5RUvcVkw9BsIqgfljDPU8iEMt5sjGnwCHQaCwymEaFoflrLrpxXj8VPQyShDeE/Z6hxAZEHbRNGHQPjvtBL9xiJhjxl41RNQMbAt5XoZpxsE1W4DCz5Egl8lbUL4rTDpQ3h51CcJYfnZzJ4o/b2JXnGldbGbxDxrHKbcmbcb2K7qhRCSXqW+oEuFVg+u/1aBfFWE1XeVt3++GhDRceG/FM8jvgfe4P2ljauok7XhYvm63MTSe3UdlZOqFwOiC32dJIgXmTc0a2t8Xnm2N/MGQbBunzek9FnlDX6HZZDlbSt1hC9RCFzVFiB4KzibkDg5h57G4/J/DGSi72qvRdJlgR0xFBFK3+++SKKUbgqv0nnQYijiM31bNYsfPuCWjMo8Q9/LelaZojTZZxAGOgyFc4p7zysjSHyWX7TIEOLD++tcXe6FqCFuW190fT3TmU96osLKrmnvRk6SHustLtYYemeVJftEjNRRvj8h3DZaNwyI0SEMtpdrQpXmkakUbbXH8KyhnC9yrttmW/0cBuDFAAa7wy3navQWP6kTHMxQbTw8aG26SEhEWfnuqh1AIQxwucYQhuXvQzHEF4fLKol4pDXtyG+PQLWj0AoFQf3Z7IgwnsZstVxuNusHNpvrlZXvudLfo5LwI9ZSbdVZXfPhYfDLHUg5OUNpHFMu/imnbMjQn6LHANnZbQK8g/Vt60qI9yJGLVRPICzGv57DDNJDaKMCDkDu5nnKfhC6a7xE0ZQPUehEfU4NUVyvAhhj6K0dPbithFrPxViUQjfSbKpI0pthhl5hU/F5COhJlaHieGhnF/AIECI3EPeMh136plIZ1VvPKkZ/QG/PM/a6GagotIqRUC93dALCzz9LjUZqC3idH8Fyo/uPEIEBhgCf5zRQSCR075lhGBRz9GAJWupljGcIXGl46iMiITLAMNzOMkZLlGrmvRNB/QyxIwGTISBkh0Y+MyNGirMjuatBKEVB1H0o87emQivCyXxdKMC3YScDBYXWg9WHYEeD7XFf1iZ5t+etLoTzR4Ft5SaqYbXFYc53YQl29VoY9DFsfD7vu7CEuBPH+DCzLnsxGmzfIRTdx9APb7N3ocjdqhcLDIhS++9YMYH4/hzKB/jQ2ivjjIJEAepi2DEeotlNzrSDZrBrPOzQN7X8Oi5jIHkQDlNoDWacc/8Cfcid6e82cSXeORrx/Q2Dvupp7+QdKwbAcjyIYTCblZg+kMf0sDZDVyrBBsDugxg6UQw0BA4HMITWNFksoHy4XZvh6XOCdJHQiwLDv+OhG31ZQ4jy8O14+G7/qbf6lJ70B6LU11RoRbuPIpjwDdZ8ZgYePug2XJRqylCvegL4IwqnGiQW95k6Q/G/cPFRUSrC9BRq+TD8iOq+CXaEWj6EHzAF9RvkquVDgM3rPlkGyYFWlLp6K55BxFvYZFAzbJ3190E+9Qlrg2deg0Fjnka2/sraig+L0cWP0qnOLIZFxU5bYHtPp7b4pMLiiSjSYnj4lCmaBmj9CmoFhh+Ws5VIUvmEggpD+2LyxpGkSIfhDPex9SFJT4EOQyYFHh5/arQ3KR72PFLhMH0DqVwqVdltUu3pTqo/jWvV2qR42PNIhcP0DbBTlcqoKLT+lXj4CODGekxDzaxvt8nzy7KpU5FugGCcdQPOlD+MCDNOrgz5OQyt+9BlkHx9aOcEvj60zvD/1Zf+/8dDswqtXd+cyIB5hdbq+r8EYruw/1gDUyi0Pk7g9VabyMCX4Zfhl+GX4ZehSYY2FFrfpC2dWl9OFFo/v7Zorq45YzjghcNGDPwHwytksPiVujoAAAAASUVORK5CYII= ' // Set your default image URL here

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { image: defaultImageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstname,
      lastName: updatedUser.lastname,
      profileImage: updatedUser.image, // Now shows the default image URL
    });
  } catch (error) {
    console.error("Error removing profile image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res, next) => {
  try {
   res.cookie("jwt",'',{maxAge:1 , secure:true , sameSite:"None"}) 
   return res.status(200).send("Logout Successful");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};