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
        <h1 className="text-primary text-xl font-semibold">Food Saver</h1>

        {/* Desktop Navigation */}
        <nav className="space-x-4 hidden md:flex items-center">
          <a href="/login" className="text-primary font-medium">
            เข้าสู่ระบบ
          </a>
          <a
            href="/selectRegister"
            className="bg-primary text-white px-4 py-2 rounded-md font-medium"
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
            href="/UserRegister"
            className="bg-primary text-white px-4 py-2 rounded-md font-medium"
          >
            สมัครสมาชิก
          </a>
        </nav>
      )}

      {/* Hero Section */}
      <section className="py-5 md:py-1">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12 text-center md:text-left">
          {/* Text Content */}
          <div className="max-w-md mb-8 md:mb-0 opacity-0 -translate-x-10 animate-slide-in-left">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wider">
              อิ่มอร่อยในราคาสุดคุ้ม พร้อมช่วยโลกไปด้วยกัน
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-6">
              ค้นหาอาหารคุณภาพจากร้านโปรดในราคาประหยัด
              สร้างประสบการณ์ใหม่ที่อิ่มอร่อยและยั่งยืน
              ร่วมลดการสูญเสียอาหารง่าย ๆ เพียงปลายนิ้วสัมผัส!
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {/* Primary Button */}
              <button
                onClick={() => navigate("/login")} // Navigate to the login page on click
                className="bg-primary hover:bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
              >
                เริ่มต้นใช้งาน
              </button>

              {/* Secondary Link with Icon */}
              <a
                href="#video"
                className="text-green-600 flex items-center hover:text-green-700 hover:underline transition duration-300"
              >
                <span>ดูวิดีโอ</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Image Section */}
          {/* Image Section with Pulse Animation */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-center opacity-0 animate-fade-in">
            <img
              src={MainFood}
              alt="App preview"
              className="w-96 h-auto lg:w-[30rem] xl:w-[35rem] animate-pulse-slow"
            />
          </div>
        </div>
      </section>

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
            <h3 className="text-xl font-semibold text-green-600 mb-2">
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
              src={Neatby}
              alt="Map showing nearby restaurants"
              className="w-72 h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Additional Text Section */}
          <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                ค้นหาร้านอาหารใกล้ตัว 🗺️
              </h3>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">
                  ค้นหาได้สะดวกตามตำแหน่งที่คุณอยู่:
                </span>{" "}
                เลือกร้านอาหารที่ใกล้ที่สุด เพียงเปิดแผนที่
                คุณก็จะเห็นร้านค้าในบริเวณใกล้เคียงที่พร้อมให้ข้อเสนอพิเศษ
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">ข้อเสนอที่หลากหลาย:</span>{" "}
                รับดีลสุดคุ้มจากร้านโปรด ลดค่าใช้จ่ายพร้อมสนับสนุนร้านค้าในชุมชน
              </p>
              <p className="text-gray-600">
                <span className="font-bold">ลดการสูญเสียอาหาร:</span>{" "}
                เพลิดเพลินกับมื้ออร่อย
                พร้อมร่วมเป็นส่วนหนึ่งในการลดขยะอาหารไปด้วยกัน
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 flex justify-center items-center bg-gradient-to-b from-blue-50 to-white">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 5000, // 5000ms = 5 seconds
            disableOnInteraction: false, // Autoplay continues even after user interaction
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="max-w-4xl p-6 md:p-8"
        >
          {/* Testimonial Slides */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img
                  src={testimonial} // Replace with the actual image URL
                  alt="User testimonial"
                  className="w-96 sm:w-64 h-auto sm:h-64 rounded-lg object-cover shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
                <h3 className="text-gray-700 font-semibold text-lg mb-2">
                  เสียงตอบรับจากผู้ใช้จริง
                </h3>
                <p className="text-gray-700 italic text-sm sm:text-base mb-4">
                  “แอปนี้ช่วยให้ฉันได้เข้าถึงอาหารคุณภาพในราคาย่อมเยา
                  และยังได้มีส่วนร่วมในการลดขยะอาหาร
                  รู้สึกดีที่ได้เป็นส่วนหนึ่งของการเปลี่ยนแปลงนี้!”
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  สนุสิา,
                  <br />
                  ผู้ใช้งานจริง
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial 2 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img
                  src={testimonial} // Replace with the actual image URL for the second testimonial
                  alt="User testimonial"
                  className="w-96 sm:w-64 h-auto sm:h-64 rounded-lg object-cover shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
                <h3 className="text-gray-700 font-semibold text-lg mb-2">
                  เสียงตอบรับจากผู้ใช้จริง
                </h3>
                <p className="text-gray-700 italic text-sm sm:text-base mb-4">
                  “แอปนี้เปลี่ยนวิธีการบริโภคอาหารของฉัน
                  รู้สึกดีที่สามารถช่วยลดขยะและเข้าถึงอาหารอร่อยในราคาที่จับต้องได้!”
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  นันทนา,
                  <br />
                  ผู้ใช้งานจริง
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Add more <SwiperSlide> for additional testimonials as needed */}
        </Swiper>
      </section>

      {/* Donation Section */}
      <section className="py-12  flex justify-center items-center">
        <div className="max-w-5xl flex flex-col md:flex-row items-center ">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0 relative">
            <img
              src={foundation} // Replace this with the actual image URL
              alt="Donation screen on mobile"
              className="w-48 sm:w-56 md:w-64 h-auto rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              มอบสิ่งสำคัญให้กับผู้ที่ต้องการ
            </h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              การบริจาคของคุณสามารถเปลี่ยนชีวิตได้
              ช่วยแบ่งปันความสุขและสร้างความเปลี่ยนแปลงให้กับสังคมของเรา
            </p>
            <p className="text-gray-600 mb-2 text-sm sm:text-base">
              <strong>ยอดบริจาครวม:</strong> แสดงยอดบริจาคที่ได้รับทั้งหมด
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              <strong>วันที่สิ้นสุดการบริจาค:</strong>{" "}
              แจ้งเตือนวันสุดท้ายของการเปิดรับบริจาคเพื่อให้คุณไม่พลาดโอกาสในการมีส่วนร่วม
            </p>
          </div>
        </div>
      </section>

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