/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import {signout, isAuthenticated} from '../auth';
import styled from "styled-components";




const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }
  handleToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
  render() {
    const { isExpanded } = this.state;
    const {history} = this.props;
    return (
      <Navigation>
        <div className="logo">
          <Link to="/">
            <em>
              <div className="letterhead">
                <span className="name">Glibli </span>
                <span className="gray">Community</span>
              </div>
            </em>
          </Link>
        </div>
          <nav className="nav">
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={e => this.handleToggle(e)}
          />
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
          {/* <li className="active"> */}
         <Link className="nav-link" 
              style={isActive(history, "/")} to="/">
          Home
        </Link>
        <Link className="nav-link" 
              style={isActive(history, "/users")} to="/users">
          Users
        </Link>
          <Link 
             to={`/post/create`} 
             style={isActive(history, `/post/create`)} 
             className="nav-link">
              Create Post
          </Link>
       
      {!isAuthenticated() && (
        <>
  
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
         
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign up
            </Link>
         
        </>
      )}
      {isAuthenticated() && (
        <>
        
          <Link to={`/findpeople`} 
             style={isActive(history, `/findpeople`)} 
             className="nav-link">
              Find people
          </Link>
        
          <Link to={`/user/${isAuthenticated().user._id}`} 
             style={isActive(history, `/user/${isAuthenticated().user._id}`)} 
             className="nav-link">
              {`${isAuthenticated().user.name}'s profile`}
          </Link>
       
            <span
                className="nav-link"
                style={
                        (isActive(history, "/signup"),
                        { cursor: "pointer", color: "#fff" })
                      }
                onClick={() => signout(() => history.push("/"))}>
                  Sign Out
            </span>
        </>
      )}
          </ul>
        </nav>
      </Navigation>
    );
  }
}

export default withRouter(Nav);
 
const Navigation = styled.header`
width: 100%;
display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
background: #009688!important;

.logo a {
  padding-top: 33px;
  display: flex;
  flex-direction: column;
  clear: both;
  padding-bottom: 30px;
  text-decoration: none;
}
  p {
    width: 500px;
    display: block;
  }
  em {
    font-size: 1.5rem;
    float: left;
    display: block;
    img {
      display: inline-block;
      margin-top: 5px;
      width: 15px;
      float: left;
    }
    .letterhead {
      float: left;
      margin-top: -30px;
      padding-left: 10px;
    }
  }
}
.gray {
  color: #ccc;
}
a {
  color: #fff;
  transition: all 0.6s;
  color: #fff;
  font-size: 1em;
}
a:hover {
  opacity: 1;
}
.fa-bars {
  display: none;
  color: #222;
  font-size: 2rem;
}
nav {
  ul {
    display: flex;
    justify-content: space-between;
  }
  nav-link {
    margin: 0 15px;
    justify-content: space-between;
    font-size: 1em;
  }
  a {
    font-size: 1em;
    text-decoration: none;
    .active {
      color: tomato;
    }
  }
  a.active {
    color: #222;
  }
}

@media only screen and (max-width: 800px) {
  padding: 0px;
  .logo {
    padding-left: 15px;
    padding-top: 0px !important;
  }
}
@media only screen and (max-width: 600px) {
  height: auto;
  min-height: 50px;
  display: block;
  position: relative;
  .logo {
    width: 100%;
    display: block;
    padding-top: 20px;
    margin: 0px;
    margin-left: -5px;
    
  }
  .fa-bars {
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  ul.collapsed {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;

    overflow: hidden;
    max-height: 0;
    -moz-transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    transition-duration: 0.4s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

    &.is-expanded {
      overflow: hidden;
      max-height: 500px; /* approximate max height */
      -moz-transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s;
      -o-transition-duration: 0.4s;
      transition-duration: 0.4s;
      -moz-transition-timing-function: ease-in;
      -webkit-transition-timing-function: ease-in;
      -o-transition-timing-function: ease-in;
      transition-timing-function: ease-in;
    }
    li {
      padding: 15px 10px;
      margin: 0px 0px;
      width: 100%;
    }
    
  }
}
`;