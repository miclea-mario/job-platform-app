const getScoreColor = (score) => {
  if (score >= 80) return { textColor: 'text-primary', backgroundColor: 'bg-primary' };
  if (score >= 40) return { textColor: 'text-amber-500', backgroundColor: 'bg-amber-500' };
  return { textColor: 'text-red-500', backgroundColor: 'bg-red-500' };
};

export default getScoreColor;
