export const getColorIcon = (color: string, isChecked: boolean) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="20" height="20" rx="10" fill={color} />
      {isChecked && (
        <path
          d="M8 12L10.6635 14.625L16 9.375"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {isChecked && (
        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke={color} />
      )}
    </svg>
  );
};

export const colorIcons: { [key: string]: string } = {
  blue: "#1F75FF",
  green: "#059669",
  orange: "#EA580C",
  red: "#DC2626",
  pink: "#DB2777",
  purple: "#741FFF",
};

export function lightenDarkenColor(color: string, amount: number) {
  var usePound = false;

  if (color[0] == "#") {
    color = color.slice(1);
    usePound = true;
  }

  var num = parseInt(color, 16);

  var r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
