import React from 'react';
import './About.css'; // Ensure you create an About.css file for styling

const About = () => {
  const technologies = [
    {
      title: "Technical Department",
      description: "Once harvested, rice is transported to our mills for post-processing. Given the vast quantities processed daily, modernization and technological advancements are essential to meet growing demand, maintain profitability, and ensure product quality. Over the years, we’ve invested in new machinery, skilled technicians, and optimized workflows to streamline operations, improve product quality, and prioritize safety. Our well-trained staff diligently monitors equipment and processes, promptly addressing any issues. Stringent quality checks and safety protocols are enforced throughout the facility.",
      image: "Technical-Department.jpg" // Replace with your image path
    },
    {
      title: "Laborataries",
      description: "Our dedicated research and development laboratory focuses on continually improving rice cultivation, harvesting, and processing. We meticulously analyze rice characteristics, including grain length, stickiness, texture, flavor, and aroma, to ensure superior quality. Asian rice varieties primarily fall into two categories: Indica (long-grain) and Japonica (short-grain). While grain length and stickiness are largely determined by genetics and cultivation, post-processing significantly impacts aroma and flavor. Minimizing broken rice during milling is crucial for optimal taste. Rigorous laboratory testing on random samples safeguards product consistency and identifies any quality deviations.",
      image: "Laboratories-1.jpg" // Replace with your image path
    },
    {
      title: "Milling Process",
      description: "Consumers generally favor rice with minimal broken kernels. Most rice varieties consist of approximately 20% hull, 11% bran layers, and 69% starchy endosperm, collectively known as total milled rice. This milled rice comprises whole grains (head rice) and broken rice fragments. Rice milling by-products include the hull, germ, bran layers, and broken riceThe rice milling process begins by feeding paddy grains into the indent cylinder’s feed inlet at the cylinder’s upper end. The indentations capture undersized grains, which are carried upward as the cylinder rotates. Gravity dislodges these grains into a flared trough screw conveyor for removal. Whole grains remain at the cylinder’s bottom and exit through a separate outlet. Rice is the primary product derived from paddy and undergoes further processing to produce various secondary and tertiary commodities.",
      image: "mill.jpeg" // Replace with your image path
    }
  ];

  return (
    <div className="about-page">
      <h1 className="about-title">About Our Rice Mill</h1>
      <p className="about-description">
        We embrace modern technologies to enhance our rice production process, ensuring quality and sustainability.
      </p>

      {/* New Production Section */}
      <div className="production-section">
        <h2 className="production-title">Production</h2>
        <p className="production-description">
          One of our key differentiators in Kerala’s competitive rice market is our state-of-the-art manufacturing facility. 
          Our plant integrates modern rice machines alongside traditional processes. We consistently stay ahead of the curve in paddy 
          processing and hygiene, rapidly adopting new technologies to improve our production, packaging, and delivery.
        </p>
        <p className="production-description">
          Our production process is subject to rigorous quality checks. Every step is monitored to ensure seamless operations and 
          product integrity. From the initial stages of cultivation to the final packaging, each grain undergoes multiple inspections. 
          This attention to detail guarantees that only the highest quality rice reaches our customers.
        </p>
      </div>

      {/* Technologies Section */}
      <div className="technologies-container">
        {technologies.map((tech, index) => (
          <div key={index} className="technology-card">
            <img src={tech.image} alt={tech.title} className="technology-image" />
            <h3 className="technology-title">{tech.title}</h3>
            <p className="technology-description">{tech.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
