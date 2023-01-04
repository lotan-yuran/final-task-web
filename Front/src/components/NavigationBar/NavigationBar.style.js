import { styled } from "@mui/system";
import { TextField, Typography } from "@mui/material";

export const StyledTypography = styled(Typography)({
  flexGrow: 1,
  textDecoration: "none",
  boxShadow: "none",
  color: "#fff"
});

export const SearchTextField = styled(TextField)(({ theme }) => ({
  marginRight: 10,
  backgroundColor: theme.palette.action.main,
  borderRadius: 25,

  "& .MuiInputBase-input.MuiFilledInput-input.MuiInputBase-inputSizeSmall": {
    padding: "7px 15px"
  }
}));
