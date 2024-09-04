import React, { Component } from 'react'
import items from '../Data/Data';
import shopnowlogo from '../../Media/Images/shopnowlogowhite.png'
import { toast } from 'react-toastify';
import TermsModal from '../Components/TermsAndConditions';
import rating from '../../Media/Images/rating_starts.png'
import headimg from '../../Media/Images/shopnowheadimg.png'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '*',
      wishlist: [],
      isModalOpen: false,
      modalType: '',
    };
  }

  componentDidMount() {
    const wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
    this.setState({ wishlist });
  }

  setFilter = (filter) => {
    this.setState({ filter });
  };

  toggleWishlist = (item) => {
    const wishlist = [...this.state.wishlist];
    const itemIndex = wishlist.findIndex(wishlistItem => wishlistItem.id === item.id);

    if (itemIndex !== -1) {
      wishlist.splice(itemIndex, 1);
      toast.info(`${item.title} has been removed from your wishlist.`);
    } else {
      wishlist.push(item);
      toast.success(`${item.title} has been added to your wishlist!`);
    }

    sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
    this.setState({ wishlist });
  };

  isInWishlist = (itemId) => {
    return this.state.wishlist.some(item => item.id === itemId);
  };
  addToCart = (item) => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const itemExists = cart.find(cartItem => cartItem.id === item.id);

    if (!itemExists) {
      cart.push(item);
      sessionStorage.setItem('cart', JSON.stringify(cart));
      toast.success(`${item.title} has been added to your cart.`);

    } else {
      toast.info(`${item.title} has been removed from your cart.`);
    }

  };

  openModal = (type, event) => {
    event.preventDefault();
    this.setState({ isModalOpen: true, modalType: type });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalType: '' });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Message sent successfully!');
  };

  render() {
    const { filter } = this.state;

    const services = [
      {
        id: 1,
        title: 'Free Shipping',
        description: 'Enjoy free shipping on all orders over $50.',
        icon: 'fas fa-truck'
      },
      {
        id: 2,
        title: '24/7 Customer Support',
        description: 'Our support team is available 24/7 to assist you with any issues.',
        icon: 'fas fa-headset'
      },
      {
        id: 3,
        title: 'Easy Returns',
        description: 'Return any item within 30 days for a full refund.',
        icon: 'fas fa-undo'
      },
      {
        id: 4,
        title: 'Secure Payments',
        description: 'We use the latest encryption technology to ensure your payments are secure.',
        icon: 'fas fa-lock'
      }
    ];

    return (
      <>
        {/* ..............................................Home................................................................. */}
        <main className="main">
          <section id="hero" className="hero section dark-background">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 text-section">
                  <h2>Your Electronics Shopping Hub</h2>
                  <p>Discover top laptops, cameras, and mobile phones at ShopNow, where quality meets unbeatable prices.</p>
                </div>
                <div className="col-lg-6 image-section">
                  {/* <dotlottie-player
                    src="https://lottie.host/ca036de1-dbb5-4d94-8d9c-04f0c3bc13df/Oz4Z6Y37xv.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  ></dotlottie-player> */}
                  <img src={headimg} alt="Hero Image" />
                </div>
              </div>
            </div>
          </section>



          {/* ...............................................Products.................................................................... */}
          <section id="products" className="portfolio section">
            <div className="container section-title" data-aos="fade-up">
              <span>Products</span>
              <h2>Products</h2>
              <p>Explore our diverse product range offering quality and innovation. From fashion to electronics, find exactly what you need here.</p>
            </div>

            <div className="container">
              <div className="isotope-layout">
                <ul className="portfolio-filters isotope-filters">
                  <li onClick={() => this.setFilter('*')} className={filter === '*' ? 'filter-active' : ''}>All</li>
                  <li onClick={() => this.setFilter('filter-app')} className={filter === 'filter-app' ? 'filter-active' : ''}>Camera</li>
                  <li onClick={() => this.setFilter('filter-product')} className={filter === 'filter-product' ? 'filter-active' : ''}>Laptop</li>
                  <li onClick={() => this.setFilter('filter-branding')} className={filter === 'filter-branding' ? 'filter-active' : ''}>Mobile</li>
                </ul>

                <div className="row gy-4 mx-4 isotope-container">
                  {items
                    .filter((item) => filter === '*' || item.category === filter)
                    .map((item) => (
                      <div key={item.id} className={`col-lg-3 col-md-6 isotope-item ${item.category}`}>
                        <div className="product-card">
                          <div className="product-card__image-container">
                            <img src={item.img} className="product-card__image" alt={item.title} />
                            <button
                              className={`product-card__wishlist-button ${this.isInWishlist(item.id) ? 'active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                this.toggleWishlist(item);
                              }}
                              title={this.isInWishlist(item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            >
                              <i className={this.isInWishlist(item.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
                            </button>
                          </div>
                          <div className="product-card__info">
                            <a href="/" className="product-card__title">
                              {item.title.split(" ").length > 10
                                ? `${item.title.split(" ").slice(0, 10).join(" ")}...`
                                : item.title}
                            </a>
                            <img src={rating} alt="" className='card-rating' />
                            <div className="product-card__rating">
                              <span className="product-card__rating-value">4.5</span>
                              <span className="product-card__rating-count">(24 reviews)</span>
                            </div>
                            <span className="product-card__price">${item.price}</span>
                            <button
                              className="product-card__add-to-cart"
                              onClick={(e) => {
                                e.preventDefault();
                                this.addToCart(item);
                              }}
                            >
                              <i className="fas fa-shopping-cart"></i> Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

          </section>

          {/* ......................................................Services............................................................. */}
          <section id="services" className="services section">
            <div className="container section-title" data-aos="fade-up">
              <span>Services</span>
              <h2>Services</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>

            <div className="container">
              <div className="row gy-5">
                {services.map(service => (
                  <div key={service.id} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={service.delay}>
                    <div className="service-item position-relative">
                      <div className="icon">
                        <i className={service.icon}></i>
                      </div>
                      <a href="#" className="stretched-link">
                        <h3>{service.title}</h3>
                      </a>
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ...............................................Contact.................................................................... */}
          <section id="contact" className="contact section">
            <div className="container section-title" data-aos="fade-up">
              <span>Contact</span>
              <h2>Contact</h2>
              <p>Have questions about our products or need assistance with your order? Our team is here to help! Use the form below to send us a message, or contact us directly via phone or email. We're committed to providing excellent service and look forward to assisting you.</p>
            </div>


            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row gy-4">

                <div className="col-lg-4">
                  <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                    <i className="fas fa-map-marker-alt"></i>
                    <h3>Address</h3>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                  <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                    <i className="fa-solid fa-phone"></i>
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55</p>
                  </div>
                  <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                    <i className="fa-solid fa-envelope"></i>
                    <h3>Email Us</h3>
                    <p>info@example.com</p>
                  </div>
                </div>

                <div className="col-lg-8">
                  <form onSubmit={this.handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="400">
                    <div className="row gy-4">

                      <div className="col-md-6">
                        <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                      </div>

                      <div className="col-md-6">
                        <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                      </div>

                      <div className="col-md-12">
                        <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                      </div>

                      <div className="col-md-12">
                        <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                      </div>

                      <div className="col-md-12 text-center">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>

                        <button type="submit" className="btn btn-primary mt-5">Send Message</button>
                      </div>

                    </div>
                  </form>
                </div>

              </div>
            </div>

          </section>
        </main>


        {/* ...............................................Footer.................................................................... */}
        <footer id="footer" className="footer position-relative dark-background">

          <div className="container footer-top">
            <div className="row gy-4">
              <div className="col-lg-4 col-md-6">
                <div className="footer-about">
                  <a href="index.html" className="logo sitename"><img src={shopnowlogo} alt="" /></a>
                  <div className="footer-contact pt-3">
                    <p>A108 Adam Street</p>
                    <p>New York, NY 535022</p>
                    <p className="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                    <p><strong>Email:</strong> <span>info@example.com</span></p>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-3 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#" onClick={(e) => this.openModal('terms', e)}>Terms of service</a></li>
                  <li><a href="#" onClick={(e) => this.openModal('privacy', e)}>Privacy policy</a></li>
                  <TermsModal
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                    type={this.state.modalType}
                  />
                </ul>
              </div>

              {/* <div className="col-lg-2 col-md-3 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><a href="#">Web Design</a></li>
                  <li><a href="#">Web Development</a></li>
                  <li><a href="#">Product Management</a></li>
                  <li><a href="#">Marketing</a></li>
                  <li><a href="#">Graphic Design</a></li>
                </ul>
              </div> */}

              <div className="col-lg-4 col-md-12 footer-newsletter">
                <h4>Our Newsletter</h4>
                <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
                <form className="php-email-form" onSubmit={this.handleSubmit}>
                  <div className="newsletter-form">
                    <input type="email" name="email" />
                    <input type="submit" value="Subscribe" />
                  </div>
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your subscription request has been sent. Thank you!</div>
                </form>
              </div>

            </div>
          </div>

          <div className="container copyright text-center mt-4">
            <p>© <span>Copyright</span> <a href="/"><strong className="px-1 sitename">ShopNow</strong> </a><span>All Rights Reserved</span></p>
          </div>


          {/* Preloader */}
          {/* <div id="preloader"></div> */}

        </footer>



      </>
    )
  }
}
