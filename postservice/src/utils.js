const dateFromNow = (date) => {
    const now = new Date();
    const diff = Math.abs(now - date);
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
        return 'ngay bây giờ';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
        return `${diffInHours} giờ trước`;
    } else {
        return `${diffInDays} ngày trước`;
    }
}

module.exports = {dateFromNow};