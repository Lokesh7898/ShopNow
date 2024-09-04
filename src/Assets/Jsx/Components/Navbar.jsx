import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from './Login';
import shopnowlogo from '../../Media/Images/shopnowlogowhite.png';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            showNavMenu: false,
            showTopbar: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 50) { // Adjust the scroll value as needed
            this.setState({ showTopbar: true });
        } else {
            this.setState({ showTopbar: false });
        }
    };

    togglePopup = () => {
        this.setState((prevState) => ({
            showLogin: !prevState.showLogin,
        }));
    };

    toggleNavMenu = () => {
        this.setState((prevState) => ({
            showNavMenu: !prevState.showNavMenu,
        }));
    };

    handleLinkClick = (sectionId) => {
        this.scrollToSection(sectionId);
        this.setState({ showNavMenu: false }); // Close the menu after clicking a link
    };

    scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    render() {
        const { showLogin, showNavMenu, showTopbar } = this.state;

        return (
            <>
                <div className='index-page'>
                    <header id="header" className="header fixed-top">
                        {/* Conditionally render the topbar */}
                        {showTopbar && (
                            <div  className={`topbar d-flex align-items-center my-2 ${showTopbar ? 'show' : ''}`}>
                                <div className="container d-flex justify-content-center justify-content-md-between">
                                    <div className="contact-info d-flex align-items-center">
                                        <i className="fas fa-envelope d-flex align-items-center">
                                            <a href="/">shopnow@gmail.com</a>
                                        </i>
                                        <i className="fas fa-phone-alt d-flex align-items-center ms-4">
                                            <span>+1 5589 55488 55</span>
                                        </i>
                                    </div>
                                    <div>
                                        <div className="social-links d-none d-md-flex align-items-center">
                                            <Link to='/wishlist' className="wishlist">
                                                <i className="fas fa-heart"></i>
                                            </Link>
                                            <Link to='/cart' className="cart">
                                                <i className="fas fa-shopping-cart"></i>
                                            </Link>
                                            <a href="#" className="login" onClick={this.togglePopup}>
                                                <i className="fas fa-user-circle"></i>
                                            </a>
                                        </div>

                                        {showLogin && (
                                            <LoginPage setShowLogin={this.togglePopup} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navbar */}
                        <div className="branding py-3 d-flex align-items-center">
                            <div className="container position-relative d-flex align-items-center justify-content-between">
                                <Link to="/" className="logo d-flex align-items-center">
                                    <img src={shopnowlogo} alt="ShopNow Logo" />
                                </Link>

                                <i 
                                    className={`mobile-nav-toggle d-xl-none ${showNavMenu ? 'bi bi-x' : 'bi bi-list'}`} 
                                    onClick={this.toggleNavMenu}
                                >
                                    {showNavMenu ? 'Close' : <i class="fa-solid fa-bars"></i>}
                                </i>

                                <nav id="navmenu" className={`navmenu ${showNavMenu ? 'show' : ''}`}>
                                    <ul>
                                        <li><Link to="/#hero" className="active" onClick={() => this.handleLinkClick('hero')}>Home</Link></li>
                                        <li><Link to="/#products" onClick={() => this.handleLinkClick('products')}>Products</Link></li>
                                        <li><Link to="/#services" onClick={() => this.handleLinkClick('services')}>Services</Link></li>
                                        <li><Link to="/#contact" onClick={() => this.handleLinkClick('contact')}>Contact</Link></li>
                                    </ul>

                                    <div className="social-links d-md-none">
                                        <Link to='/wishlist' className="wishlist">
                                            <i className="fas fa-heart"></i>
                                        </Link>
                                        <Link to='/cart' className="cart">
                                            <i className="fas fa-shopping-cart"></i>
                                        </Link>
                                        <a href="#" className="login" onClick={this.togglePopup}>
                                            <i className="fas fa-user-circle"></i>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </header>
                </div>
            </>
        );
    }
}
