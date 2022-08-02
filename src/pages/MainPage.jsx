import React from 'react'
import {Container, Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography} from "@mui/material"
import { ClientContext } from "../context/Provider"

function MainPage() {
    const {
        getBooks, books
    } = React.useContext(ClientContext); 
    

    React.useEffect(() => {
        getBooks()
    }, []);
  return (
    <div className='main-page'>
<Container>
<h2>Books</h2>
<div className='products'>
    {books.map((item) => (
         <Card key={item.id} className="product-card">
            
         <CardMedia
           component="img"
           height="140"
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
             Lizard
           </Typography>
           <Typography variant="body2" color="text.secondary">
             Lizards are a widespread group of squamate reptiles, with over 6,000
             species, ranging across all continents except Antarctica
           </Typography>
         </CardContent>
         <CardActions>
           <Button size="small">Share</Button>
           <Button size="small">Learn More</Button>
         </CardActions>
       </Card>
    ))}
</div>
</Container>

    </div>
  )
}

export default MainPage