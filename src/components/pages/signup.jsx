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
import Axios from "axios";
import Privacy from "../components/Privacy"
import { fadeInLeft } from "react-animations";
import Radium, {StyleRoot} from "radium";


const stylesAnimation = {
  fadeInLeft: {
    animation: 'x ls',
    animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
  }
}

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
  },
});

class RegiInSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
    }
  }
  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }
  handleUsernameChange = event => {
    this.setState({ username: event.target.value })
  }
  handleEmailChange = event => {
    this.setState({ email: event.target.value })
  }
  handlePasswordChange = event => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    Axios.post(`http://localhost:8888/books/register`,{
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    })
    .then(res => {
      console.log(res)
      window.location="/"
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Box
          component="div"
          display={{ xs: "none", sm: "block" }}
          className={classes.textfloat}
        >
          <StyleRoot >
          <Typography component="h1" variant="h4" style={stylesAnimation.fadeInLeft}>
            IPB Library, <br />
            The Place For Borrow Book &nbsp; &nbsp; &nbsp;
          </Typography>
          </StyleRoot>
        </Box>

        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <img src={logo} className={classes.logo} alt="logo" />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                name="username"
                autoFocus
                onChange={this.handleUsernameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={this.handleNameChange}
              />
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
                onChange={this.handlePasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={RouterLink} variant="body2" to="/Login">
                    {"Have an account? Login"}
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
  }
}

RegiInSide.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegiInSide);
