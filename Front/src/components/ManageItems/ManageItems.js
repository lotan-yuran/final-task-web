import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemsState, categoriesState } from "../../Recoil";
import { List } from "@mui/material";
import { DeleteConfirmPopup, EditItemPopup, AddItemPopup } from "../../components";
import { ManageHeader } from "./ManageHeader";
import { ManageListItem } from "./ManageListItem";
import storeService from "../../services/storeService";

export const ManageItems = ({ title }) => {
  const [items, setItems] = useRecoilState(itemsState);
  const [categories] = useRecoilState(categoriesState);
  const [checkedIds, setCheckedIds] = useState([]);
  const [editedItem, setEditedItem] = useState({});
  const [newItem, setNewItem] = useState({});
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openAddPopup, setOpenAddPopup] = useState(false);

  const isChecked = id => {
    return checkedIds.includes(id) ? true : false;
  };

  const handleClickCheckItem = itemId => {
    const currentIndex = checkedIds.indexOf(itemId);
    const newCheckedIds = [...checkedIds];

    if (currentIndex === -1) {
      newCheckedIds.push(itemId);
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
      alert("No products have been selected for deletion");
    } else {
      const itemIdsToDelete = new Set(checkedIds);

      Promise.all(
        checkedIds.map(itemId => {
          storeService.deleteProduct(itemId);
        })
      )
        .then(() => {
          // TODO: need response value from db
          // console.log(values);
          setItems(prevItems => {
            return prevItems.filter(item => {
              // return those items that their id not in the itemIdsToDelete
              return !itemIdsToDelete.has(item._id);
            });
          });
          alert("The product has been successfully deleted from DB");
        })
        .catch(error => {
          console.error(error.message);
          alert("Add product failed");
        })
        .finally(() => {
          setCheckedIds([]);
          setOpenDeletePopup(false);
        });
    }
  };

  const handleEditConfirm = () => {
    storeService
      .editProduct(editedItem)
      .then(response => {
        setItems(prevItems => {
          return prevItems.map(item => (item._id === response._id ? response : item));
        });
        alert("The product has been successfully added to DB");
      })
      .catch(err => {
        console.error(err);
        alert("Add product failed");
      })
      .finally(() => {
        setEditedItem({});
        setOpenEditPopup(false);
      });
  };

  const handleEditCancel = () => {
    setEditedItem({});
    setOpenEditPopup(false);
  };

  const handleAddConfirm = () => {
    // TODO: in response we need to get full category object
    storeService
      .addProduct(newItem)
      .then(response => {
        // console.log(response);
        setItems(prevItems => [...prevItems, response]);
        alert("The product has been successfully added to DB");
      })
      .catch(err => {
        console.error(err);
        alert("Add product failed");
      })
      .finally(() => {
        setNewItem({});
        setOpenAddPopup(false);
      });
  };

  const handleAddCancel = () => {
    setNewItem({});
    setOpenAddPopup(false);
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
        editedItem={editedItem}
        categories={categories}
        setEditedItem={setEditedItem}
        handleCancel={handleEditCancel}
        handleConfirm={handleEditConfirm}
      />
      <AddItemPopup
        open={openAddPopup}
        item={newItem}
        categories={categories}
        setItem={setNewItem}
        handleCancel={handleAddCancel}
        handleConfirm={handleAddConfirm}
      />
    </>
  );
};
