import React, { Component } from 'react';

class TermsModal extends Component {
    render() {
        const { isOpen, onClose, type } = this.props;

        if (!isOpen) {
            return null;
        }

        return (
            <div className="termsCondModal" onClick={this.closeModalOnClickOutside}>
                <div className="termsCondModalContent" onClick={e => e.stopPropagation()}>
                    <span className="termsCondClose" onClick={onClose}>&times;</span>
                    {type === 'terms' && (
                        <>
                            <h2>Terms and Conditions</h2>
                            <p>
                                Welcome to ShopNow! These terms and conditions outline the rules and regulations for the use of ShopNow's Website.
                            </p>
                            <h3>Introduction</h3>
                            <p>
                                By accessing this website we assume you accept these terms and conditions in full. Do not continue to use ShopNow's website if you do not accept all of the terms and conditions stated on this page.
                            </p>
                            <h3>Cookies</h3>
                            <p>
                                We employ the use of cookies. By using ShopNow's website you consent to the use of cookies in accordance with ShopNow’s privacy policy.
                            </p>
                            <h3>License</h3>
                            <p>
                                Unless otherwise stated, ShopNow and/or its licensors own the intellectual property rights for all material on ShopNow. All intellectual property rights are reserved. You may view and/or print pages from http://www.ShopNow.com for your own personal use subject to restrictions set in these terms and conditions.
                            </p>
                            <h3>User Comments</h3>
                            <p>
                                Parts of this website offer an opportunity for users to post and exchange opinions, information, material, and data ('Comments') in areas of the website. ShopNow does not screen, edit, publish or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of ShopNow, its agents or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion. To the extent permitted by applicable laws ShopNow shall not be responsible or liable for the Comments or for any loss cost, liability, damages, or expenses caused and or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                            </p>
                        </>
                    )}
                    {type === 'privacy' && (
                        <>
                            <h2>Privacy Policy</h2>
                            <p>
                                Welcome to our Privacy Policy page! When you use our web services, you trust us with your information. This Privacy Policy is meant to help you understand what data we collect, why we collect it, and what we do with it. This is important; we hope you will take time to read it carefully. Remember, you can find controls to manage your information and protect your privacy and security.
                            </p>
                            <h3>Information We Collect</h3>
                            <p>We collect information to provide better services to all of our users – from figuring out basic stuff like which language you speak, to more complex things like which ads you’ll find most useful or the people who matter most to you online.</p>
                            <h3>How We Use Information We Collect</h3>
                            <p>We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.</p>
                            <h3>Information We Share</h3>
                            <p>We do not share personal information with companies, organizations and individuals outside of our company unless one of the following circumstances applies:</p>
                            <ul>
                                <li>With your consent</li>
                                <li>For external processing</li>
                                <li>For legal reasons</li>
                            </ul>

                        </>
                    )}
                    <div className="termsCondModalActions">
                        <button className='btn btn-success' onClick={onClose}>Agree</button>
                        <button className='btn btn-danger' onClick={onClose}>Reject</button>
                    </div>
                </div>
            </div>
        );
    }

    closeModalOnClickOutside = (e) => {
        if (e.target.className === 'termsCondModal') {
            this.props.onClose();
        }
    };
}

export default TermsModal;
