import React, { useState, useRef, useEffect } from 'react';
import './TabSlider.scss';
import { useSwipeable } from 'react-swipeable';
import HeadToHeadMatchView from '../HeadToHeadMatchView/HeadToHeadMatchView';
import Field from '../Field/Field';

export default function TabSlider({ h2h }) {
	const [activeTab, setActiveTab] = useState(0);
	const [sliderStyle, setSliderStyle] = useState({});
	const [dragOffset, setDragOffset] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const startX = useRef(null);
	const tabRefs = [useRef(null), useRef(null)];

	const startY = useRef(null);

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
		startX.current = e.touches[0].clientX;
		startY.current = e.touches[0].clientY;
		setIsDragging(true);
	};

	const handleTouchMove = (e) => {
		if (!isDragging) return;

		const currentX = e.touches[0].clientX;
		const currentY = e.touches[0].clientY;
		const deltaX = currentX - startX.current;
		const deltaY = currentY - startY.current;

		// Если вертикальное движение больше горизонтального — не свайпаем
		if (Math.abs(deltaY) > Math.abs(deltaX)) {
			setIsDragging(false); // отменяем drag
			return;
		}

		e.preventDefault(); // блокируем горизонтальный scroll браузера
		setDragOffset(deltaX);
	};

	const handleTouchEnd = () => {
		const threshold = 60;

		if (dragOffset < -threshold && activeTab < 1) {
			setActiveTab(activeTab + 1);
		} else if (dragOffset > threshold && activeTab > 0) {
			setActiveTab(activeTab - 1);
		}

		setIsDragging(false);
		setDragOffset(0);
		startX.current = null;
	};

	const getTransform = () => {
		const baseX = -activeTab * 100;
		const dragX = (dragOffset / window.innerWidth) * 100;
		return `translateX(calc(${baseX}% + ${dragX}%))`;
	};

	return (
		<div className="tab-container">
			<div className="tabs">
				<div
					ref={tabRefs[0]}
					className={`tab ${activeTab === 0 ? 'active' : ''}`}
					onClick={() => setActiveTab(0)}
				>
					Личные встречи
				</div>
				<div
					ref={tabRefs[1]}
					className={`tab ${activeTab === 1 ? 'active' : ''}`}
					onClick={() => setActiveTab(1)}
				>
					Состав
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
					style={{ transform: getTransform(), transition: isDragging ? 'none' : 'transform 0.3s ease' }}
				>
					<div className="tab-panel scrollable">
						<div className="h2h">
							{h2h.length === 0 && <div>Нет данных</div>}
							{h2h.length > 0 &&
								h2h.map((match) => <HeadToHeadMatchView key={match.id} match={match} />)}
						</div>
					</div>

					<div className="tab-panel">
						<Field />
					</div>
				</div>
			</div>
		</div>
	);
}