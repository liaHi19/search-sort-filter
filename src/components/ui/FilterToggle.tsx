import { useSearchParams } from "react-router-dom";
const FilterToggle = ({
  colors,
  setColors,
}: {
  colors: string[];
  setColors: (colors: string[]) => void;
}) => {
  const [search, setSearch] = useSearchParams();

  if (search.get("colors")) {
    return (
      <div className="pv4">
        <button
          onClick={() => {
            search.delete("colors");
            setColors([]);
            setSearch(search, {
              replace: true,
            });
          }}
          className="btn ph3 pv1 f6"
        >
          Clear filters
        </button>
      </div>
    );
  }

  if (colors.length > 0) {
    return (
      <div className="pv4">
        <button
          onClick={() => {
            search.set("colors", colors.join(","));
            setSearch(search, {
              replace: true,
            });
          }}
          className="btn ph3 pv1 f6"
        >
          Apply filters
        </button>
      </div>
    );
  }
  return null;
};

export default FilterToggle;
