import React from "react";
import PropTypes from "prop-types";
import "typeface-roboto";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../bookshelf.svg";
import Privacy from "../components/Privacy";
import { connect } from "react-redux";
import { userLogin } from "../../public/action/users";
import { compose } from "redux";

const styles = theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage:
      "url(https://dev.ipb.ac.id/media/images/fasilitas-perpustakaan-ipb.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(15, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "theme.palette.secondary.main"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  logo: {
    float: "right",
    width: "64px",
    marginRight: "20px",
    marginTop: "20px"
  },
  textfloat: {
    position: "absolute",
    margin: "40px",
    background: "rgba(0,0,0,0.5)",
    color: "white",
    padding: theme.spacing(1),
    // eslint-disable-next-line no-dupe-keys
    margin: theme.spacing(1, 0),
    border: "1px solid",
    borderColor: theme.palette.text.primary
  }
});

class SignInSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    await this.props.dispatch(userLogin(email, password));
  };

  render() {
    const { classes } = this.props;
    if (window.localStorage.getItem("access_token") == null) {
      return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Box
            component="div"
            display={{ xs: "none", sm: "block" }}
            className={classes.textfloat}
          >
            <Typography component="h1" variant="h4">
              IPB Library, <br />
              The Place For Borrow Book &nbsp; &nbsp; &nbsp;
            </Typography>
          </Box>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <img
              src={logo}
              className={classes.logo}
              alt="logo"
              component={RouterLink}
              to="/Home"
            />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Typography component="p">
                Welcome Back, Please Login to your Account
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleEmailChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handlePassword}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.setRedirect}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      component={RouterLink}
                      variant="body2"
                      to={"/register"}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                  <div>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp;&nbsp; &nbsp;
                  </div>
                  <Grid item>
                    <Link component={RouterLink} variant="body2" to="/Home">
                      {"No, i just want to check home"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Privacy />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      );
    } else {
      return (window.location = "/Home");
    }
  }
}

SignInSide.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default compose(
  withStyles(styles, {
    name: "SignInSide"
  }),
  connect(mapStateToProps)
)(SignInSide);
// export default withStyles(styles)(SignInSide);
