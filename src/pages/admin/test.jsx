import React, { useState, useEffect, useRef } from 'react';
import useMangaStore from '../zustand/manga-store';
import '@mantine/carousel/styles.css';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useNavigate } from 'react-router-dom';
import { FavoriteIcon, UnFavoriteIcon } from '../icons';
import useAuthStore from '../zustand/auth-store';
import axios from '../config/axios';

const Home = () => {
  const navigate = useNavigate();
  const getAllManga = useMangaStore(state => state.getAllManga);
  const mangas = useMangaStore(state => state.mangas);

  // const user = useAuthStore(state => state.user)
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  // console.log(user)
  const [mangaPack,setMangaPack]= useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const hdlOnClick = (mangaId) => {
    navigate(`/manga/${mangaId}`);
  };
  // console.log(mangas)
  const fetchAllManga = async (page) => {
    try {
      await getAllManga();
      
      // console.log('object')
      const result = await axios.get(`/manga/getMangaPagination?page=${page}&limit=12`)
      // console.log('object2')
      setTotalPages(result?.data?.totalPages)
      setMangaPack(result?.data?.allManga)
    } catch (err) {
      console.log(err);
    }
  };
 
  useEffect(() => {
    fetchAllManga(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen ">
      <div style={{backgroundColor : "rgba(255,255,255,0.3)"}}>
        
      {/* Hero Carousel */}
      <div className="relative w-full max-w-5xl mx-auto mt-8 rounded-lg overflow-hidden shadow-2xl">
        <Carousel
          withIndicators
          height={300}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <Carousel.Slide className="bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">Explore the Latest Manga!</h2>
          </Carousel.Slide>
          <Carousel.Slide className="bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">Discover New Adventures</h2>
          </Carousel.Slide>
          <Carousel.Slide className="bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">Your Favorite Manga Awaits</h2>
          </Carousel.Slide>
          
        </Carousel>
      </div>

      {/* Featured Manga Section */}
      <div className="my-12 px-4">
        <h2 className="text-4xl font-semibold text-center text-pink-700 mb-8">
          การ์ตูนยอดฮิต
        </h2>
        <div className="flex gap-6 justify-evenly">
          {mangas?.sort((a, b) => b.views-a.views)
            .slice(0, 4)
            .map((manga, index) => (
              <div 
                key={index} 
                onClick={() => hdlOnClick(manga.id)}
                className="bg-white rounded-lg shadow-lg w-[200px] flex flex-col  relative transition-transform duration-300 hover:scale-105 cursor-pointer"
              > 
                <div className='flex'>

                <img src={manga.imageUrl} alt={manga.mangaName} className="w-[200px] h-[200px] object-fit" />
                </div>
                <div className="p-4 h-auto">
                  <h3 className="text-lg font-medium text-gray-800">{manga.mangaName}</h3>
                  <p className="text-sm text-gray-500">{manga.views} views</p>
                  <div className="flex justify-between items-center mt-2">
                    {/* <UnFavoriteIcon className="w-6 h-6 text-gray-400" />
                    <FavoriteIcon className="w-6 h-6 text-pink-600" /> */}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* All Manga Section */}
      <div className="my-12 px-4">
        <h2 className="text-4xl font-semibold text-center text-pink-700 mb-8">
          การ์ตูนอัพเดท
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {mangaPack?.map((manga, index) => (
            <div
              key={index}
              onClick={() => hdlOnClick(manga.id)}
              className="bg-white rounded-lg shadow-lg w-[200px] overflow-hidden relative transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
              <div className='flex'>

              <img src={manga.imageUrl} alt={manga.mangaName} className="w-[200px] h-[200px] object-fit" />
              </div>
              <div className='p-4'>
                <h3 className=" font-medium overflow-auto text-gray-800">{manga.mangaName}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <section className="mt-12 mb-12 flex justify-center items-center space-x-2">
        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, page) => (
            <button
            key={page + 1}
            onClick={() => setCurrentPage(page + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full 
                          ${currentPage === page + 1 ? 'bg-pink-600 text-white' : 'bg-gray-300 text-gray-600'}`}
                          >
              {page + 1}
            </button>
          ))}
        </div>
      </section>
              </div>
    </div>
  );
};

export default Home;