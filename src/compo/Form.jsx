import React, { useState } from 'react';
import './Styles.css';

function Form() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [instaId, setInstaId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const collectData = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !instaId) {
            setError("All fields are required.");
            setSuccess("");
            return;
        }
        
        
        if (number && number.length !== 10) {
            setError("Phone number must be exactly 10 digits.");
            return;
        }
        

        const data = {
            name: name.trim(),
            number: number.trim(),
            instaId: instaId.trim()
        };

        try {
            const response = await fetch(import.meta.env.VITE_FIREBASE_LINK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSuccess("Form submitted successfully!");
                setError("");
                setName("");
                setNumber("");
                setInstaId("");
            } else {
                setError("Something went wrong while submitting the form.");
                setSuccess("");
            }
        } catch (err) {
            console.error("Error posting data:", err);
            setError("Network error. Please try again later.");
            setSuccess("");
        }
    };

    return (
        <div className='background'>
            <h1 className="highlight-heading">Unite as Hindus</h1>
            <h1><b>SAI-AL-HIND</b></h1>

            <div className='container'>
                <form onSubmit={collectData}>
                    <h1 className='text-center pt-3'>Let's move towards the Hindurashtra</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <div className='ipboxes'>
                        <label className='form-label'>Name</label>
                        <input type='text' className='form-control' placeholder='Enter your name'
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='ipboxes'>
                        <label className='form-label'>Phone Number</label>
                        <input type='tel' className='form-control' placeholder='Enter your Phone Number'
                            value={number}
                            maxLength={10}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setNumber(value);
                            }} />
                    </div>

                    <div className='ipboxes'>
                        <label className='form-label'>Instagram Id</label>
                        <input type='text' className='form-control' placeholder='Enter Insta Id'
                            value={instaId} onChange={(e) => setInstaId(e.target.value)} />
                    </div>

                    <button type='submit' className='btn btn-success'>Submit</button>
                </form>
            </div>

            <h1 className="highlight-heading">JAI HINDUSTAN</h1>
        </div>
    );
}

export default Form;