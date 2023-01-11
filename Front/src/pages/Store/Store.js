import { useMemo } from "react";
import { Grid } from "@mui/material";
import { useRecoilState } from "recoil";
import { itemsState } from "../../Recoil";
import { Item, ScrollTopButton } from "../../components";

export const Store = ({ searchText }) => {
  const [items] = useRecoilState(itemsState);

  const filteredItems = useMemo(
    () =>
      searchText.length
        ? items.filter(
            ({ name }) => typeof name === "string" && name.toLowerCase().includes(searchText.toLowerCase())
          )
        : items,
    [searchText, items]
  );

  return (
    <>
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
