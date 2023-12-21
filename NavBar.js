// NavBar.js
import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ handleListButtonClick, handleQRScannerButtonClick }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", marginRight: "20px" }}>
      <Link to="/Ecommerce">
        <button className="Button" onClick={handleListButtonClick}>
          List
        </button>
      </Link>
      <Link to="/QrScanner">
      <button className="Button" onClick={handleQRScannerButtonClick}>
        QR Scanner
      </button>
      </Link>
    </div>
  );
};

export default NavBar;
