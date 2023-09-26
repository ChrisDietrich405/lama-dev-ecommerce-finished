const yup = require("yup");


const userValidation = async (req, res, next) => {
  try {
    yup.object().shape({
      username: yup.string().required("username is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup.string().min(5).max(15).required("Password is required"),
      isAdmin: yup.boolean().required("isAdmin is required"),
    });
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }

  next();
};

module.exports = { userValidation };
