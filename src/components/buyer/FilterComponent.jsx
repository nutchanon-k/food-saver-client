import React, { useEffect, useState } from "react";
import { getAllergensAPI, getCategoriesAPI } from "../../API/productAPI";
import CheckboxComponent from "./CheckboxComponent";
import useMapStore from "../../stores/mapStore";
import { ListFilter } from "lucide-react";

export default function FilterComponent() {
  const getStoreArray = useMapStore((state) => state.getStoreArray);
  const mapCenter = useMapStore((state) => state.mapCenter);
  const setFilter = useMapStore((state) => state.setFilter);
  const filter = useMapStore((state) => state.filter);
  const [allergens, setAllergens] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    allergen: [],
    category: [],
    radius: 2, // Initialize empty, we'll update this after fetching categories
  });
  const [displayRadius, setDisplayRadius] = useState(20);

  const getAllergens = async () => {
    try {
      const result = await getAllergensAPI();
      setAllergens(result.data.data);
      return result.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const result = await getCategoriesAPI();
      setCategories(result.data);
      // After fetching categories, initialize `selectedFilters.category` to all selected
      const allCategoryIds = result.data.map((category) => category.id);

      setSelectedFilters((prev) => ({
        ...prev,
        category: allCategoryIds, // Set all categories as selected by default
      }));
      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const initializeFilters = async () => {
      const categories = await getCategories();
      const categoriesIndex = categories.map((item) => item.id);
      setFilter({
        ...filter,
        category: categoriesIndex,
      });
    };

    initializeFilters();
    getAllergens();
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

  const hdlSliding = (e) => {
    setSelectedFilters((prev) => ({
      ...prev,
      radius: e.target.value / 10,
    }));
    setDisplayRadius(e.target.value);
  };

  const hdlSubmit = (e) => {
    e.preventDefault();
    const queryObj = {
      radius: 2,
      latitude: mapCenter.lat,
      longitude: mapCenter.lng,
    };
    selectedFilters.radius = selectedFilters.radius;
    Object.entries(selectedFilters).forEach(([key, value]) => {
      queryObj[key] = value;
    });
    const updatedFilter = { ...filter, ...queryObj };
    getStoreArray(updatedFilter);
    console.log(updatedFilter);
    setFilter(updatedFilter);
  };

  return (
    <>
      <details className="dropdown">
        <summary
          className="btn m-1 btn-circle min-h-0 w-fit h-fit p-1"
          onClick={() => document.getElementById("create-modal").showModal()}
        >
          <ListFilter size={19} />
        </summary>
        {/* <ul className="menu dropdown-content w-fit bg-base-100 rounded-box z-[1] p-2 shadow">
          
        </ul> */}
      </details>
      <dialog id="create-modal" className="modal">
        <div className="modal-box max-w-[700px] flex flex-col">
          {/* Fixed Header with Range Bar */}
          <div className="sticky top-0 bg-base-100 z-10 pb-4 border-b">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={(e) => {
                e.target.closest("dialog").close();
              }}
            >
              ✕
            </button>
            <h1 className="font-bold text-3xl mb-4 text-primary">ค้นหาร้านค้า</h1>

            <div className="border p-2 rounded-lg">
              <h1>ค้นหาร้านค้าในระยะ <span className="text-primary"> {selectedFilters.radius} </span> กม.</h1>
              <input
                onChange={hdlSliding}
                type="range"
                min={0}
                max="100"
                value={displayRadius}
                className="range range-primary range-xs"
              />
            </div>
          </div>

          <form
            className="w-full h-full flex flex-col gap-2"
            onSubmit={hdlSubmit}
          >
            {/* Scrollable Checkboxes */}
            <div className="overflow-y-auto flex-1 py-4">
              <div className="flex gap-2">
                <CheckboxComponent
                  title="ของที่แพ้"
                  selectedFilters={selectedFilters}
                  data={allergens}
                  filterName="allergen"
                  hdlSelect={hdlSelect}
                  setSelectedFilters={setSelectedFilters}
                />

                <CheckboxComponent
                  title="ประเภทอาหาร"
                  selectedFilters={selectedFilters}
                  data={categories}
                  filterName="category"
                  hdlSelect={hdlSelect}
                  setSelectedFilters={setSelectedFilters}
                />
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="sticky bottom-0 bg-base-100 pt-2 border-t shadow-lg">
              <button className="btn btn-primary w-full">ค้นหา</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
