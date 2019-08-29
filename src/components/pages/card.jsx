import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import "../../App.css";
import { connect } from "react-redux";
import Loading from "./loading";
import Pagination from "../components/Pagination";
// eslint-disable-next-line
class MediaCard extends React.Component {
  constructor() {
    super();

    this.state = {
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({
      pageOfItems: pageOfItems
    });
  }
  render() {
    const { book } = this.props;
    return (
      <div>
        <Pagination items={book.bookList} onChangePage={this.onChangePage} />
        <Grid container spacing={3}>
          {book.bookList ? (
            this.state.pageOfItems.map((books, index) => {
              return (
                <Grid item xs key={index}>
                  <div className="box">
                    <div className="imgBx">
                      <img src={books.image} alt="" />
                    </div>
                    <RouterLink
                      to={`/${books.idbooks}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className="content">
                        <h3>{books.title}</h3>
                        <p>
                          {books.description} <br /> <br />
                          {books.available === "Available" ? (
                            <Chip
                              label={books.available}
                              component="a"
                              clickable
                              color="primary"
                            />
                          ) : books.available != "Available" ? (
                            <Chip
                              label={books.available}
                              component="a"
                              clickable
                              color="secondary"
                            />
                          ) : null}
                          <Chip
                            label={books.genre}
                            component="a"
                            clickable
                            color="default"
                          />
                        </p>
                      </div>
                    </RouterLink>
                  </div>
                </Grid>
              );
            })
          ) : (
            <div>loading...</div>
          )}
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

export default connect(mapStateToProps)(MediaCard);
