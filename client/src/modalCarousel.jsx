import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import {ModalIMG, ModalContainerStyle, ModalActiveImageStyle, ModalProductNameStyle, ModalCarouselStyle, HeaderStyle, HeaderLine} from './styleFile.jsx';

class ModalCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: this.props.productName,
      images: this.props.images,
      activeImage: this.props.activeImage,
    };
    this.carouselOnClick = this.carouselOnClick.bind(this);
  }

  carouselOnClick(event) {
    this.setState({
      activeImage: 'ht' + event.target.src,
    });
  }

  render() {
    return (
      <ModalContainerStyle>
        <HeaderStyle>
          <p>Images</p>
        </HeaderStyle>
        <HeaderLine> </HeaderLine>
        <ModalProductNameStyle>
          {this.state.productName}
        </ModalProductNameStyle>
        <ModalActiveImageStyle>
          <img src={this.state.activeImage.substring(2)}  onClick={this.activeOnClick} width="750" height="600" />
        </ModalActiveImageStyle>
        <ModalCarouselStyle>
          {this.state.images.map((image) => {
            return (
              <ModalIMG src={image.substring(2)} onClick={this.carouselOnClick}/>
            );
          })}
        </ModalCarouselStyle>
      </ModalContainerStyle>
    );
  }
}

export default ModalCarousel;


//to deal with active image, we'll take image.substring(2) away from src