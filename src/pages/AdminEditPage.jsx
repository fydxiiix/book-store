import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminProvider";
import {
  Container,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";

const AdminEditPage = () => {
  const { getBookToEdit, bookToEdit, saveEditedBook } =
    React.useContext(AdminContext);
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [authors, setAuthors] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [publishedDate, setPublishedDate] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  const handleSubmit = () => {
    const editedBook = {
      title,
      authors,
      description,
      price,
      publishedDate,
      categories,
      thumbnail,
      id,
    };
    // for (let i in editedBook) {
    //   if (typeof editedBook[i] === "string")
    //     if (!editedBook[i].thim()) {
    //       alert("Please fill");
    //       return;
    //     }
    // }
    saveEditedBook(editedBook);
    navigate("/admin");
  };
  React.useEffect(() => {
    getBookToEdit(id);
  }, []);
  console.log(bookToEdit);
  React.useEffect(() => {
    if (bookToEdit) {
      console.log(bookToEdit);
      setTitle(bookToEdit.title);
      setAuthors(bookToEdit.authors);
      setDescription(bookToEdit.description);
      setPrice(bookToEdit.price);
      setPublishedDate(bookToEdit.publishedDate);
      setCategories(bookToEdit.categories);
      setThumbnail(bookToEdit.thumbnail);
    }
  }, [bookToEdit]);

  return (
    <div className="admin-edit-page">
      <Container>
        <h2>Edit</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            variant="standard"
          />
          <TextField
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            label="Authors"
            variant="standard"
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            variant="standard"
          />
          <TextField
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            label="PublishedDate"
            variant="standard"
          />
          <TextField
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            label="Categories"
            variant="standard"
          />
          <TextField
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            label="Photo"
            variant="standard"
          />
          <Button variant="outlined" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default AdminEditPage;
