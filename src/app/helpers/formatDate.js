// Helper function to format a date string
function formatDate(dateString) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });

  return formattedDate;
}

export default formatDate;
  