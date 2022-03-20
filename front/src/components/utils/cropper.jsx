import React, { PureComponent } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';

export class Cropper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      crop: null,
      image: null,
      isLoaded: false, // Existe car sinon l'asynchrone casse tout
    };
  }

  onLoaded = (image) => {
    let aspect = 1
    if(this.props.type === 'user'){
      aspect = 1.25
    }
    const defaultDimension = image.width < image.height ? image.width : image.height;
    const crop = {
      x: (image.width - defaultDimension) / 2,
      y: (image.height - defaultDimension) / 2,
      width: defaultDimension/ aspect,
      height: defaultDimension,
      aspect: 1/aspect,
    };
    this.setState({ isLoaded: false }, () => {
      this.setState(
        {
          image,
          crop,
        },
        () => {
          this.setState({ isLoaded: true });
          this.getCroppedImg(this.state.image, this.state.crop);
        },
      );
    });
  };

  onCropChange = (crop) => {
    if (this.state.isLoaded) {
      this.setState({ crop });
    }
  };

  onCropComplete = (crop) => {
    if (this.state.image && this.state.crop) {
      this.getCroppedImg(this.state.image, crop);
    }
  };

  /**
   * This let pass from the crop to a cropped image
   * @param {File} image - Image File Object
   * @param {Object} crop - crop Object
   * @param {String} fileName - Name of the returned file in Promise
   */
  getCroppedImg = async (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;

    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleX,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
    canvas.toBlob(
      blob =>
        this.props.changeParentFile(new File([blob], 'croppedImage.png', { type: 'image/png' })),
      'image/png',
    );
  };

  render() {
    return (
      <ReactCrop
        src={this.props.src}
        crop={this.state.crop}
        onImageLoaded={this.onLoaded}
        onChange={this.onCropChange}
        onComplete={this.onCropComplete}
        minWidth={1} // Il fallait bien choisir
        keepSelection
        imageStyle={this.props.style}
      />
    );
  }
}
export default Cropper;
