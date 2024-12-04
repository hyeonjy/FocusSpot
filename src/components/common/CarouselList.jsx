import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { deviceSizes } from '../../styles/theme';

const CarouselList = ({ children }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: deviceSizes.laptop,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: deviceSizes.tablet,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: deviceSizes.mobile,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default CarouselList;
