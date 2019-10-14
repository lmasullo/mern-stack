import React , { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

//Functional component
const Book = props => (
    <tr>
        <td>{props.books.author}</td>
        <td>{props.books.title}</td>
        <td>{props.books.description}</td>
        <td>{props.books.image}</td>
        <td>{props.books.link}</td>
        <td>
            <Link to={"/edit/"+props.books._id}>Edit</Link> | 
            <a href="#" onClick={() => {props.deleteBook(props.books._id)}}>Delete</a>
        </td>
    </tr>
)

//Class Component
export default class BookList extends Component {
    constructor(props){
        super(props);
        this.deleteBook  = this.deleteBook.bind(this);
        this.state = {books: []};
    }

    componentDidMount(){
        axios.get('http://localhost:4000/books/')
        .then(response => {
            console.log(response.data);
            
            this.setState({
                books: response.data
            })
        })
        .catch(err =>{
            console.log(err);        
        })
    }

    //Function to delete a book
    deleteBook(id){
        axios.delete('http://localhost:4000/books/'+id)
        .then(res => {
            console.log(res.data);
            //Delete the book from view by filtering out the deleted book
            this.setState({
                books: this.state.books.filter(el => el._id !==id)
            })
        })
        .catch(err =>{
            console.log(err);           
        })
    }

    //Method to display each element in the table
    bookList(){
        // Loop over the books array
        return this.state.books.map(currentBook => {
            //Return the Book component, pass some props to the Book Component
            //The Book component is above in this file as a functional component
            return <Book books={currentBook} deleteBook={this.deleteBook} key={currentBook._id}/>;
    });
};


    render(){
        return(
            <div>
                <h1>Books</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Call the bookList method to display each element */}
                        {this.bookList()}
                    </tbody>
                </table>
            </div>
        )
    }
}