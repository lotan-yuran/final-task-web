import { Filter } from "./Filter/Filter";
import { StyledBox } from "./Filters.style";
import { PriceRangeSelector } from "./PriceRangeSelector";
import { CategoriesSelector } from "./CategoriesSelector";
import { useRecoilValue } from "recoil";
import { categoriesState } from "../../Recoil";

export const Filters = ({ priceRangeValue, setPriceRangeValue, categoryFilters, setCategoryFilters }) => {
  const categories = useRecoilValue(categoriesState);

  return (
    <StyledBox>
      <Filter title="Categories">
        <CategoriesSelector categories={categories} value={categoryFilters} setValue={setCategoryFilters} />
      </Filter>
      <Filter title="Price Range">
        <PriceRangeSelector value={priceRangeValue} setValue={setPriceRangeValue} />
      </Filter>
    </StyledBox>
  );
};
