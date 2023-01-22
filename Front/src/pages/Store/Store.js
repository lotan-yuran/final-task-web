import { Grid } from "@mui/material";
import { useMemo, useState } from "react";
import { PRICE_RANGE } from "../../constants";
import { useRecoilValue } from "recoil";
import { categoriesState, itemsState } from "../../Recoil";
import { Filters, Item, ScrollTopButton } from "../../components";

export const Store = ({ searchText, setSearchText }) => {
  const items = useRecoilValue(itemsState);
  const categories = useRecoilValue(categoriesState);

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

  return (
    <>
      <div>
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
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
      <ScrollTopButton />
    </>
  );
};
