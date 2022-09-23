import { ChangeEvent, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useSearchParams();
  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text.length === 0) {
      search.delete("query");
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set("query", text);
      setSearch(search, { replace: true });
    }
  }, 350);

  return (
    <div
      className={"flex search items-center pb2" + (focused ? " focused" : "")}
    >
      <label htmlFor="search" className="flex mr2">
        <RiSearch2Line className={"gray" + (focused ? " light-purple" : "")} />
      </label>
      <input
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused((focus) => !focus)}
        id="search"
        name="search"
        className="bn outline-0"
        type="search"
        placeholder="Find items..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
