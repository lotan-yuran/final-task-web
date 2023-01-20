import { styled } from "@mui/system";
import { ListItemButton } from "@mui/material";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.itemlist.main
  }
}));
