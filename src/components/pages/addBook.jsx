import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { getGenres } from "../../public/action/genres";
import { addBooks } from "../../public/action/books";
import { compose } from "redux";
import swal from "sweetalert";

// eslint-disable-next-line
const styles = theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
    width: "180px",
    float: "right"
  },
  select: {
    marginTop: "10px"
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  }
});

class addBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      genre: "",
      title: "",
      description: "",
      image: "",
      setSelectedDate: new Date(Date.now()),
      setOpen: false,
      show: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptChange = this.handleDescriptChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
  }

  componentDidMount = async () => {
    await this.props.dispatch(getGenres());
    this.setState({ genres: this.props.genres.genreList });
    console.log(this.props.genres.genreList);
  };

  hiddenAlert = () => {
    this.setState({ show: false });
  };

  handleDateSelect = date => {
    this.setState({ setSelectedDate: date });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleDescriptChange = event => {
    this.setState({ description: event.target.value });
  };

  handleImageChange = event => {
    this.setState({ image: event.target.value });
  };

  handleGenreChange = event => {
    this.setState({ genre: event.target.value });
  };

  handleOpen = () => {
    this.setState({ setOpen: true });
  };

  handleClose = () => {
    this.setState({ setOpen: false });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { title, description, image, setSelectedDate, genre } = this.state;
    await this.props.dispatch(
      addBooks(title, description, image, setSelectedDate, genre)
    );
    swal("Add Book Success!", "Please click the button!", "success").then(
      res => {
        window.location.reload();
      }
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="title"
          label="Book Title"
          name="title"
          autoComplete="title"
          autoFocus
          required
          onChange={this.handleTitleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          autoFocus
          required
          onChange={this.handleDescriptChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="image"
          label="Image (Url)"
          name="image"
          autoComplete="url"
          autoFocus
          required
          value={this.state.image}
          onChange={this.handleImageChange}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            inputVariant="outlined"
            format="yyyy/MM/dd"
            margin="normal"
            id="date-picker-inline"
            label="Date Released"
            name="date_released"
            value={this.state.setSelectedDate}
            onChange={this.handleDateSelect}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="controlled-open-select" required>
            Genre
          </InputLabel>
          <Select
            open={this.state.setOpen}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.genre}
            required
            onChange={this.handleGenreChange}
            inputProps={{
              name: "genre",
              id: "controlled-open-select"
            }}
          >
            {this.state.genres.map(result => (
              <MenuItem key={result.codegenre} value={result.codegenre}>
                {result.keterangan}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Now
        </Button>
      </form>
    );
  }
}

addBook.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    genres: state.genres
  };
};

export default compose(
  withStyles(styles, {
    name: "addBook"
  }),
  connect(mapStateToProps)
)(addBook);
// export default withStyles(styles)(addBook);
// export default compose(
//   withStyles(styles, {
//     name: 'Carousel',
//   }),
//   connect(state => ({
//     books: state.books
//   })),
// )(Carousel);
