import { Grid } from "@mui/material";
import { useMemo, useState } from "react";
import { PRICE_RANGE } from "../../constants";
import { useRecoilState, useRecoilValue } from "recoil";
import cartService from "../../services/cartService";
import { Filters, Item, ScrollTopButton } from "../../components";
import { categoriesState, itemsState, userState, cartItemsState } from "../../Recoil";

export const Store = ({ searchText, setSearchText }) => {
  const user = useRecoilValue(userState);
  const items = useRecoilValue(itemsState);
  const categories = useRecoilValue(categoriesState);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const mappedCategories = useMemo(
    () => categories.reduce((prev, { name: categoryName }) => ({ ...prev, [categoryName]: true }), {}),
    [categories]
  );

  const [categoryFilters, setCategoryFilters] = useState(mappedCategories);
  const [priceRangeValue, setPriceRangeValue] = useState([PRICE_RANGE.min, PRICE_RANGE.max]);

  const isActiveFilters = useMemo(
    () =>
      searchText.length > 0 ||
      priceRangeValue[0] !== PRICE_RANGE.min ||
      priceRangeValue[1] !== PRICE_RANGE.max ||
      !Object.values(categoryFilters).every(value => value === true),
    [searchText, priceRangeValue, categoryFilters]
  );

  const filteredItemsByText = useMemo(
    () =>
      searchText.length
        ? items.filter(
            ({ name }) => typeof name === "string" && name.toLowerCase().includes(searchText.toLowerCase())
          )
        : items,
    [searchText, items]
  );

  const filteredItems = useMemo(
    () =>
      filteredItemsByText.filter(
        ({ price, category }) =>
          price > priceRangeValue[0] && price < priceRangeValue[1] && categoryFilters[category?.name]
      ),
    [filteredItemsByText, priceRangeValue, categoryFilters]
  );

  const resetFilters = () => {
    setCategoryFilters(mappedCategories);
    setPriceRangeValue([PRICE_RANGE.min, PRICE_RANGE.max]);
    setSearchText("");
  };

  const addItemToCart = async newItemId => {
    const updatedProducts = newItemId => {
      const existingItem = cartItems.find(({ product }) => {
        return newItemId === product._id;
      });

      // If already exists increase quantity
      if (existingItem) {
        return cartItems.map(item => {
          const { product, quantity } = item;
          if (newItemId === product._id) {
            return {
              product: product._id,
              quantity: item.quantity + 1
            };
          }
          return {
            product: product._id,
            quantity: quantity
          };
        });
      } else {
        // Add new item into the cart
        return [...cartItems].concat({ product: newItemId, quantity: 1 });
      }
    };

    cartService
      .updateCart(user?.email, updatedProducts(newItemId))
      .then(data => {
        setCartItems(data);
        alert("The product has been successfully added to cart DB");
      })
      .catch(err => {
        console.error(err);
        alert("The order failed");
      });
  };

  return (
    <>
      <div>
        {user?.name && <p>Hello {`${user?.name}`}</p>}
        <Filters
          priceRangeValue={priceRangeValue}
          setPriceRangeValue={setPriceRangeValue}
          categoryFilters={categoryFilters}
          setCategoryFilters={setCategoryFilters}
          isActiveFilters={isActiveFilters}
          resetFilters={resetFilters}
        />
      </div>
      <Grid container spacing={4} justify="center">
        {filteredItems?.map(item => (
          <Grid key={item._id} item xs={12} sm={6} md={3}>
            <Item item={item} addItemToCart={addItemToCart} />
          </Grid>
        ))}
      </Grid>
      <ScrollTopButton />
    </>
  );
};
