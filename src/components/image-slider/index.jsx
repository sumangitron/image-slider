import { useEffect } from "react";
import "./style.css";
import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    (async function fetchImages() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://picsum.photos/v2/list?page=1&limit=5"
        );
        const data = await response.json();
        console.log(data);

        if (data) {
          setImages(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading data ! please wait</div>;
  }

  if (error !== null) {
    return <div>Something Wrong!!</div>;
  }

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={handlePrevious}
      />
      {images?.map((imageItem, index) => {
        return (
          <img
            key={imageItem.id}
            src={imageItem.download_url}
            alt="image"
            className={
              currentSlide === index
                ? "current-image"
                : "current-image hide-other-image"
            }
          />
        );
      })}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={handleNext}
      />
      <span className="circle-indicators">
        {images?.map((_, index) => {
          return (
            <button
              key={index}
              className={
                currentSlide === index
                  ? "current-indicator"
                  : "current-indicator inactive-indicator"
              }
              onClick={() => setCurrentSlide(index)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default ImageSlider;
