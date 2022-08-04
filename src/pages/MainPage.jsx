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

function MainPage() {
  const {
    getBooks,
    books,
    filterByPrice,
    addBookToBasket,
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
    <div className="main-page">
      <Container>
        <h2>Catalogue</h2>
        <div className="filter-block">
          <h5>Filter</h5>
          <Slider
            max={minMax[1]}
            min={minMax[0]}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(e, newValue) => setFilterByPrice(newValue)}
          />
        </div>
        <div className="products">
          {books.map((item) => (
            <Card key={item.id} className="product-card">
              <CardMedia component="img" height="240" image={item.thumbnail} />
              <CardContent>
                <Typography
                  className="product-card-title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
                >
                  ADD TO FAVORITES
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <div className="pagination-block">
          <Pagination
            onChange={(_, newValue) => setCurrentPage(newValue)}
            count={pagesCount}
            color="primary"
            // style={{ color: "red" }}
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
