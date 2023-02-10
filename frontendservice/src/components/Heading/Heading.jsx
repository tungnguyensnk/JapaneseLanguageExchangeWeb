import React from "react";

const headingOpt = {
  small: 16,
  medium: 18,
  big: 24
};

export default function ({ size, title, color }) {
  return (
    <p style={{
      fontSize: headingOpt[size],
      fontWeight: 500,
      color: color ?? ''
    }}>
      {title}
    </p>
  );
}
