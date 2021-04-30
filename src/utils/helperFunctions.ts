/**
 * * Function to capitalise string
 * @param text
 * @returns string of words capitalised
 */
 const capitializeFirstWord = (
  text: string | undefined
): string => {
  if (text === undefined) {
    return '';
  }
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] =
      words[i][0].toUpperCase() + words[i].substr(1);
  }
  const joinedWords = words.join(' ');
  return joinedWords;
};

/**
 * * Function for date formatting
 * @param date
 * @returns string of date formatteed
 * TODO: Use momentjs instead
 *
 */
const dateFormatter = (date: Date | undefined, type?: string): string => {
  let dateString: string = '';
  if (date === undefined) {
    return '';
  }
  const year =
    date.getFullYear() < 10
      ? '0' + date.getFullYear().toString()
      : date.getFullYear();
  const month =
    date.getMonth() < 10
      ? '0' + (date.getMonth()+1).toString()
      : date.getMonth()+1;
  const day =
    date.getDate() < 10
      ? '0' + date.getDate().toString()
      : date.getDate();
  const hour =
    date.getHours() < 10
      ? '0' + date.getHours().toString()
      : date.getHours();
  const minute =
    date.getMinutes() < 10
      ? '0' + date.getMinutes().toString()
      : date.getMinutes();
  
  if ( type === 'date') {
    return dateString = `${year}-${month}-${day}`;
  } else if ( type === 'time') {
    return dateString = `${hour}:${minute}`;
  } 
  dateString = `${year}-${month}-${day} ${hour}:${minute} hrs`;
  return dateString;
};

export { dateFormatter, capitializeFirstWord };
