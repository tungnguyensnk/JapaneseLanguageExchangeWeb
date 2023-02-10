import React from "react";
import banner from "../../assets/clay-banks-hwLAI5lRhdM-unsplash.jpg";
import PostOverview from "../../components/Post/Post";
import Navbar from "../../components/Navbar/Navbar";
import NewestQuestion from "../../components/NewestQuestion/NewestQuestion";
import Heading from "../../components/Heading/Heading";
import Pagination from '../../components/Pagination/Pagination';

const Homepage = () => {
  return (
    <>
      <img src={banner} className="faq-banner" alt="banner image" />
      <Navbar />
      <div className="w-5/6 xl:w-2/3 my-16 m-auto grid grid-cols-12 gap-8">
        <div className="faq-corner col-span-8">
          <PostOverview
            fullName="Mai Đào Tuấn Thành"
            datetime="08/12/2022, 00:34 AM"
            title="Làm chủ N1 trong 30 ngày :)"
            tags={['kinh nghiệm', 'chia sẻ', 'hiragana', 'kanji']}
            likes="43"
            views="123"
            comments="34"
            bookmarked={true}
            followed={true} />

          <PostOverview
            fullName="Nguyễn Thị Thúy"
            datetime="08/12/2022, 05:12 PM"
            title="Chia sẻ nguồn film anime và những tips hay khi nghe anime hoặc xem phim"
            tags={['phim', 'anime', 'chia sẻ', 'nghe']}
            likes="1987"
            views="12251"
            comments="107"
            bookmarked={false}
            followed={true} />

          <Pagination />

        </div>

        <div className="col-span-4">
          <div className="flex items-center">
            <Heading title="CÂU HỎI MỚI NHẤT" size="medium" color="var(--color-blue-secondary--)" />
            <hr className="faq-underline"></hr>
          </div>

          <NewestQuestion
            title="Cách không học mà vẫn giỏi tiếng Nhật ?"
            likes={12}
            views={87}
            comments={3}
            fullName="Nguyễn Thanh Tùng" />

          <NewestQuestion
            title="Tại sao chữ Kanji trong tiếng Nhật gần giống với chữ Hán của Trung Quốc ?"
            likes={22}
            views={197}
            comments={5}
            fullName="Hoàng Anh Tuấn" />
        </div>
      </div>
    </>
  )
}

export default Homepage
