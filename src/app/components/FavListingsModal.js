"use client";

import ListingCard from "./ListingCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "../../assets/styles/favListingModal.module.css";

export default function  FavListingsModal(props) {
  const listings = useSelector((state) => state.listing.listings);
  const [favListings, setFavListings] = useState([]);

  useEffect(() => {
    if (listings){
      const listingsFiltered = [];
      for (const listing of listings){
        if (listing.Saved){
          listingsFiltered.push(listing);
        }
      }
      setFavListings(listingsFiltered);
    }
  }, [listings]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Favorites listing saved
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {favListings.length > 0 ? 
          <div className={styles.gridContainer}>
            {favListings?.map((listingDetails) => (
              <ListingCard key={listingDetails.Id} listingDetails={listingDetails} />
            ))}
          </div> :
          <h4 className={styles.noMatchedElements}>You have no saved favorites</h4>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
