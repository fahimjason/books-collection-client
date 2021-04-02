import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Book from './Book/Book';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


// Material-UI
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));


const Home = () => {
    const [books, setBooks] = useState([]);
    const classes = useStyles();

    // Load book data
    useEffect(() => {
        fetch('https://lit-ocean-04458.herokuapp.com/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            })
    }, [])
    return (
        <div>
            {
                books.length === 0 &&
                <div className={classes.root}>
                    <CircularProgress />
                </div>
            }
            <Container>
                <Row>
                    {books.map(book => <Book key={book._id} data={book}></Book>)}
                </Row>
            </Container>
        </div>
    );
};

export default Home;