import { PRICE_RANGE } from "../../../constants";
import { Box, Button, Slider } from "@mui/material";

const marks = [
  {
    value: PRICE_RANGE.min,
    label: `${PRICE_RANGE.min}$`
  },
  {
    value: PRICE_RANGE.max,
    label: `${PRICE_RANGE.max}$`
  }
];

export const PriceRangeSelector = ({ value, setValue }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200, p: 5, textAlign: "center" }}>
      <Slider
        min={PRICE_RANGE.min}
        max={PRICE_RANGE.max}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
      />
      <Button onClick={() => setValue([PRICE_RANGE.min, PRICE_RANGE.max])} variant="contained" sx={{ mt: 1 }}>
        Reset
      </Button>
    </Box>
  );
};
