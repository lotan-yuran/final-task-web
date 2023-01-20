import { useMemo } from "react";
import { Box, Button, Checkbox, FormControlLabel, Grid } from "@mui/material";

export const CategoriesSelector = ({ categories, value, setValue }) => {
  const handleChange = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.checked
    });
  };

  const resetCategoriesSelection = useMemo(
    () => categories.reduce((prev, { name: categoryName }) => ({ ...prev, [categoryName]: false }), {}),
    [categories]
  );

  const selectAllCategories = useMemo(
    () => categories.reduce((prev, { name: categoryName }) => ({ ...prev, [categoryName]: true }), {}),
    [categories]
  );

  return (
    <Box sx={{ flexGrow: 1, m: 3, width: "500px" }}>
      <Grid container spacing={1}>
        {categories.map(({ name: categoryName }, i) => (
          <Grid item xs={4} key={categoryName + i}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value[categoryName] || false}
                  onChange={handleChange}
                  name={categoryName}
                />
              }
              label={categoryName}
            />
          </Grid>
        ))}
        <Grid key="btn" style={{ alignSelf: "center" }}>
          {Object.values(value).every(value => value === true) ? (
            <Button onClick={() => setValue(resetCategoriesSelection)} variant="contained">
              Deselect all
            </Button>
          ) : (
            <Button onClick={() => setValue(selectAllCategories)} variant="contained">
              Select all
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
