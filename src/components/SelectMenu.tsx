import { ChangeEvent } from "react";

interface SelectOption {
  label: string;
  value: string;
}

export default function SelectMenu({
  options,
  label,
  name,
  defaultValue = "",
  onChange,
}: {
  options: SelectOption[];
  label: string;
  name: string;
  defaultValue?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <select
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className="select ph2 pv1 br2 bn"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
