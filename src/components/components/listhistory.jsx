import React from "react";
import "../css/explore.css";
import { connect } from "react-redux";
import { getRent } from "../../public/action/books";
import Grid from "@material-ui/core/Grid";
import NeverBorrow from "./neverborrow"

class ListHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }

  componentDidMount = async () => {
    await this.props.dispatch(getRent());
    this.setState({
      history: this.props.book.bookRent
    });
  };

  render() {
    console.log(this.state.history);
    return (
      <div>
        <Grid container spacing={3}>
          {this.state.history.map(books => (
            <Grid item xs>
              <div className="cardsh">
                <div className="image">
                  <img src={books.image} alt="" />
                </div>
                <div className="details">
                  <div className="center">
                    <h1>
                      {books.title} <br />{" "}
                      <span>
                        {books.back_at == ""
                          ? "Waiting"
                          : books.back_at > books.expire_at
                          ? "Late"
                          : books.back_at < books.expire_at
                          ? "Return"
                          : null}
                      </span>
                    </h1>
                    <p>{books.description}</p>
                    <ul>
                      <li>
                        Rent<a href="">{books.rent_at}</a>
                      </li>
                      <li>
                        Back<a href="">{books.back_at}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.book
  };
};

export default connect(mapStateToProps)(ListHistory);
