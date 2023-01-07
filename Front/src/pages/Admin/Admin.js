import { useState } from "react";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import { itemsState } from "../../Recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, List, Paper, Typography } from "@mui/material";
import { DeleteConfirmPopup, ListItemAdmin, EditItemPopup } from "../../components";

export const Admin = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const [checkedIds, setCheckedIds] = useState([]);
  const [editedItem, setEditedItem] = useState();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  const isChecked = id => {
    return checkedIds.includes(id) ? true : false;
  };

  const handleClickCheckItem = ItemId => {
    const currentIndex = checkedIds.indexOf(ItemId);
    const newCheckedIds = [...checkedIds];

    if (currentIndex === -1) {
      newCheckedIds.push(ItemId);
    } else {
      newCheckedIds.splice(currentIndex, 1);
    }

    setCheckedIds(newCheckedIds);
  };

  const handleClickEditItem = itemId => {
    const item = items.find(item => item._id === itemId);
    setEditedItem(item);
    setOpenEditPopup(true);
  };

  const handleDeleteConfirm = () => {
    if (checkedIds.length === 0) {
      // TODO: message to client
    } else {
      const itemIdsToDelete = new Set(checkedIds);
      // TODO: Need to delete from db!
      // Delete items that has been checked
      setItems(prevItems => {
        return prevItems.filter(item => {
          // return those items that their id not in the itemIdsToDelete
          return !itemIdsToDelete.has(item._id);
        });
      });
    }
    setCheckedIds([]);
    setOpenDeletePopup(false);
  };

  const handleEditConfirm = () => {
    // TODO: Need to edit on db!
    setItems(prevItems => {
      return prevItems.map(item => (item._id === editedItem._id ? editedItem : item));
    });
    setOpenEditPopup(false);
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
            return (
              <ListItemAdmin
                key={index}
                item={item}
                handleEditItem={handleClickEditItem}
                handleCheck={handleClickCheckItem}
                isChecked={isChecked}
              />
            );
          })}
        </List>
      </Paper>
      <DeleteConfirmPopup
        open={openDeletePopup}
        handleCancel={() => setOpenDeletePopup(false)}
        handleConfirm={handleDeleteConfirm}
        text={`Are you sure you want to delete the following items?`}
        checked={checkedIds}
      />
      <EditItemPopup
        open={openEditPopup}
        handleCancel={() => setOpenEditPopup(false)}
        handleConfirm={handleEditConfirm}
        editedItem={editedItem}
        setEditedItem={setEditedItem}
      />
    </>
  );
};
