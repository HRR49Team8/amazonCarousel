import React from 'react';
import styled from 'styled-components';
import { ZoomModal } from './styleFile.jsx'

class ImageZoom extends React.Component {
  constructor(props){
    super(props);
 }

  render() {
    if (this.props.showZoom) {
      return (
        <ZoomModal src={this.props.zoomParameters.imgSrc} x={this.props.zoomParameters.x} y={this.props.zoomParameters.y}>
        </ZoomModal>
      )
    } else {
      return null;
    }
  }
}

export default ImageZoom;
