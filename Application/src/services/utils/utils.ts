// Return the perfect matching color for text based on hexcolor background
// It uses the YIQ model to calculate the best match
// The Y represents the Luma information. To pass a rgb to the Y of YIQ you have to (r*0.299), (g*0.287), (b*0.114)
export function getColorForBackground(hexcolor: string): string {
  // for hexcolor : #000000
  const r = parseInt(hexcolor.substring(3, 1), 16);
  const g = parseInt(hexcolor.substring(5, 3), 16);
  const b = parseInt(hexcolor.substring(5), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}
