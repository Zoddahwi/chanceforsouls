import React, { useState, useRef, useEffect } from 'react';

const AnimatedCard = ({ dataImage, header, content, onClick, className = '' }) => {
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const mouseLeaveDelay = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      setDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dimensions.width / 2;
    const y = e.clientY - rect.top - dimensions.height / 2;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (mouseLeaveDelay.current) clearTimeout(mouseLeaveDelay.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseLeaveDelay.current = setTimeout(() => {
      setMousePosition({ x: 0, y: 0 });
    }, 1000);
  };

  const mousePX = mousePosition.x / dimensions.width;
  const mousePY = mousePosition.y / dimensions.height;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
  };

  const cardBgTransform = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
  };

  const cardBgImage = {
    backgroundImage: `url(${dataImage})`,
  };

  return (
    <div
      className={`card-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      ref={cardRef}
    >
      <div className={`card-3d ${isHovered ? 'is-hovered' : ''}`} style={cardStyle}>
        <div className="card-bg" style={{ ...cardBgTransform, ...cardBgImage }}></div>
        <div className="card-info">
          <div className="card-info-header">{header}</div>
          <div className="card-info-content">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
