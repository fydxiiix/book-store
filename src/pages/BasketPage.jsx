import { Delete } from "@mui/icons-material";
import {
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
    <div className="main-wrapper">
      <div className="basket-page">
        <Container>
          <h2>SHOPPING CART</h2>
          <div className="sub-wrapper">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="cell">Item Name:</TableCell>
                  {/* <TableCell className="cell">Picture:</TableCell> */}
                  <TableCell className="cell">Price:</TableCell>
                  <TableCell className="cell">Count:</TableCell>
                  <TableCell className="cell">Amount:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basketBooks.products.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="cell">{item.title}</TableCell>
                    {/* <TableCell className="cell">
                      <img width={60} src={item.thumbnail} alt="" />
                    </TableCell> */}
                    <TableCell className="cell">{item.price} $</TableCell>
                    <TableCell className="cell">{item.count}</TableCell>
                    <TableCell className="cell">{item.subPrice} $</TableCell>
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
                  <TableCell className="total-tablecell" colSpan={3}>
                    {" "}
                    <Link to="/payment" className="total-link">
                      {" "}
                      Buy
                    </Link>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default BasketPage;
