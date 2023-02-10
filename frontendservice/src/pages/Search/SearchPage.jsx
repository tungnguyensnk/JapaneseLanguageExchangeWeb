import React, {useRef, useState} from "react";
import Post from "../../components/Post/Post";
import Button from "../../components/Button/Button";
import "./SearchPage.css";
import Icon from "../../components/Icon/Icon";

export default function () {
  const typesRef = useRef();
  const sortTypeRef = useRef();
  const [sortBox, setSortBox] = useState(false);
  const handleFilterType = (e, elRef, className) => {
    const ulEl = elRef.current;
    Array.from(ulEl.children).forEach(li => li.classList.remove(className));
    e.target.classList.add(className);
  }

  return (
    <div className="faq-search faq-search-layout">
      <div className="faq-search__input-box">
        <input type="text" className="faq-search__input"/>
        <Button icon="search" value="Tìm kiếm" bgColor="var(--color-blue-primary--)" textColor="var(--color-white--)"/>
      </div>
      <div className="faq-search__filter">
        <div className="filter-types">
          <ul ref={typesRef} onClick={e => handleFilterType(e, typesRef, 'active')}>
            <li className="active">Bài viết</li>
            <li>Câu hỏi</li>
            <li>Tác giả</li>
          </ul>
        </div>
        <div className="sort-types">
          Sắp xếp theo: <span className="sort-selected" onClick={() => setSortBox(!sortBox)}>Phù hợp nhất</span>
          <Icon name="arrow_down" sizeText="small" />
          {
            sortBox &&
            <div className="sort-box">
              <ul ref={sortTypeRef} onClick={e => handleFilterType(e, sortTypeRef, 'sort--active')}>
                <li className="sort--active">Phù hợp nhất</li>
                <li>Lượt xem giảm dần</li>
                <li>Lượt vote giảm dần</li>
                <li>Lượt bình luận giảm dần</li>
                <li>Mới nhất</li>
                <li>Cũ nhất</li>
              </ul>
            </div>
          }
        </div>
      </div>

      <div className="faq-search__results-box">
        <div className="faq-search__total"><span className="total">{'1,407'}</span> kết quả</div>
        <div className="faq-search__results">
          <Post
            fullName="Mai Đào Tuấn Thành"
            datetime="08/12/2022, 00:34 AM"
            title="Làm chủ N1 trong 30 ngày :)"
            tags={['kinh nghiệm', 'chia sẻ', 'hiragana', 'kanji']}
            likes="43"
            views="123"
            comments="34"
            bookmarked={true}
            followed={true}
            content="
              Việc copy giá trị trong Ruby thường cần thiết. Điều này có vẻ đơn giản nếu object được copy
              đơn giản. Nhưng nếu bạn phải copy một object với cấu trúc gồm nhiều mảng hoặc hash, bạn sẽ
              gặp một số vấn đề.
              Việc copy giá trị trong Ruby thường cần thiết. Điều này có vẻ đơn giản nếu object được copy
              đơn giản. Nhưng nếu bạn phải copy một object với cấu trúc gồm nhiều mảng hoặc hash, bạn sẽ
              gặp một số vấn
              **Một số lời khuyên khi copy - paste:** * Đọc thêm một số cách giải quyết khác, không chỉ
              cách được chấp nhận. * Nên gõ lại code thay vì copy - paste để khi gặp dòng code nào khó
              hiểu, dành thêm thời gian để tìm hiểu nó.
            "
          />

          <Post
            fullName="Mai Đào Tuấn Thành"
            datetime="08/12/2022, 00:34 AM"
            title="Làm chủ N1 trong 30 ngày :)"
            tags={['kinh nghiệm', 'chia sẻ', 'hiragana', 'kanji']}
            likes="43"
            views="123"
            comments="34"
            bookmarked={true}
            followed={true}
            content="
              Việc copy giá trị trong Ruby thường cần thiết. Điều này có vẻ đơn giản nếu object được copy
              đơn giản. Nhưng nếu bạn phải copy một object với cấu trúc gồm nhiều mảng hoặc hash, bạn sẽ
              gặp một số vấn đề.
              Việc copy giá trị trong Ruby thường cần thiết. Điều này có vẻ đơn giản nếu object được copy
              đơn giản. Nhưng nếu bạn phải copy một object với cấu trúc gồm nhiều mảng hoặc hash, bạn sẽ
              gặp một số vấn
              **Một số lời khuyên khi copy - paste:** * Đọc thêm một số cách giải quyết khác, không chỉ
              cách được chấp nhận. * Nên gõ lại code thay vì copy - paste để khi gặp dòng code nào khó
              hiểu, dành thêm thời gian để tìm hiểu nó.
            "
          />

          <Post
            fullName="Mai Đào Tuấn Thành"
            datetime="08/12/2022, 00:34 AM"
            title="Làm chủ N1 trong 30 ngày :)"
            tags={['kinh nghiệm', 'chia sẻ', 'hiragana', 'kanji']}
            likes="43"
            views="123"
            comments="34"
            bookmarked={true}
            followed={true}
            content="
              Việc copy giá trị trong Ruby thường cần thiết. Điều này có vẻ đơn giản nếu object được copy
              đơn giản. Nhưng nếu bạn phải copy một object với cấu trúc gồm nhiều mảng hoặc hash, bạn sẽ
              gặp một số vấn đề.
              Việc copy giá trị trong Ruby thường cần thiết. Điều này có vẻ đơn giản nếu object được copy
              đơn giản. Nhưng nếu bạn phải copy một object với cấu trúc gồm nhiều mảng hoặc hash, bạn sẽ
              gặp một số vấn
              **Một số lời khuyên khi copy - paste:** * Đọc thêm một số cách giải quyết khác, không chỉ
              cách được chấp nhận. * Nên gõ lại code thay vì copy - paste để khi gặp dòng code nào khó
              hiểu, dành thêm thời gian để tìm hiểu nó.
            "
          />

          <Post
            fullName="Mai Đào Tuấn Thành"
            datetime="08/12/2022, 00:34 AM"
            title="Làm chủ N1 trong 30 ngày :)"
            tags={['kinh nghiệm', 'chia sẻ', 'hiragana', 'kanji']}
            likes="43"
            views="123"
            comments="34"
            bookmarked={true}
            followed={true}
            content="
              Việc copy giá trị trong Ruby thường cần thiết. Điều này có vẻ đơn giản nếu object được copy
              đơn giản. Nhưng nếu bạn phải copy một object với cấu trúc gồm nhiều mảng hoặc hash, bạn sẽ
              gặp một số vấn đề.
              Việc copy giá trị trong Ruby thường cần thiết. Điều này có vẻ đơn giản nếu object được copy
              đơn giản. Nhưng nếu bạn phải copy một object với cấu trúc gồm nhiều mảng hoặc hash, bạn sẽ
              gặp một số vấn
              **Một số lời khuyên khi copy - paste:** * Đọc thêm một số cách giải quyết khác, không chỉ
              cách được chấp nhận. * Nên gõ lại code thay vì copy - paste để khi gặp dòng code nào khó
              hiểu, dành thêm thời gian để tìm hiểu nó.
            "
          />

        </div>
        <div className="faq-search__more">
          <Button icon="arrow_down" value="More" bgColor="var(--color-blue-primary--)" textColor="var(--color-white--)"/>
        </div>
      </div>


    </div>
  );
}
