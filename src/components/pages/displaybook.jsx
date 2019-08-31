import React, { Component, Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import "../css/style.css";
import {
  getBooks,
  updateBook,
  deleteBook,
  rentBook,
  returnBook
} from "../../public/action/books";
import swal from "sweetalert";
// eslint-disable-next-line

const user =
  window.localStorage.getItem("name") != null
    ? window.localStorage.getItem("name")
    : ""; //define user
class DisplayOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getBooks: []
    };
    this.props.book.bookList.map(result => {
      if (result.idbooks == this.props.match.params.idbooks) {
        return (this.state = {
          title: result.title,
          description: result.description,
          image: result.image,
          genre: result.genre
        });
      }
    });
  } //state definition

  componentDidMount = async () => {
    await this.props.dispatch(getBooks());
    this.setState({
      getBooks: this.props.book.bookList.filter(
        book => book.idbooks == this.props.match.params.idbooks
      )[0]
    });
  }; //getbook data

  handleModalOpen = () => {
    swal("What Data You Want To Edit?", {
      buttons: {
        title: {
          text: "Title",
          value: "title"
        },
        description: {
          text: "Description",
          value: "description"
        },
        image: {
          text: "Image",
          value: "image"
        },
        genre: {
          text: "Genre",
          value: "genre"
        },
        cancel: "Cancel"
      },
      icon: "warning"
    }).then(value => {
      switch (value) {
        case "title":
          swal("Write New Title Here:", {
            content: "input",
            buttons: ["Cancel", "Ok!"]
          }).then(value => {
            if (value === null) {
              swal("Edit Title Canceled");
            } else {
              swal(`You Edited The Title To ${value}`);
              this.setState({
                title: value
              });
            }
          });
          break;

        case "description":
          swal("Write New Description Here:", {
            content: "input",
            buttons: ["Cancel", "Ok!"]
          }).then(value => {
            if (value === null) {
              swal("Edit Description Canceled");
            } else {
              swal(`You Edited The Title To ${value}`);
              this.setState({
                description: value
              });
            }
          });
          break;

        case "image":
          swal("Write New Image Url Here:", {
            content: "input",
            buttons: ["Cancel", "Ok!"]
          }).then(value => {
            if (value === null) {
              swal("Edit Genre Canceled");
            } else {
              swal(`You Edited The Title To ${value}`);
            }
          });
          break;

        case "genre":
          swal("Write New Code Genre Here:", {
            content: "input",
            buttons: ["Cancel", "Ok!"]
          }).then(value => {
            if (value === null) {
              swal("Edit Image Canceled");
            } else {
              swal(`You Edited The Title To ${value}`);
              this.setState({
                image: value
              });
            }
          });
          break;

        default:
          swal("Edit Book Canceled!");
      }
    });
  }; //edit modal end

  handleRental = async event => {
    event.preventDefault();
    const idbooks = this.props.match.params.idbooks;
    swal("Are You Sure Want To Borrow This Book?", {
      buttons: {
        yes: {
          text: "Sure!",
          value: "yes"
        },
        cancel: "Cancel"
      },
      icon: "warning"
    }).then(async value => {
      switch (value) {
        case "yes":
          swal("Thankyou for Rentaling this book, dont froget to return", {
            buttons: false,
            timer: 3000,
            icon: "success"
          });
          await this.props.dispatch(rentBook(idbooks));
          setInterval(() => (window.location = "/Home"), 3200);
          break;

        default:
          swal("Rental Canceled", {
            icon: "info"
          });
      }
    });
  };

  handleReturn = async event => {
    event.preventDefault();
    const idbooks = this.props.match.params.idbooks;
    swal({
      title: "Return Success",
      text: "Thanks for returning this book",
      buttons: false,
      timer: 3000,
      icon: "success"
    });
    await this.props.dispatch(returnBook(idbooks));
    setInterval(() => (window.location = "/Home"), 3200);
  };

  handleBack = async event => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const image = this.state.image;
    const idbooks = this.props.match.params.idbooks;
    await this.props.dispatch(updateBook(idbooks, title, description, image));
    window.location = "/Home";
  }; //handle back

  handleDelete = async event => {
    event.preventDefault();
    const idbooks = this.props.match.params.idbooks;
    swal("Are You Sure?", {
      buttons: {
        sure: {
          text: "Sure!",
          value: "sure"
        },
        cancel: "Cancel"
      },
      icon: "warning"
    }).then(async value => {
      switch (value) {
        case "sure":
          swal("This Delete Success!", {
            buttons: false,
            timer: 3000,
            icon: "success"
          });
          await this.props.dispatch(deleteBook(idbooks));
          setInterval(() => (window.location = "/Home"), 3200);
          break;

        default:
          swal("Delete Canceled", {
            icon: "info"
          });
      }
    });
  }; //handle delete

  render() {
    const { book } = this.props;
    console.log(localStorage.getItem("access_token"));
    return (
      <Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Toolbar className="toolbar">
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="baseline"
            >
              <Grid item sm={9}>
                <Button
                  onClick={this.handleBack}
                  style={{ color: "white", background: "rgba(0,0, 0, 0.5)" }}
                >
                  <ArrowBackIcon />
                </Button>
              </Grid>
              {user.startsWith("1 ") ? ( //admin 1 = admin
                <div>
                  <Grid item sm={1}>
                    <Button
                      color="secondary"
                      className="button"
                      onClick={this.handleModalOpen}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item sm={1}>
                    <Button
                      color="secondary"
                      className="button"
                      onClick={this.handleDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                </div>
              ) : null}
            </Grid>
          </Toolbar>
          {// eslint-disable-next-line
          book.bookList.map(books => {
            // eslint-disable-next-line
            if (books.idbooks == this.props.match.params.idbooks) {
              console.log(books.image);
              return (
                <main>
                  <Paper
                    className="mainFeaturedPost"
                    style={{
                      backgroundImage: `url(${
                        this.state.image == null
                          ? `${books.image}`
                          : this.state.image != null
                          ? `${this.state.image}`
                          : null
                      })`
                    }}
                  >
                    <img
                      style={{ display: "none" }}
                      src={
                        this.state.image == null
                          ? `${books.image}`
                          : this.state.image != null
                          ? `${this.state.image}`
                          : null
                      }
                      alt="background"
                    />
                    <div className="overlay" />
                    <Grid container>
                      <Grid item>
                        <div className="mainFeaturedPostContent" />
                      </Grid>
                    </Grid>
                  </Paper>
                  <Grid
                    container
                    spacing={4}
                    className="cardGrid"
                    justify="flex-end"
                    xs={12}
                  >
                    <Grid item xs={2}>
                      <CardActionArea component="a" href="#">
                        <Card className="card">
                          <Hidden smDown>
                            <CardMedia
                              className="cardMedia"
                              image={
                                this.state.image == null
                                  ? `${books.image}`
                                  : this.state.image != null
                                  ? `${this.state.image}`
                                  : null
                              }
                              title={
                                this.state.title == null
                                  ? `${books.title}`
                                  : this.state.title != null
                                  ? `${this.state.title}`
                                  : null
                              }
                            />
                          </Hidden>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} className="mainGrid">
                    <Grid item xs={12} md={8}>
                      <Chip
                        label={
                          this.state.genre == null
                            ? `${books.genre}`
                            : this.state.genre != null
                            ? `${this.state.genre}`
                            : null
                        }
                        component="a"
                        href="/genre"
                        clickable
                        className="chip"
                      />
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        item
                        xs={12}
                      >
                        <Grid item sm={8} spacing={4}>
                          <Typography variant="h4">
                            {this.state.title == null
                              ? `${books.title}`
                              : this.state.title != null
                              ? `${this.state.title}`
                              : null}
                          </Typography>
                        </Grid>
                        <Grid item sm={4} align="right">
                          {books.available === "Available" ? (
                            <Typography variant="h6" color="primary">
                              Available
                            </Typography>
                          ) : books.available != "Available" ? (
                            <Typography variant="h6" color="secondary">
                              Not Available
                            </Typography>
                          ) : null}
                        </Grid>
                      </Grid>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        gutterBottom
                      >
                        {books.date_released}
                      </Typography>
                      <Divider />
                      <Typography align="justify" variant="body1">
                        {this.state.description == null
                          ? `${books.description}`
                          : this.state.description != null
                          ? `${this.state.description}`
                          : null}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      item
                      xs={12}
                      md={4}
                    >
                      <Grid item>
                        {user.startsWith("1 ") || user.startsWith("0 ") ? (
                          <div>
                            {books.available === "Available" ? (
                              <Button
                                variant="contained"
                                href="#contained-buttons"
                                className="button"
                                size="large"
                                fullWidth={true}
                                onClick={this.handleRental}
                              >
                                Borrow
                              </Button>
                            ) : books.available != "Available" ? (
                              <Button
                                variant="contained"
                                href="#contained-buttons"
                                className="button"
                                size="large"
                                fullWidth={true}
                                onClick={this.handleReturn}
                              >
                                Return
                              </Button>
                            ) : null}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </main>
              );
            }
          })}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.book
  };
};

export default connect(mapStateToProps)(DisplayOne);
