import React from 'react'
import {Container} from "@mui/material"
import { ClientContext } from "../context/Provider"

function MainPage() {
    const {
        getBooks
    } = React.useContext(ClientContext); 

    React.useEffect(() => {
        getBooks()
    }, []);
  return (
    <div className='main-page'>
<Container>
<h2>Books</h2>
<div className='products'></div>
</Container>

    </div>
  )
}

export default MainPage