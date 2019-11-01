import React from 'react';
import { Image } from 'react-bootstrap/Image';
import { URL_IMG, IMG_SIZE_SMALL } from '../const';

export default function Cast({cast}) {
  return (
    <Image src={URL_IMG+IMG_SIZE_SMALL+cast.profile_path} alt={cast.name} thumbnail >
      <p>{cast.name}</p>
    </Image>
  );
}

Cast.propTypes = {
  cast: React.PropTypes.shape({
    profile_path: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  })
};