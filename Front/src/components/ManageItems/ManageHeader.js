import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
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
          startIcon={<DeleteIcon />}
        >
          Add Item
        </StyledButton>
        <StyledButton
          variant="contained"
          size="small"
          onClick={() => setOpenDeletePopup(true)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </StyledButton>
      </Box>
    </StyledBoxWrapper>
  );
};
