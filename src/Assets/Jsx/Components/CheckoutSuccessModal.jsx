import React from 'react';

class CheckoutSuccessModal extends React.Component {
    render() {
        return (
            <div className="success-modal-overlay">
                <div className="success-modal-content">
                    <div className="success-modal-header">
                        <span className="success-modal-close-button" onClick={this.props.onClose}>&times;</span>
                    </div>
                    <div className="success-modal-body">
                        <h2>Payment Successful!</h2>
                        <i className="fas fa-check-circle success-modal-icon"></i>
                        <p>Your payment has been processed successfully.</p>
                        <p>Thank you for your purchase!</p>
                    </div>
                    <div className="success-modal-footer">
                        <button className="success-modal-button" onClick={this.props.onClose}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckoutSuccessModal;
