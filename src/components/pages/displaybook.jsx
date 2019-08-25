  import React, { Component, Fragment } from 'react';
  import Axios from 'axios';
  import { Link as RouterLink } from 'react-router-dom';
  import CssBaseline from '@material-ui/core/CssBaseline';
  import Toolbar from '@material-ui/core/Toolbar';
  import IconButton from '@material-ui/core/IconButton';
  import ArrowBackIcon from '@material-ui/icons/ArrowBack';
  import Paper from '@material-ui/core/Paper';
  import Typography from '@material-ui/core/Typography';
  import Grid from '@material-ui/core/Grid';
  import Card from '@material-ui/core/Card';
  import CardActionArea from '@material-ui/core/CardActionArea';
  import Button from '@material-ui/core/Button';
  import CardMedia from '@material-ui/core/CardMedia';
  import Hidden from '@material-ui/core/Hidden';
  import Divider from '@material-ui/core/Divider';
  import Container from '@material-ui/core/Container';
  import Chip from '@material-ui/core/Chip';
  
  import '../css/style.css';
  // eslint-disable-next-line
  export default class Blog extends Component {
    constructor(props) {
      super(props);
      this.state = {
        books: []
      };
    }
    componentDidMount() {
      const url = `http://localhost:8888/books/`;
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
      const { books } = this.state;
      return (
        <Fragment>
          <CssBaseline />
          <Container maxWidth='lg'>
            <Toolbar className='toolbar'>
              <Grid
                container
                direction='row'
                justify='flex-start'
                alignItems='baseline'
              >
                <Grid item sm={9}>
                  <IconButton component={RouterLink} to="/Home" color="inherit">
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item sm={1}>
                  <Button
                    href='#text-buttons'
                    color='secondary'
                    className='button'
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item sm={1}>
                  <Button
                    href='#text-buttons'
                    color='secondary'
                    className='button'
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
              { // eslint-disable-next-line
                this.state.books.map(result => {
                // eslint-disable-next-line
                if (result.idbooks == this.props.match.params.idbooks) {
                  console.log(result.image)
                  return(
            <main>
              <Paper
                className='mainFeaturedPost'
                style={{
                  backgroundImage: `url(${result.image})`
                }}
              >
                {/* Increase the priority of the hero background image */}
                {
                  <img
                    style={{ display: 'none' }}
                    src={result.image}
                    alt='background'
                  />
                }
                <div className='overlay' />
                <Grid container>
                  <Grid item>
                    <div className='mainFeaturedPostContent' />
                  </Grid>
                </Grid>
              </Paper>
              {/* End main featured post */}
              {/* Sub featured posts */}
              <Grid
                container
                spacing={4}
                className='cardGrid'
                justify='flex-end'
                xs={12}
              >
                {/* {featuredPosts.map(post => ( */}
                <Grid item xs={2}>
                  <CardActionArea component='a' href='#'>
                    <Card className='card'>
                      <Hidden smDown>
                        <CardMedia
                          className='cardMedia'
                          image={result.image}
                          title='Image title'
                        />
                      </Hidden>
                    </Card>
                  </CardActionArea>
                </Grid>
                {/* ))} */}
              </Grid>
              {/* End sub featured posts */}
              <Grid container spacing={5} className='mainGrid'>
                {/* Main content */}
                <Grid item xs={12} md={8}>
                  <Chip
                    label={result.genre}
                    component='a'
                    href='/genre'
                    clickable
                    className='chip'
                  />
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    item
                    xs={12}
                  >
                    <Grid item sm={8} spacing={4}>
                      <Typography variant='h4'>{books.title}</Typography>
                    </Grid>
                    <Grid item sm={4} align='right'>
                    {result.available === 'Available' ? (
                      <Typography variant='h6' color="primary">
                        Available
                      </Typography>
                    ) : result.available != 'Available' ? (
                      <Typography variant='h6' color="secondary">
                        Not Available
                      </Typography>
                    ) : null }
                    </Grid>
                  </Grid>
                  <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    gutterBottom
                  >
                    {result.date_released}
                  </Typography>
                  <Divider />
                  <Typography align='justify' variant='body1'>
                    {result.description}
                  </Typography>
                </Grid>
                {/* End main content */}
                {/* Sidebar */}
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                  item
                  xs={12}
                  md={4}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      href='#contained-buttons'
                      className='button'
                      size='large'
                      fullWidth={true}
                    >
                      {result.available === 'Available' ? 'Borrow' : 'Return'}
                    </Button>
                  </Grid>
                </Grid>
                {/* End sidebar */}
              </Grid>
            </main>
            )
          }
        })}
          </Container>
        </Fragment>
      );
    }
  }
