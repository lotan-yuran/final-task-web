import { Box, Checkbox, FormControlLabel, Grid } from "@mui/material";

export const CategoriesSelector = ({ categories, value, setValue }) => {
  const handleChange = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.checked
    });
  };

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
      </Grid>
    </Box>
  );
};
