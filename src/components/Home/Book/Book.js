import React from 'react';
import { useHistory } from 'react-router';

const Book = ({ data }) => {
    const history = useHistory();

    // Handle single book ID
    const bookInfo = (bookId) => {
        history.push(`bookInfo/${bookId}`);
    }

    return (
        <div className="col-md-4">
            <div className="">
                <div ClassName='card bg-light'>
                    <img className="img-fluid p-5" src={data.imageURL} alt="" />
                    <div className="card-body text-center">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text d-flex justify-content-around"><span className="px-3">Writer: {data.writer}</span> <span className="px-3">Price: ${data.price}</span></p>
                        <button className="btn btn-primary" onClick={() => bookInfo(data._id)}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;