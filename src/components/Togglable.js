import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Togglable = (
  { children, showButtonLabel = "show", hideButtonLabel = "hide" },
  ref
) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{showButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {React.cloneElement(children, { toggleVisibility })}
        <button onClick={toggleVisibility}>{hideButtonLabel}</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
}

export default React.forwardRef(Togglable)
