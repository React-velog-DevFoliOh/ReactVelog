export const renderDateString = (updatedAt) => {
  const dateGap = dateFromNow(updatedAt)
  if (dateGap === '오늘' || dateGap === '어제')
    return dateGap;
  else if (dateGap <7)
    return `${dateGap}일 전`;
  
  if (updatedAt) {
    const date = new Date(updatedAt);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }
};

const dateFromNow = (inputDate) => {
  const now = new Date();  
  const stDate = new Date(inputDate);
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const msGap = endDate.getTime() - stDate.getTime();
  const dateGap = parseInt(msGap / (1000*60*60*24)) ;

  if (dateGap < 1){
    if (now.getDate() === stDate.getDate())
      return '오늘';
    else
      return '어제';
  }
  
  return dateGap;
}