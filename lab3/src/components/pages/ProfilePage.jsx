import React from 'react';
import '../../styles/profile.css';

function ProfilePage() {
    return (
        <section className="profile-container">
            <div className="profile-header">
                <img src="/images/profile-placeholder.jpg" alt="Profile" />
                <div>
                    <h2>Nicholas Tremor</h2>
                    <p>Email: wormsinmyeyes@gmail.com</p>
                    <button className="edit-profile">Edit</button>
                </div>
            </div>

            <div className="profile-section">
                <h3>Purchase history</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>'Abibas' Sneakers</td>
                        <td>2599 UAH</td>
                        <td>10.02.2025</td>
                    </tr>
                    <tr>
                        <td>InsertName</td>
                        <td>859.69 UAH</td>
                        <td>05.01.2025</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="profile-section">
                <h3>Wishlist</h3>
                <ul>
                    <li>'Kinin' Backpack</li>
                    <li>'Mechanix' Gloves</li>
                </ul>
            </div>
        </section>
    );
}

export default ProfilePage;