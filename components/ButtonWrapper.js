import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

const ButtonWrapper = ({ style, children, onClick }) => (
  <Button type="button" bsStyle={style} onClick={()=>{onClick()}}>{children}</Button>
)

ButtonWrapper.propTypes = {
  style: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ButtonWrapper