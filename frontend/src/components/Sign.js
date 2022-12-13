import '../styles/Sign.css';
import {useNavigate} from 'react-router-dom';
import {useRef, useState, useEffect} from "react";
import URL from '../env';

function SignUp(){
    const email = localStorage.getItem('user_email');
    const navigate = useNavigate();
    useEffect(() => {
            if(email){
                navigate('/home');
            }
        }
        , [email]);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const ageRef = useRef();
    const [error, setError] = useState('');


    function handleSignUp(e){
        e.preventDefault();
        fetch(`${URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameRef.current.value,
                email: emailRef.current.value,
                age: ageRef.current.value,
                password: passwordRef.current.value
            })
        }).then(res => res.json())
        .then(data => {
            if (data.success === true) {
                console.log(data);
                localStorage.setItem('user_email', emailRef.current.value);
                navigate('/home');
            }
            else{
                setError('User already exists!');
            }

            });
        }

    return (
        <div className="sign-container">
            <div className="sign-up">
                <h1 className="company-name">The Bus App</h1>
                <form className="sign-up-form">
                    <h1>Sign Up. It's Free!</h1>
                    <h3 className="error-message">{error}</h3>
                    <input type="text" placeholder="Name" ref={nameRef} />
                    <input type="text" placeholder="Age" ref={ageRef} />
                    <input type="text" placeholder="Email" ref={emailRef} />
                    <input type="password" placeholder="Password" ref={passwordRef} />
                    <button className="sign-up-button" type="submit" onClick={handleSignUp}>Sign Up</button>
                    <button className="sign-up-in-button" type="submit" onClick={()=> {navigate('/signin')}}>Already a user, Sign In</button>

                </form>
            </div>
        </div>
    );
}

function SignIn(){
    const email = localStorage.getItem('user_email');
    const navigate = useNavigate();
    useEffect(() => {
            if(email){
                navigate('/home');
            }
        }
        , [email]);
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');


    function handleSignIn(e){
        e.preventDefault();
        fetch(`${URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
        }).then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    console.log(data);
                    localStorage.setItem('user_email', emailRef.current.value);
                    navigate('/home');
                }
                else{
                    setError('Invalid Credentials!');
                }

            });
    }

    return (
        <div className="sign-container">
            <div className="sign-in">
                <h1 className="company-name">The Bus App</h1>
                <form className="sign-in-form">
                    <h1>Sign In</h1>
                    <h3 className="error-message">{error}</h3>
                    <input type="text" placeholder="Email" ref={emailRef} />
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                    <button className="sign-in-button" type="submit" onClick={handleSignIn}>Sign In</button>
                    <button className="sign-up-button" type="submit" onClick={()=> {navigate('/')}}>Sign Up now !</button>
                </form>
            </div>
        </div>
    );
}

export {SignUp, SignIn};