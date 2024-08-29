"use client";

import { useState } from "react";
import { validateFormData } from "../helpers/validateContactData";
import styles from '../../assets/styles/contactAgentForm.module.css';
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";

const toastDefaultValues = { show: false, message: "", error: false };
const contactFormDefaultData = { fullName: "", email: "", phoneNumber: "", comment: "" };

export default function(){
  const [customAlert, setCustomAlert] = useState(toastDefaultValues);
  const [contactFormData, setContactFormData] = useState(contactFormDefaultData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataValidated = validateFormData(contactFormData);
    if (dataValidated == ""){
      setCustomAlert({ show: true, message: "Message sent successfully", error: false });
      setContactFormData(contactFormDefaultData);
    } else {
      setCustomAlert({ show: true, message: dataValidated, error: true });
    }
  }

  return (
    <>
      <ToastContainer
        className="p-3"
        position="top-center"
        style={{ zIndex: 1 }}>
        <Toast autohide={true} show={customAlert.show} bg={customAlert.error ? "danger" : "success"} onClose={() => setCustomAlert(toastDefaultValues)}>
          <Toast.Header>
            <strong className="me-auto">{customAlert.error ? "Error" : "Success"}</strong>
          </Toast.Header>
          <Toast.Body>{customAlert.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.divCenterElements}>
          <Form.Label className={styles.formTitle}>Contact Agent</Form.Label>
        </div>
        <Form.Control
          as="input"
          type="text"
          className={styles.formInput}
          placeholder="Full Name *"
          value={contactFormData.fullName}
          onChange={e => setContactFormData({...contactFormData, fullName: e.target.value})}
          required />
        <Form.Control
          as="input"
          type="email"
          className={styles.formInput}
          placeholder="Email *"
          value={contactFormData.email}
          onChange={e => setContactFormData({...contactFormData, email: e.target.value})}
          required />
        <Form.Control
          as="input"
          type="tel"
          pattern="[0-9]{8}"
          className={styles.phoneFormInput}
          placeholder="Phone Number *"
          value={contactFormData.phoneNumber}
          onChange={e => setContactFormData({...contactFormData, phoneNumber: e.target.value})}
          required />
        <div className={styles.formInput}>
          <Form.Text id="phoneNumberHelperText" muted>
            The phone number must be numeric and exactly 8 digits.
          </Form.Text>
          </div>
        <Form.Control 
          as="textarea" 
          className={styles.formInput} 
          placeholder="Comments *"
          value={contactFormData.comment}
          onChange={e => setContactFormData({...contactFormData, comment: e.target.value})}
          />

        <div className={styles.divCenterElements}>
          <Button
            className={styles.contactNowButton} 
            type="submit"
            variant="primary">
              Contact Now
          </Button>
        </div>

      </Form>
    </>
  )
};
