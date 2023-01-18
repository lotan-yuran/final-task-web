import { Grid } from "@mui/material";
import { useRecoilState } from "recoil";
import { itemsState } from "../../Recoil";
import { useMemo, useState } from "react";
import { Filters, Item, ScrollTopButton } from "../../components";

export const Store = ({ searchText }) => {
  const [items] = useRecoilState(itemsState);
  const [priceRangeValue, setPriceRangeValue] = useState([0, 10000]);

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
    () => filteredItemsByText.filter(({ price }) => price > priceRangeValue[0] && price < priceRangeValue[1]),
    [filteredItemsByText, priceRangeValue]
  );

  return (
    <>
      <div>
        <Filters priceRangeValue={priceRangeValue} setPriceRangeValue={setPriceRangeValue} />
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
