import React, { useEffect, useState } from "react";
import { getAllergensAPI, getCategoriesAPI } from "../../API/productAPI";
import CheckboxComponent from "./CheckboxComponent";
import useMapStore from "../../stores/mapStore";

export default function FilterComponent() {
  const getStoreArray = useMapStore((state) => state.getStoreArray);
  const [allergens, setAllergens] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    allergen: [],
    category: [],
  });

  const getAllergens = async () => {
    try {
      const result = await getAllergensAPI();
      setAllergens(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const result = await getCategoriesAPI();
      setCategories(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllergens();
    getCategories();
  }, []);

  const hdlSelect = (e, id, filterName) => {
    setSelectedFilters((prev) => {
      const updatedFilter = prev[filterName];
      if (e.target.checked) {
        // Add the id to the filter list if it's checked
        return {
          ...prev,
          [filterName]: [...updatedFilter, id],
        };
      } else {
        // Remove the id from the filter list if it's unchecked
        return {
          ...prev,
          [filterName]: updatedFilter.filter((itemId) => itemId !== id),
        };
      }
    });
  };

  const hdlSubmit = (e) => {
    e.preventDefault();
    const queryObj = {}
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value.length > 0) {
        queryObj[key] = value.join(",");
      }
    });
    getStoreArray(queryObj)
    console.log(queryObj);
  };

  return (
    <details className="dropdown w-[500px]">
      <summary className="btn m-1">open or close</summary>
      <ul className="menu dropdown-content w-fit bg-base-100 rounded-box z-[1] p-2 shadow">
        <form className="w-full h-full flex flex-col" onSubmit={hdlSubmit}>
          <button className="btn btn-primary">Search</button>
          <div>
            <CheckboxComponent
              title="Allergens"
              selectedFilters={selectedFilters}
              data={allergens}
              filterName="allergen"
              hdlSelect={hdlSelect}
            />
          </div>
          <div>
            <CheckboxComponent
              title="Categories"
              selectedFilters={selectedFilters}
              data={categories}
              filterName="category"
              hdlSelect={hdlSelect}
            />
          </div>
        </form>
      </ul>
    </details>
  );
}
