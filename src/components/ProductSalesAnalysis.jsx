import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductSalesAnalysis = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostSold, setMostSold] = useState(null);
  const [leastSold, setLeastSold] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentResponse = await axios.get('http://localhost:8080/viewpayments');
        const productCount = {};

        // Calculate sales data
        paymentResponse.data.forEach(payment => {
          const productName = payment.product ? payment.product.name : 'Unknown Product';
          productCount[productName] = (productCount[productName] || 0) + 1;
        });

        // Convert object to array and sort to find most and least sold products
        const sortedProducts = Object.entries(productCount)
          .sort((a, b) => b[1] - a[1]); // Sort by sales count descending

        setMostSold(sortedProducts[0] ? sortedProducts[0] : ['No Product', 0]); // Most sold
        setLeastSold(sortedProducts[sortedProducts.length - 1] ? sortedProducts[sortedProducts.length - 1] : ['No Product', 0]); // Least sold

        // Store all sales data for further use (if needed)
        setSalesData(sortedProducts);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Product Sales Analysis</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading sales data...</p>
      ) : (
        <>
          <h2 style={styles.subtitle}>Most Sold Product:</h2>
          <p style={styles.productInfo}>
            {mostSold[0]} (Sold: {mostSold[1]})
          </p>
          
          <h2 style={styles.subtitle}>Least Sold Product:</h2>
          <p style={styles.productInfo}>
            {leastSold[0]} (Sold: {leastSold[1]})
          </p>
          
          <h2 style={styles.subtitle}>All Products Sold:</h2>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Product Name</th>
                <th style={styles.th}>Quantity Sold</th>
              </tr>
            </thead>
            <tbody style={styles.tbody}>
              {salesData.length > 0 ? (
                salesData.map(([productName, count]) => (
                  <tr key={productName} style={styles.tr}>
                    <td style={styles.td}>{productName}</td>
                    <td style={styles.td}>{count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={styles.emptyMessage}>No sales data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    marginTop: '20px',
    color: '#007bff',
  },
  productInfo: {
    textAlign: 'center',
    fontSize: '1.2em',
    margin: '10px 0',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  thead: {
    backgroundColor: '#007bff',
    color: '#ffffff',
  },
  th: {
    padding: '10px',
    textAlign: 'left',
  },
  tbody: {
    backgroundColor: '#ffffff',
  },
  tr: {
    borderBottom: '1px solid #dddddd',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
  },
  emptyMessage: {
    textAlign: 'center',
    padding: '20px',
    fontStyle: 'italic',
  },
};

export default ProductSalesAnalysis;
