import React, { useState } from 'react';
import axios from 'axios';

const AdminAddDiet = () => {
    const [disease, setDisease] = useState('');
    const [recommendedRice, setRecommendedRice] = useState('');
    const [description, setDescription] = useState('');
    const [dietTip, setDietTip] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newDietPlan = {
            disease,
            recommendedRice,
            description,
            dietTip,
        };

        try {
            const response = await axios.post('http://localhost:8080/addToDietPlan', newDietPlan);
            if (response.status === 201) {
                setSuccessMessage('Diet plan added successfully!');
                setError('');
                setDisease('');
                setRecommendedRice('');
                setDescription('');
                setDietTip('');
            } else {
                setError('Failed to add diet plan. Please try again.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error("Error adding diet plan:", error);
            if (error.response) {
                setError(error.response.data.message || 'Error adding diet plan. Please try again.');
            } else {
                setError('Network error. Please check your connection.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Add Diet Plan</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Disease:</label>
                    <input 
                        type="text" 
                        value={disease} 
                        onChange={(e) => setDisease(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                </div>
                <div>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Recommended Rice:</label>
                    <input 
                        type="text" 
                        value={recommendedRice} 
                        onChange={(e) => setRecommendedRice(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                </div>
                <div>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none' }} 
                    />
                </div>
                <div>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Diet Tip:</label>
                    <textarea 
                        value={dietTip} 
                        onChange={(e) => setDietTip(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none' }} 
                    />
                </div>
                <button 
                    type="submit" 
                    style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
                >
                    Add Diet Plan
                </button>
            </form>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
        </div>
    );
};

export default AdminAddDiet;
