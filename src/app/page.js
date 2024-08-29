"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Spinner from 'react-bootstrap/Spinner';
import ListingCard from "./components/ListingCard";
import { useSelector, useDispatch } from 'react-redux';
import { getJsonInfoAction } from "./actions/JsonInfo";
import { Button, Dropdown, DropdownButton, Form, Image } from "react-bootstrap";
import formatPrice from "./helpers/formatPrice";
import { filterListings } from "../lib/slices/listingReducer";
import FavListingsModal from "./components/FavListingsModal";

const filterNumberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  const dispatch = useDispatch();
  const { listings, filteredListings } = useSelector((state) => state.listing);
  const isLoading = useSelector((state) => state.listing.isLoading);
  const [favlistingModalShow, setFavlistingModalShow] = useState(false);

  const [filters, setFilters] = useState({ bedrooms: 1, bathrooms: 1, parking: 1, price: 10000 });
  const formattedPrice = formatPrice(filters.price);

  useEffect(() => {
    if (!listings)
      dispatch(getJsonInfoAction());
  }, []);

  useEffect(() => {
    if (listings){
      const listingsFiltered = [];
      for (const listing of listings){
        if (listing.Bedrooms >= filters.bedrooms &&
          listing.Bathrooms >= filters.bathrooms &&
          listing.Parking >= filters.parking &&
          listing["Sale Price"] >= filters.price){
          listingsFiltered.push(listing);
        }
      }
      dispatch(filterListings(listingsFiltered));
    }
  }, [filters]);

  if (isLoading) return <Spinner animation="border" variant="primary" />;

  const filterValueChanged = (newValue, valueFor) => {
    setFilters({...filters, [valueFor]: newValue});
  };

  const ValuesDropdown = ({ valuesFor }) => {
    return (
      <DropdownButton id="dropdown-basic-button" title={filters[valuesFor]}>
        {filterNumberOptions.map(num => (
          <Dropdown.Item key={num} eventKey={num.toString()} onClick={() => filterValueChanged(num, valuesFor)}>{num}</Dropdown.Item>
        ))}
      </DropdownButton>
    )
  }

  return (
    <main className={styles.mainSection}>
      <FavListingsModal
        show={favlistingModalShow}
        onHide={() => setFavlistingModalShow(false)}
      />
      <h1 className={styles.titlePage}>Frontend Assessment for Listings </h1>
      <div className={styles.showFavoritesDiv}>
        <Button className={styles.viewFavorites} variant="info" onClick={() => setFavlistingModalShow(true)}>
        <Image
          src="/redHeart.svg"
          alt="FavRedHeartIcon"
          width={24}
          height={24}
          className={styles.favIcon}
        />View favorites</Button>
      </div>
      <div className={styles.filterSectionDiv}>
        <div className={styles.eachFilterDiv}> <p className={styles.filterText}> Bedrooms: </p> <ValuesDropdown valuesFor={"bedrooms"}/> </div>
        <div className={styles.eachFilterDiv}> <p className={styles.filterText}> Bathrooms: </p> <ValuesDropdown valuesFor={"bathrooms"}/> </div>
        <div className={styles.eachFilterDiv}> <p className={styles.filterText}> Parking: </p> <ValuesDropdown valuesFor={"parking"}/> </div>
        <div className={styles.eachFilterDiv}>
          <p className={styles.priceRangeText}> Price Range: </p>
          <Form.Range
            value={filters.price}
            className={styles.rangeSelector}
            onChange={e => filterValueChanged(e.target.value, "price")}
            max={1000000}
            step={1000}
            min={10000}/>
          <p className={styles.priceFormatted}> {formattedPrice} </p>
        </div>
      </div>
      {filteredListings?.length > 0 ? 
        <div className={styles.gridContainer}>
          {filteredListings?.map((listingDetails) => (
            <ListingCard key={listingDetails.Id} listingDetails={listingDetails} />
          ))}
        </div> :
        <div>
          <h4 className={styles.noMatchedElements}> No items match the selected filters </h4>
        </div>
      }
    </main>
  );
}
