import { useState } from "react";
import Modal from "../components/Model"; // Verwijs naar de juiste pad
import "../styles/Home.css"; // Verwijs naar de juiste css map

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartClick = () => {
    setIsModalOpen(true); // Open de modal bij klikken
  };

  const closeModal = () => {
    setIsModalOpen(false); // Sluit de modal
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Beheer je Taken Eenvoudig</h1>
        <p>Een krachtige tool om je productiviteit te verbeteren en georganiseerd te blijven.</p>
        <button className="cta-button" onClick={handleStartClick}>Start Nu</button>
      </header>

      {/* Controleer of de modal wordt geopend */}
      {isModalOpen && (
        <Modal 
          message="Logging in is nodig. Heb je geen account? Maak dan eenvoudig een account." 
          onClose={closeModal} 
        />
      )}

      <section className="features-section">
        <h2>Waarom Onze Tool?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Overzichtelijke Takenlijst</h3>
            <p>Bekijk, maak en beheer taken op één centrale plek.</p>
          </div>
          <div className="feature-card">
            <h3>Realtime Synchronisatie</h3>
            <p>Houd je taken altijd up-to-date, waar je ook bent.</p>
          </div>
          <div className="feature-card">
            <h3>Flexibele Organisatie</h3>
            <p>Voeg prioriteiten, deadlines en categorieën toe aan je taken.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>Hoe Werkt Het?</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Maak een Takenlijst</h3>
            <p>Voeg eenvoudig taken toe met beschrijvingen en deadlines.</p>
          </div>
          <div className="step">
            <h3>2. Volg je Voortgang</h3>
            <p>Markeer taken als voltooid en bekijk je voortgang in realtime.</p>
          </div>
          <div className="step">
            <h3>3. Bereik Meer</h3>
            <p>Gebruik de tool om je productiviteit te maximaliseren.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
