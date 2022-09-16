import React from 'react';
import {HomePage} from "./pages/HomePage";
import {BrowserRouter, Route} from "react-router-dom";
import {Container} from "@mui/material";
import {AppRouter} from "./router/AppRouter";

function App() {
  return (
      <BrowserRouter>
          {/*<Header/>*/}
          <Container maxWidth="lg" sx={{marginTop: 10}}>
              <AppRouter/>
          </Container>
      </BrowserRouter>
  );
}

export default App;
