export const classifyIssue = (description: string) => {
  const desc = description.toLowerCase();
  if (desc.includes('garbage') || desc.includes('waste') || desc.includes('trash')) return 'Waste Management';
  if (desc.includes('pothole') || desc.includes('road') || desc.includes('street')) return 'PWD/Roads';
  if (desc.includes('light') || desc.includes('dark') || desc.includes('electricity')) return 'Electrical';
  if (desc.includes('water') || desc.includes('leak') || desc.includes('pipe')) return 'Water Supply';
  return 'General';
};