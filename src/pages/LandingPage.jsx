import React from 'react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import MainFood from '../assets/pictures/FoodImg_LandingPage.png';
import Neatby from '../assets/pictures/User_NearbyMap.png';
import testimonial from '../assets/pictures/UserTestimonial.png';
import foundation from '../assets/pictures/Foundation.png';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App bg-background">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1><img className='w-20 h-14' src="../../src/assets/pictures/FoodSaver.png" alt="" /></h1>

        {/* Desktop Navigation */}
        <nav className="space-x-4 hidden md:flex items-center">
          <a href="/login" className="text-primary font-medium">
            เข้าสู่ระบบ
          </a>
          <a
            href="/selectRegister"
            className="bg-primary text-white px-4 py-2 rounded-3xl font-medium hover:bg-white hover:text-primary hover:border-[#5abd4f] hover:border-2"
          >
            สมัครสมาชิก
          </a>
        </nav>

        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleMenu} className="md:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute right-0 top-14 flex flex-col items-start bg-white shadow-md p-4 rounded-md md:hidden space-y-2 z-50">
          <a href="/login" className="text-primary font-medium">
            เข้าสู่ระบบ
          </a>
          <a
            href="/selectRegister"
            className="bg-primary text-white px-4 py-2 rounded-3xl font-medium hover:bg-white hover:text-primary hover:border-[#5abd4f] hover:border-2"
          >
            สมัครสมาชิก
          </a>
        </nav>
      )}

      {/* Hero Section */}
      <section className="py-5 lg:py-10 h-auto flex flex-col md:flex-row items-center justify-center">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center px-2 md:px-4 lg:px-8 text-center md:text-left space-y-4 md:space-y-0 md:space-x-8">

          {/* Text Content */}
          <div className="md:w-1/2 animate-slide-in-left px-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wider leading-tight">
              อิ่มอร่อยในราคาสุดคุ้ม พร้อมช่วยโลกไปด้วยกัน
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-4 text-gray-600 max-w-md mx-auto md:mx-0">
              ค้นหาอาหารคุณภาพจากร้านโปรดในราคาประหยัด
              สร้างประสบการณ์ใหม่ที่อิ่มอร่อยและยั่งยืน
              ร่วมลดการสูญเสียอาหารง่าย ๆ เพียงปลายนิ้วสัมผัส!
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">

              {/* Primary Button */}
              <button
                onClick={() => navigate("/login")}
                className="bg-primary text-white px-6 py-3 rounded-3xl shadow-lg transition-transform transform hover:scale-105 duration-300 hover:bg-white hover:text-primary hover:border-[#5abd4f] hover:border-2 w-full sm:w-auto"
              >
                เริ่มต้นใช้งาน
              </button>

            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-4 md:mt-0">
            <img
              src={MainFood}
              alt="App preview"
              className="w-[90%] md:w-[70%] lg:w-[600px] xl:w-[700px] h-auto animate-pulse-slow"
            />
          </div>
        </div>
      </section>






      <div className="flex justify-center mx-auto p-4 mb-8 md:p-8 ">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/TVP3j7_W7og?si=pRSuS1n81R2c5ay3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>






      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="p-6 bg-gradient-to-b from-blue-50 to-white  hover:shadow-2xl transition-shadow duration-300 rounded-md">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              ค้นหามื้อพิเศษจากร้านโปรด
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              พบอาหารคุณภาพที่ยังเหลือจากร้านอาหารใกล้เคียงในราคาพิเศษ
              ช่วยคุณประหยัดได้ทุกวันและลดขยะอาหารไปพร้อมกัน
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="p-6 bg-gradient-to-b from-blue-50 to-white  hover:shadow-2xl transition-shadow duration-300 rounded-md">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-yellow-600 mb-2">
              ร่วมสนับสนุนชุมชนของคุณ
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              ช่วยเหลือร้านค้าในชุมชนด้วยการสนับสนุนอาหารที่ไม่ได้ขาย
              ลดการสูญเสียทรัพยากรและสร้างผลกระทบเชิงบวกต่อสิ่งแวดล้อม
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="p-6 bg-gradient-to-b from-blue-50 to-white  hover:shadow-2xl transition-shadow duration-300 rounded-md">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              สะดวก รวดเร็ว ปลอดภัย
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              แอปใช้งานง่ายพร้อมการจ่ายเงินที่ปลอดภัย
              เลือกมื้ออร่อยได้ทุกที่ทุกเวลา พร้อมตัวเลือกอาหารตามความต้องการ
            </p>
          </div>
        </div>
      </section>










      {/* Nearby Restaurants Section */}
      <section className="py-12 bg-white">
        {/* Main Header Section */}
        <div className="max-w-6xl mx-auto text-center px-4 md:px-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            ร้านอาหารใกล้คุณพร้อมดีลสุดพิเศษ
          </h2>
          <p className="text-gray-600">
            ค้นหาร้านอาหารที่อยู่ใกล้คุณ พร้อมข้อเสนอสุดพิเศษได้ง่าย ๆ
            ด้วยแผนที่ของเรา
          </p>
        </div>

        {/* Image and Details Section */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start px-4 md:px-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 relative">
            <img
              src='https://res.cloudinary.com/dr3cahrwr/image/upload/v1731574460/bvn6xy42ywr3agy1xc05.jpg'
              alt="Map showing nearby restaurants"
              className="w-72 h-auto rounded-lg"
            />
          </div>

          {/* Additional Text Section */}
          <div className="w-full md:w-1/2 md:pl-8 text-center ">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-2xl font-semibold text-primary mb-2">
                ค้นหาร้านอาหารใกล้ตัว 🗺️
              </h3>
              <p className="text-gray-600 mb-4 text-left">
                <span className="font-bold">
                  ค้นหาได้สะดวกตามตำแหน่งที่คุณอยู่:
                </span>{" "}
                เลือกร้านอาหารที่ใกล้ที่สุด เพียงเปิดแผนที่
                คุณก็จะเห็นร้านค้าในบริเวณใกล้เคียงที่พร้อมให้ข้อเสนอพิเศษ
              </p>
              <p className="text-gray-600 mb-4 text-left">
                <span className="font-bold">ข้อเสนอที่หลากหลาย:</span>{" "}
                รับดีลสุดคุ้มจากร้านโปรด ลดค่าใช้จ่ายพร้อมสนับสนุนร้านค้าในชุมชน
              </p>
              <p className="text-gray-600 mb-4 text-left">
                <span className="font-bold">ลดการสูญเสียอาหาร:</span>{" "}
                เพลิดเพลินกับมื้ออร่อย
                พร้อมร่วมเป็นส่วนหนึ่งในการลดขยะอาหารไปด้วยกัน
              </p>
              <p className="text-gray-600 mb-4 text-left">
                <span className="font-bold">ลดค่าใช้จ่าย:</span>{" "}
                การวางแผนการซื้อและการทำอาหารอย่างมีประสิทธิภาพช่วยให้ประหยัดเงิน
              </p>
              <p className="text-gray-600 mb-4 text-left">
                <span className="font-bold">บริจาคอาหาร:</span>{" "}
                หากมีอาหารเหลือ สามารถบริจาคให้กับองค์กรการกุศล
              </p>
              <p className="text-gray-600 mb-4 text-left">
                <span className="font-bold">ร้านอาหารชื่อดังที่คุณคุ้นเคย:</span>{" "}
                อาหารสุดคุ้มจากร้านอาหาร ร้านขนมเบเกอรีและโรงแรมชั้นนำ
              </p>
            </div>
          </div>
        </div>
      </section>




      <div className="flex flex-col items-center py-10 w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">ร้านค้าพันธมิตรร่วมรักษ์โลก</h1>
        <div className="w-1/2 grid grid-cols-8  gap-4 mb-8 max-md:grid-cols-4 max-md:w-full justify-items-center">
          <img src="https://i.postimg.cc/q793rZcv/f0ec16-27dcd99bfad24e6bbaa4c595dc642617-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/NMmrj7b7/f0ec16-382255ea75a9443a9af9d9917a12c5db-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/yYB0W5MJ/f0ec16-4f9a9296e1c54d608c2e236644d306a9-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/BQgHFp3m/f0ec16-5f0975d8361148a7993100fba454073c-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/FH6fbnBV/f0ec16-6e4b3bca5dbd4896a7e80ed30e9b3e52-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/RZZfLtV4/f0ec16-8fbfbeecf5454412a422e374e95e3b73-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/7ZtzsLf7/f0ec16-9b0b20c0d75344f488d71250353b4f9f-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/s2BhtRhL/f0ec16-9c927529cf4b4634962c22d55434860a-mv2.png" className='w-20 h-20 shadow-md'></img>
        </div>

        <div className="w-1/2 grid grid-cols-8  gap-4 mb-8 max-md:hidden max-md:grid-cols-4 max-md:w-full justify-items-center">
          <img src="https://i.postimg.cc/FzvkddBt/f0ec16-bcf69f18048c4bae88b7cdab95964be8-mv2.jpg" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/BbCLxSrj/f0ec16-bfe0273fa3824379ba9864f32f8a78ea-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/gcyZ9sxG/f0ec16-c5574ebaf4f34064b8f696105a3a830b-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/bNz2qnnk/f0ec16-dccb54fc21694f8d8dd9f58d3a2708d6-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/7YmJhL1c/fe494e-2ebd4c0bde0f4864aea2604b33a5174c-mv2.jpg" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/022rTsgC/fe494e-31c7b178876e4d55923017b2f9208260-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/ZnJ0KkW4/fe494e-35e76d3124a64922a82e11c46fbdc03e-mv2.jpg" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/RF7NBCVg/fe494e-3d9406cae9eb4cd88772894cccbf47bf-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/yYQWBbsC/fe494e-64060b6034084824a5fb8c7253a09697-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/K8jkMyJY/fe494e-6a087ef50f8c4c649d28df9de1f69905-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/RF5NyJ93/fe494e-6b14abb211374382aba2db65071c6188-mv2.jpg" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/PJKJC6DZ/fe494e-72f3d13838b74626adf1d3fc5a4cb945-mv2.jpg" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/kgL4RR2j/fe494e-8179945db2a94d8b9205892c1de44987-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/Jzs0h5zD/fe494e-89128b87b16c40cab990977b0506e503-mv2.jpg" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/Kc5RpYWz/fe494e-891c321f809443c48a8807735e1421d9-mv2.png" className='w-20 h-20 shadow-md'></img>
          <img src="https://i.postimg.cc/JhBsp5wV/fe494e-8d7794b4fea64dcfb7cb6d68df8b5b26-mv2.png" className='w-20 h-20 shadow-md'></img>
        </div>

        <a href='http://localhost:5173/MerchantRegister' className="bg-primary hover:bg-white hover:text-primary hover:border-primary hover:border-2 text-white px-8 py-3 rounded-3xl shadow-lg transition-transform transform hover:scale-105 duration-300 font-semibold">เข้าร่วมจำหน่ายกับเรา</a>
      </div>



      <div className="flex flex-col items-center justify-center py-10 w-full ">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">มูลนิธิที่เข้าร่วมกับเรา</h1>

        <div className="w-1/2 grid grid-cols-8 gap-4 mb-8 max-md:grid-cols-4 max-md:w-full justify-items-center ">
          <img src='https://i.postimg.cc/d3PhdTb3/11.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/NMTMgjKc/112.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/d3jVyNRN/113.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/8cSCsgvr/114.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/XNfJmXMK/115.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/dtJ1Yvvb/116.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/wjvj1V1F/117.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/jdTWSP6k/12.jpg' className='w-20 h-20 shadow-md'></img>
        </div>

        <div className="w-1/2 grid grid-cols-8 gap-4 mb-8 max-md:hidden max-md:grid-cols-4 max-md:w-full justify-items-center ">
          <img src='https://i.postimg.cc/L6vs478n/122.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/ZRkbDzVD/125.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/Qdyx1T5D/127.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/VsnrwDtC/13.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/1zVRH3cq/131.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/Y91p5DP2/133.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/rFy8HJNc/135.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/L439v7fN/137.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/rsjqm0cv/139.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/4y6m1xG5/14.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/WzT2T6RG/141.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/rFh82rf4/143.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/zvX9xdZc/147.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/QdHj8dzy/149.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/rw3MKLXF/150.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/cHNWBMLp/153.jpg' className='w-20 h-20 shadow-md'></img>
          {/* <img src='https://i.postimg.cc/bvn8nFp0/154.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/cHMS9gKr/156.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/v8hy5nFK/157.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/FHs7jvBy/16.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/nLNrbDc2/17.png' className='w-20 h-20 shadow-md'></img> */}
          {/* <img src='https://i.postimg.cc/SNGn2RDQ/18.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/SKnRvrqj/19.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/JnByGQdS/2n.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/nhRM2Wy6/45th-Anniversary-of-FFC-web.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/SRSpwS8V/FCD-logo.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/rsfLTBNT/fdlogo-sdf.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/Pq1sJpQ2/images-10.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/dt0Y60JV/images-3.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/mgzGx6zx/images-4.png' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/wTbdGdBc/images-8.jpg' className='w-20 h-20 shadow-md'></img>
          <img src='https://i.postimg.cc/7ZFrqM05/images-9.jpg' className='w-20 h-20 shadow-md'></img> */}
        </div>
      </div>




      <section className="py-12 flex justify-center items-center bg-gradient-to-b from-blue-50 to-white">
        <Swiper
          spaceBetween={40} // Adjust spacing between slides
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 5000, // 5000ms = 5 seconds
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="max-w-screen-xl w-full p-4 md:p-8 lg:p-10" // Increase max-width and adjust padding
        >
          {/* Testimonial Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img
                  src="https://res.cloudinary.com/dr3cahrwr/image/upload/v1731576486/linckmp7acdiioradbdj.jpg"
                  alt="User testimonial"
                  className="w-[85%] sm:w-64 lg:w-[70%] h-auto rounded-lg object-cover shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 lg:w-1/2 md:pl-8 text-center md:text-left">
                <h3 className="text-gray-700 font-semibold text-xl lg:text-2xl mb-2">
                  เสียงตอบรับจากผู้ใช้จริง
                </h3>
                <p className="text-gray-700 italic text-base lg:text-lg mb-4">
                  “แอปนี้ช่วยให้ฉันได้มีส่วนร่วมในการลดขยะอาหาร
                  รู้สึกดีที่ได้เป็นส่วนหนึ่งของการเปลี่ยนแปลงนี้!”
                </p>
                <p className="text-gray-600 text-base lg:text-lg">
                  แอนนา,
                  <br />
                  ผู้ใช้งานจริง
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial Slide 2 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img

                  src="https://res.cloudinary.com/dr3cahrwr/image/upload/v1731576981/b5yfaijxevvpw1zbxwau.jpg"
                  alt="User testimonial"
                  className="w-[85%] sm:w-64 lg:w-[70%] h-auto rounded-lg object-cover shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 lg:w-1/2 md:pl-8 text-center md:text-left">
                <h3 className="text-gray-700 font-semibold text-xl lg:text-2xl mb-2">
                  เสียงตอบรับจากผู้ใช้จริง
                </h3>
                <p className="text-gray-700 italic text-base lg:text-lg mb-4">
                  “แอปนี้เปลี่ยนวิธีการบริโภคอาหารของฉัน
                  รู้สึกดีที่สามารถช่วยลดขยะและเข้าถึงอาหารอร่อยในราคาที่จับต้องได้!”
                </p>
                <p className="text-gray-600 text-base lg:text-lg">
                  ส้ม,
                  <br />
                  ผู้ใช้งานจริง
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial Slide 3 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img

                  src="https://res.cloudinary.com/dr3cahrwr/image/upload/v1731576814/e9bkjrh8ephuohydmvfy.jpg"
                  alt="User testimonial"
                  className="w-[85%] sm:w-64 lg:w-[70%] h-auto rounded-lg object-cover shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 lg:w-1/2 md:pl-8 text-center md:text-left">
                <h3 className="text-gray-700 font-semibold text-xl lg:text-2xl mb-2">
                  เสียงตอบรับจากผู้ใช้จริง
                </h3>
                <p className="text-gray-700 italic text-base lg:text-lg mb-4">
                  “ทุกคน เราชอบไอเดียของแอปนี้ ร้านอาหารไม่ต้องเทอาหารทิ้ง ลูกค้าก็ได้กินอาหารจากร้านดังๆ ในราคาที่ถูกกว่าครึ่ง และยังได้ช่วยโลกร้อนด้วย”
                </p>
                <p className="text-gray-600 text-base lg:text-lg">
                  ทิพ,
                  <br />
                  ผู้ใช้งานจริง
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial Slide 4 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img
                  src="https://res.cloudinary.com/dr3cahrwr/image/upload/v1731576993/bzxlo3bgkq6idcjorowm.jpg"
                  alt="User testimonial"
                  className="w-[85%] sm:w-64 lg:w-[70%] h-auto rounded-lg object-cover shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 lg:w-1/2 md:pl-8 text-center md:text-left">
                <h3 className="text-gray-700 font-semibold text-xl lg:text-2xl mb-2">
                  เสียงตอบรับจากผู้ใช้จริง
                </h3>
                <p className="text-gray-700 italic text-base lg:text-lg mb-4">
                  “คุณสามารถช่วยต่อสู้กับปัญหาขยะอาหารได้ด้วยอาหารจากแอปนี้ ที่ระบุส่วนประกอบที่ดีอย่างชัดเจน เพื่อคนที่มีอาการแพ้อาหารอย่างฉัน”
                </p>
                <p className="text-gray-600 text-base lg:text-lg">
                  ตี๋,
                  <br />
                  ผู้ใช้งานจริง
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial Slide 5 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img
                  src="https://res.cloudinary.com/dr3cahrwr/image/upload/v1731576999/axwumujfmmo75fovxoxg.jpg"
                  alt="User testimonial"
                  className="w-[85%] sm:w-64 lg:w-[70%] h-auto rounded-lg object-cover shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 lg:w-1/2 md:pl-8 text-center md:text-left">
                <h3 className="text-gray-700 font-semibold text-xl lg:text-2xl mb-2">
                  เสียงตอบรับจากผู้ใช้จริง
                </h3>
                <p className="text-gray-700 italic text-base lg:text-lg mb-4">
                  “มันดีมากๆ ที่เรามีทางเลือกเพื่อโลกใบนี้ แทนการสั่งอาหารจาก Grab หรือการสั่งอาหารกลับบ้าน ด้วยส่วนลดที่มากกว่า”
                </p>
                <p className="text-gray-600 text-base lg:text-lg">
                  นันทนา,
                  <br />
                  ผู้ใช้งานจริง
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>





      <div className="flex justify-center items-center gap-20 md:flex-row flex-col">
        <div className="card glass w-96">
          <figure>
            <img src="https://i.postimg.cc/kg5jw8xY/1-h-WWewef-MOs-Kjve8b6-O6-Egw-thegem-blog-timeline-large.jpg" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">ภารกิจ</h2>
            <p>สร้างความตระหนักเกี่ยวกับปัญหาขยะอาหาร </p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card glass w-96">
          <figure>
            <img src="https://i.postimg.cc/Mpr9LT56/grocery-bag-food-pound-sign.jpg" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">วิสัยทัศน์</h2>
            <p>โลกที่ปราศจากการทิ้งอาหารที่ผลิตขึ้นมาเพื่อบริโภค</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card glass w-96">
          <figure>
            <img src="https://static.wixstatic.com/media/cc8baf_52452afa4a724906aa7cef3e22e635aa~mv2.png/v1/fill/w_925,h_520,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/cc8baf_52452afa4a724906aa7cef3e22e635aa~mv2.png" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">ลดขยะอาหาร</h2>
            <p>ปรุงของเหลือให้มีมูลค่า เปลี่ยนโลกที่ดีกว่า</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>





      <div className="flex justify-center items-center  bg-white">
        <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={foundation} alt="Donation" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              มอบสิ่งสำคัญให้กับผู้ที่ต้องการ
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              การบริจาคของคุณสามารถเปลี่ยนชีวิตได้
              ช่วยแบ่งปันความสุขและสร้างความเปลี่ยนแปลงให้กับสังคมของเรา
            </p>
            <p className="text-lg text-gray-600">
              <strong>ยอดบริจาครวม:</strong> แสดงยอดบริจาคที่ได้รับทั้งหมด
            </p>
            <p className="text-lg text-gray-600">
              <strong>วันที่สิ้นสุดการบริจาค:</strong> แจ้งเตือนวันสุดท้ายของการเปิดรับบริจาคเพื่อให้คุณไม่พลาดโอกาสในการมีส่วนร่วม
            </p>
          </div>
        </div>
      </div>






      <div className="flex justify-center items-center bg-white">
        <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              เริ่มต้นวันนี้เพื่อโลกที่ยั่งยืน
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              การลดปริมาณอาหารเหลือทิ้งเป็นเรื่องง่ายที่ทุกคนสามารถทำได้ การเปลี่ยนแปลงพฤติกรรมเล็กๆ น้อยๆ ของเรา จะส่งผลดีต่อสิ่งแวดล้อมและสังคมในระยะยาว ร่วมกันสร้างโลกใบนี้ให้เป็นที่อยู่ที่ดีขึ้นสำหรับทุกคน
            </p>
          </div>
          <div>
            <img src='https://www.foodiecoaches.com/wp-content/uploads/2023/06/45-Waste.png' alt="" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>


      <div className="flex justify-center items-center  bg-white">
        <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src='https://lomi.com/cdn/shop/articles/stop-wasting-food.jpg?v=1648398904' alt="" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              กอบกู้อาหาร
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              เพราะอาหารทุกๆ 1 กก. ที่ได้รับการกอบกู้ผ่าน Food Saver ถือเป็นการชดเชย การปล่อยก๊าซ CO₂ 2.5 กก. สู่ชั้นบรรยากาศ ซึ่งเป็นวิธีที่ช่วยปกป้องโลก จากเปลี่ยนแปลงสภาพอากาศที่ง่ายที่สุด!
            </p>
          </div>
        </div>
      </div>



      {/* Footer */}
      <footer className="py-6 px-4 bg-gray-800 text-white w-full">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          {/* Copyright Text */}
          <p className="text-sm sm:text-base text-center sm:text-left">
            &copy; 2024 Food Saver. All rights reserved.
          </p>

          {/* Navigation Links */}
          <nav className="flex space-x-4 mt-2 sm:mt-0">
            <a
              href="/MerchantRegister"
              className="text-gray-400 hover:text-white"
            >
              สมัครสมาชิกสำหรับร้านค้า
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage