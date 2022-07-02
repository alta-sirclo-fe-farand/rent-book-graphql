import { createContext } from "react";

const SearchContext = createContext({searchValue: '', setSearchValue: (value: any) => {},});

export default SearchContext;