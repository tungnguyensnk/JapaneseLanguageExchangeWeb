import Bookmark from "../../components/Bookmark/Bookmark";
import FormAnswer from "../../components/FormAnswer/FormAnswer";
import PostAuthor from "../../components/PostAuthor/PostAuthor";
import PostScript from "../../components/PostScript/PostScript";
import TableOfContents from "../../components/TableOfContent/TableOfContent";
import Heading from "../../components/Heading/Heading";
import "./BlogDetail.css";
import Comment from "../../components/Comment/Comment";
import SimilarPost from "../../components/SimilarPost/SimilarPost";
const BlogDetail = () => {
  return (
    <div className="w-5/6 xl:w-2/3 my-16 m-auto grid grid-cols-12 gap-8">
      <div className="faq-corner col-span-8">
        <PostAuthor
          fullName="Mai Dao Tuan Thanh"
          userName="Thanhdao"
          datetime="08/12/2022, 00:34 AM"
          followers="20"
          questions="10"
          posts="10"
          views="10"
          bookmark="15"
          comments="10"
        />
        <PostScript
          title="Lộ trình học tiếng Nhật từ N5-N2 trong 8 tháng"
          tags={["kinh nghiệm", "chia sẻ", "hiragana", "kanji"]}
          description="Từ trình độ JLPT N3 lên N2 phải cần rất nhiều thời gian và công sức. Giới hạn kiến thức N3 là: Kanji : ~650 chữ, Từ vựng : 3700 từ. Trong khi, giới hạn kiến thức N2 là Kanji : ~1000 chữ, Từ vựng : 6000 từ. Như vậy các bạn có thể thấy lượng kiến thức N2 nhiều gần gấp đôi so với trình độ N3. Vậy phải học như thế nào cho hiệu quả nhất, hôm nay Japan IT Works sẽ chia sẻ cho các bạn nhé!
        "
        />

        <div></div>
      </div>

      <div className="col-span-4">
        <Bookmark content="BOOKMARK BÀI VIẾT NÀY" />
        <TableOfContents>
          <Heading
            title="MỤC LỤC"
            size="medium"
            color="var(--color-blue-secondary--)"
          />
        </TableOfContents>
      </div>
      <div className="col-span-12">
        <div className="faq-post">
          <p className="faq-post-title">Bài viết liên quan</p>
          <div className="faq-post-suggest">
            <SimilarPost
              title="Phương pháp luyện nói tiếng Nhật"
              name="Mai Đào Tuấn Thành"
              views="10"
              bookmarks="21"
              posts="3"
            />
            <SimilarPost
              title="Phương pháp luyện nói tiếng Nhật"
              name="Mai Đào Tuấn Thành"
              views="10"
              bookmarks="21"
              posts="3"
            />
            <SimilarPost
              title="Phương pháp luyện nói tiếng Nhật"
              name="Mai Đào Tuấn Thành"
              views="10"
              bookmarks="21"
              posts="3"
            />
            <SimilarPost
              title="Phương pháp luyện nói tiếng Nhật"
              name="Mai Đào Tuấn Thành"
              views="10"
              bookmarks="21"
              posts="3"
            />
          </div>
        </div>

        <div className="faq-post">
          <p className="faq-post-title">Bài viết khác từ Mai Đào Tuấn Thành</p>
          <div className="faq-post-suggest">
            <SimilarPost
              title="Phương pháp luyện nói tiếng Nhật"
              name="Mai Đào Tuấn Thành"
              views="10"
              bookmarks="21"
              posts="3"
            />
            <SimilarPost
              title="Phương pháp luyện nói tiếng Nhật"
              name="Mai Đào Tuấn Thành"
              views="10"
              bookmarks="21"
              posts="3"
            />
            <SimilarPost
              title="Phương pháp luyện nói tiếng Nhật"
              name="Mai Đào Tuấn Thành"
              views="10"
              bookmarks="21"
              posts="3"
            />
            <SimilarPost
              title="Phương pháp luyện nói tiếng Nhật"
              name="Mai Đào Tuấn Thành"
              views="10"
              bookmarks="21"
              posts="3"
            />
          </div>
        </div>
        <FormAnswer />
        <Comment
          datetime="11/11/2022, 22:20 PM"
          comment="Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip"
          fullName="Mai Dao Tuan Thanh"
          userName="thanhdao"
        />
        <Comment
          datetime="11/11/2022, 22:20 PM"
          comment="Bài viết rất hay."
          fullName="Hoang Anh Tuan"
          userName="tuanha"
        />
      </div>
    </div>
  );
};

export default BlogDetail;
