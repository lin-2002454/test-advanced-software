import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#282c34", color: "white" }}>
      <Link to="/" style={{ margin: "0 10px", color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/about" style={{ margin: "0 10px", color: "white", textDecoration: "none" }}>About</Link>
    </nav>
  );
};

export default Navbar;
