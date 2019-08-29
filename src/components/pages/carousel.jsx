import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Swiper from "react-id-swiper";
import "react-id-swiper/lib/styles/scss/swiper.scss";
import "react-id-swiper/lib/styles/css/swiper.css";
import { connect } from "react-redux";
import { getBooks } from "../../public/action/books";
import Loading from "./loading";
import "../css/carousel.css";

const params = {
  effect: "coverflow",
  coverflowEffect: {
    rotate: 40,
    stretch: 10,
    depth: 60,
    modifier: 1,
    slideShadows: true
  },
  slidesPerView: 3,
  spaceBetween: 190,
  slidesPerGroup: 1,
  loop: false,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 2000,
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
      getBooks: []
    };
  }
  componentDidMount = async () => {
    await this.props.dispatch(getBooks());
    this.setState({
      getBooks: this.props.book
    });
  };

  render() {
    return (
      <Swiper {...params}>
        {this.state.getBooks.bookList ? (
          this.state.getBooks.bookList.slice(0, 6).map((books, index) => {
            return (
              <div key={index} className="containers">
                <div className="boxs">
                  <div className="imgBox">
                    <img src={books.image} alt="" />
                  </div>
                  <RouterLink to={`/${books.idbooks}`}>
                    <div className="details">
                      <div className="content">
                        <h2>{books.title}</h2>
                        <p>{books.description}</p>
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </Swiper>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.book
  };
};

export default connect(mapStateToProps)(Carousel);
//export default withStyles(styles)(Carousel);
//export default withStyles(styles)(connect(mapStateToProps)(Carousel));
// export default compose(
//   withStyles(styles, {
//     name: 'Carousel',
//   }),
//   connect(state => ({
//     books: state.books
//   })),
// )(Carousel);
