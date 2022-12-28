import { Grid } from "@mui/material";
import { Item } from "../../components";
import { useRecoilState } from "recoil";
import { itemsState } from "../../Recoil";

export const Store = () => {
  const [items] = useRecoilState(itemsState);

  return (
    <Grid container spacing={4} justify="center">
      {items?.map(item => (
        <Grid key={item._id} item xs={12} sm={6} md={3}>
          <Item item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
