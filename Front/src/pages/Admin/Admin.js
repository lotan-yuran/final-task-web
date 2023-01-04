import { useState } from "react";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import { itemsState } from "../../Recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, List, Paper, Typography } from "@mui/material";
import { DeleteConfirmPopup, ListItemAdmin } from "../../components";

export const Admin = () => {
  const [checked, setChecked] = useState([]);
  const [items, setItems] = useRecoilState(itemsState);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const isChecked = id => {
    return checked.includes(id) ? true : false;
  };

  const handleCheck = event => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const handleDeleteItems = () => {
    if (checked.length === 0) {
      // TODO: message to client
    } else {
      const itemIdsToDelete = new Set(checked);
      // TODO: Need to delete from db!
      setItems(prevItems => {
        return prevItems.filter(item => {
          // return those items that their id not in the itemIdsToDelete
          return !itemIdsToDelete.has(item._id);
        });
      });
    }
    setChecked([]);
    setOpenDeletePopup(false);
  };

  return (
    <>
      <Paper elevation={2} sx={{ width: "100%", maxWidth: 700, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography component="span" variant="body2" color="text.primary" fontWeight="bold">
              Items
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" size="small" color="success" startIcon={<DeleteIcon />} sx={{ m: 1 }}>
              Add Item
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => setOpenDeletePopup(true)}
              startIcon={<DeleteIcon />}
              sx={{ m: 1 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <List dense sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}>
          {items.map((item, index) => {
            return <ListItemAdmin key={index} item={item} handleCheck={handleCheck} isChecked={isChecked} />;
          })}
        </List>
      </Paper>
      <DeleteConfirmPopup
        open={openDeletePopup}
        handleCancel={() => setOpenDeletePopup(false)}
        handleDelete={handleDeleteItems}
        text={`Are you sure you want to delete the following items?`}
        checked={checked}
      />
    </>
  );
};
