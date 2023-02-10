import React, { useState } from "react";
import "./Button.css";
import Icon from "../Icon/Icon";


export default function ({ icon, value, bgColor, textColor, iconColor }) {

  return (
    <button
      className="faq-btn flex items-center"
      style={{
        color: textColor,
        backgroundColor: bgColor,
        padding: '6px 8px',
        borderRadius: 7,
        fontSize: 15
      }}
    >
      {icon && <Icon color={iconColor} name={icon} sizeText="small" />}
      <span className="faq-btn__value">{value}</span>
    </button>
  );
}
