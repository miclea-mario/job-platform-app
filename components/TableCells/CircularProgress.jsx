import { getScoreColor } from '@functions';

const CircularProgress = ({ value, size = 40 }) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  // Convert text color class to actual color for SVG
  const getColorFromClass = (colorClass) => {
    if (colorClass === 'bg-primary') return 'rgb(34, 197, 94)'; // green for primary
    if (colorClass === 'bg-amber-500') return 'rgb(245, 158, 11)'; // amber
    return 'rgb(239, 68, 68)'; // red
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgb(229, 231, 235)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={getColorFromClass(getScoreColor(value).backgroundColor)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Text in the middle */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${getScoreColor(
          value
        )}`}
      >
        {value}%
      </div>
    </div>
  );
};

export default CircularProgress;
