import React from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/AdminProvider";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function AdminPage() {
  const { getBooks, books, deleteBook } = React.useContext(AdminContext);
  React.useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="admin-page">
      <Container>
        <h2>Admin Page</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date of publication</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.authors}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>{item.publishedDate}</TableCell>
                <TableCell>{item.categories}</TableCell>
                <TableCell>
                  <img
                    width={100}
                    src={item.thumbnail}
                    alt=""
                  />
                </TableCell>
                <TableCell>
                  <Delete onClick={() => deleteBook(item.id)} />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${item.id}`}>
                    <Edit />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminPage;
