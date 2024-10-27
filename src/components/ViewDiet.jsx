import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewDiet = () => {
    const [dietPlans, setDietPlans] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [error, setError] = useState('');
    const [diseases, setDiseases] = useState([]);
    const navigate = useNavigate();

    const fetchDietPlans = async (disease) => {
        try {
            const response = await axios.get(`http://localhost:8080/viewdietplan?disease=${disease}`);
            setDietPlans(response.data);
            setError('');
        } catch (error) {
            console.error("Error fetching diet plans:", error);
            setError('Error fetching diet plans. Please try again later.');
        }
    };

    const fetchDiseases = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getDiseases');
            setDiseases(response.data);
            setError('');
        } catch (error) {
            console.error("Error fetching diseases:", error);
            setError('Error fetching diseases. Please try again later.');
        }
    };

    useEffect(() => {
        fetchDiseases();
    }, []);

    const handleDiseaseChange = (e) => {
        setSelectedDisease(e.target.value);
        setDietPlans([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDisease) {
            fetchDietPlans(selectedDisease);
        }
    };

    const handleNavigateToProducts = (recommendedRice) => {
        navigate('/Product', { state: { recommendedRice } });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>View Diet Plans</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="disease" style={{ marginRight: '10px' }}>Select Disease:</label>
                    <select
                        id="disease"
                        value={selectedDisease}
                        onChange={handleDiseaseChange}
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}
                    >
                        <option value="">--Select a Disease--</option>
                        {diseases.map((disease, index) => (
                            <option key={index} value={disease}>
                                {disease}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    View Diet Plan
                </button>
            </form>

            {dietPlans.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {dietPlans.map((plan, index) => (
                        <li key={index} style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px', margin: '10px 0' }}>
                            <h3 style={{ color: '#555' }}>Disease: {plan.disease}</h3>
                            <p><strong>Recommended Rice:</strong> {plan.recommendedRice}</p>
                            <p><strong>Description:</strong> {plan.description}</p>
                            <p><strong>Diet Tip:</strong> {plan.dietTip}</p>
                            <button 
                                onClick={() => handleNavigateToProducts(plan.recommendedRice)}
                                style={{
                                    padding: '10px 15px',
                                    borderRadius: '5px',
                                    backgroundColor: '#007BFF',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Go to Products
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                selectedDisease 
            )}
        </div>
    );
};

export default ViewDiet;
