import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {CarouselIMG} from './styleFile.jsx'

class CarouselItem extends React.Component {
  // console.log('props in Carousel Item are ', props);
  constructor(props) {
    super(props);
    this.hoverHandler = this.hoverHandler.bind(this);
  }

  hoverHandler(event) {
    this.props.changeActive('ht' + event.target.src);
  }

  render() {
    return (
      <div className="image">
        <CarouselIMG onMouseOver={this.hoverHandler} src={this.props.image} />
      </div>
    );
  }
}

export default CarouselItem;

// substring needs to happen on the props passed in
// tried src substring(2), sorta works, but screw up the image when hovered over