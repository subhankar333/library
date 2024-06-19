import React,{useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './EditBook.css';
import bg_img from '../Home/Images/library2.png';
import axios from "axios";


export default function EditBook(){
    var [title, setTitle] = useState("");
    var [author, setAuthor] = useState("");
    var [isbn, setIsbn] = useState("");
    var [genre, setGenre] = useState("");
    var [publicationYear, setPublicationYear] = useState();
    var [publisher, setPublisher] = useState("");
    var [totalCopies, setTotalCopies] = useState();

    const [titleError, setTitleError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [isbnError, setIsbnError] = useState("");
    const [genreError, setGenreError] = useState("");
    const [publicationYearError, setPublicationYearError] = useState("");
    const [publisherError, setPublisherError] = useState("");
    const [totalCopiesError, setTotalCopiesError] = useState("");

    const validateForm = () => {
        let isValid = true;
    
        if (!title) {
          setTitleError("Title is required");
          isValid = false;
        } else {
          setTitleError("");
        }
    
        if (!author) {
          setAuthorError("Author is required");
          isValid = false;
        } else {
          setAuthorError("");
        }

        if (!isbn) {
            setIsbnError("ISBN is required");
            isValid = false;
          }else{
            setIsbnError("");
          }
      
          if (!genre) {
             setGenreError("Genre is required");
            isValid = false;
          }else{
            setGenreError("");
          }
      
          if (!publicationYear) {
            setPublicationYearError("Publication Year is required");
            isValid = false;
          }else{
            setPublicationYearError("");
          }
      
          if (!publisher) {
            setPublisherError("Publisher is required");
            isValid = false;
          }else{
            setPublisherError("");
          }
      
          if (!totalCopies) {
            setTotalCopiesError("Total Copies is required");
            isValid = false;
          }else{
            setTotalCopiesError("");
          }
      
    
        return isValid;
      };

    

    const {bookId} = useParams()
    var navigate = useNavigate();

    var book = {};

    useEffect(()=>{
        axios.get(`https://localhost:7068/api/Books/bookId?bookId=${bookId}`)
        .then(function(res){
            console.log(res.data);
            
            setTitle(res.data.title)
            setAuthor(res.data.author)
            setGenre(res.data.genre)
            setIsbn(res.data.isbn)
            setPublicationYear(res.data.publication_Year)
            setPublisher(res.data.publisher)
            setTotalCopies(res.data.total_Copies)
        }).catch(function(err){
            console.log(err);
        })
    },[bookId])


    function edit(e)
    {
        e.preventDefault();

        const isValid = validateForm();

        if(isValid)
        {
            book.bookId = bookId;
            book.title = title;
            book.author = author;
            book.isbn = isbn;
            book.genre = genre;
            book.publication_Year = publicationYear;
            book.publisher = publisher;
            book.total_Copies = totalCopies;

            var RequestOption = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(book)
            }
        
            fetch("https://localhost:7068/api/Books", RequestOption)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                alert("Book details updated successfully")
                navigate('/get-books')
            })
            .catch(err => {
                console.log(err)
                alert("Error updating the book")
            })
 
        }
}
   

    return(
        <div className="edit-book-page">
            <img src={bg_img} className="img-bg"/> 
            <div className="form-container">
                <h2>Edit Book</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    {titleError && <p className="error">{titleError}</p>}
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="author" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    {authorError && <p className="error">{authorError}</p>}
                    <div className="form-group">
                        <label htmlFor="isbn">ISBN</label>
                        <input type="text" id="isbn" name="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                    </div>
                    {isbnError && <p className="error">{isbnError}</p>}
                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <input type="text" id="genre" name="genre" value={genre}  onChange={(e) => setGenre(e.target.value)} />
                    </div>
                    {genreError && <p className="error">{genreError}</p>}
                    <div className="form-group">
                        <label htmlFor="pub-year">Publication Year</label>
                        <input type="num" id="pub-year" name="pub-year" value={publicationYear}  onChange={(e) => setPublicationYear(e.target.value)} />
                    </div>
                    {publicationYearError && <p className="error">{publicationYearError}</p>}
                    <div className="form-group">
                        <label htmlFor="publisher">Publisher</label>
                        <input type="text" id="publisher" name="publisher" value={publisher}  onChange={(e) => setPublisher(e.target.value)} />
                    </div>
                    {publisherError && <p className="error">{publisherError}</p>}
                    <div className="form-group">
                        <label htmlFor="total-copies">Total Copies</label>
                        <input type="num" id="total-copies" name="total-copies"  value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} />
                    </div>
                    <button type="submit" onClick={edit}>Update</button>
                </form>
            </div>
        </div>
    )
}