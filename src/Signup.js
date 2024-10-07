import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost/backend/signup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorDetail = await response.text();
                throw new Error(`Error: ${response.status} - ${errorDetail}`);
            }

            const data = await response.json();
            alert(data.message);
            if (data.message === "Signup successful") {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleGoogleSignup = async (response) => {
        try {
            const token = response.credential;
            const res = await fetch('http://localhost/backend/google_auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });

            if (!res.ok) {
                const errorDetail = await res.text();
                throw new Error(`Error: ${res.status} - ${errorDetail}`);
            }

            const result = await res.json();
            alert(result.message);
            if (result.message === "Signup successful" || result.message === "Login successful") {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google Sign-In Error:', error);
        alert('Google Sign-In Error: ' + error.message);
    };

    return (
        <div className="container signup-container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card signup-card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Signup</h3>
                            <form onSubmit={handleSignup}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            </form>
                            <div className="mt-3 text-center">
                                <GoogleOAuthProvider clientId="843338869291-q188tfcfasg9f8dfohu06ms9qaggqbmj.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSignup}
                                        onError={handleGoogleFailure}
                                    />
                                </GoogleOAuthProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
