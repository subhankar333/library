import React, {useState, useEffect} from "react";
import axios from "axios";
import './GetBook.css'
import { useNavigate } from "react-router-dom";
import bg_img from "../Home/Images/library2.png"
import { Link } from "react-router-dom";

export default function GetBooks()
{
    var [books, setBooks] = useState([]);
    var [searchTerm,setSearchTerm] = useState('');
    var navigate = useNavigate();

    useEffect(()=>{
        axios.get("https://localhost:7068/api/Books")
        .then(function(res){
            console.log(res.data);
            setBooks(res.data)
        }).catch(function(err){
            console.log(err);
        })
    },[])


    function handleDelete(bookId) {
        const confimed = window.confirm("Are you sure you want to delete this book?")
        if (confimed) {
            axios.delete(`https://localhost:7068/api/Books?bookId=${bookId}`)
                .then(res => {
                    console.log(res.data);
                    alert("Book deleted successfully");
                    setBooks(books.filter(book => book.bookId !== bookId));
                })
                .catch(err => {
                    console.error('Error deleting book:', err);
                    alert("Error deleting the book");
                });
        }
    }

    const filteredBooks = books.filter(book =>
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return(
        <div className="get-book-page" id="book-container">
            <img src={bg_img} className="img-bg"/>
            <div className="search-bar">
                <input type="text" placeholder="Search by title, author" value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)} className="search-inp"
                />
            </div>
            {filteredBooks.map((book,index) => (
                <div key={index} className="member-card">
                <div className="ne-details">
                    <p>Title: <b>{book.title}</b></p>
                    <p>Author: <b>{book.author}</b></p>
                    <p>Genre: <b>{book.genre}</b></p>
                </div>
                <div className="me-details">
                    <p>ISBN: <b>{book.isbn}</b></p>
                    <p>Publication Year: <b>{book.publication_Year}</b></p>
                    <p>Total Copies: <b>{book.total_Copies}</b></p>
                </div>
                <div className="pb-details">
                    <p>Published by: <b>{book.publisher}</b></p>
                    <br/>
                </div>
                 <div className="btn-container">
                    <Link to={`/edit-book/${book.bookId}`} className="btn" id="edit-link">Edit</Link>
                    <div className="btn2" onClick={() => handleDelete(book.bookId)}>Delete</div>
                </div>
            </div>
            ))}
        </div>
    )
}