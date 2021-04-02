import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const CheckOut = () => {
    const [book, setBook] = useState({});
    const { bookId } = useParams();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // Load single book info
    useEffect(() => {
        fetch(`https://lit-ocean-04458.herokuapp.com/book/${bookId}`)
            .then(res => res.json())
            .then(data => setBook(data))
    }, [bookId])

    const addOrder = () => {
        const bookData = {
            user: loggedInUser.name,
            email: loggedInUser.email,
            name: book.name,
            writer: book.writer,
            image: book.imageURL,
            price: book.price,
            quantity: 1,
            orderDate: new Date()
        }


        // Order Books
        fetch(`https://lit-ocean-04458.herokuapp.com/addOrders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        })
            .then(res => res.json())
            .then(data => {
                data && alert('Order Successfully Added');
            })
    }

    return (
        <div>

            <h3 className="py-4">Check out</h3>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{book.name}</td>
                        <td>1</td>
                        <td>${book.price}</td>
                    </tr>
                    <tr>
                        <td className="text-center">Total</td>
                        <td>1</td>
                        <td className="text-center">${book.price}</td>
                    </tr>
                </tbody>
            </table>
            <button className="btn btn-success my-3 float-right mr-5" onClick={addOrder}>Check out</button>
        </div>
    );
};

export default CheckOut;