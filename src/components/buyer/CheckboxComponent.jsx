import React from "react";

export default function CheckboxComponent({
  title,
  data,
  filterName,
  hdlSelect,
  selectedFilters,
  setSelectedFilters,
}) {
  // Function to handle "Select All"
  const handleSelectAll = () => {
    const allIds = data.map((item) => item.id); // Get all item IDs
    console.log(allIds);
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: allIds,
    }));
  };

  // Function to handle "Deselect All"
  const handleDeselectAll = () => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: [],
    }));
  };

  return (
    <div className="border flex flex-1 flex-col min-w-[100px] p-4 rounded-lg h-[300px]">
      {/* Fixed Header */}
      <div className="bg-base-100">
        <h1 className="font-bold text-xl text-center">{title}</h1>
        <hr />
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="flex-1 btn btn-outline rounded-full min-h-0 h-fit w-fit min-w-0 p-2"
          >
            เลือกทั้งหมด
          </button>
          <button
            type="button"
            onClick={handleDeselectAll}
            className="flex-1 btn btn-outline rounded-full min-h-0 h-fit w-fit min-w-0 p-2"
          >
            ไม่เลือกทั้งหมด
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto flex-1 content-start">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              onChange={(e) => hdlSelect(e, item.id, filterName)}
              type="checkbox"
              className="checkbox inline checkbox-primary"
              checked={selectedFilters[filterName].includes(item.id)}
            />
            <span className="label-text">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
