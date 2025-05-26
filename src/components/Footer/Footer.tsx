import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            <nav>
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
            </nav>
        </footer>
    );
};

export default Footer;