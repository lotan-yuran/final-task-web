import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { StyledButton, StyledBoxWrapper } from "./ManageHeader.style";

export const ManageHeader = ({ title, setOpenAddPopup, setOpenDeletePopup }) => {
  return (
    <StyledBoxWrapper>
      <Box>
        <Typography component="span" variant="body2" color="text.primary" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Box>
        <StyledButton
          variant="contained"
          size="small"
          color="success"
          onClick={() => setOpenAddPopup(true)}
          startIcon={<Add />}
        >
          Add Item
        </StyledButton>
        <StyledButton
          variant="contained"
          size="small"
          onClick={() => setOpenDeletePopup(true)}
          startIcon={<Delete />}
        >
          Delete
        </StyledButton>
      </Box>
    </StyledBoxWrapper>
  );
};
