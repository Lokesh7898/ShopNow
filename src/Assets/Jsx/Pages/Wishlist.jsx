import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistItems: [], // Initialize with an empty array
    };
  }

  componentDidMount() {
    // Fetch wishlist items from session storage
    const wishlistItems = JSON.parse(sessionStorage.getItem('wishlist')) || [];
    this.setState({ wishlistItems });
  }

  handleAddToCart = (item) => {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);

    if (itemInCart) {
      toast.info(`${item.title} is already exist in your cart.`);
    } else {
      cartItems.push({ ...item, quantity: 1 });
      sessionStorage.setItem('cart', JSON.stringify(cartItems));
      toast.success(`${item.title} has been added to your cart.`);
    }
  };

  handleDelete = (id) => {
    const { wishlistItems } = this.state;
    const updatedItems = wishlistItems.filter(item => item.id !== id);
  
    if (updatedItems.length < wishlistItems.length) {
      sessionStorage.setItem('wishlist', JSON.stringify(updatedItems));
      toast.error('Item removed from wishlist!');
    }
    this.setState({ wishlistItems: updatedItems });
  };

  render() {
    const { wishlistItems } = this.state;

    return (
      <div className="container wishlist-main">
        <h2 className="text-center mb-4">Your Wishlist</h2>
        <table className="wishlist-table table table-hover">
          <thead className="wishlist-thead">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="wishlist-tbody">
            {wishlistItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Your wishlist is empty.
                </td>
              </tr>
            ) : (
              wishlistItems.map((item) => (
                <tr key={item.id} className="wishlist-row">
                  <td className="wishlist-image">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="wishlist-img img-fluid"
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td className="wishlist-name">{item.title}</td>
                  <td className="wishlist-description">{item.description}</td>
                  <td className="wishlist-price">${item.price.toFixed(2)}</td>
                  <td className="wishlist-actions">
                    <div className="wishlist-actions-container d-flex justify-content-center align-items-center">
                      <i
                        className="fas fa-cart-plus wishlist-add-to-cart mr-3"
                        onClick={() => this.handleAddToCart(item)}
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fas fa-trash wishlist-delete"
                        onClick={() => this.handleDelete(item.id)}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    );
  }
}

export default Wishlist;
