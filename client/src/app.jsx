import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import axios from 'axios';
import Carousel from './carousel.jsx';
import ActiveImage from './activeImage.jsx';
import Modal from './modal.jsx';
import ImageZoom from './imageZoom.jsx';
import {Container} from './styleFile.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      images: [],
      activeImage: '',
      showModal: false,
      showZoom: false,
      zoomParameters: {
        imgSrc: '',
        x: 0,
        y: 0,
      },
    };
    this.changeActive = this.changeActive.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleZoomOn = this.toggleZoomOn.bind(this);
    this.toggleZoomOff = this.toggleZoomOff.bind(this);
  }

  componentDidMount() {
    const random = Math.floor(Math.random() * Math.floor(10));
    this.getImages(random);
  }

  getImages(val) {
    // var val = Math.floor(Math.random() * (10000000));
    var val = Math.floor(Math.random() * (1000000) + 9000000);
    axios.get(`/api/product/${val}`)
      .then(response => {
        console.log('response from get call is ', response);
        this.setState({
          productName: response.data[0].productname,
          images: response.data[0].images,
          activeImage: response.data[0].images[0],
        });
      });
  }

  changeActive(image) {
    this.setState({
      activeImage: image,
    });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  toggleZoomOn (image, x, y) {
    this.setState({
      showZoom: true,
      zoomParameters: {
        imgSrc: image,
        x: ((x / 600) * 100) - 5,
        y: ((y / 600) * 100) - 5,
      },
    });
  }

  toggleZoomOff () {
    this.setState({
      showZoom: false,
      zoomParameters: {
        imgSrc: '',
        x: 0,
        y: 0,
      },
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Carousel images={this.state.images} changeActive={this.changeActive} />
          < ActiveImage activeImage={this.state.activeImage} toggleModal={this.toggleModal} toggleZoomOn= {this.toggleZoomOn} toggleZoomOff= {this.toggleZoomOff} />
          <ImageZoom showZoom={this.state.showZoom} zoomParameters={this.state.zoomParameters}/>
        </Container>
        <Modal showModal={this.state.showModal} toggleModal={this.toggleModal} images={this.state.images} activeImage={this.state.activeImage} productName={this.state.productName} changeActive={this.changeActive}/>
      </div>
    );
  }
}

export default App;