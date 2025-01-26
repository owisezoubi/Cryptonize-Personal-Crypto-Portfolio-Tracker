// This is the AboutUs component, which displays information about the team and project.

import React from 'react'; // Import the React library
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for programmatic navigation
import { AboutUsStyles } from '../styles/AboutUsStyle'; // Import a styles object for this component
import YosraImage from '../icon/Yosra.webp'; // Import team member images
import OmriImage from '../icon/Omri.webp';
import OwiseImage from '../icon/Owise.webp';
import NoamImage from '../icon/Noam.webp';
import AdanImage from '../icon/Adan.webp';

const AboutUs = () => {
  const navigate = useNavigate(); // Hook to enable navigation to other routes

  // Handler to navigate back to the home page and scroll to top
  const handleBackToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Array of team members' details (image source, name, role)
  const teamMembers = [
    {
      name: 'Yosra Fhamne',
      image: YosraImage,
      role: 'Fourth-year B.Sc. Information Systems Engineering student',
    },
    {
      name: 'Omri Heit',
      image: OmriImage,
      role: 'Fourth-year B.Sc. Information Systems Engineering student',
    },
    {
      name: 'Owise Zoubi',
      image: OwiseImage,
      role: 'Third-year B.Sc. Software Engineering student',
    },
    {
      name: 'Noam Furman',
      image: NoamImage,
      role: 'Fourth-year B.Sc. Information Systems Engineering student',
    },
    {
      name: 'Adan Agayneh',
      image: AdanImage,
      role: 'Third-year B.Sc. Software Engineering student',
    },
  ];

  // Render the AboutUs content
  return (
    <div className={AboutUsStyles.container}>
      <h1 className={AboutUsStyles.title}>About Us</h1>
      <p className={AboutUsStyles.description}>
        We are a team of 5 students from Braude College of Engineering.
      </p>
      <p className={AboutUsStyles.description}>
        This application was built as part of our Web Technologies course project. It provides users with the ability to build and monitor their personal cryptocurrency portfolio.
      </p>
      <p className={AboutUsStyles.description}>
        The platform integrates real-time price updates, historical performance analysis, and offers insights on the best-performing assets.
      </p>
      <p className={AboutUsStyles.description}>Meet the team behind the project:</p>

      {/* Container holding individual team member cards */}
      <div className={AboutUsStyles.cardContainer}>
        {teamMembers.map((member, index) => (
          <div className={AboutUsStyles.card} key={index}>
            <img
              src={member.image}
              alt={member.name}
              className={AboutUsStyles.cardImage}
            />
            <p className={AboutUsStyles.cardName}>{member.name}</p>
            <p className={AboutUsStyles.cardRole}>{member.role}</p>
          </div>
        ))}
      </div>

      {/* Button to return to the home page */}
      <button onClick={handleBackToHome} className={AboutUsStyles.backButton}>
        Return
      </button>
    </div>
  );
};

export default AboutUs; // Export the AboutUs component as default
