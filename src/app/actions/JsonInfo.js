import { setListings, setLoading } from '../../lib/slices/listingReducer';

export const getJsonInfoAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('/api/listings');
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        return;
      }
      const jsonData = await response.json(); // Parse the JSON data
      dispatch(setListings(jsonData));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error("Error fetching JSON data:", error);
      return;
    }
  }
};
