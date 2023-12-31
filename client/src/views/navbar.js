import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './views.module.scss'
import classNames from "classnames/bind"
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../contexts/contants";

const cx = classNames.bind(styles)

function Navbarr() {
  const [user, setUser] = useState('')
    const history = useHistory()
    const handleLogout = () => {
        // Xóa token khỏi local storage
        localStorage.removeItem('learnit-mern');
        history.push('/')
    
        // Thực hiện các hành động khác sau khi đăng xuất (nếu cần)
      };
    const getUser = async() =>{
      
      const token = localStorage.getItem('learnit-mern')
      try{
        const res = await axios.get(`${apiUrl}/getUser`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setUser(res.data.name)
      }catch(error){
        console.log('error');
      }
    }
    
    useEffect(()=>{
      getUser()
    },[])

    return ( 
        
        <Navbar collapseOnSelect expand="lg" className="navbar-dark bg-dark">
      <Container>
        <Navbar.Brand href="#home">TodoList</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"></Nav.Link>
            <Nav.Link href="#pricing"></Nav.Link>
            
          </Nav>
          <Nav className={cx('search')}>
             <input
                className={cx('inputs')}
                type="text"
                placeholder="Tìm kiếm..."
            />
          
           </Nav>
     
          
         
          <Nav >
          
            <NavDropdown title={user} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="">Action</NavDropdown.Item>
              <NavDropdown.Item href="">Another action</NavDropdown.Item>
              <NavDropdown.Item href="">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     );
}

export default Navbarr;