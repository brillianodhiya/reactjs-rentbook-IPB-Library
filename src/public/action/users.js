import Axios from "axios";
import swal from "sweetalert";

export const userRegister = (username, name, email, password) => {
  return {
    type: "USER_REGISTER",
    payload: Axios.post("http://localhost:8888/books/register", {
      username,
      name,
      email,
      password
    })
      .then(res => {
        if (res.status == 200) {
          swal({
            title: "Register Success",
            text: "Welcome " + res.data.name,
            buttons: false,
            timer: 3000,
            icon: "success"
          });
          setInterval(() => (window.location = "/Login"), 3200);
        } else {
          swal("Register Failed", {
            text: res.data.message,
            buttons: false,
            timer: 3000,
            icon: "warning"
          });
        }
      })
      .catch(err => {
        console.log(err);
        swal("Register Failed", {
          text: "Maybe Your Username and Email Already Taken",
          buttons: false,
          timer: 3000,
          icon: "warning"
        });
      })
  };
};

export const userLogin = (email, password) => {
  return {
    type: "USER_LOGIN",
    payload: Axios.post("http://localhost:8888/books/login", {
      email,
      password
    })
      .then(res => {
        if (res.status == 200) {
          swal({
            title: "Login Success!",
            text: "Welcome Back " + res.data.name,
            buttons: false,
            timer: 3000,
            icon: "success"
          });
          window.localStorage.setItem("access_token","Bearer "+ res.data.acces_token);
          window.localStorage.setItem(
            "name",
            res.data.level + " " + res.data.name
          );
          // Axios.create({ baseURL: 'http://localhost:8888/', headers: { x_token: res.data.acces_token } });
          setInterval(() => (window.location = "/Home"), 3200);
        } else {
          swal("Login Failed", {
            text: res.data.message,
            buttons: false,
            timer: 3000,
            icon: "warning"
          });
        }
      })
      .catch(err => {
        console.log(err);
        swal({
          title: "Login Failed",
          text: "We Can't Found This Email",
          buttons: false,
          timer: 3000,
          icon: "warning"
        });
      })
  };
};
