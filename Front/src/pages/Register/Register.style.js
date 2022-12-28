import { Box, Avatar, styled, Button, Alert } from "@mui/material";

export const StyledBoxRoot = styled(Box)({
  marginTop: 30,
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: 10,
  backgroundColor: theme.palette.primary.main
}));

export const StyledButtom = styled(Button)({
  margin: "10px 0"
});

export const StyledAlert = styled(Alert)({
  margin: "35px 0"
});
