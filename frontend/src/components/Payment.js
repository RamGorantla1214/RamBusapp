import '../styles/Payment.css';
function Payment(){
    return (
        <div className="credit-card-details">
            <h1>Enter you credit card details</h1>
            <form>
                <input type="text" placeholder="Card Number"/>
                <input type="text" placeholder="Name on Card"/>
                <input type="text" placeholder="Expiry Date"/>
                <input type="text" placeholder="CVV"/>
            </form>
        </div>
    );
}

export default Payment;