"use client";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from '../../assets/styles/listingCard.module.css';
import formatPrice from '../helpers/formatPrice';
import { useRouter } from 'next/navigation';

export default function ListingCard({ listingDetails }) {
  const formattedPrice = formatPrice(listingDetails["Sale Price"]);
  const router = useRouter();

  const viewDetailsClicked = () => {
    router.push(`/listingDetailsPage?listingId=${listingDetails.Id}`);
  };

  return (
    <Card className={styles.cardStyle}>
      <Card.Img
        variant="top"
        src={listingDetails.ThumbnailURL}
        className={styles.cardImage} />
      <Card.Body className={styles.cardBody}>
        <Card.Title>{listingDetails.Title}</Card.Title>
        <Card.Subtitle className={styles.firstSubtitleStyle}>{listingDetails.Location}</Card.Subtitle>
        <Card.Subtitle className={styles.secondSubtitleStyle}>{listingDetails.Bedrooms || 0} beds | {listingDetails.Bathrooms || 0} baths</Card.Subtitle>
        <Card.Text className={styles.priceStyle}>
          {formattedPrice}
        </Card.Text>
        <Button className={styles.viewDetailsbuttonStyle} variant="primary" onClick={() => viewDetailsClicked()}>View Details</Button>
      </Card.Body>
    </Card>
  )
};
