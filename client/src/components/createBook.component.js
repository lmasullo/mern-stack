import React , { Component } from "react";
import axios from 'axios';


export default class CreateBook extends Component {

    constructor(props){
        //Need super if a sub class, this is not in app.js
        super(props);

        //Need to bind this to the class
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            author: [],
            title:'',
            description:'',
            link:'',
            image:'',
            //books:[],
        }
    }

    // componentDidMount(){
    //     //This is a test book, will pull from mongo
    //     //1:12 mins shows how to loop over array and fill select
    //     this.setState({
    //         books: ['test book'],
    //         title: 'test title',
    //     })
    // }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e){
        //Prevent default submission
        e.preventDefault();
        
        //Create book object to save
        const book = {
            title: this.state.title,
            description: this.state.description
        }

        console.log(book);

        //Send to back-end, look at routes/books.js
        //todo need to change to production and local db
        axios.post('http://localhost:4000/books/add', book)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //window.location = '/';

        //Clear the fields
        this.setState({
            title: "",
            description: "",
        })
        
    }
    
    render(){
        return(
            <div>
                <h1>Create New Book</h1>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Book Title</label>
                        <input type="text" className="form-control" value={this.state.title} onChange={this.onChangeTitle}></input>
                        <label>Book Description</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription}></input>
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}