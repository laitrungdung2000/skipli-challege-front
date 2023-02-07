import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from "../axiosInstance";


const LoginAccessCode = () => {
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [accessCode, setAccessCode] = useState('');
    let navigate = useNavigate();
    useEffect(() => {

    }, []);

    const phoneNumberHandler = (event) => {
        setPhoneNumber(event.target.value);
    }

    const sendPhoneNumber = (event) => {
        event.preventDefault();
        axios
        .post("/create-new-access-code", {phoneNumber})
        .then(res => {
            
        })
    };

    const accessCodeHandler = (event) => {
        setAccessCode(event.target.value);
    }

    const validateAccessCode = (event) => {
        event.preventDefault();

        axios
        .post("/validate-access-code", {phoneNumber, accessCode})
        .then(res => {
            console.log("res:", res);
            if (res.data.success) {
                console.log("succes login");
                localStorage.setItem("phoneNumber", phoneNumber);
                navigate("/github-user");
            }
        })
    }
    return (
        <>
            <Form onSubmit={sendPhoneNumber}>
                <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="tel" placeholder="Enter your phone number" onChange={phoneNumberHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
            <Form onSubmit={validateAccessCode}>
                <Form.Group className="mb-3" controlId="accessCode">
                <Form.Label>Access Code</Form.Label>
                <Form.Control type="number" placeholder="Access Code" onChange={accessCodeHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>   
        </>
    );
  };
  
  export default LoginAccessCode;