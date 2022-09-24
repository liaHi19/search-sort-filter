import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useItems } from "core/hooks/useItems";

import CollapsibleList from "components/CollapsibleList";
import SelectMenu from "components/SelectMenu";
import SearchBar from "components/SearchBar";
import RangeSlider from "components/RangeSlider";
import ProductList from "components/ProductList";
import ColorFilters from "components/ColorFilters";

const Root = () => {
  const [search, setSearch] = useSearchParams();
  const getItems = useItems();
  const items = useMemo(() => getItems.data ?? [], [getItems.data]);

  const itemCounts = useMemo(
    () =>
      items.reduce<Record<string, number>>((initial, item) => {
        if (!isNaN(initial[item.category])) {
          initial[item.category] += 1;
        } else {
          initial[item.category] = 1;
        }

        return initial;
      }, {}),
    [items]
  );

  return (
    <div className="mw9 center ph4 bg-white min-vh-100 br bl b--light-gray">
      <div className="flex bb b--black-10 justify-between items-center mb4">
        <h1>New arrivals</h1>

        <div className="mr3 ml-auto">
          <SearchBar />
        </div>

        <SelectMenu
          onChange={(e) => {
            const sortBy = e.target.value;
            search.set("sort", sortBy);
            setSearch(search, {
              replace: true,
            });
          }}
          label="Sort by"
          name="sort"
          options={[
            {
              label: "Name",
              value: "name",
            },
            {
              label: "Price High",
              value: "priceAsc",
            },
            {
              label: "Price Low",
              value: "priceDesc",
            },
          ]}
        />
      </div>

      <div className="flex">
        <div className="w-25 mr4">
          <div style={{ position: "sticky", top: "20px" }}>
            <ul className="list pa0 ma0 pb3 bb b--black-10">
              <li className="f6 fw5 silver mb2">
                <div className="flex justify-between">
                  Filters
                  <span>{items.length} Products</span>
                </div>
              </li>
              <li>
                <button className="btn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Bags
                  <span>{itemCounts["bags"] ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Shoes
                  <span>{itemCounts["shoes"] ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Jackets
                  <span>{itemCounts["jackets"] ?? 0}</span>
                </button>
              </li>
            </ul>
            <ColorFilters />
            <CollapsibleList title="Price">
              <li>
                <div className="mv2">
                  <RangeSlider
                    maxPrice={Math.max(
                      ...items.map((item) => item.price / 100)
                    )}
                  />
                </div>
              </li>
            </CollapsibleList>
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
};

export default Root;
