// Helper function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    currencyDisplay: 'symbol'
  })
  .format(price)
  .replace(/,/g, ' ');
};

export default formatPrice;
