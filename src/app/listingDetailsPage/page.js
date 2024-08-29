"use client";

import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import formatDate from '../helpers/formatDate';
import formatPrice from '../helpers/formatPrice';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import FavListingsModal from '../components/FavListingsModal';
import ContactAgentForm from '../components/ContactAgentForm';
import { updateListing } from '../../lib/slices/listingReducer';
import styles from '../../assets/styles/listingDetailsPage.module.css';

export default function ListingDetailsPage() {
  // Using useRouter to access query parameters
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listing.listings);
  const [favlistingModalShow, setFavlistingModalShow] = useState(false);

  const listingId = searchParams.get('listingId');
  const [listingDetails, setListingDetails] = useState({});
  const formattedPrice = formatPrice(listingDetails["Sale Price"]);
  const formattedDate = formatDate(listingDetails.DateListed);

  const savePropertyToFav = () => {
    const saved = !listingDetails.Saved;
    dispatch(updateListing({ currentListing: { ...listingDetails, Saved: saved } }));
    setFavlistingModalShow(true);
  }

  useEffect(() => {
    if (listings && listingId != null) {
      const listingSelected = listings?.find(l => l.Id == listingId);
      setListingDetails(listingSelected);
    } else {
        /// Redirect to initial page if the listing list has no data
        router.push('/');
    }
  }, [listings, listingId]);

  useEffect(() => {
    if (listingDetails.Id != listingId) {
      setFavlistingModalShow(false)
    }
  }, [listingDetails.Id, listingId]);

  return (
    <div className={styles.mainDiv}>
      <FavListingsModal
        show={favlistingModalShow}
        onHide={() => setFavlistingModalShow(false)}
      />

      <Button className={styles.backButton} variant="link" onClick={() => router.push('/')}>
        <Image
          src="/homeIcon.svg"
          alt="home icon"
          width={24}
          height={24}
        />
      </Button>
      <div className={styles.bodyDiv}>
        <div className={styles.contentDiv}>
          <div className={styles.column1}>
            <div className={styles.titleDiv}>
              <h1 className={styles.titleText}>{listingDetails.Title}</h1>
              <h1 className={styles.titlePrice}>{formattedPrice}</h1>
            </div>
            <div className={styles.titleDiv}>
              <p className={styles.locationText}>{listingDetails?.Location}</p>
              <p className={styles.dateListedText}>Date listed: {formattedDate}</p>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={listingDetails.PictureURL}
                alt="Listing image"
                className={styles.imageStyle}
              />
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}><strong>{listingDetails.Bedrooms}</strong></div>
              <div className={styles.detailItem}><strong>{listingDetails.Bathrooms}</strong></div>
              <div className={styles.detailItem}><strong>{listingDetails.Parking}</strong></div>
              <div className={styles.detailItem}><strong>{listingDetails.Sqft}</strong> </div>
              <div className={styles.detailItem}><strong>{listingDetails.YearBuilt}</strong></div>

              <div className={styles.detailItemDescription}>BED</div>
              <div className={styles.detailItemDescription}>BATH</div>
              <div className={styles.detailItemDescription}>PARKING</div>
              <div className={styles.detailItemDescription}>SQFT</div>
              <div className={styles.detailItemDescription}>YEAR BUILT</div>
            </div>

            <div>
              <p className={styles.listingDescriptions}>
                {listingDetails.Description}
              </p>
            </div>
          </div>
          <div className={styles.column2}>
            <Button className={styles.savePropertyButton} onClick={() => savePropertyToFav()} variant="primary">
              <Image
                src={listingDetails.Saved ? "/redHeart.svg" : "/heart.svg"}
                alt="Heart icon"
                className={styles.heartIcon}
                width={24}
                height={24}
              /> {listingDetails.Saved ? "Unmark as saved" : "Save Property"}
            </Button>

            <ContactAgentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
