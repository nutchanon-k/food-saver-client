import React, { useEffect, useState } from "react";
import { getAllergensAPI, getCategoriesAPI } from "../../API/productAPI";
import CheckboxComponent from "./CheckboxComponent";
import useMapStore from "../../stores/mapStore";
import { ListFilter } from "lucide-react";

const SelectAllHeader = ({ title, filterName, selectedFilters, data, setSelectedFilters }) => {
  const isAllSelected = data.length === selectedFilters[filterName].length;
};

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
    radius: 2,
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
      const allCategoryIds = result.data.map((category) => category.id);
      setSelectedFilters((prev) => ({
        ...prev,
        category: allCategoryIds,
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
        return {
          ...prev,
          [filterName]: [...updatedFilter, id],
        };
      } else {
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
      </details>
      <dialog id="create-modal" className="modal">
        <div className="modal-box max-w-[700px] flex flex-col p-0">
          <div className="sticky top-0 bg-base-100 z-10 p-4 border-b">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
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

          <form className="w-full h-full flex flex-col gap-2" onSubmit={hdlSubmit}>
            <div className=" overflow-y-auto flex-1 px-4 py-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SelectAllHeader 
                    title="ของที่แพ้"
                    filterName="allergen"
                    selectedFilters={selectedFilters}
                    data={allergens}
                    setSelectedFilters={setSelectedFilters}
                  />
                  <CheckboxComponent
                    title="ของที่แพ้"
                    selectedFilters={selectedFilters}
                    data={allergens}
                    filterName="allergen"
                    hdlSelect={hdlSelect}
                    setSelectedFilters={setSelectedFilters}
                  />
                </div>

                <div className="flex-1">
                  <SelectAllHeader 
                    title="ประเภทอาหาร"
                    filterName="category"
                    selectedFilters={selectedFilters}
                    data={categories}
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
            </div>

            <div className="sticky bottom-0 bg-base-100 p-4 border-t shadow-lg">
              <button className="btn btn-primary w-full">ค้นหา</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
