import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


// Material-UI
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const OrderedBooks = () => {
    const [findOrderedBooks, setFindOrderedBooks] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const classes = useStyles();


    // Find books by user email
    useEffect(() => {
        fetch('https://lit-ocean-04458.herokuapp.com/orderedBooks?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setFindOrderedBooks(data))
            .catch(err => console.log(err));
    }, [loggedInUser.email])
    return (
        <div className="pt-5">
            {
                findOrderedBooks.map(book =>
                    <div key={book._id} className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src={book.image} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1">
                                                {book.name}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {book.writer}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Quantity: {book.quantity}
                                                <br />
                                                order Date:
                                                <br />
                                                {book.orderDate}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                                Remove
                                    </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">${book.price}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                )}
        </div>
    );
};

export default OrderedBooks;