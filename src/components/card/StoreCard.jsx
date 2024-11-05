import useMapStore from "../../stores/mapStore";

export default function StoreCard({ store }) {
  const activeMarker = useMapStore((state) => state.activeMarker);
  const setActiveMarker = useMapStore((state) => state.setActiveMarker); 
  const isActive = activeMarker && activeMarker.id === store.id;

  const handleClick = () => {
    setActiveMarker(store);
  };


  const placeholderImageUrl =
    "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg";
  return (
    <div onClick={handleClick} className={`transition-all hover:scale-105 ${isActive ? "scale-105 border-2 border-primary" : ""} border card card-compact rounded-lg bg-white w-full shadow-lg`}>
      <figure>
        <div className="aspect-[2/1] w-full overflow-hidden">
          <img
            className="w-full object-cover mx-auto"
            src={store.profilePicture || placeholderImageUrl}
            alt="Placeholder Image"
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{store.storeName}</h2>
        <div className="flex">
          <h1>{store.distance.toFixed(2)} km | </h1>
          <h1>{store.products.length} Avaliable</h1>
        </div>
        <div className="card-actions justify-end">
          {/* <button className="btn btn-primary">Buy Now</button> */}
        </div>
      </div>
    </div>
  );
}
