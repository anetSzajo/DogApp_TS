import * as React from 'react';
import {Link} from 'react-router-dom';
import '../main.scss';

export default function Navbar() {
    return (
        <Link to="/" className="navbar">
            <img src="/icons/dog.png" alt="" className="appLogo"/>
            Breeds' App
        </Link>
    )
}