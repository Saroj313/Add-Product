import React, { useEffect, useState } from "react";
import "./Addproduct.css";
import QRCode from "qrcode.react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
// import Ecommerce from "./Ecommerce";
import { useProductDispatch } from './ProductContext';

import NavBar from "./NavBar"; // Import the NavBar component

export default function Addproduct() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "",
    photo: null,
    productId: "",
    manufacturer: "",
    quality: "",
  });

  const dispatch = useProductDispatch();
  const [table, setTable] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showQR, setShowQR] = useState(false);

   const navigate = useNavigate();
  //  const { state } = useLocation();
 
   // Access the history object for navigation


  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setInput({
        ...input,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      const updatedTable = [...table];
      updatedTable[editIndex] = input;
      setTable(updatedTable);
      setEdit(false);
      setEditIndex(null);
    } else {
      setTable([...table, input]);
    }
    if (edit) {
      const updatedProduct = { ...input };
      dispatch({ type: 'ADD_PRODUCT', payload: updatedProduct });
      setEdit(false);
      setEditIndex(null);
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: input });
    }

    setInput({
      title: "",
      description: "",
      status: "",
      photo: null,
      productId: "",
      manufacturer: "",
      quality: "",
    });
    // Hide QR code when submitting a new product
    setShowQR(false);
  };

  const handleListButtonClick = () => {
    // Pass the product details to Ecommerce component using navigate
    navigate('/Ecommerce');
  };
  

  // const handleQRScannerButtonClick = () => {
  //   // Add logic for handling the QR code scanner button click
  //   // For example, you can open a QR code scanning modal.
  //   navigate('/QrScanner', { state: { product: input } });
  // };

  const handleDelete = (index) => {
    const filteredData = table.filter((_, i) => i !== index);
    setTable(filteredData);
  };

  const handleEdit = (index) => {
    const editData = table[index];
    setInput({ ...editData });
    setEdit(true);
    setEditIndex(index);
  };

  const generateQRCode = () => {
    // Stringify the input object and set it as QR code data
    const qrData = JSON.stringify(input);

    // Set QR code data and show QR code
    setInput({
      ...input,
      qrData,
    });
    setShowQR(true);
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTable(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <section> <NavBar handleListButtonClick={handleListButtonClick} /></section>
  <section>
      <div className="container">
        {/* // handleListButtonClick={handleListButtonClick}
        // handleQRScannerButtonClick={handleQRScannerButtonClick} */}
      
   
      {/* <NavBar handleListButtonClick={handleQRScannerButtonClick} /> */}

        <form onSubmit={handleSubmit} className="justify-content-center">
          <div className="file-field">
            <label className="status">Upload Photo</label>
   
            {input.photo ? (
              <>
                <img
                  src={URL.createObjectURL(input.photo)}
                  alt="Selected"
                  style={{ maxWidth: "100px", maxHeight: "100px", marginBottom: "10px" }}
                />
                <br />
                <span>Choose a different image</span>
              </>
            ) : (
              <>
                <img
                  src="../../../src/Images/download (1).png" // Replace with the path to your placeholder image
                  alt="Placeholder"
                  style={{ maxWidth: "100px", maxHeight: "100px", marginBottom: "10px" }}
                />
                <br />
                <span>Choose Image</span>
              </>
            )}
            <input type="file" name="photo" onChange={handleChange} />
          </div>

          <div>
            <label className="title">Add product name here..</label>
            <input
              placeholder="Product Name"
              name="title"
              value={input.title}
              onChange={handleChange}
              style={{ width: "90%", padding: "10px", height: "30px", marginTop: "10px" }}
            />
          </div>
          <div>
            <label className="description">Product ID</label>
            <input
              placeholder="Product ID"
              name="productId"
              value={input.productId}
              onChange={handleChange}
              style={{ width: "90%", padding: "10px", height: "30px", marginTop: "10px" }}
            />
          </div>
          <div>
            <label className="description">Manufacturing name</label>
            <input
              placeholder="Manufacturer"
              name="manufacturer"
              value={input.manufacturer}
              onChange={handleChange}
              style={{ width: "90%", padding: "10px", height: "30px", marginTop: "10px" }}
            />
          </div>
          <div>
            <label className="description">Product Description</label>
            <textarea
              placeholder="Product Description"
              name="description"
              value={input.description}
              onChange={handleChange}
              style={{ width: "90%", padding: "10px", height: "60px", marginTop: "10px" }}
            />
          </div>
          <div>
            <label className="status">Product Quantity</label>
            <input
              placeholder="Product Quality"
              name="quality"
              value={input.quality}
              onChange={handleChange}
              style={{ width: "90%", padding: "10px", height: "30px", marginTop: "10px" }}
            />
          </div>


          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button
              className="Button"
              type="submit"
              style={{ width: "150px", padding: "15px", fontSize: "16px", background: "skyblue", borderRadius: "6px" }}
            >
              {edit ? "Update" : "Add"}
            </button>
            <button
              className="Button"
              type="button"
              onClick={generateQRCode}
              style={{ width: "150px", padding: "15px", fontSize: "16px", background: "orange", borderRadius: "6px" }}
            >
              Generate QR
            </button>

          </div>
        </form>
      </div>

      {showQR && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
          <QRCode value={input.qrData} />
          <p>Scan the QR code for product: {input.title}</p>
        </div>
      )}
 
      {/* New buttons for listing and QR code scanner */}
      {/* <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", marginRight: "20px" }}>
        <button
          className="Button"
          onClick={handleListButtonClick}
          style={{ marginRight: "10px", padding: "10px", fontSize: "14px", background: "lightblue", borderRadius: "6px" }}
        >
          List
        </button>
        <button
          className="Button"
          onClick={handleQRScannerButtonClick}
          style={{ padding: "10px", fontSize: "14px", background: "lightgreen", borderRadius: "6px" }}
        >
          QR Scanner
        </button>
      </div> */}

<div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Add product name here..</th>
              <th>Product ID</th>
              <th>Manufacturing name</th>
              <th>Product Description</th>
              <th>Product Quantity</th>
              <th>Product Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {table.map((item, i) => (
              <tr key={i}>
                <td>{item.title}</td>
                <td>{item.productId}</td>
                <td>{item.manufacturer}</td>
                <td>{item.description}</td>
                <td>{item.quality}</td>
                <td>
                  {item.photo && <img src={URL.createObjectURL(item.photo)} alt="Product" style={{ maxWidth: "100px", maxHeight: "100px" }} />}
                </td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      onClick={() => handleEdit(i)}
                      style={{
                        background: "green",
                        color: "white",
                        padding: "10px",
                        margin: "5px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Save Change
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      style={{
                        background: "red",
                        color: "white",
                        padding: "10px",
                        margin: "5px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                   
                    {/* <button
                      onClick={() => handleListButtonClick()}
                      style={{
                        background: "lightblue",
                        color: "white",
                        padding: "10px",
                        margin: "5px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      List
                    </button>
                    <button
                      onClick={() => handleQRScannerButtonClick()}
                      style={{
                        background: "lightgreen",
                        color: "white",
                        padding: "10px",
                        margin: "5px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      QR Scanner
                    </button> */}
               </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </section>
    </>
  );
}
