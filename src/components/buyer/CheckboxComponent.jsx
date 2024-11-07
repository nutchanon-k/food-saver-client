import React from "react";

export default function CheckboxComponent({
  title,
  data,
  filterName,
  hdlSelect,
  selectedFilters,
}) {
  return (
    <div className="flex flex-col gap-2 min-w-[100px]">
      <h1 className="font-bold text-center">{title}</h1>
      <hr />
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              onChange={(e) => hdlSelect(e, item.id, filterName)} // Pass filterName along with id
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={selectedFilters[filterName].includes(item.id)} // Manage checked state based on selectedFilters
            />
            <span className="label-text">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
