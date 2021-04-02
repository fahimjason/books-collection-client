import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import firebase from "firebase/app";
import "firebase/auth";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import './Login.css'

//Firebase
import { handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, siginUserWithEmailAndPassword } from './loginManager';



const Login = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
    });

    initializeLoginFrameWork();

    // Private Route 
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res)
                setLoggedInUser(res);
                storeAuthToken();
                history.replace(from);
            })
    }


    // data validation
    const handelCheck = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }

        if (e.target.name === 'password') {
            const isValidPassword = e.target.value.length > 6;
            const passwordNumberCheck = /\d{1}/.test(e.target.value);
            isFieldValid = isValidPassword && passwordNumberCheck;
        }

        if (isFieldValid) {
            const userInfo = { ...user };
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo);
        }
    }


    // React hook form
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data, e) => {
        if (user.email && user.password) {
            siginUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })
        }

        e.preventDefault();
    };


    // Authorization
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                // Handle error
            });
    }

    return (
        <div>
            <Container>
                <h3 className="text-center py-4"> Login </h3>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Row className="my-3">
                        <Col md={6}><Button className="btn btn-danger btn-lg btn-block my-2" onClick={googleSignIn}>Login with Google</Button></Col>
                        <Col md={6}><Button className="btn btn-info btn-lg btn-block my-2"><Link to="/signup" style={{ textDecoration: 'none', color: '#fff' }}>Create an Account</Link></Button></Col>
                    </Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Email <span id="email">*</span></Form.Label>
                            <input type="email" className="form-control" name="email" ref={register({ required: true })} onBlur={handelCheck} />
                            {errors.email && <span className="text-danger">Email is required</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Password <span id="password">*</span></Form.Label>
                            <input type="password" className="form-control" id="password" name="password" ref={register({ required: true })} onBlur={handelCheck} />
                            {errors.password && <span className="text-danger">Password is required</span>}
                        </Form.Group>
                    </Form.Row>

                    <input className="btn btn-primary btn-lg btn-block" variant="primary" type="submit" />
                </Form>

            </Container>
        </div>

    );
};

export default Login;