import PropTypes from 'prop-types';

import style from '../css/mainInformation.module.css';

export const PlatformTag = ({platform}) => {
  return (
    <span className={`${style.platformTag}`}>{platform}</span>
  )
}

PlatformTag.propTypes = {
  platform: PropTypes.string.isRequired
}