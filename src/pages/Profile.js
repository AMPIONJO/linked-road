import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import "firebase/auth";
import 'firebase/firestore';
import '../pages/Profile.css';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [estateName, setEstateName] = useState('');
  const [address, setAddress] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [buttonText, setButtonText] = useState('Edit Profile');
  const [showCancel, setShowCancel] = useState(false);


  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    const user = auth.currentUser;
  
    if (user) {
      // Query the Firestore collection for documents where the "userId" field matches the current user's UID
      const userDocsQuery = query(collection(firestore, "users"), where("uid", "==", user.uid));

      const getUserData = async () => {
        try {
          // Get the query snapshot for the documents that match the query
          const querySnapshot = await getDocs(userDocsQuery);
          
          if (querySnapshot.size > 0) {
            // Loop through the query snapshot to get the data for each document
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              setFirstName(data.firstName);
              setLastName(data.lastName);
              setEmail(data.email);
              setPhoneNumber(data.phoneNumber);
              setEstateName(data.estateName);
              setAddress(data.address);
              setMembershipNumber(data.membershipNumber);
            });
          } else {
            console.log('No documents found for the current user.');
          }
        } catch (error) {
          console.log('Error getting documents:', error);
        }
      };
  
      getUserData();
    }
  }, []);

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    if (isEditable) {
    // Get the currently logged in user
    const user = auth.currentUser;

    // Update the user documents in Firestore where the "userId" field matches the current user's UID
    const userDocsQuery = query(collection(firestore, "users"), where("uid", "==", user.uid));

    const updateUserDocs = async () => {
      try {
        const querySnapshot = await getDocs(userDocsQuery);
        
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            const docRef = doc.ref;
            
            updateDoc(docRef, {
              firstName: firstName,
              lastName: lastName,
              email: email,
              phoneNumber: phoneNumber,
              estateName: estateName,
              address: address,
            });
          });
          
          console.log("User documents updated successfully");
          toast.success("Updated User Profile", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
        } else {
          console.log('No documents found for the current user.');
        }
      } catch (error) {
        console.log("Error updating user documents:", error);
      }
    };

    updateUserDocs();
}
handleEditModeToggle();
  };

  const handleEditModeToggle = () => {
    setIsEditable(!isEditable);
    setButtonText(isEditable ? 'Edit Profile' : 'Save Changes');
    setShowCancel(!showCancel);
  };

  return (
    <div class="page-container">
      <Container>
        <Row>
          {/* <Col md={3}>
            <div className="profile-pic-container">
              <Image
                src="https://via.placeholder.com/150"
                roundedCircle
                className="profile-pic"
              />
              <Button variant="primary" className="change-pic-btn">
                Change Picture
              </Button>
            </div>
          </Col> */}
          <Col md={9}>
            <div className="profile-info-container">
              <h2>My Profile</h2>
              <hr />
              <form className="registration-form mt-4" onSubmit={handleUpdateProfile}>
              <div className="form-group">
                  <label htmlFor="membership" className="form-label">
                    Membership Number
                  </label>
                  <input type="text" className="form-control" id="name" value={membershipNumber} onChange={(event) => setMembershipNumber(event.target.value)} disabled/>
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    First Name
                  </label>
                  <input type="text" className="form-control" id="name" value={firstName} onChange={(event) => setFirstName(event.target.value)} disabled={!isEditable}/>
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Last Name
                  </label>
                  <input type="text" className="form-control" id="name" value={lastName} onChange={(event) => setLastName(event.target.value)} disabled={!isEditable}/>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled/>
                </div>
                <div className="form-group">
                  <label htmlFor="tel" className="form-label">
                  Phone Number
                 </label>
                 <input type="tel" className="form-control" id="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} disabled={!isEditable}/>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Estate Name
                </label>
                <input type="text" className="form-control" id="name" value={estateName} onChange={(event) => setEstateName(event.target.value)} disabled={!isEditable}/>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Address
                </label>
                <input type="text" className="form-control" id="name" value={address} onChange={(event) => setAddress(event.target.value)} disabled={!isEditable}/>
              </div>
              <Button variant="primary" type="submit">
              {buttonText}
              </Button>
              <button type="button" className="btn btn-danger float-right ml-3" style={{ display: showCancel ? 'inline-block' : 'none' }} onClick = {handleEditModeToggle}>Cancel</button>
            </form>
          </div>
          <ToastContainer autoClose={2000} />
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Profile;

