import React from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Pagination,
} from "@mui/material";
import { ClientContext } from "../context/Provider";
import { Link } from "react-router-dom";

function MainPage() {
  const {
    getBooks,
    books,
    filterByPrice,
    addBookToBasket,
    addBookToFavorite,
    setFilterByPrice,
    pagesCount,
    currentPage,
    setCurrentPage,
    minMax,
  } = React.useContext(ClientContext);

  React.useEffect(() => {
    getBooks();
  }, [filterByPrice, currentPage]);

  return (
    <div className="main-wrapper">
      <div className="main-page">
        <Container>
          <div className="main-banner"></div>

          <h2>Catalogue</h2>
          <div className="sub-wrapper">
            <div
              className="filter-block"
              // style={{ display: "flex", justifyContent: "end" }}
            >
              <h4>Price filter</h4>
              <Slider
                max={minMax[1]}
                min={minMax[0]}
                valueLabelDisplay="auto"
                value={filterByPrice}
                onChange={(e, newValue) => setFilterByPrice(newValue)}
                defaultValue={30}
                sx={{
                  width: 300,
                  color: "purple",
                  "& .MuiSlider-thumb": {
                    borderRadius: "50px",
                  },
                }}
              />
            </div>
            <div className="products">
              {books.map((item) => (
                <Card key={item.id} className="product-card">
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.thumbnail}
                  />
                  <CardContent>
                    <Typography
                      className="product-card-title title_card"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="title_price"
                    >
                      Price: {item.price}$
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      className="card-button"
                      onClick={() => addBookToBasket(item)}
                      variant="outlined"
                      size="small"
                    >
                      ADD TO CART
                    </Button>
                    <Button
                      // style={{ position: "absolute", bottom: 0 }}
                      variant="outlined"
                      size="small"
                      className="card-button"
                      onClick={() => addBookToFavorite(item)}
                    >
                      ADD TO FAVORITES
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
            <div
              className="pagination-block"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                color="primary"
                onChange={(_, newValue) => setCurrentPage(newValue)}
                count={pagesCount}
              />
            </div>
          </div>
          <div className="footer">
            <Link to="#">
              <i className="fa fa-apple" id="apple"></i>
            </Link>
            <Link to="#">
              <i className="fa fa-twitter" id="twitter"></i>
            </Link>
            <Link to="#">
              <i className="fa fa-github-square github" id="github"></i>
            </Link>
            <Link to="#">
              <i className="fa fa-facebook-square" id="facebook"></i>
            </Link>
          </div>
          <p className="footer-p">© 2022 All Rights Reserved </p>
        </Container>
      </div>
    </div>
  );
}

export default MainPage;
