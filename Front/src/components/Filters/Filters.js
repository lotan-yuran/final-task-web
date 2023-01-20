import { useRecoilValue } from "recoil";
import { Filter } from "./Filter/Filter";
import { StyledBox } from "./Filters.style";
import { Button, Box } from "@mui/material";
import { categoriesState } from "../../Recoil";
import { CategoriesSelector } from "./CategoriesSelector";
import { PriceRangeSelector } from "./PriceRangeSelector";

export const Filters = ({
  resetFilters,
  priceRangeValue,
  categoryFilters,
  isActiveFilters,
  setCategoryFilters,
  setPriceRangeValue
}) => {
  const categories = useRecoilValue(categoriesState);

  return (
    <StyledBox>
      <Filter title="Categories">
        <CategoriesSelector categories={categories} value={categoryFilters} setValue={setCategoryFilters} />
      </Filter>
      <Filter title="Price Range">
        <PriceRangeSelector value={priceRangeValue} setValue={setPriceRangeValue} />
      </Filter>
      {isActiveFilters && (
        <Box sx={{ textAlign: "right" }}>
          <Button onClick={resetFilters} variant="contained">
            watch all
          </Button>
        </Box>
      )}
    </StyledBox>
  );
};
