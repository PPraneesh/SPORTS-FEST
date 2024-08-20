import { Link } from "react-router-dom";
export default function Header() {
    return (
        <div className="header">
        <div className="header-title">
            <h1>SPORTS FEST</h1>
        </div>
        <div className="header-links">
            <Link to="/" className="navlink">Home</Link>
            <Link to="/register" className="navlink">Register</Link>
            <Link to="/accommodation" className="navlink">Accommodation</Link>
        </div>
        </div>
    );
    }