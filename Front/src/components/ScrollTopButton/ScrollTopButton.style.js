import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const StyledButtom = styled(Button, {
  shouldForwardProp: prop => prop !== "visible"
})(({ theme, visible }) => ({
  borderRadius: "50%",
  height: "50px",
  width: "50px",
  position: "fixed",
  bottom: "50px",
  right: "50px",
  cursor: "pointer",
  minWidth: "0",
  display: visible ? "block" : "none",
  color: theme.palette.action.main,
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.action.hover
  }
}));
