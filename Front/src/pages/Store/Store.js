import { Grid } from "@mui/material";
import { useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, itemsState } from "../../Recoil";
import { Filters, Item, ScrollTopButton } from "../../components";

export const Store = ({ searchText }) => {
  const [items] = useRecoilState(itemsState);
  const categories = useRecoilValue(categoriesState);

  const mappedCategories = useMemo(
    () => categories.reduce((prev, { name: categoryName }) => ({ ...prev, [categoryName]: true }), {}),
    [categories]
  );

  const [priceRangeValue, setPriceRangeValue] = useState([0, 10000]);
  const [categoryFilters, setCategoryFilters] = useState(mappedCategories);

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
          price > priceRangeValue[0] && price < priceRangeValue[1] && categoryFilters[category.name]
      ),
    [filteredItemsByText, priceRangeValue, categoryFilters]
  );

  return (
    <>
      <div>
        <Filters
          priceRangeValue={priceRangeValue}
          setPriceRangeValue={setPriceRangeValue}
          categoryFilters={categoryFilters}
          setCategoryFilters={setCategoryFilters}
        />
      </div>
      <Grid container spacing={4} justify="center">
        {filteredItems?.map(item => (
          <Grid key={item._id} item xs={12} sm={6} md={3}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
      <ScrollTopButton />
    </>
  );
};
