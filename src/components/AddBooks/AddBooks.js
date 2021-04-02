import axios from 'axios';
import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";


const AddBooks = () => {
    const [imageURL, setImageURL] = useState(null);
    const { register, handleSubmit, watch, errors } = useForm();


    // Add books to database
    const onSubmit = data => {
        const bookData = {
            name: data.name,
            writer: data.writer,
            price: data.price,
            imageURL: imageURL
        }

        const url = `https://lit-ocean-04458.herokuapp.com/addBooks`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        })
            .then(res => res.json())
            .then(data => {
                data && alert('Successfully Added')
            })
    };


    // Upload image to a cloud server
    const handleImageUpload = event => {
        const imageData = new FormData()
        imageData.set('key', '2efcd53a5159276b859fd5363a0301ec')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
                console.log(response.data.data.display_url)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="py-5">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Name: </Form.Label>
                        <br />
                        <input name="name" defaultValue="Book Name" ref={register} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Writer: </Form.Label>
                        <br />
                        <input name="writer" defaultValue="Writer" ref={register} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Price ($): </Form.Label>
                        <br />
                        <input name="price" defaultValue="0.00" ref={register} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Upload image: </Form.Label>
                        <br />
                        <input name="image" type="file" onChange={handleImageUpload} />
                    </Form.Group>
                </Form.Row>

                <input className="btn btn-primary btn-lg btn-block" variant="primary" type="submit" />
            </Form>

        </div>
    );
};

export default AddBooks;