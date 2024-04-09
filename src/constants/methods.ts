export const getContrastColor = (hexColor:any) => {
    // Convert hex color to RGB
  if(!hexColor) return "#333333";
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  // Calculate the relative luminance (per ITU-R BT.709)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // Use white or black depending on the luminance value
  return luminance > 0.5 ? '#000000' : '#ffffff';
};


export const formatDate = (dateString:string) => {
  const options:Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleString('en-US', options);
};

export const dateOptions:Intl.DateTimeFormatOptions = {
  weekday: 'short', // Abbreviated weekday name (e.g., "Sun")
  day: 'numeric',   // Numeric day of the month (e.g., "7")
  month: 'short',   // Abbreviated month name (e.g., "Apr")
  year: 'numeric',  // Full numeric year (e.g., "2024")
  hour: 'numeric',  // Numeric hour (e.g., "6")
  minute: '2-digit', // Two-digit minute (e.g., "00")
  hour12: true,     // Use 12-hour clock (e.g., "am" or "pm")
  timeZoneName: 'short', // Abbreviated time zone name (e.g., "GMT+5:30")
};

export const secondsToDateTime = (seconds:any) => {
  let time = new Date(seconds * 1000);
  return time;
}

export const timeUntilAiring = (seconds:any) =>{
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let result = '';
  if (days > 0) {
      result += `${days}d `;
  }
  if (hours > 0) {
      result += `${hours}h `;
  }
  result += `${minutes}m`;

  return result;

}