import { useState } from "react";
import { useRecoilState } from "recoil";
import { itemsState } from "../../Recoil";
import { List } from "@mui/material";
import { DeleteConfirmPopup, EditItemPopup, AddItemPopup } from "../../components";
import { ManageHeader } from "./ManageHeader";
import { ManageListItem } from "./ManageListItem";
import storeService from "../../services/storeService";

export const ManageItems = ({ title }) => {
  const [items, setItems] = useRecoilState(itemsState);
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
      <ManageHeader title={title} setOpenAddPopup={setOpenAddPopup} setOpenDeletePopup={setOpenDeletePopup} />
      <List dense sx={{ bgcolor: "background.paper" }}>
        {items.map((item, index) => {
          return (
            <ManageListItem
              key={index}
              item={item}
              handleEditItem={handleClickEditItem}
              handleCheck={handleClickCheckItem}
              isChecked={isChecked}
            />
          );
        })}
      </List>
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
      <AddItemPopup
        open={openAddPopup}
        handleCancel={() => setOpenAddPopup(false)}
        handleConfirm={handleAddConfirm}
      />
    </>
  );
};
