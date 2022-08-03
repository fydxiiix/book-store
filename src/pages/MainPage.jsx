import React from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { ClientContext } from "../context/Provider";
import { Link } from "react-router-dom";

function MainPage() {

    const {
        getBooks, books,
        addBookToBasket
    } = React.useContext(ClientContext); 
    

  React.useEffect(() => {
    getBooks();
  }, []);
  return (

    <div className='main-page'>
<Container>
<h2>Catalogue</h2>
<div className='products'>
    {books.map((item) => (
         <Card key={item.id} className="product-card">
            
         <CardMedia
           component="img"
           height="140"
           image = {item.thumbnail}
         />
         <CardContent>
           <Typography 
           className="product-card-title"
           gutterBottom variant="h5" component="div">
             {item.title}
           </Typography>
           <Typography variant="body2" color="text.secondary">
            Price: 56
           </Typography>
         </CardContent>
         <CardActions>
           <Button onClick={() => addBookToBasket(item)}
           variant="outlined"
           size="small">ADD TO CART</Button>
           <Button 
           variant="outlined"
           size="small">ADD TO FAVORITES</Button>
         </CardActions>
       </Card>
    ))}
</div>
</Container>


    </div>
  );
}

export default MainPage;
