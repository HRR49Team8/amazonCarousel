import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

class CarouselItem extends React.Component {
  constructor(props){
    super(props)
    this.hoverHandler = this.hoverHandler.bind(this)
 }

  hoverHandler(event) {
    this.props.changeActive(event.target.src)
  }

  render() {

    return (
      <div className="image">
       <img onMouseOver={this.hoverHandler} src={this.props.image} width="40" height="50" />
      </div>
    )
  }
}

export default CarouselItem