import Booking from "./Booking";
import '../styles/Home.css';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import URL from '../env';

function Home() {
    const email = localStorage.getItem('user_email');
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
            if (!email) {
                navigate('/');
            }
        }
        , [email]);

    useEffect(() => {
        fetch(`${URL}/users/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => {
                setUsername(data.name);
            }, [email]);
    });

    function handleSignOut(e){
        e.preventDefault();
        localStorage.removeItem('user_email');
        navigate('/');
    }


        return (
            <div className="home">
                <header>
                    <div>
                        <h1>The Bus App</h1>
                        <p>Book your next trip with us!</p>
                    </div>
                    <h1>Hello {username} !</h1>
                    <button className="sign-out-button" onClick={handleSignOut} type="submit">Sign Out</button>
                </header>
                <div className="home-container">
                <Booking email={email}/>
                </div>
                <footer>
                    <p>&copy; {new Date().getFullYear().toString()} The Bus App</p>
                </footer>
            </div>
        );

}

export default Home;