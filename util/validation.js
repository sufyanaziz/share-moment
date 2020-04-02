const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

const validateEmail = email => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.validateSignupUser = data => {
  let errors = {};

  const lengthUsername = data.username.split(" ").length;
  const fixUsername = data.username.split(" ").join("");

  if (isEmpty(data.full_name))
    errors.full_name = "Full Name tidak boleh kosong";
  if (isEmpty(data.password)) errors.password = "Password tidak boleh kosong";
  if (isEmpty(data.email)) {
    errors.email = "Email tidak boleh kosong";
  } else if (!validateEmail(data.email)) {
    errors.email = "Email tidak valid";
  }
  if (isEmpty(data.username)) {
    errors.username = "Username tidak boleh kosong";
  } else if (lengthUsername > 1) {
    errors.username = `Username tidak boleh memiliki spasi. (${fixUsername})`;
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLogin = data => {
  let errors = {};
  if (isEmpty(data.input))
    errors.input = "Username atau email tidak boleh kosong";
  if (isEmpty(data.password)) errors.password = "Password tidak boleh kosong";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.checkUsernameOrEmail = data => {
  let check = {};
  if (validateEmail(data)) check.email = "Email valid";
  return {
    check,
    valid: Object.keys(check).length !== 0 ? true : false
  };
};

exports.validatePost = data => {
  let errors = {};
  if (data.url_gambar === undefined)
    errors.gambar = "Gambar tidak boleh kosong";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateComment = data => {
  let errors = {};
  if (isEmpty(data.comment)) errors.comment = "Comment tidak boleh kosong";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
