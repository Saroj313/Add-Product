import React from "react";
import { useProductState } from './ProductContext';
import { FaUpload } from 'react-icons/fa'; // Import the FaUpload icon from react-icons library

const Ecommerce = () => {
  const products = useProductState();

  return (
    <>
     <section>
        <div className='container' style={{background:"skyblue"}}>
            <div className='row'>
                <div className='col'>
                    <h1 className='text-center'>Ecommerce Listing</h1>
                </div>
            </div>           
        </div>
    </section>
    <section>
    <div style={{background:"#FED9ED"}}>
      <table className="table">
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                {product.photo && (
                  <img
                    src={URL.createObjectURL(product.photo)}
                    alt={product.title}
                    style={{ maxWidth: "200px", maxHeight: "200px", marginLeft: "30px" }}
                  />
                )}
              </td>
              <td>
                <div>
                  <h1>
                    <span>Title: </span>
                    <span style={{ color: "blue" }}>{product.title}</span>
                  </h1>
                  <h2>
                    <span>Product ID: </span>
                    <span style={{ color: "blue" }}>{product.productId}</span>
                  </h2>
                  <h2>
                    <span>Manufacturer: </span>
                    <span style={{ color: "blue" }}>{product.manufacturer}</span>
                  </h2>
                  <h2>
                    <span>Description: </span>
                    <span style={{ color: "blue" }}>{product.description}</span>
                  </h2>
                  <h2>
                    <span>Quantity: </span>
                    <span style={{ color: "blue" }}>{product.quality}</span>
                  </h2>
                  {/* Add buttons or any other actions as needed */}
                </div>
              </td>
              <td>
                <div>
                  <h2>
                    <span>Amazon </span>
                    <span style={{height:"1px", width:"15px",background:"orange"}}> <FaUpload style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer' }} /></span>
                   
                  </h2>
                  <h2>
                    <span>Shopify </span>
                    <span style={{height:"1px", width:"15px",background:"orange"}}> <FaUpload style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer' }} /></span>
                   
                  </h2>
                  <h2>
                    <span>Flipkart </span>
                    <span style={{height:"1px", width:"15px",background:"orange"}}> <FaUpload style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer' }} /></span>
                   
                  </h2>
                  <h2>
                    <span>WooCommerce </span>
                    <span style={{height:"1px", width:"15px",background:"orange"}}> <FaUpload style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer' }} /></span>
                   
                  </h2>
                  <h2>
                    <span>Made2Electronic </span>
                    <span style={{height:"1px", width:"15px",background:"orange"}}> <FaUpload style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer' }} /></span>
                   
                  </h2>
                  {/* Add buttons or any other actions as needed */}
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
};

export default Ecommerce;
