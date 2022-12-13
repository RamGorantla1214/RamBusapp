import {useEffect, useState} from "react";
import URL from "../env";
import '../styles/Profile.css';

function Profile(props){
    const email = localStorage.getItem('user_email');
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch(`${URL}/bookings/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => {
                setBookings(data);
            });
    }, [email, props.success]);
return (
    <div className="current-bookings">
        <h1>Current Bookings</h1>
        <table>
            <thead>
            <tr>
                <th>Route</th>
                <th>Seat No.</th>
            </tr>
            </thead>
            <tbody>
            {bookings.map((booking) => {
                return <tr key={`${booking.route}${booking.seat}`}>
                    <td>{booking.route}</td>
                    <td>{booking.seat}</td>
                </tr>
            })}
            </tbody>
        </table>

    </div>
);
}

export default Profile;