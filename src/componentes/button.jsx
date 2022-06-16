import React from "react";
import './button.css'

export default props => {
    let classes = 'button '
    classes += props.operation ? 'operation ' : ''
    classes += props.double ? 'double ' : ''
    classes += props.downleft ? 'downleft' : ''
    classes += props.downright ? 'downright' : ''

    return (
    <button onClick={e => props.click && props.click(props.value)} className={classes}>
        {props.value}
    </button>)
}