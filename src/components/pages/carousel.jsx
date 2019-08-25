import React from "react";
import Axios from "axios";
import Swiper from "react-id-swiper";
import "react-id-swiper/lib/styles/scss/swiper.scss";
import "react-id-swiper/lib/styles/css/swiper.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {Link as RouterLink} from 'react-router-dom';

const styles = {
  card: {
    maxWidth: 450
  },
  media: {
    height: 280
  }
};
const params = {
  effect: "coverflow",
  coverflowEffect: {
    rotate: 60,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: true
  },
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  observer: true
};
class Carousel extends React.Component {
  // const data = fetchBook("http://localhost:8888/books?limit=5")
  // if (!data) {
  //   return <div>Loading ...</div>  
  // } else {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  componentDidMount() {
    const url = "http://localhost:8888/books?limit=10";
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
    const { classes } = this.props;
    return (
      <Swiper {...params}>
        {this.state.books.map(result => (
          <RouterLink to={`/${result.idbooks}`} style={{ textDecoration: 'none', color: 'black' }}>
          <div key={result.idbooks}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={result.image}
                  title={result.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {result.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          </RouterLink>
        ))}
      </Swiper>
    );
  }
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Carousel);
