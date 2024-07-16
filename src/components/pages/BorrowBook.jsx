import React, { useState } from "react";
import axios from "axios";
import "./css_pages/Borrow.css";

export const BorrowBook = () => { 
    const [title, setTitle] = useState('');
    const [results, setResults] = useState([]);
    const [userDetails] = useState({ superapp: "citylibrary", email: "super@mail.com" }); 

    const limit_description = (description) => {
        if (!description) {
            return "No description available";
        }
        const words = description.split(" ");
        let result = [];
        if (words.length > 7) {
            for (let i = 0; i < 7; i++) {
                result.push(words[i]);
            }
        } else { result = [...words]; }
        const final_result = result.join(" ") + "...";
        return final_result;
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8084/superapp/objects/search/byType/Book`, {
                params: {
                    title: title,
                    userSuperapp: userDetails.superapp,
                    userEmail: userDetails.email,
                    size: 20,
                    page: 0
                },
            });
            if (response.data) {
                const books = response.data.map((item) => ({
                    id: item.objectId.internalObjectId,
                    title: item.alias,
                    authors: item.objectDetails.authors,
                    categories: item.objectDetails.categories,
                    description: limit_description(item.objectDetails.description),
                    thumbnail: item.objectDetails.thumbnail,
                }));



                 // Filter the books based on the title
                const filteredBooks = books.filter(book =>
                    book.title.toLowerCase().includes(title.toLowerCase())
                );

                setResults(filteredBooks);

                // setResults(books);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error("Error fetching the books from library:", error);
            setResults([]);
        }
    };





    const handleBorrow = async (book) => {
        try {
            const response = await axios.post("http://localhost:8084/superapp/miniapp/patron_miniapp", {
                command: "borrowBook",
                commandAttributes: {
                    title: book.title
                },
                invokedBy: {
                    email: userDetails.email
                },
                targetObject: {
                    internalObjectId: book.id
                }
            });

            if (response.data) {
                console.log("Book borrowed successfully:", response.data);
            }
        } catch (error) {
            console.error("Error borrowing the book:", error);
        }
    };

    return (
        <div className="search-book-container">
            <h1>Enter the name of the book that you want to borrow</h1>
            <form className="search-form" onSubmit={handleSearch}>
                <div>
                    <label> Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <button type="submit">Search</button>
            </form>
            <div className="results-container">
                {results.length > 0 ? (
                    results.map((book) => (
                        <div key={book.id} className="book-item">
                            {book.thumbnail && <img src={book.thumbnail} alt={`${book.title} thumbnail`} />}
                            <h2>{book.title}</h2>
                            <p>{book.authors && book.authors.join(", ")}</p>
                            <p>{book.categories && book.categories.join(", ")}</p>
                            <p>{book.description}</p>
                            <button onClick={() => handleBorrow(book)}>Borrow this book</button>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};