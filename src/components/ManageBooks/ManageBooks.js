import React, { useEffect, useState } from 'react';


// Load book data 
const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch('https://lit-ocean-04458.herokuapp.com/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            })
    }, [books])


    // Delete book from database
    const deleteBook = (id) => {
        fetch(`https://lit-ocean-04458.herokuapp.com/deleteBooks/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                data && alert('Successfully deleted')
            })
    }
    return (
        <div className="container py-5">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Book Name</th>
                        <th scope="col">Author Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => <tr key={book._id}>
                            <td>{book.name}</td>
                            <td>{book.writer}</td>
                            <td>${book.price}</td>
                            <td> <button className="btn btn-danger rounded" onClick={() => deleteBook(book._id)}>Delete</button></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageBooks;