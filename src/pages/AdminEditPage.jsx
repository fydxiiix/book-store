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
  React.useEffect(() => {
    getBookToEdit(id);
  }, []);

  return (
    <div className="main-wrapper">
      <div className="admin-edit-page">
        <Container>
          <h2>Edit</h2>
          <div className="sub-wrapper">
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
                // className="sub-wrapper"
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
              <FormControl variant="outlined">
                <InputLabel>Categories</InputLabel>
                <Select
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  label="Categories"
                >
                  <MenuItem value="Law">Law</MenuItem>
                  <MenuItem value="Computers">Computers</MenuItem>
                  <MenuItem value="Automatic indexing">
                    Automatic indexing
                  </MenuItem>
                  <MenuItem value="Technology and Engineering">
                    Technology and Engineering
                  </MenuItem>
                  <MenuItem value="Psychology and medicine">
                    Psychology and medicine
                  </MenuItem>
                  <MenuItem value="Management">Management</MenuItem>
                  <MenuItem value="Literature">Literature</MenuItem>
                  <MenuItem value="Horror">Horror</MenuItem>
                  <MenuItem value="Detective">Detective</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="For kids">For kids</MenuItem>
                </Select>
              </FormControl>
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
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminEditPage;
