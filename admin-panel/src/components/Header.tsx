import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <Link to="/">Add Pets</Link>
                    <Link to="/pets">Pets</Link>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
