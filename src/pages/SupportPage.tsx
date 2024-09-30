import "../css/supportpage.css";
import paypal from "../paypal.webp";

const SupportPage = () => {
  return (
    <div className="support-area">
      <header>
        <div className="paypal-container">
          Like this app? Buy me a coffee <br />
          <a href="https://paypal.me/AskBigStend?country.x=RO&locale.x=en_US">
            <span className="paypal-text">
              <img src={paypal} alt="paypal logo" />
              Buy me a coffee :)
            </span>
          </a>
        </div>
        <img
          src="/assets/character.webp"
          alt="pubg character"
          className="character-img"
        />
      </header>
    </div>
  );
};

export default SupportPage;
