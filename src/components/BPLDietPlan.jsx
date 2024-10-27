import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const BPLDietPlan = () => {
    const [dietPlans, setDietPlans] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [error, setError] = useState('');
    const [diseases, setDiseases] = useState([]); // For holding diseases
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Fetch diet plans for the selected disease
    const fetchDietPlans = async (disease) => {
        try {
            const response = await axios.get(`http://localhost:8080/viewdietplan?disease=${disease}`);
            setDietPlans(response.data);
            setError(''); // Clear error if fetch is successful
        } catch (error) {
            console.error("Error fetching diet plans:", error);
            setError('Error fetching diet plans. Please try again later.');
        }
    };

    // Fetch available diseases from the server
    const fetchDiseases = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getDiseases');
            setDiseases(response.data);
            setError(''); // Clear error if fetch is successful
        } catch (error) {
            console.error("Error fetching diseases:", error);
            setError('Error fetching diseases. Please try again later.');
        }
    };

    useEffect(() => {
        fetchDiseases(); // Fetch diseases on component mount
    }, []);

    const handleDiseaseChange = (e) => {
        setSelectedDisease(e.target.value);
        setDietPlans([]); // Reset diet plans when the disease changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDisease) {
            fetchDietPlans(selectedDisease); // Fetch diet plans for the selected disease
        }
    };

    // Function to handle navigation to products page
    const handleNavigateToProducts = (recommendedRice) => {
        navigate('/BplProducts', { state: { recommendedRice } }); // Pass recommended rice to the products page
    };

    return (
        <div>
            <h2>View Diet Plans</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="disease">Select Disease:</label>
                    <select
                        id="disease"
                        value={selectedDisease}
                        onChange={handleDiseaseChange}
                        required
                    >
                        <option value="">--Select a Disease--</option>
                        {diseases.map((disease, index) => (
                            <option key={index} value={disease}>
                                {disease}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">View Diet Plan</button>
            </form>

            {dietPlans.length > 0 ? (
                <ul>
                    {dietPlans.map((plan, index) => (
                        <li key={index}>
                            <h3>Disease: {plan.disease}</h3>
                            <p><strong>Recommended Rice:</strong> {plan.recommendedRice}</p>
                            <p><strong>Description:</strong> {plan.description}</p>
                            <p><strong>Diet Tip:</strong> {plan.dietTip}</p>
                            {/* Button to navigate to products page with recommended rice */}
                            <button onClick={() => handleNavigateToProducts(plan.recommendedRice)}>
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

export default BPLDietPlan;
