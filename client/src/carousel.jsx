import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CarouselItem from './carouselItem.jsx';

const Carousel = (props) => {

  return (
   <div>
      {props.images.map((image, index) => {
        return (
          <CarouselItem image={image.substring(2)} key={index} changeActive={props.changeActive}/>
        )
      })}
    </div>
  )
};

export default Carousel;

//to deal with active image, we'll take away substring(2) from