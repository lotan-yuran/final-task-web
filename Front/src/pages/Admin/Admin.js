import { useState } from "react";
import { Box } from "@mui/system";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useResetRecoilState } from "recoil";
import { itemsState, itemsSelector } from "../../Recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, List, Paper, Typography } from "@mui/material";
import {
  ManageItems,
  DeleteConfirmPopup,
  ListItemAdmin,
  EditItemPopup,
  AddItemPopup,
  OrdersLineChart,
  OrdersBarChart
} from "../../components";
import storeService from "../../services/storeService";

export const Admin = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const resetItems = useResetRecoilState(itemsState);
  // const refresh = useRecoilRefresher_UNSTABLE(itemsState);

  const [checkedIds, setCheckedIds] = useState([]);
  const [editedItem, setEditedItem] = useState();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openAddPopup, setOpenAddPopup] = useState(false);

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

  const handleAddConfirm = item => {
    // TODO: need to refresh items state after add request ends
    storeService
      .addProduct(item)
      .then(response => {
        alert("The product has been successfully added to DB");
      })
      .catch(err => {
        console.error(err);
        alert("Add product failed");
      })
      .finally(setOpenAddPopup(false));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <ManageItems title={"Items"} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <OrdersLineChart />
            <OrdersBarChart />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
