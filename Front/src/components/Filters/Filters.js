import { useRecoilValue } from "recoil";
import { categoriesState } from "../../Recoil";
import { Filter } from "./Filter/Filter";
import { StyledBox } from "./Filters.style";
import { PriceRangeSelector } from "./PriceRangeSelector";

export const Filters = ({ priceRangeValue, setPriceRangeValue }) => {
  const categories = useRecoilValue(categoriesState);

  console.log(categories);

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
