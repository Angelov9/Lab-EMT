import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Authors from "../Authors/authors";
import Countries from "../Countries/countries";
import Books from "../Books/BooksList/books";
import Header from "../Header/header";
import BookAdd from "../Books/BooksAdd/bookAdd";
import BookEdit from "../Books/BooksEdit/bookEdit";
import LibraryService from "../../repository/libraryRepository";
import Categories from "../Categories/categories";
import Register from "../User/Register/register";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: ["Novel", "Thriller", "History", "Fantasy", "Biography", "Classics", "Drama"],
            authors: [],
            selectedBook: {},
            books: [],
            countries: []
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container"}>
                        <Route path={"/register"} exact
                               render={() => <Register onRegister={this.register}/>}
                        />
                        <Route path={"/authors"} exact
                               render={() => <Authors authors={this.state.authors}/>}/>
                        <Route path={"/countries"} exact
                               render={() => <Countries countries={this.state.countries}/>}/>
                        <Route path={"/categories"} exact
                               render={() => <Categories categories={this.state.categories}/>}/>
                        <Route path={"/books/add"} exact
                               render={() => <BookAdd categories={this.state.categories}
                                                      authors={this.state.authors}
                                                      onAddBook={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} exact
                               render={() => <BookEdit authors={this.state.authors}
                                                       categories={this.state.categories}
                                                       onEditBook={this.editBook}
                                                       book={this.state.selectedBook}/>}/>

                        <Route path={"/books"} exact
                               render={() => <Books books={this.state.books}
                                                    onDelete={this.deleteBook}
                                                    onEdit={this.getBook}
                                                    rentBook={this.rentBook}
                                                    returnBook={this.returnBook}/>}/>
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }


    componentDidMount() {
        this.loadBooks();
        this.loadAuthors();
        this.loadCountries();
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    loadCountries = () => {
        LibraryService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            })

    }

    addBook = (name, category, author, availableCopies) => {
        LibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    editBook = (id, name, category, author, availableCopies) => {
        LibraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                });
            });
    }

    rentBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                let book = data.data;
                book.availableCopies -= 1;

                this.editBook(book.id, book.name, book.category, book.author.id, book.availableCopies);
            });
    }

    returnBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                let book = data.data;
                book.availableCopies += 1;

                this.editBook(book.id, book.name, book.category, book.author.id, book.availableCopies);
            });
    }
}

export default App;
