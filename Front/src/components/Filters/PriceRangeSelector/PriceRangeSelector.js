import { Box, Slider } from "@mui/material";

// todo
export const PriceRangeSelector = ({ value, setValue }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200, p: 5 }}>
      TODO
      <Slider
        min={0}
        max={10000}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

function valuetext(value) {
  return `$${value[0]} - $${value[1]}`;
}
