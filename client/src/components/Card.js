
import Chip from '../images/chip.svg';

const Card = ({number,name,expiry,cvv,cvvFocused,setCvvFocused}) => {
    const formatCardNumber = (number) =>{
        const cleanedNumber = number.replace(/\D/g, '');
        const formattedNumber = cleanedNumber.replace(/(\d{4}(?=\d))/g, '$1 ');
        return formattedNumber;
    }

    const handleCardHover = () => {
        // Set cvvFocused to true when the card is hovered
        setCvvFocused(true);
      }
    
    const handleCardLeave = () => {
        // Set cvvFocused to false when the mouse leaves the card
        setCvvFocused(false);
    }

    return ( 
        <div className="Card" onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
            {!cvvFocused ? (
            <div className="card-container">
                <img src={Chip} alt="Chip icon" />
                <span className='number'>{formatCardNumber(number) || '0000 0000 0000 0000'}</span>
                <div className="info">
                    <div className="dataL">
                        <p> Card Holder</p>
                        <span>{name || 'Full Name'}</span>
                    </div>
                    <div className="dataR">
                        <p> Expires</p>
                        <span> {expiry || 'MM/YY'}</span>
                    </div>
                </div>
            </div>
            ) : (
            <div className="card-container-cvv">
                <div className="line"/>
                <div className="info">
                    <span>CVV:</span>
                    <span>{cvv || '000'}</span>
                </div>
            </div>
            )}
        </div>
    );
}
 
export default Card;