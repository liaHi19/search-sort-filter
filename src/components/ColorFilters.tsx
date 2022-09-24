import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { getUniqueItems } from "core/utils";
import { useItems } from "core/hooks/useItems";

import CollapsibleList from "./CollapsibleList";
import FilterToggle from "./ui/FilterToggle";

const ColorFilters = () => {
  const [search, setSearch] = useSearchParams();
  const [colors, setColors] = useState(search.get("colors")?.split(",") ?? []);
  const getItems = useItems();

  const items = useMemo(() => getItems.data ?? [], [getItems.data]);
  const groupedItems = useMemo(
    () =>
      getUniqueItems(items, "color").map((item) => ({
        label: item.color,
        name: item.color,
        value: item.color,
      })),
    [items]
  );

  const onColorChange = (color: string) => (checked: Checkbox.CheckedState) => {
    let _colors = colors.slice();

    if (checked) {
      _colors.push(color);
    } else {
      _colors = _colors.filter((_color) => _color !== color);
    }

    setColors(_colors);
  };

  return (
    <div className="flex items-start justify-between">
      <CollapsibleList title="Color">
        {groupedItems.map((field, key) => (
          <li key={key} className="pv2">
            <div className="flex items-center">
              <Checkbox.Root
                id={field.name}
                name={field.name}
                disabled={!!search.get("colors")}
                checked={colors.includes(field.value)}
                onCheckedChange={onColorChange(field.value)}
                className="checkbox lh-solid flex items-center justify-center pa0 bg-white w125 h125 br2 bn"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="checkbox__icon w125 h125" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={field.name} className="ml3 fw5 f5">
                {field.label}
              </label>
            </div>
          </li>
        ))}
      </CollapsibleList>
      <FilterToggle colors={colors} setColors={setColors} />
    </div>
  );
};

export default ColorFilters;
