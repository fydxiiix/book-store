import { Delete } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { ClientContext } from "../context/Provider";

function FavoritePage() {
  const { favoriteBooks, getBooksFromFavorite } =
    React.useContext(ClientContext);
  React.useEffect(() => {
    getBooksFromFavorite();
  }, []);

  if (!favoriteBooks) {
    return (
      <div className="favorite-page">
        <Container>
          <h2>Your favorite books cart is empty</h2>
        </Container>
      </div>
    );
  }

  return (
    <div className="favorite-page">
      <Container>
        <h2>My favorite books</h2>
        <div className="sub-wrapper">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name:</TableCell>
                <TableCell>Picture:</TableCell>
                <TableCell>Price:</TableCell>
                <TableCell>Count:</TableCell>
                <TableCell>Amount:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favoriteBooks.products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <img width={60} src={item.thumbnail} alt="" />
                  </TableCell>
                  <TableCell>{item.price} $</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>{item.subPrice} $</TableCell>
                  <TableCell>
                    {/* <Delete
                    className="favorite-delete"
                    onClick={() => deleteBook(item.id)}
                  ></Delete> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
export default FavoritePage;
