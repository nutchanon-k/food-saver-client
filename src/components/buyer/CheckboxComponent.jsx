import React from "react";

export default function CheckboxComponent({
  title,
  data,
  filterName,
  hdlSelect,
  selectedFilters,
}) {
  // Function to handle "Select All"
  const handleSelectAll = () => {
    const allIds = data.map(item => item.id); // Get all item IDs
    // Set all items as selected
    hdlSelect({ target: { checked: true } }, allIds, filterName);
  };

  // Function to handle "Deselect All"
  const handleDeselectAll = () => {
    // Deselect all items
    hdlSelect({ target: { checked: false } }, [], filterName);
  };

  return (
    <div className="border flex flex-1 flex-col gap-2 min-w-[100px] p-4 rounded-lg">
      <h1 className="font-bold text-center">{title}</h1>
      <hr />
      <div className="flex gap-2 mb-2">
        <button type="button" onClick={handleSelectAll} className="flex-1 btn btn-outline rounded-full min-h-0 h-fit w-fit min-w-0 p-2">
          Select All
        </button>
        <button type="button" onClick={handleDeselectAll} className="flex-1 btn btn-outline rounded-full min-h-0 h-fit w-fit min-w-0 p-2">
          Deselect All
        </button>
      </div>
      <div className="flex flex-wrap gap-4"> {/* Changed flex-col to flex-wrap */}
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-2"> {/* Ensures checkbox items are inline */}
            <input
              onChange={(e) => hdlSelect(e, item.id, filterName)} // Pass filterName along with id
              type="checkbox"
              className="checkbox inline checkbox-primary"
              checked={selectedFilters[filterName].includes(item.id)} // Manage checked state based on selectedFilters
            />
            <span className="label-text">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
