import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Add Pets</Link></li>
                    <li><Link to="/pets">Pets</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;