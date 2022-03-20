import React, { Component } from 'react';
import {
  Modal, Form, Input, Button, Icon, Message,
} from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Cropper } from './cropper';
import config from '../../config.json';

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '', error: '' };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('file', this.state.file);
    axios({
      method: 'put',
      url: config.back_Url + this.props.uploadUrl,
      headers: {
        Token: localStorage.getItem('killerToken'),
        'Content-Type': 'multipart/form-data',
      },
      data,
    }).then((res) => {
      this.props.handleSubmit(res.data);
    });
  };

  handleImageChange = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  cropSent = (croppedImage) => {
    // On récupère l'image croppée
    this.setState({ file: croppedImage });
  };

  render() {
    const { imagePreviewUrl } = this.state;
    let ImagePreview = null;
    if (imagePreviewUrl) {
      ImagePreview = (
        <div style={{ }}>
          <Cropper
            src={imagePreviewUrl}
            changeParentFile={this.cropSent}
            style={{  }}
            type={this.props.type}
          />
        </div>
      );
    }

    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.handleSubmit({})}
        closeOnEscape
        closeOnDimmerClick={!this.props.cropper}
        closeIcon
        style={{minwidth: '60vw', minHeight: '50vh', padding: '1em'}}
      >
        
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <label htmlFor="fileImage">
              <span className="ui button">
                <Icon name="file" />
                {this.state.file ? 'Choisir une autre photo' : 'Choisir une photo'}
              </span>
            </label>
            <Input
              id="fileImage"
              type="file"
              accept="image/png, image/jpeg, image/gif"
              style={{ display: 'none' }}
              onChange={this.handleImageChange}
            />

            <Button positive type="submit" disabled={!this.state.file} onClick={this.handleSubmit}>
              <Icon name="upload" />
              Importer la photo
            </Button>
          </Form.Group>
          <p style={{ textAlign: 'center', marginTop: '40px' }}>
            L&rsquo;image ne doit pas dépasser 1 Mo
          </p>
          {this.state.error !== '' && <Message error header="Erreur" content={this.state.error} />}
        </Form>
        {ImagePreview}
      </Modal>
    );
  }
}

ImageUploader.propTypes = {
  uploadUrl: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  open: PropTypes.bool,
  cropper: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

ImageUploader.defaultProps = {
  open: false,
  handleSubmit: () => {},
  cropper: false,
};

export default ImageUploader;
