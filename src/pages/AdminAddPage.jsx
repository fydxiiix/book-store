import React from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { AdminContext } from "../context/AdminProvider";

function AdminAddPage() {
  const { sendNewBook } = React.useContext(AdminContext);

  const [title, setTitle] = React.useState("");
  const [authors, setAuthors] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [publishedDate, setPublishedDate] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");

  const handleSubmit = () => {
    const newBook = {
      title: title.trim(),
      authors: authors.trim(),
      description: description.trim(),
      price,
      publishedDate: publishedDate.trim(),
      categories: categories.trim(),
      thumbnail: thumbnail.trim(),
    };
    for (let i in newBook) {
      if (!newBook[i]) {
        alert("Fill all fields");
        return;
      }
    }
    sendNewBook(newBook);
    setTitle("");
    setAuthors("");
    setDescription("");
    setPrice("");
    setPublishedDate("");
    setCategories("");
    setThumbnail("");
  };

  return (
    <div className="main-wrapper">
      <div className="admin-add-page">
        <Container>
          <h2>Add new book</h2>
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
                variant="outlined"
              />
              <TextField
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                label="Authors name"
                variant="outlined"
              />
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
                variant="outlined"
              />
              <TextField
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                label="Price"
                variant="outlined"
                type="number"
              />
              <TextField
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                variant="outlined"
                type="date"
              />
              <FormControl style={{ marginTop: "20px" }} variant="outlined">
                <InputLabel>Categories</InputLabel>
                <Select
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  label="Categories"
                >
                  <MenuItem value="Law">Law</MenuItem>
                  <MenuItem value="Computers">Computers</MenuItem>
                  <MenuItem value="Autobiography">Automatic indexing</MenuItem>
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
                label="Thumbnail"
                variant="outlined"
              />
              <Button
                variant="filled"
                type="submit"
                style={{
                  backgroundColor: "purple",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "white",
                }}
              >
                Add
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AdminAddPage;
