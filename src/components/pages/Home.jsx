import React from "react";
import clsx from "clsx";
import "typeface-roboto";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Explore from "@material-ui/icons/Explore";
import History from "@material-ui/icons/History";
import AddBox from "@material-ui/icons/AddBox";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import DefaultImage from "../../default.jpeg";
import logo from "../../bookshelf.svg";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import "../../App.css";
import MediaCard from "./card";
import Carousel from "./carousel";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import jwtDecode from "jwt-decode";
import AddBook from "./addBook";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// eslint-disable-next-line
const drawerWidth = 340;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "white",
    color: "black"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  BigAvatar: {
    margin: 10,
    width: 150,
    height: 150
  },
  floatingRight: {
    height: "50px",
    margin: "8px"
  },
  input: {
    flex: 1,
    bottom: "15px"
  },
  iconButton: {
    padding: 10
  },
  carousel: {
    maxWidth: "1335px",
    display: "inline-block"
  },
  wrap: {
    margin: "1.00em 0",
    textAlign: "center"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "150px"
  },
  select: {
    marginTop: "10px"
  }
});

class HomePage extends React.Component {
  state = {
    drawerIsOpen: false,
    modalIsOpen: false,
    username: "",
    decode: [],
    ancholEl: null
  };

  handleClick = event => {
    this.setState({ ancholEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ ancholEl: null });
  };
  handleDrawerOpen = () => {
    this.setState({ drawerIsOpen: true });
  };
  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false });
  };

  handleModalOpen = () => {
    this.setState({ modalIsOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalIsOpen: false });
  };

  handleLogout = () => {
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('username')
    window.location="/Home"
  }

  render() {
    const { classes } = this.props;
    if (window.localStorage.getItem("access_token") != null) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.drawerIsOpen
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(
                  classes.menuButton,
                  this.state.drawerIsOpen && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  All Categories 
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Sci-fi</MenuItem>
                  <MenuItem onClick={this.handleClose}>Action</MenuItem>
                  <MenuItem onClick={this.handleClose}>Fantasy</MenuItem>
                </Menu>
              </div>
              <TextField
                id="standard-textarea"
                label="Search by Title"
                placeholder="Enter Keyword"
                multiline
                className={classes.input}
                margin="normal"
              />
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <img className={classes.floatingRight} src={logo} alt="" />
              <Typography component="p" variant="h6" noWrap>
                ꧁IPB Library꧂
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.state.drawerIsOpen}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <MenuIcon />
              </IconButton>
            </div>

            <Grid container justify="center" alignItems="center">
              <Avatar
                alt={this.state.username}
                src={DefaultImage}
                className={classes.BigAvatar}
              />
              <br />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Typography variant="h5" component="h2">
                {window.localStorage.getItem("username")}
              </Typography>
            </Grid>

            <Divider />
            <List>
              <ListItem button component={RouterLink} to="/explore">
                <ListItemIcon>
                  <Explore />
                </ListItemIcon>
                <ListItemText primary="Explore" />
              </ListItem>
              <ListItem button component={RouterLink} to="/history">
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary="History" />
              </ListItem>

              <ListItem button onClick={this.handleModalOpen}>
                <ListItemIcon>
                  <AddBox />
                </ListItemIcon>
                <ListItemText primary="Add Book*" />
              </ListItem>
              <ListItem button onClick={this.handleLogout}>
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText primary="Log Out"/>
              </ListItem>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={this.state.modalIsOpen}
                onClose={this.handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <Fade in={this.state.modalIsOpen}>
                  <div className={classes.paper}>
                    <h1 id="transition-modal-title">Add Data 📚</h1>
                    <AddBook />
                  </div>
                </Fade>
              </Modal>
            </List>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: this.state.drawerIsOpen
            })}
          >
            <div className={classes.drawerHeader} />

            <div className={classes.wrap}>
              <div className={classes.carousel}>
                <Carousel />
              </div>
            </div>
            <Typography component="h1" variant="h4">
              <b>📚 List Books</b>
            </Typography>
            <MediaCard />
          </main>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.drawerIsOpen
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(
                  classes.menuButton,
                  this.state.drawerIsOpen && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <TextField
                id="standard-textarea"
                label="Search by Title"
                placeholder="Enter Keyword"
                multiline
                className={classes.input}
                margin="normal"
              />
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <img className={classes.floatingRight} src={logo} alt="" />
              <Typography component="p" variant="h6" noWrap>
                ꧁IPB Library꧂
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.state.drawerIsOpen}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <MenuIcon />
              </IconButton>
            </div>
            <List>
              <ListItem button component={RouterLink} to="/explore">
                <ListItemIcon>
                  <Explore />
                </ListItemIcon>
                <ListItemText primary="Explore" />
              </ListItem>
              <ListItem button component={RouterLink} to="/Login">
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Login"/>
              </ListItem>
            </List>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: this.state.drawerIsOpen
            })}
          >
            <div className={classes.drawerHeader} />
            <div className={classes.wrap}>
              <div className={classes.carousel}>
                <Carousel />
              </div>
            </div>
            <Typography component="h1" variant="h4">
              <b>📚 List Books</b>
            </Typography>
            <MediaCard />
          </main>
        </div>
      );
    }
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);