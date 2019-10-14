import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import Components
import Navbar from "./components/navbar.component";
import BookList from "./components/bookList.component";
import CreateBook from "./components/createBook.component";
import EditBook from "./components/editBook.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={BookList}/>
        <Route path="/create" exact component={CreateBook}/>
        <Route path="/edit/:id" exact component={EditBook}/>
      </div>
    </Router>
  );
}

export default App;
