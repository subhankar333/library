import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Routes, Route} from "react-router-dom"
import HomeComponent from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AddBook from './components/AddBook/AddBook';
import GetBooks from './components/GetBook/GetBook';
import EditBook from './components/EditBook/EditBook';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>

         <Route path='/*'>
             <Route index element={<HomeComponent />} />
             <Route path='register' element={<Register />} />
             <Route path='login' element={<Login />} />
         </Route>

         <Route path='user/*' element={<PrivateRoute/>}>
             <Route path='add-book' element={<AddBook />} />
             <Route path='get-books' element={<GetBooks />} />
             <Route path='edit-book/:bookId' element={<EditBook />} />
             <Route path='profile' element={<Profile />} />
         </Route>
         
    </Routes>
 </BrowserRouter>
  );
}

export default App;
