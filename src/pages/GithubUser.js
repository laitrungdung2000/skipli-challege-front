import React, {useState, useMemo} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';

import axios from "../axiosInstance";
import Pagination from 'react-bootstrap/Pagination';
import './GithubUser.css';
import UserModal from '../components/UserModal';

const GithubUser = () => {
    const [githubUser, setGithubUser] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [favoriteGithubUser, setFavoriteGithubUser] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);


    const searchChangeHandler = (event) => {
        setSearch(event.target.value);
    }

    const currentTableData = useMemo(() => {
        console.log("AAAAA")
    }, [currentPage]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const findGithubUser = async(event) => {
        event.preventDefault();
        // setCurrentPage(1);
        axios.get(
            "/search-github-users",
            {
                params: {
                    q: search,
                    page,
                    per_page: 20
                }
            })
            .then(res => {
                console.log("res:", res);
                if (res.data) {
                    const items = res.data.items;
                    const totalCount = res.data.total_count;
                    setTotalPage(totalCount> 0 ? Math.ceil(totalCount/20): 0);
                    setPhoneNumber(localStorage.getItem('phoneNumber'));
                    axios
                        .get("/get-user-profile", {
                            params: {phone_number:phoneNumber}}
                        )
                        .then(res => {
                            if (res.data) {
                                setFavoriteGithubUser(res.data.favorite_github_users);
                                console.log("favoriteGithubUser: -------->", favoriteGithubUser);
                                setGithubUser(items.map(item=> {
                                    if (favoriteGithubUser.some(user => user.id == item.id)) {
                                        return {
                                            ...item,
                                            like: true
                                        }
                                    } else {
                                        return {
                                            ...item,
                                            like: false
                                        }
                                    }
                                }));
                                console.log("githubUser:",githubUser);
                                setLoading(false);
                            }
                        })
                    // setGithubUser(items);
                }
            })
    }

    const changePageGithubUser = (page) => {
        setPage(page);
        axios.get(    
            "/search-github-users",
            {
                params: {
                    q: search,
                    page,
                    per_page: 20
                }
            })
            .then(res => {
                console.log("res:", res);
                if (res.data) {
                    const items = res.data.items;
                    setGithubUser(items);
                }
            })
    }

    const likeGithubUser = (github_user_id) => {
        axios.post('/like-github-user', {phone_number: phoneNumber, github_user_id})
            .then(res => {
                if (res.data) {
                    setFavoriteGithubUser(prev => [...prev, {id: github_user_id}]);
                    setGithubUser(items => items.map(item=> {
                        if (favoriteGithubUser.some(user => user.id == item.id)) {
                            return {
                                ...item,
                                like: true
                            }
                        } else {
                            return {
                                ...item,
                                like: false
                            }
                        }
                    }));
                }
            })
    }

  return (
    <>
    <Container className="mt-5">
        <div className='w-100 text-right mb-2'>
            <FontAwesomeIcon className='user' icon={faCircleUser}onClick={handleShow} size="3x"/>
        </div>
        <Stack direction="horizontal" gap={3}>
            <Form.Control className="me-auto" placeholder="Find github user" onChange={searchChangeHandler}/>
            <Button variant="secondary" onClick={findGithubUser}>Search</Button>
        </Stack>
    </Container>
      <Table className='mt-3' striped bordered hover responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>login</th>
            <th>avatar_url (profile pic)</th>
            <th>html_url</th>
            <th>public_repos</th>
            <th>followers</th>
          </tr>
        </thead>
        <tbody>
            {
                githubUser.map(user => {
                    return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.login}</td>
                            <td>{user.avatar_url}</td>
                            <td>{user.html_url}</td>
                            <td>{user.repos_url}</td>
                            <td>{user.followers_url}</td>
                            <td><FontAwesomeIcon className='user' style={{color: user.like ? 'red': 'none'}}  
                            icon={faHeart} onClick={() => likeGithubUser(user.id)}/></td>
                        </tr>
                    );
                })
            }
        </tbody>
      </Table>
      <UserModal show={showModal} close={handleClose}/>
      {/* <Pagination style={{textAlign: "center"}}>
        <Pagination.Prev onClick={() => changePageGithubUser(page-1)}/>
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item active>{11}</Pagination.Item>
        <Pagination.Item>{12}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next onClick={() => changePageGithubUser(page+1)}/>
      </Pagination> */}
    </>);
};

export default GithubUser;