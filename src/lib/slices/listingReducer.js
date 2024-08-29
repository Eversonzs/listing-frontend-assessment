import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: null,
  filteredListings: null,
  isLoading: false,
  error: null,
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
      state.filteredListings = action.payload;
    },
    filterListings: (state, action) => {
      state.filteredListings = action.payload;
    },
    clearListings: (state) => {
      state.listings = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateListing: (state, action) => {
      const { currentListing } = action.payload;
      const index = state.listings.findIndex(listing => listing.Id === currentListing.Id);
      if (index !== -1) {
        state.listings[index] = {
          ...state.listings[index],
          ...currentListing
        };
      }
    }
  },
});

export const { setListings, clearListings, setLoading, setError, updateListing, filterListings } = listingSlice.actions;

export default listingSlice.reducer;
