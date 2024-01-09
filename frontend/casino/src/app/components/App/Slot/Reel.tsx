import { useState, useEffect, useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import symbols2 from "../../../pages/SlotGamePage/symbols2";

function Reel({ isHorizontal, rng, rngReverse, cellCount }) {
  const carousel = useRef(null);
  const refs = useRef([]);
  const cells = refs.current.map((value) => value);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  let rotateFn = isHorizontal ? "rotateY" : "rotateX";
  let radius;
  let theta;
  let cellAngle;

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    return cellCount < 7
      ? setSelectedIndex(selectedIndex + randomNumberInRange(3, 6))
      : setSelectedIndex(selectedIndex + randomNumberInRange(6, 14));
  }, [rng]);
  useEffect(() => {
    return cellCount < 7
      ? setSelectedIndex(selectedIndex + randomNumberInRange(-3, -6))
      : setSelectedIndex(selectedIndex + randomNumberInRange(-6, -14));
  }, [rngReverse]);

  useLayoutEffect(() => {
    setWidth(carousel.current.offsetWidth);
    setHeight(carousel.current.offsetHeight);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    theta = 360 / cellCount;
    rotateFn = isHorizontal ? "rotateY" : "rotateX";
    const angle = theta * selectedIndex * -1;
    carousel.current.style.transform = `translateZ(${-radius}px) ${rotateFn}(${angle}deg)`;
  }, [selectedIndex]);

  function rotateCarousel() {
    const angles = theta * selectedIndex * -1;
    carousel.current.style.transform = `translateZ(${-radius}px) ${rotateFn}(${angles}deg)`;
  }

  function changeCarousel() {
    theta = 360 / cellCount;
    const cellSize = isHorizontal ? width : height;
    radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount));
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (i < cellCount) {
        cell.style.opacity = 1;
        cellAngle = theta * i;
        cell.style.transform = `${rotateFn}(${cellAngle}deg) translateZ(${radius}px)`;
        rotateCarousel();
      } else {
        cell.style.opacity = 0;
        cell.style.transform = "none";
      }
    }
  }

  function onOrientationChange() {
    rotateFn = isHorizontal ? "rotateY" : "rotateX";
    changeCarousel();
  }
  // set initials
  onOrientationChange();

  return (
    <div className="scene">
      <div className="carousel" ref={carousel}>
        {symbols2.map((c, index) => (
          <div
            key={c.id}
            className={`carousel__cell flex bg-white ${c.transform}`}
            ref={(element) => {
              refs.current[index] = element;
            }}
          >
            <img src={c.src} alt="..." className="h-24 w-24 m-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

Reel.propTypes = {
  isHorizontal: PropTypes.bool.isRequired,
  cellCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  rng: PropTypes.bool.isRequired,
  rngReverse: PropTypes.bool.isRequired,
};
export default Reel;
