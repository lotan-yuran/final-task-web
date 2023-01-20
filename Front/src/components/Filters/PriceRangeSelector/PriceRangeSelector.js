import { Box, Button, Slider } from "@mui/material";

const marks = [
  {
    value: 0,
    label: "0$"
  },
  {
    value: 10000,
    label: "10000$"
  }
];

export const PriceRangeSelector = ({ value, setValue }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200, p: 5, textAlign: "center" }}>
      <Slider
        min={0}
        max={10000}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
      />
      <Button onClick={() => setValue([0, 10000])} variant="contained" sx={{ mt: 1 }}>
        Reset
      </Button>
    </Box>
  );
};
