import {useEffect, useState, useRef} from "react";
import {useNavigate} from 'react-router-dom';

import URL from '../env';
import '../styles/Booking.css';
import Payment from "./Payment";
import Profile from "./Profile";

function Booking(props){
    const email = props.email;
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [price, setPrice] = useState(15);
    const [routeStart, setRouteStart] = useState('');
    const [routeEnd, setRouteEnd] = useState('');
    const seatRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${URL}/routes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => {
                setRoutes(data);
            });
    }, []);



    function handleBook(e){
        e.preventDefault();
        if (routeStart === routeEnd){
            setError('Start and End cannot be the same');
            setSuccess('');
            return;
        }

        const payload = {
            email: email,
            route: `${routeStart}-${routeEnd}`,
            seat: seatRef.current.value
        }


        fetch(`${URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
            , body: JSON.stringify({
                email: email,
                route: `${routeStart}-${routeEnd}`,
                seat: seatRef.current.value
            })
            }
        ).then(res => res.json())
            .then(data => {
                if(data.success === true){
                    setError('');
                    setSuccess(`Booking Successful for route ${routeStart} to ${routeEnd} for seat ${seatRef.current.value}`);
                    navigate('/home');
                }
                else{
                    setError('Seat is already booked! Please try another seat.');
                    setSuccess('');
                }
            }
        );
        }

        let startrouteSet = new Set();
        let endrouteSet = new Set();

        routes.map((route) => {
            startrouteSet.add(route.start);
        });
        routes.map((route) => {
            endrouteSet.add(route.end);
        });

    startrouteSet = Array.from(startrouteSet);
    endrouteSet = Array.from(endrouteSet);

    useEffect(() => {
        console.log(routeStart);
        console.log(routeEnd);
        let newPrice = routes.filter((route) => {
            return route.start === routeStart && route.end === routeEnd;
        });
        console.log(newPrice);
        if (newPrice.length > 0) {
            setPrice(newPrice[0].price);
        }

    },[routeStart, routeEnd, routes]);


    return(
        <div className="booking">
        <div className="booking-container">
            <div className="dropdown">
                <h1>Select Route and Seat No.</h1>
                <h3 className="error-message">{error}</h3>
                <h3 className="success-message">{success}</h3>
                <form>
                    <select value={routeStart} onChange={(e)=>{setRouteStart(e.target.value)}}>
                        {startrouteSet.map((startRoute) => {
                            return <option key={startRoute} value={startRoute}>{`${startRoute}`}</option>
                        }
                        )}
                    </select>
                    <select value={routeEnd} onChange={(e)=>(setRouteEnd(e.target.value))}>
                        {endrouteSet.map((endRoute) => {
                                return <option key={endRoute} value={endRoute}>{`${endRoute}`}</option>
                            }
                        )}
                    </select>
                    <select ref={seatRef}>
                        {Array.from(Array(50).keys()).map((seat) => {
                            return <option key={seat+1} value={seat+1}>{seat+1}</option>
                        }
                        )}
                    </select>
                    <select>
                        <option value="1">{new Date().toDateString().slice(4)}</option>
                    </select>
                </form>

            </div>
            <Payment/>

            <div className="price">
                <input type="text" value={`Price = EUR ${price}`} onChange={()=>(0)}/>
                <input type="text" value={"Tax: 18%"} onChange={()=>(0)}/>
                <input type="text" value={`Total = EUR ${price*1.18}`} onChange={()=>(0)}/>
            </div>
            <button className="book-button" type="submit" onClick={handleBook}>Book</button>
        </div>

            <Profile email={email} success={success}/>
        </div>
    )
}

export default Booking;