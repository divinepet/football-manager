import React, { useState, useRef, useEffect } from 'react';
import './TabSlider.css';

export default function TabSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({});
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef(null);
  const tabRefs = [useRef(null), useRef(null)];

  useEffect(() => {
    const tabEl = tabRefs[activeTab].current;
    if (tabEl) {
      setSliderStyle({
        width: tabEl.offsetWidth,
        left: tabEl.offsetLeft,
      });
    }
  }, [activeTab]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartX.current;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    const threshold = 50;

    if (dragOffset < -threshold && activeTab < 1) {
      setActiveTab(activeTab + 1);
    } else if (dragOffset > threshold && activeTab > 0) {
      setActiveTab(activeTab - 1);
    }

    setIsDragging(false);
    setDragOffset(0);
    touchStartX.current = null;
  };

  const getTransform = () => {
    const baseX = -activeTab * 100;
    const dragPercent = (dragOffset / window.innerWidth) * 100;
    return `translateX(calc(${baseX}% + ${dragPercent}%))`;
  };

  return (
    <div className="tab-container">
      <div className="tabs">
        <div
          ref={tabRefs[0]}
          className={`tab ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Вкладка 1
        </div>
        <div
          ref={tabRefs[1]}
          className={`tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Вкладка 2
        </div>
        <div className="slider" style={sliderStyle} />
      </div>

      <div
        className="tab-content-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`tab-content-inner ${isDragging ? 'dragging' : ''}`}
          style={{ transform: getTransform() }}
        >
          <div className="tab-panel">Содержимое первой вкладки</div>
          <div className="tab-panel">Содержимое второй вкладки</div>
        </div>
      </div>
    </div>
  );
}