import React from "react";
import { Button, Container, TableHead, TableRow } from "@mui/material";
import { Provider } from "../context/Provider";

function PaymentPage() {
  return (
    <div className="payment-page">
      <Container>
        <h2>Payment proccess</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment amount:</TableCell>
              <TableCell>Name on card:</TableCell>
              <TableCell>Card number:</TableCell>
              <TableCell>Expiry date:</TableCell>
              <TableCell>Security code:</TableCell>
              <Button>Pay {}</Button>
            </TableRow>
          </TableHead>
        </Table>
      </Container>
    </div>
  );
}

export default PaymentPage;
