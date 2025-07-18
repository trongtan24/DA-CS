const timer = ({ HOUR, MINUTE, SECOND }) => {
  try {
    let result = [];
    if (HOUR && HOUR > 0) {
      result.push(HOUR + " tiếng");
    }

    if (MINUTE && MINUTE > 0) {
      result.push(MINUTE + " phút");
    }

    if (SECOND && SECOND > 0) {
      result.push(SECOND + " giây");
    }

    if (result.length === 0) return "Chưa nhập thời gian!";

    return result.join(" ") + "!";
  } catch (error) {
    console.log(error);
    return "Lỗi thời gian!";
  }
};

export default timer;
