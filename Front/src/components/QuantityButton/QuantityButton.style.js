import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const StyledQuantityButton = styled(Button)({
  "&.Mui-disabled": {
    color: "#c0c0c0"
  },
  "&.MuiButton-outlined.Mui-disabled": {
    background: "#d9d6d6",
    color: "black"
  },
  "&.MuiButton-contained.Mui-disabled": {
    background: "#eaeaea",
    color: "#c0c0c0"
  }
});
