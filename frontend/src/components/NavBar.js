import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import styles from '../styles/NavBar.module.css';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { 
  useCurrentUser,
  useSetCurrentUser,
  } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar.js";
import axios from "axios";
import { removeTokenTimestamp } from "../utils/utils.js";
import { useMediaQuery } from 'react-responsive';

const NavBar = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  // Function to handle user sign-out
  const handleSignOut = async () => {
 
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
  
      // Redirect to the login page after successful logout
      history.push('/login');
    } catch (err) { }
};

  // JSX for icons when the user is logged in
  const loggedInIcons = (
    <>
      <Link to="/" className={styles.picagramLogo}>
      <Navbar.Brand className={styles.picagramLogo}>
      <i className="fa-solid fa-camera-retro" />Picagram
      </Navbar.Brand>
      </Link>

      <NavLink
      exact className={styles.NavLink}
      activeClassName={styles.Active}
      to="/"
      >
      <i className="fa-solid fa-house" />Home
      </NavLink>

      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/feed"
      >
      <i className="fas fa-stream" />Feed
      </NavLink>
      
      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/bookmarked"
      >
      <i className="fa-solid fa-bookmark" />Saved Posts
      </NavLink>

      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
      >
      <i className="fas fa-plus-square" />Add Post
      </NavLink>

      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/notifications"
      >
      <i className="fa-regular fa-envelope" />Notifications
      </NavLink>

      <NavLink
      className={styles.NavLink}
      to="/"
      onClick={handleSignOut}>
      <i className="fas fa-sign-out-alt" />Sign Out
      </NavLink>

      <NavLink
      className={`${styles.NavLink} ${styles.NavLinkProfile}`}
      to={`/profiles/${currentUser?.profile_id}`}
      >
      <Avatar src={currentUser?.profile_image} text="Profile" height={30} />
      </NavLink>

    </>
    );
  
  // JSX for icons when the user is logged out
  const loggedOutIcons = (
    <>
      <Link to="/" className={styles.picagramLogo}>
      <Navbar.Brand className={styles.picagramLogo}>
      <i className="fa-solid fa-camera-retro" />Picagram
      </Navbar.Brand>
      </Link>

      <NavLink
      exact className={styles.NavLink}
      activeClassName={styles.Active}
      to="/"
      >
      <i className="fa-solid fa-house" />Home
      </NavLink>

      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/login"
      >
      <i className="fa-solid fa-arrow-right-to-bracket" />Log In
      </NavLink>

      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/signup"
      >
      <i className="fa-solid fa-signature" />Sign Up
      </NavLink>
    </>
    );

  // JSX for mobile view when the user is logged in
  const loggedInIconsMobile = (
    <>
      <NavLink
      exact className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/"
      >
      <i className="fa-solid fa-house" />
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/feed"
      >
      <i className="fas fa-stream" />
      </NavLink>
      
      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/bookmarked"
      >
      <i className="fa-solid fa-bookmark" />
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/posts/create"
      >
      <i className="fas fa-plus-square" />
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/notifications"
      >
      <i className="fa-regular fa-envelope" />
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      to="/"
      onClick={handleSignOut}>
      <i className="fas fa-sign-out-alt" />
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      to={`/profiles/${currentUser?.profile_id}`}
      >
      <Avatar src={currentUser?.profile_image} height={25} />
      </NavLink>

    </>
    );

  // JSX for mobile view when the user is logged out
  const loggedOutIconsMobile = (
    <>
      <NavLink
      exact className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/"
      >
      <i className="fa-solid fa-house" />
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/login"
      >
      <i className="fa-solid fa-arrow-right-to-bracket" />
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/signup"
      >
      <i className="fa-solid fa-signature" />
      </NavLink>
    </>
    );

    // Determine which set of icons to use based on the user's authentication status
    const desktopIcons = currentUser ? loggedInIcons : loggedOutIcons;
    const mobileIcons = currentUser ? loggedInIconsMobile : loggedOutIconsMobile;
  
    return (
      <>
        <Navbar
          expand="xl"
          className={`${styles.darkNavbar} sticky-top`}
        >
          <Container className={styles.Container}>
            {isMobile ? (
              // Render icons in a single row for small screens
              <Nav className={`${styles.mobileIconsRow}`}>
                {mobileIcons}
              </Nav>
            ) : (
              // Render icons in a column for larger screens
              <Nav className="flex-column">
                {desktopIcons}
              </Nav>
            )}
          </Container>
        </Navbar>
      </>
    );
  };

export default NavBar