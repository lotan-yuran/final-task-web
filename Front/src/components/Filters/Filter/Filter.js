import { useState } from "react";
import { StyledDiv } from "./Filter.style";
import Popover from "@mui/material/Popover";

export const Filter = ({ title, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <StyledDiv onClick={handleClick}>{title}</StyledDiv>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        {children}
      </Popover>
    </div>
  );
};
