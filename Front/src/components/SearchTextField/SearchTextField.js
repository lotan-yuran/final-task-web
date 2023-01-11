import { useState } from "react";
import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { StyledSearchTextField } from "./SearchTextField.style";

export const SearchTextField = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <StyledSearchTextField
      placeholder="Search"
      value={searchText}
      size="small"
      variant="filled"
      onChange={newValue => setSearchText(newValue.target.value)}
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <Search
              onClick={() => {
                onSearch(searchText);
              }}
            />
          </InputAdornment>
        )
      }}
      onKeyPress={event => {
        if (event.key === "Enter") {
          onSearch(searchText);
        }
      }}
    />
  );
};
