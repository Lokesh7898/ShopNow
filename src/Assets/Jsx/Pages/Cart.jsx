import React, { Component } from 'react';
import rating from '../../Media/Images/rating_starts.png';
import CheckoutSuccessModal from '../Components/CheckoutSuccessModal';
import { toast } from 'react-toastify';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            taxRate: 0.08,
            shippingCost: 0,
            showModal: false,
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        };
    }

    componentDidMount() {
        try {
            const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
            this.setState({ cartItems });
        } catch (error) {
            console.error('Error fetching cart items from session storage', error);
        }
    }

    handleIncrement = (id) => {
        this.setState((prevState) => {
            const updatedItems = prevState.cartItems.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: (item.quantity || 1) + 1 };
                }
                return item;
            });
            sessionStorage.setItem('cart', JSON.stringify(updatedItems));
            return { cartItems: updatedItems };
        });
    };

    handleDecrement = (id) => {
        this.setState((prevState) => {
            const updatedItems = prevState.cartItems.map((item) => {
                if (item.id === id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            sessionStorage.setItem('cart', JSON.stringify(updatedItems));
            return { cartItems: updatedItems };
        });
    };

    handleRemove = (id) => {
        this.setState((prevState) => {
            const updatedItems = prevState.cartItems.filter(item => item.id !== id);

            sessionStorage.setItem('cart', JSON.stringify(updatedItems));

            return { cartItems: updatedItems };
        }, () => {
            toast.error('Item removed from cart!');
        });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateForm = () => {
        const { cardNumber, expiryDate, cvv } = this.state;

        if (!cardNumber || cardNumber.length !== 16) {
            toast.error('Please enter a valid card number.');
            return false;
        }

        if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
            toast.error('Please enter a valid expiry date in MM/YY format.');
            return false;
        }

        if (!cvv || cvv.length !== 3) {
            toast.error('Please enter a valid CVV.');
            return false;
        }

        return true;
    };

    handleCheckout = () => {
        if (this.validateForm()) {
            this.setState({ showModal: true });
            sessionStorage.removeItem('cart');
        }
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    calculateSubtotal = () => {
        const { cartItems } = this.state;
        return cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    };

    calculateTax = (subtotal) => {
        return subtotal * this.state.taxRate;
    };

    render() {
        const { cartItems, shippingCost, showModal, cardNumber, expiryDate, cvv } = this.state;
        const subtotal = this.calculateSubtotal();
        const tax = this.calculateTax(subtotal);
        const total = subtotal + tax + shippingCost;

        return (
            <div className="cart-container">
                <div className="cart-items-section">
                    <h2>Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <p className="empty-cart">Your cart is empty.</p>
                    ) : (
                        <div className="cart-items-wrapper">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-card">
                                    <div className="cart-card-img">
                                        <img src={item.img} alt={item.title} />
                                    </div>
                                    <div className="cart-card-body">
                                        <h5>{item.title}</h5>
                                        <p>{item.description}</p>
                                        <img src={rating} alt="" />
                                        <p className="price">${item.price.toFixed(2)}</p>
                                        <div className="quantity-controls">
                                            <button onClick={() => this.handleDecrement(item.id)}>-</button>
                                            <span>{item.quantity || 1}</span>
                                            <button onClick={() => this.handleIncrement(item.id)}>+</button>
                                        </div>
                                    </div>
                                    <button className="remove-btn" onClick={() => this.handleRemove(item.id)}>
                                        <i className="fas fa-trash delete-icon"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="checkout-section">
                    <h3>Order Summary</h3>
                    <div className="summary-detail">
                        <p>Subtotal: </p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="summary-detail">
                        <p>Tax (8%): </p>
                        <p>${tax.toFixed(2)}</p>
                    </div>
                    <div className="summary-detail">
                        <p>Shipping: </p>
                        <p>${shippingCost.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className="summary-detail total">
                        <h3>Total:</h3>
                        <h3>${total.toFixed(2)}</h3>
                    </div>
                    <div>
                        <form
                            className=""
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            <div className="row gy-4">
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        className="form-control "
                                        name="cardNumber"
                                        placeholder="Enter Card no."
                                        value={cardNumber}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        className="form-control"
                                        placeholder="Expire (MM/YY)"
                                        value={expiryDate}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cvv"
                                        placeholder="CVV"
                                        value={cvv}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <button onClick={this.handleCheckout} className="checkout-btn">Checkout</button>
                </div>
                {showModal && <CheckoutSuccessModal onClose={this.closeModal} />}
            </div>
        );
    }
}

export default Cart;
