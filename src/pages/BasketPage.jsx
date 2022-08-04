import { Delete } from "@mui/icons-material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { ClientContext } from "../context/Provider";

function BasketPage() {
  const { basketBooks, getBooksFromBasket, deleteBook } =
    React.useContext(ClientContext);
  React.useEffect(() => {
    getBooksFromBasket();
  }, []);

  if (!basketBooks) {
    return (
      <div className="basket-page">
        <Container>
          <h2>Your shopping cart is empty</h2>
        </Container>
      </div>
    );
  }

  return (
    <div className="basket-page">
      <Container>
        <h2>SHOPPING CART</h2>
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
            {basketBooks.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <img width={60} src={item.thumbnail} alt="" />
                </TableCell>
                <TableCell>{item.price} $</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.subPrice} $</TableCell>
                <TableCell>
                  <Delete
                    className="basket-delete"
                    onClick={() => deleteBook(item.id)}
                  ></Delete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="">
              <TableCell
                className="total-tablecell"
                colSpan={4}
                style={{ fontSize: "16px", fontWeight: "600" }}
              >
                Total Amount:
              </TableCell>
              <TableCell
                className="total-tablecell"
                colSpan={1}
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "gray",
                }}
              >
                {basketBooks.totalPrice}$
              </TableCell>
              <TableCell className="total-tablecell" colSpan={5}>
                {" "}
                <Link to="/payment" className="total-link">
                  {" "}
                  Buy
                </Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
}

export default BasketPage;
