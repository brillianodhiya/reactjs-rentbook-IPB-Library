import React from "react";
import Axios from "axios";
import Swiper from "react-id-swiper";
import "react-id-swiper/lib/styles/scss/swiper.scss";
import "react-id-swiper/lib/styles/css/swiper.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line
const params = {
  effect: "coverflow",
  coverflowEffect: {
    rotate: 60,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false
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
  }
};

const url = "http://localhost:8888/books?limit=5"

class Carousel extends React.Component {
  // const data = fetchBook("http://localhost:8888/books?limit=5")
  // if (!data) {
  //   return <div>Loading ...</div>
  // } else {
  state = {
    data: []
  }
  componentDidMount() {
    Axios.get(url)
      .then(res => {
        const result = res.data
        this.setState({ result })
      })
  }
    render(){
  return (
    <Swiper {...params}>
      
      <div>
        {data.map((item,index)=>{
          console.log(item);
        // eslint-disable-next-line no-unused-expressions
        <Card style={{maxWidth: 400}}>
          <CardActionArea>
            <CardMedia
              style={{maxWidth: 400}}
              image={item.image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                align="center"
                gutterBottom
                variant="h5"
                component="h2"
              >
                Books
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      })}
      </div>
    </Swiper>
  );
  }
};

export default Carousel;
