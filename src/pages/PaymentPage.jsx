import React from "react";
import {
  Button,
  Container,
  TableHead,
  TableRow,
  TableCell,
  Table,
} from "@mui/material";
import { ClientContext } from "../context/Provider";

function PaymentPage() {
  const { basketBooks, getBooksFromBasket } = React.useContext(ClientContext);
  React.useEffect(() => {
    getBooksFromBasket();
  }, []);

  return (
    <div className="payment-page">
      <Container>
        <h2>Payment proccess</h2>
        <Table
          className="payment-table"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <TableHead>
            <TableRow
              style={{
                border: "solid 1px rgb(206, 206, 206)",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <TableRow>
                <TableCell>Payment amount:</TableCell>
                <TableCell>{basketBooks.totalPrice} $</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name on card:</TableCell>
                <TableCell>
                  <input type="text" placeholder="Enter your name" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Card number:</TableCell>
                <TableCell>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Expiry date:</TableCell>
                <TableCell>
                  <input type="number" placeholder="MM/YY" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Security code:</TableCell>
                <TableCell>
                  <input type="number" placeholder="CVV" />
                </TableCell>
              </TableRow>
              <Button
                style={{
                  color: "rgb(24, 22, 31)",
                  fontWeight: "700",
                  fontSize: "15px",
                  border: "1px solid rgb(206, 206, 206)",
                  padding: "7px",
                  borderRadius: "20px",
                  display: "flex",
                  marginLeft: "260px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                Pay {basketBooks.totalPrice} $
              </Button>
            </TableRow>
          </TableHead>
        </Table>
      </Container>
    </div>
  );
}

export default PaymentPage;
