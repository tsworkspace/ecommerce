import { useNavigate } from "react-router-dom";
import "./welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to ShopEase</h1>
        <p className="welcome-tagline">Your favorite place to buy awesome stuff!</p>
        <button className="login-button" onClick={() => navigate("/user")}>
          Open
        </button>
      </div>
    </div>
  );
}