import { useState } from "react";
import { useRecoilState } from "recoil";
import { itemsState, categoriesState } from "../../Recoil";
import { List } from "@mui/material";
import { DeleteConfirmPopup, EditItemPopup, AddItemPopup } from "../../components";
import { ManageHeader } from "./ManageHeader";
import { ManageListItem } from "./ManageListItem";
import productService from "../../services/productService";

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
      Promise.all(checkedIds.map(itemId => productService.deleteProduct(itemId)))
        .then(itemsToDelete => {
          const itemIdsToDelete = new Set(itemsToDelete.map(item => item._id));

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
    productService
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
    productService
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
