import { Filter } from "./Filter/Filter";
import { StyledBox } from "./Filters.style";
import { PriceRangeSelector } from "./PriceRangeSelector";

export const Filters = ({ priceRangeValue, setPriceRangeValue }) => {
  return (
    <StyledBox>
      <Filter title="Sort">TODO : SORT PRICE LOW TO HIGH</Filter>
      <Filter title="Category">TODO : SORT CATEGORIES</Filter>
      <Filter title="Price Range">
        <PriceRangeSelector value={priceRangeValue} setValue={setPriceRangeValue} />
      </Filter>
    </StyledBox>
  );
};
