import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledSearchTextField = styled(TextField)(({ theme }) => ({
    marginRight: 10,
    backgroundColor: theme.palette.action.main,
    borderRadius: 25,
  
    "& .MuiInputBase-input.MuiFilledInput-input.MuiInputBase-inputSizeSmall": {
      padding: "7px 15px"
    }
  }));
  