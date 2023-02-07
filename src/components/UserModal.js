import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import './UserModal.css';
import axios from "../axiosInstance";
const UserModal = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [favoriteGithubUser, setFavoriteGithubUser] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() =>{
        setLoading(true);
        setPhoneNumber(localStorage.getItem('phoneNumber'));
        axios
        .get("/get-user-profile", {
            params: {phone_number:phoneNumber}}
        )
        .then(res => {
            if (res.data) {
                console.log(res.data);
                setFavoriteGithubUser(res.data.favorite_github_users);
                setLoading(false);
            }
        })
    }, [props.show]);

    const testLocalStorage = () => {
    
    }
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{phoneNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>List of favorite github user:</h4>
                {
                    loading ? 
                    <Spinner className="justify-content-md-center" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>:
                    favoriteGithubUser.map(user => {
                        return (
                            <Row key={user.id} className="mb-2">
                                <Col sm={2}>
                                    <Image className="image-profile" src={user.avatar_url} roundedCircle  fluid/>
                                </Col>
                                <Col sm={10} className="mt-2">
                                    {user.login}
                                </Col>
                            </Row>
                        );
                    })
                }
            </Modal.Body>
            {/* <Modal.Footer>
            <Button variant="secondary" onClick={testLocalStorage}>
                Close
            </Button>
            <Button variant="primary" onClick={props.close}>
                Save Changes
            </Button>
            </Modal.Footer> */}
      </Modal>
    );
}

export default UserModal;