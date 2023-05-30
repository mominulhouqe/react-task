import React, { useState, useEffect } from 'react';

const Problem2 = () => {
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [evenOnly, setEvenOnly] = useState(false);

  useEffect(() => {
    fetchContacts();
    fetchUSContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://contact.mediusware.com/api/contacts');
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchUSContacts = async () => {
    try {
      const response = await fetch('https://contact.mediusware.com/api-doc/?format=openapi');
      const data = await response.json();
      setUSContacts(data.contacts);
    } catch (error) {
      console.error('Error fetching US contacts:', error);
    }
  };

  const openModalA = () => {
    setModalAOpen(true);
  };

  const closeModalA = () => {
    setModalAOpen(false);
  };

  const openModalB = () => {
    setModalBOpen(true);
  };

  const closeModalB = () => {
    setModalBOpen(false);
  };

  const openContactDetailsModal = (contact) => {
    setSelectedContact(contact);
  };

  const closeContactDetailsModal = () => {
    setSelectedContact(null);
  };

  const toggleEvenOnly = () => {
    setEvenOnly(!evenOnly);
  };

  const filteredContacts = evenOnly ? contacts.filter((contact) => contact.id % 2 === 0) : contacts;

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button" onClick={openModalA}>
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button" onClick={openModalB}>
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A */}
      {modalAOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Modal A</h4>
            <button className="modal-button" onClick={openModalA}>
              All Contacts
            </button>
            <button className="modal-button" onClick={openModalB}>
              US Contacts
            </button>
            <button className="modal-button" onClick={closeModalA}>
              Close
            </button>
            <div className="contact-list">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="contact-item"
                  onClick={() => openContactDetailsModal(contact)}
                >
                  {contact.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal B */}
      {modalBOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Modal B</h4>
            <button className="modal-button" onClick={openModalA}>
              All Contacts
            </button>
            <button className="modal-button" onClick={openModalB}>
              US Contacts
            </button>
            <button className="modal-button" onClick={closeModalB}>
              Close
            </button>
            <div className="contact-list">
              {usContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="contact-item"
                  onClick={() => openContactDetailsModal(contact)}
                >
                  {contact.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="modal">
          <div className="modal-content">
            <h4>Contact Details</h4>
            <div>Name: {selectedContact.name}</div>
            <div>Email: {selectedContact.email}</div>
            <button className="modal-button" onClick={closeContactDetailsModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Checkbox */}
      <div className="footer">
        <label>
          <input type="checkbox" checked={evenOnly} onChange={toggleEvenOnly} />
          Only Even
        </label>
      </div>
    </div>
  );
};

export default Problem2;
