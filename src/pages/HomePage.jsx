import React, { useEffect, useState } from "react";
import useProductStore from "../stores/useProductStore";
import useStoreStore from "../stores/Store";
import { ChevronRight, MapPin, User } from "lucide-react";
import useFoundationStore from "../stores/FoundationStore";
import useMapStore from "../stores/mapStore";
import useCategoryStore from "../stores/CategoryStore";
import { useNavigateService } from "../routers/navigateService";

import Banner from "../assets/pictures/HomePagePromo.png";
import Map from "../assets/pictures/HomePageMap.png";
import { useNavigate } from "react-router-dom";
import StoreCardHomePage from "../components/buyer/StoreCardHomePage";
import RecommendedCard from "../components/Card2/RecommendedCard";
import SearchFilterPage from "../components/Card2/SearchFilterPage";
import ProductAdd from "../components/seller/ProductAdd";
import PromoCard from "../components/Card2/PromoCard";
import ModalFoodDetail from "../components/seller/ModalFoodDetail";
import ModalFood from "../components/seller/ModalFood";
import DonationCard from "../components/card/DonationCard";

/**
 * Header Component
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-4 bg-white shadow-md">
      <div className="logo text-xl md:text-2xl font-extrabold text-green-600">
        Food Saver
      </div>
      <div className="location hidden lg:flex items-center">
        <MapPin className="text-green-600 mr-2" aria-hidden="true" />
        <p className="text-gray-700 text-sm">
          35 อาคารวรรษาเฮ้าส์ ถ. พหลโยธิน แขวงอนุสาวรีย์ เขตบางเขน กรุงเทพฯ
        </p>
      </div>
      <div className="profile flex items-center">
        <User className="text-green-600" aria-label="User Profile" />
      </div>
    </header>
  );
};

/**
 * HeroSection Component
 */
const HeroSection = () => {
  return (
    <section className="hero-section bg-green-50 flex items-center justify-center">
      <div className="hero-image w-full h-full">
        <img
          src={Banner}
          alt="Delicious Food"
          className="rounded-lg shadow-lg w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
    </section>
  );
};

/**
 * CategoryItem Component
 */
const CategoryItem = ({ id, name, imageUrl, onSelect }) => {
  return (
    <div
      className="category-item flex flex-col items-center mx-1 cursor-pointer hover:text-green-600"
      onClick={() => onSelect(id)}
    >
      <div className="icon p-1.5 rounded-full hover:rotate-3 active:scale-95 duration-200 hover:drop-shadow-md hover:opacity-90 hover:scale-110 transition-all">
        <div className="w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-full scrollbar-none">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              className="w-full h-full object-cover"
              src="https://static.vecteezy.com/system/resources/thumbnails/013/995/943/small_2x/3d-rendering-of-fried-chicken-fast-food-icon-png.png"
            />
          )}
        </div>
      </div>
      <p className="text-gray-800 mt-1 font-medium text-xs md:text-sm md:block">
        {name}
      </p>
    </div>
  );
};

/**
 * CategoriesSection Component
 */
const CategoriesSection = () => {
  const { categories, fetchCategories, selectCategory, loading, error } =
    useCategoryStore();
  const [isScrolled, setIsScrolled] = useState(false); // Move this up

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories(1, "", 23);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchData();
  }, [fetchCategories]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 64);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading && categories.length === 0) {
    return <p className="p-4 md:p-8 text-center">Loading Categories...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || "Failed to load categories."}
      </p>
    );
  }

  if (!Array.isArray(categories)) {
    return <p className="p-4 md:p-8 text-center">No Categories Available.</p>;
  }

  return (
    <section className="categories-section p-2 py-3 border rounded-xl bg-white md:sticky top-0 z-40 -mx-2 md:mx-0">
      <div className="flex space-x-2 md:space-x-6 overflow-x-auto scrollbar-none border p-1 rounded-lg pb-2 mask-fade-bottom scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-100 hover:scrollbar-thumb-green-700">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            id={category.id}
            name={category.name}
            imageUrl={category.imageUrl}
            onSelect={selectCategory}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
};

/**
 * CategoryProducts Component
 */
const CategoryProducts = () => {
  const {
    selectedCategory,
    products,
    loading,
    error,
    resetSelectedCategory,
    categories,
  } = useCategoryStore();

  if (!selectedCategory) return null;

  const categoryName =
    categories.find((cat) => cat.id === selectedCategory)?.name ||
    "Selected Category";

  return (
    <section className="category-products-section p-4 md:p-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">
          Products in "{categoryName}"
        </h2>
        <button
          className="bg-green-600 rounded-full transition-all text-white px-3 md:px-4 py-1 md:py-2 hover:bg-green-700"
          onClick={resetSelectedCategory}
        >
          Back
        </button>
      </div>
      {loading && products.length === 0 ? (
        <p className="p-4 md:p-8 text-center">Loading Products...</p>
      ) : error ? (
        <p className="p-4 md:p-8 text-center text-red-500">
          Error: {error || "Failed to load products."}
        </p>
      ) : products.length === 0 ? (
        <p className="p-4 md:p-8 text-center">
          No Products Found in this Category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ModalFood product={product} key={product.id} />
          ))}
        </div>
      )}
    </section>
  );
};

/**
 * ProductShowcase Component
 */
const ProductShowcase = () => {
  const { products, fetchProducts, loading, error, fetchPopularProduct } =
    useProductStore();
  const [popularProducts, setPopularProducts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetchProducts(1, 5);
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //     }
  //   };
  //   fetchData();
  // }, [fetchProducts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularProducts = await fetchPopularProduct();
        setPopularProducts(popularProducts);
      } catch (error) {
        console.error("Failed to fetch popular products:", error);
      }
    };
    fetchData();
  }, [fetchPopularProduct]);

  if (loading && products.length === 0) {
    return <p className="p-4 md:p-8 text-center">Loading Best Sellers...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || "Failed to load best sellers."}
      </p>
    );
  }

  return (
    <section className="product-showcase  py-2 px-1">
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto overflow-y-hidden no-scrollbar border p-2 rounded-lg pb-4 mask-fade-bottom">
        {popularProducts.slice(0, 5).map((product) => (
          <div className="flex-shrink-0" key={product.id}>
            <ModalFood product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * MapSection Component
 */
const MapSection = () => {
  const { navigateToMap } = useNavigateService();
  return (
    <section className="map-section bg-green-50 flex items-center justify-center">
      <div className="map-image w-full h-full">
        <img
          onClick={navigateToMap}
          src={Map}
          alt="Map showing nearby restaurants"
          className="rounded-lg shadow-lg w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
};

/**
 * NewRestaurants Component
 */
const NewRestaurants = () => {
  const { stores, fetchStores, loading, error } = useStoreStore();
  const { navigateToStore } = useNavigateService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStores(1, {}, 5);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };
    fetchData();
  }, [fetchStores]);

  if (loading && stores.length === 0) {
    return <p className="p-4 md:p-8 text-center">Loading New Restaurants...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || "Failed to load new restaurants."}
      </p>
    );
  }
  
  return (
    <section className="new-restaurants-section bg-white">
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto overflow-y-hidden scrollbar-none border p-2 rounded-lg pb-4 mask-fade-bottom scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-100 hover:scrollbar-thumb-green-700">
        {stores.slice(0, 5).map((store) => (
          <RecommendedCard store={store} key={store.id} />
          // <StoreCardHomePage store={store} key={store.id}/>
        ))}
      </div>
    </section>
  );
};

/**
 * ProductSpecial Component
 */
const ProductSpecial = () => {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts(2, 10);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchData();
  }, [fetchProducts]);

  if (loading && products.length < 10) {
    return <p className="p-4 md:p-8 text-center">Loading Special Offers...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || "Failed to load special offers."}
      </p>
    );
  }

  return (
    <section className="product-special p-4 md:p-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
        Special Offer
      </h2>
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto overflow-y-hidden no-scrollbar border p-2 rounded-lg pb-4">
        {products.slice(5, 10).map((product) => (
          <div
            key={product.id}
            className="product-card bg-white p-4 border rounded-lg shadow-md min-w-[200px]"
          >
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-32 md:h-40 w-full object-cover rounded"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                PROMO
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-md md:text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {product.description}
              </p>
              <p className="text-green-700 mt-2 font-bold">
                Sale Price: ${product.salePrice}
              </p>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Visit Store
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * TopRestaurants Component
 */
const TopRestaurants = () => {
  const { stores, fetchStores, loading, error } = useStoreStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStores(2, {}, 17);
      } catch (error) {
        console.error("Failed to fetch top restaurants:", error);
      }
    };
    fetchData();
  }, [fetchStores]);

  if (loading && stores.length < 12) {
    return <p className="p-4 md:p-8 text-center">Loading Top Restaurants...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || "Failed to load top restaurants."}
      </p>
    );
  }

  return (
    <section className="top-restaurants-section ">
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto overflow-y-hidden no-scrollbar border p-2 rounded-lg pb-4">
        {stores.slice(10, 17).map((store) => (
          <RecommendedCard store={store} key={store.id} />
        ))}
      </div>
    </section>
  );
};

/**
 * DonationSection Component
 */
const DonationSection = () => {
  const { foundations, fetchFoundations, loading, error } =
    useFoundationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchFoundations(1, "", 10);
      } catch (error) {
        console.error("Failed to fetch foundations:", error);
      }
    };
    fetchData();
  }, [fetchFoundations]);

  if (loading && foundations.length === 0) {
    return <p className="p-4 md:p-8 text-center">Loading Foundations...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || "Failed to load foundations."}
      </p>
    );
  }

  if (!Array.isArray(foundations)) {
    return <p className="p-4 md:p-8 text-center">No Foundations Available.</p>;
  }

  return (
    <section className="donation-section">
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto overflow-y-hidden border scrollbar-none p-2 rounded-lg pb-4 mask-fade-bottom scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-100 hover:scrollbar-thumb-green-700">
        {foundations.map((foundation) => (
          <DonationCard foundation={foundation} key={foundation.id} />
        ))}
      </div>
    </section>
  );
};

const PopularStore = () => {
  const { fetchPopularStore, loading, error } = useStoreStore();
  const [stores, setStores] = useState([]);
  const { navigateToStore } = useNavigateService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPopularStore();
        setStores(res);
      } catch (error) {
        console.error("Failed to fetch popular stores:", error);
      }
    };
    fetchData();
  }, [fetchPopularStore]);

  if (loading && stores.length === 0) {
    return <p className="p-4 md:p-8 text-center">Loading Popular Stores...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || "Failed to load popular stores."}
      </p>
    );
  }

  return (
    <section className="popular-stores-section">
      <div className="flex overflow-x-scroll scrollbar-none gap-3 md:gap-6 h-fit p-2 rounded-lg pb-4 scrollbar-none">
        {stores.slice(0, 10).map((store) => (
          <div
            onClick={() => navigateToStore(store.id)}
            key={store.id}
            className="cursor-pointer snap-start flex-shrink-0 w-[28%] md:w-[10%] aspect-square text-center"
          >
            <img
              src={store.profilePicture}
              alt={store.storeName}
              className="h-full w-full object-cover rounded-lg aspect-square shadow-md hover:shadow-lg transition-shadow"
            />
            <span className="block mt-2 text-xs md:text-sm font-medium text-gray-700 truncate">
              {store.storeName}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * NearbyStoresSection Component
 */
const NearbyStoresSection = () => {
  const { stores, getStoreArray, userLocation, getUserLocation } =
    useMapStore();

  useEffect(() => {
    const fetchLocationAndStores = async () => {
      try {
        await getUserLocation();
        if (userLocation.lat && userLocation.lng) {
          await getStoreArray({
            radius: 2,
            latitude: userLocation.lat,
            longitude: userLocation.lng,
          });
        }
      } catch (error) {
        console.error("Failed to fetch nearby stores:", error);
      }
    };
    fetchLocationAndStores();
  }, [getUserLocation, getStoreArray, userLocation.lat, userLocation.lng]);

  if (stores.length === 0) {
    return <p className="p-4 md:p-8 text-center">Loading Nearby Stores...</p>;
  }

  return (
    <section className="nearby-stores-section pb-2 ">
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto overflow-y-hidden scrollbar-none border p-2 rounded-lg pb-4 mask-fade-bottom scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-100 hover:scrollbar-thumb-green-700">
        {stores.map((store) => (
          <RecommendedCard store={store} key={store.id} />
        ))}
      </div>
    </section>
  );
};

/**
 * RecommendedSection Component
 */
const RecommendedSection = () => {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts(3, 15);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchData();
  }, [fetchProducts]);

  if (loading && products.length < 15) {
    return <p className="p-4 md:p-8 text-center">Loading Recommendations...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || "Failed to load recommendations."}
      </p>
    );
  }

  return (
    <section className="recommended-section p-4 bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.slice(10, 15).map((product) => (
          <div
            key={product.id}
            className="product-card bg-white p-4 border rounded-lg shadow-md"
          >
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-32 md:h-40 w-full object-cover rounded"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                PROMO
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-md md:text-lg font-bold text-gray-800">
                {product.name}
              </h3>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Visit Store
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * HomePage Component
 */
const HomePage = () => {
  const { selectedCategory } = useCategoryStore();
  const { navigateToMap } = useNavigateService();

  return (
    <>
      <div className="max-w-[1024px] mx-auto bg-gray-100 ">
        <div>
          <HeroSection />
        </div>
        <div className="md:p-4 p-2">
          <CategoriesSection />
          {!selectedCategory ? (
            <div className="space-y-3 md:space-y-6">
              {/* Best Sellers Section */}
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-[0_4px_6px_-1px_rgba(22,163,74,0.1),0_2px_4px_-1px_rgba(22,163,74,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-2px_rgba(22,163,74,0.1)] transform hover:-translate-y-0.5 transition-all duration-300 p-2 py-3 md:p-4 md:py-6">
                <div className="flex items-center pb-2 md:pb-4">
                  <h2 className="text-xl md:text-3xl font-bold">สินค้าขายดี</h2>
                  <ChevronRight color="#b5bbc5" />
                </div>
                <ProductShowcase />
              </div>
              <MapSection />

              {/* New Hot Stores Section */}
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-[0_4px_6px_-1px_rgba(22,163,74,0.1),0_2px_4px_-1px_rgba(22,163,74,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-2px_rgba(22,163,74,0.1)] transform hover:-translate-y-0.5 transition-all duration-300 p-2 py-3 md:p-4 md:py-6">
                <div className="flex items-center pb-2 md:pb-4">
                  <h2 className="text-xl md:text-3xl font-bold">
                    ร้านใหม่มาแรง
                  </h2>
                  <ChevronRight color="#b5bbc5" />
                </div>
                <NewRestaurants />
              </div>

              {/* Recommended Stores Section */}
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-[0_4px_6px_-1px_rgba(22,163,74,0.1),0_2px_4px_-1px_rgba(22,163,74,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-2px_rgba(22,163,74,0.1)] transform hover:-translate-y-0.5 transition-all duration-300 p-2 py-3 md:p-4 md:py-6">
                <div className="flex items-center pb-2 md:pb-4">
                  <h2 className="text-xl md:text-3xl font-bold">
                    ร้านค้าแนะนำ
                  </h2>
                  <ChevronRight color="#b5bbc5" />
                </div>
                <TopRestaurants />
              </div>

              {/* Nearby Stores Section */}
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-[0_4px_6px_-1px_rgba(22,163,74,0.1),0_2px_4px_-1px_rgba(22,163,74,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-2px_rgba(22,163,74,0.1)] transform hover:-translate-y-0.5 transition-all duration-300 p-2 py-3 md:p-4 md:py-6">
                <div className="flex items-center pb-2 md:pb-4">
                  <h2 className="text-xl md:text-3xl font-bold">
                    ร้านอร่อยใกล้คุณ
                  </h2>
                  <ChevronRight color="#b5bbc5" />
                </div>
                <NearbyStoresSection />
              </div>

              {/* Popular Stores Section */}
              <div className="p-2 py-3 md:p-4 md:py-6">
                <div className="flex items-center pb-2 md:pb-4">
                  <h2 className="text-xl md:text-3xl font-bold">
                    ร้านอาหารยอดฮิต
                  </h2>
                  <ChevronRight color="#b5bbc5" />
                </div>
                <PopularStore />
              </div>

              {/* All Stores Section */}
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-[0_4px_6px_-1px_rgba(22,163,74,0.1),0_2px_4px_-1px_rgba(22,163,74,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-2px_rgba(22,163,74,0.1)] transform hover:-translate-y-0.5 transition-all duration-300 p-2 py-3 md:p-4 md:py-6">
                <div className="flex items-center pb-2 md:pb-4">
                  <h2 className="text-xl md:text-3xl font-bold">ร้านทั้งหมด</h2>
                  <ChevronRight color="#b5bbc5" />
                </div>
                <TopRestaurants />
              </div>

              {/* Donation Section */}
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-[0_4px_6px_-1px_rgba(22,163,74,0.1),0_2px_4px_-1px_rgba(22,163,74,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-2px_rgba(22,163,74,0.1)] transform hover:-translate-y-0.5 transition-all duration-300 p-2 py-3 md:p-4 md:py-6">
                <div className="flex items-center pb-2 md:pb-4">
                  <h2 className="text-xl md:text-3xl font-bold">ร้านทั้งหมด</h2>
                  <ChevronRight color="#b5bbc5" />
                </div>
                <DonationSection />
              </div>
            </div>
          ) : (
            <CategoryProducts />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
