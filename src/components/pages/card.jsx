import React from "react";
import Axios from "axios";
import {Link as RouterLink} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import "../../App.css";
// eslint-disable-next-line
class MediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  componentDidMount() {
    const url = "http://localhost:8888/books";
    Axios.get(url)
      .then(response => response.data.result)
      .then(data => {
        this.setState({ books: data });
        console.log(this.state.books);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <Grid container spacing={3}>
        {this.state.books.map(result => (
          <Grid item xs key={result.idbooks}>
            <div className="box">
              <div className="imgBx">
                <img src={result.image} alt="" />
              </div>
              <div className="content">
                <RouterLink to={`/${result.idbooks}`} style={{ textDecoration: 'none', color: 'black' }}>
                 <h3>{result.title}</h3>
                </RouterLink>
                <p>{result.description}</p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default MediaCard;
