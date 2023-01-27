import React, { useState } from "react";
// import theme, { Font } from "styles/theme";

const Button = ({
  type,
  disabled = false,
  width,
  padding,
  radius,
  onClick,
  className,
  style,
  children,
}) => {
  const [isHover, setHover] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const setHoverClicked = (bool) => {
    setHover(bool);
    setClicked(bool);
  };
  const getColor = () => {
    switch (type) {
      case "primary":
        return {
          background: "linear-gradient(var(--gradient-red))",
          color: "var(--white)",
        };
      case "underline":
        return {
          textDecoration: "underline",
          color: "var(--red)",
          textUnderlineOffset: 3,
        };
      default:
        return {};
    }
  };

  const ButtonStyle = {
    width: width,
    padding: padding,
    borderRadius: radius,
    // transitionDuration: theme.duration,
    cursor: disabled ? "not-allowed" : "pointer",
    textAlign: "center",
    ...getColor(),
    ...style,
  };

  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={ButtonStyle}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHoverClicked(false)}
      onMouseDown={() => setClicked(!disabled)}
      onMouseUp={() => setClicked(false)}
      onTouchStart={() => setHoverClicked(true)}
      onTouchEnd={() => setHoverClicked(false)}
    >
      {children}
    </div>
  );
};

export default Button;
