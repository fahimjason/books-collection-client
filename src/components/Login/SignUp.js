import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import './Login.css'

//Firebase
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFrameWork, siginUserWithEmailAndPassword } from './loginManager';

const SignUp = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
    });

    initializeLoginFrameWork();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res)
                setLoggedInUser(res);
                history.replace(from);
            })
    }

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
        else {

        }
        if (isFieldValid) {
            const userInfo = { ...user };
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo);
        }
    }


    const submitForm = (e) => {

        if (user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then((res) => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })
        }

        e.preventDefault();
    }


    const { register, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    // Check password matching
    const checkPassword = () => {
        if (document.getElementById('password').value ===
            document.getElementById('confirmPassword').value) {
            document.getElementById('submit').disabled = false;
            document.getElementById('matchPassword').innerText = '';
            document.getElementById('passwordType').innerText = '';
        } else {
            document.getElementById('submit').disabled = true;
            document.getElementById('matchPassword').innerText = '(Not matched)';
            document.getElementById('matchPassword').style.color = 'red';
            document.getElementById('passwordType').innerText = '(Minimum 7, [a-z and 0-9])';
            document.getElementById('passwordType').style.color = 'red';
        }
    }

    console.log(watch("example"));
    return (
        <div>
            <Container>
                <h3 className="text-center py-4">Create an account</h3>
                <Form onSubmit={submitForm}>

                    <Row className="my-3">
                        <Col md={6}><Button className="btn btn-danger btn-lg btn-block my-2" onClick={googleSignIn}>Sign up with Google</Button></Col>
                        <Col md={6}><Button className="btn btn-success btn-lg btn-block my-2"><Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>Already have an account?</Link></Button></Col>
                    </Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Name</Form.Label>
                            <input type="text" className="form-control" name="name" ref={register({ required: true })} />
                            {errors.name && <span className="text-danger">Name is required</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Email</Form.Label>
                            <input type="email" className="form-control" name="email" ref={register({ required: true })} onBlur={handelCheck} />
                            {errors.email && <span className="text-danger">Email is required</span>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Password * <span id="passwordType"></span></Form.Label>
                            <input type="password" className="form-control" id="password" name="password" ref={register({ required: true })} onChange={checkPassword} onBlur={handelCheck} />
                            {errors.password && <span className="text-danger">Password is required</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Confirm Password * <span id="matchPassword"></span></Form.Label>
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" ref={register({ required: true })} onChange={checkPassword} />
                            {errors.confirmPassword && <span className="text-danger">Confirm Password is required</span>}
                        </Form.Group>
                    </Form.Row>

                    <input className="btn btn-primary btn-lg btn-block" id="submit" variant="primary" type="submit" disabled />
                </Form>
            </Container>
        </div>

    );
};

export default SignUp;