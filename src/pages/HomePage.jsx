import React, { useEffect } from 'react';
import useProductStore from '../stores/useProductStore';
import useStoreStore from '../stores/Store';
import { MapPin, User } from 'lucide-react';
import useFoundationStore from '../stores/FoundationStore';
import useMapStore from '../stores/mapStore';
import useCategoryStore from '../stores/CategoryStore';

import Banner from '../assets/pictures/HomePagePromo.png';
import Map from '../assets/pictures/HomePageMap.png';

/**
 * Header Component
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-4 bg-white shadow-md">
      <div className="logo text-xl md:text-2xl font-extrabold text-green-600">Food Saver</div>
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
    <section className="hero-section px-4 md:px-8 py-8 md:py-16 bg-green-50 flex items-center justify-center">
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
      className="category-item flex flex-col items-center mx-2 cursor-pointer hover:text-green-600"
      onClick={() => onSelect(id)}
    >
      <div className="icon bg-green-100 p-2 md:p-4 rounded-full shadow-md hover:bg-green-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-12 w-12 md:h-16 md:w-16 object-cover rounded-full"
          />
        ) : (
          <span className="material-icons text-green-800 text-2xl md:text-3xl">img</span>
        )}
      </div>
      <p className="text-gray-800 mt-2 font-medium text-sm md:text-base">{name}</p>
    </div>
  );
};

/**
 * CategoriesSection Component
 */
const CategoriesSection = () => {
  const { categories, fetchCategories, selectCategory, loading, error } = useCategoryStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories(1, '', 23);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchData();
  }, [fetchCategories]);

  if (loading && categories.length === 0) {
    return <p className="p-4 md:p-8 text-center">Loading Categories...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || 'Failed to load categories.'}
      </p>
    );
  }

  if (!Array.isArray(categories)) {
    return <p className="p-4 md:p-8 text-center">No Categories Available.</p>;
  }

  return (
    <section className="categories-section p-4 md:p-8 bg-white">
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto">
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
    categories.find((cat) => cat.id === selectedCategory)?.name || 'Selected Category';

  return (
    <section className="category-products-section p-4 md:p-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">
          Products in "{categoryName}"
        </h2>
        <button
          className="bg-green-600 text-white px-3 md:px-4 py-1 md:py-2 rounded hover:bg-green-700"
          onClick={resetSelectedCategory}
        >
          Back
        </button>
      </div>
      {loading && products.length === 0 ? (
        <p className="p-4 md:p-8 text-center">Loading Products...</p>
      ) : error ? (
        <p className="p-4 md:p-8 text-center text-red-500">
          Error: {error || 'Failed to load products.'}
        </p>
      ) : products.length === 0 ? (
        <p className="p-4 md:p-8 text-center">No Products Found in this Category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white p-4 border rounded-lg shadow-md"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-40 w-full object-cover rounded"
                loading="lazy"
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
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
      )}
    </section>
  );
};

/**
 * ProductShowcase Component
 */
const ProductShowcase = () => {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts(1, 5);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchData();
  }, [fetchProducts]);

  if (loading && products.length === 0) {
    return <p className="p-4 md:p-8 text-center">Loading Best Sellers...</p>;
  }

  if (error) {
    return (
      <p className="p-4 md:p-8 text-center text-red-500">
        Error: {error || 'Failed to load best sellers.'}
      </p>
    );
  }

  return (
    <section className="product-showcase p-4 md:p-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Best Sellers</h2>
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto">
        {products.slice(0, 5).map((product) => (
          <div
            key={product.id}
            className="product-card bg-white p-4 border rounded-lg shadow-md min-w-[200px]"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-32 md:h-40 w-full object-cover rounded"
              loading="lazy"
            />
            <div className="mt-4">
              <h3 className="text-md md:text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
              <p className="text-green-700 mt-2 font-bold">Sale Price: ${product.salePrice}</p>
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
 * MapSection Component
 */
const MapSection = () => {
  return (
    <section className="map-section px-4 md:px-8 py-8 md:py-16 bg-green-50 flex items-center justify-center">
      <div className="map-image w-full h-full">
        <img
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStores(1, {}, 5);
      } catch (error) {
        console.error('Failed to fetch stores:', error);
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
        Error: {error || 'Failed to load new restaurants.'}
      </p>
    );
  }

  return (
    <section className="new-restaurants-section p-4 md:p-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">New Restaurants</h2>
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto">
        {stores.slice(0, 5).map((store) => (
          <div
            key={store.id}
            className="restaurant-card p-4 border rounded-lg shadow-md min-w-[200px]"
          >
            <img
              src={store.profilePicture}
              alt={store.storeName}
              className="h-32 md:h-40 w-full object-cover rounded"
              loading="lazy"
            />
            <div className="mt-4">
              <h3 className="text-md md:text-lg font-bold text-gray-800">{store.storeName}</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Promo: {store.promoDetails || 'No promo available'}
              </p>
              <p className="text-green-700 mt-2 font-medium">{store.distance || 'N/A'}</p>
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
 * ProductSpecial Component
 */
const ProductSpecial = () => {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts(2, 10);
      } catch (error) {
        console.error('Failed to fetch products:', error);
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
        Error: {error || 'Failed to load special offers.'}
      </p>
    );
  }

  return (
    <section className="product-special p-4 md:p-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Special Offer</h2>
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto">
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
              <h3 className="text-md md:text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
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
        console.error('Failed to fetch top restaurants:', error);
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
        Error: {error || 'Failed to load top restaurants.'}
      </p>
    );
  }

  return (
    <section className="top-restaurants-section p-4 md:p-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Top Restaurants</h2>
      <div className="flex space-x-2 md:space-x-4 overflow-x-auto">
        {stores.slice(10, 17).map((store) => (
          <div
            key={store.id}
            className="restaurant-card p-2 border rounded-lg shadow-md min-w-[100px] w-[100px] h-[100px] md:min-w-[150px] md:w-[150px] md:h-[150px]"
          >
            <img
              src={store.profilePicture}
              alt={store.storeName}
              className="h-full w-full object-cover rounded-md"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * DonationSection Component
 */
const DonationSection = () => {
  const { foundations, fetchFoundations, loading, error } = useFoundationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchFoundations(1, '', 10);
      } catch (error) {
        console.error('Failed to fetch foundations:', error);
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
        Error: {error || 'Failed to load foundations.'}
      </p>
    );
  }

  if (!Array.isArray(foundations)) {
    return <p className="p-4 md:p-8 text-center">No Foundations Available.</p>;
  }

  return (
    <section className="donation-section p-4 md:p-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Donate Food</h2>
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto">
        {foundations.map((foundation) => (
          <div
            key={foundation.id}
            className="foundation-card flex-shrink-0 w-48 md:w-64 p-4 bg-white rounded-lg shadow-md"
          >
            <img
              src={foundation.profilePicture}
              alt={foundation.name}
              className="h-24 md:h-32 w-full object-cover rounded-md"
              loading="lazy"
            />
            <div className="mt-2">
              <h3 className="text-md md:text-lg font-bold text-gray-800">
                {foundation.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {foundation.contactInfo || 'No contact info available'}
              </p>
            </div>
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
  const { stores, getStoreArray, userLocation, getUserLocation } = useMapStore();

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
        console.error('Failed to fetch nearby stores:', error);
      }
    };
    fetchLocationAndStores();
  }, [getUserLocation, getStoreArray, userLocation.lat, userLocation.lng]);

  if (stores.length === 0) {
    return <p className="p-4 md:p-8 text-center">Loading Nearby Stores...</p>;
  }

  return (
    <section className="nearby-stores-section p-4 md:p-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Nearby Stores</h2>
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto">
        {stores.map((store) => (
          <div
            key={store.id}
            className="store-card flex-shrink-0 w-48 md:w-64 p-4 bg-white rounded-lg shadow-md"
          >
            <img
              src={store.profilePicture}
              alt={store.storeName}
              className="h-24 md:h-32 w-full object-cover rounded-md"
              loading="lazy"
            />
            <div className="mt-2">
              <h3 className="text-md md:text-lg font-bold text-gray-800">
                {store.storeName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {store.storeAddress || 'No address available'}
              </p>
              <p className="text-green-700 mt-2 font-medium">
                {store.distance
                  ? `${(store.distance * 1.609344).toFixed(2)} km`
                  : 'N/A'}
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
 * RecommendedSection Component
 */
const RecommendedSection = () => {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts(3, 15);
      } catch (error) {
        console.error('Failed to fetch products:', error);
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
        Error: {error || 'Failed to load recommendations.'}
      </p>
    );
  }

  return (
    <section className="recommended-section p-4 md:p-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
        Recommended For You
      </h2>
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
              <h3 className="text-md md:text-lg font-bold text-gray-800">{product.name}</h3>
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

  return (
    <div className="font-sans">
      <Header />
      <HeroSection />
      {!selectedCategory ? (
        <>
          <CategoriesSection />
          <ProductShowcase />
          <MapSection />
          <NewRestaurants />
          <ProductSpecial />
          <TopRestaurants />
          <DonationSection />
          <NearbyStoresSection />
          <RecommendedSection />
        </>
      ) : (
        <CategoryProducts />
      )}
      <footer className="p-4 md:p-8 text-center text-gray-500">© 2023 Food Saver</footer>
    </div>
  );
};

export default HomePage;
