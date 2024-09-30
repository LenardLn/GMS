import "../css/homepage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="homepage">
        <div className="intro center">
          <header> Gun Mechanics Simulator</header>
          <p>
            This project is designed to replicate and simulate the intricate
            recoil patterns of firearms in PUBG, specifically focusing on 5.56mm
            and 7.62mm weapons. <br />
            <br /> The goal of this project is to provide an authentic and
            realistic simulation, helping players understand weapon behavior and
            optimize their loadouts for better in-game performance.
          </p>
        </div>
        <div className="grid-area center">
          <img id="s1" src="/assets/vertical_grip.webp" alt="vertical grip" />
          <img id="s2" src="/assets/compensator.webp" alt="compensator" />
          <img id="s3" src="/assets/thumb_grip.webp" alt="thumb grip" />
          <img id="s4" src="/assets/tactical_stock.webp" alt="tactical stock" />
          <Link id="cover-text" to="/calculator">
            <div>Calculator</div>
          </Link>
          <img id="pan" src="/assets/pan.svg" alt="pan" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
