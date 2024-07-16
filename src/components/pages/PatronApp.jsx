import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./../pages/css_pages/patron.css";

export const PatronApp = ({ user }) => {

  // Check if user is not authenticated, redirect to Login page
if (!user) {
return <Navigate to="/Login" replace />;
}

// if authenticated, render Patron App content
return (
<div className="home-container-patron">
    <div className="patron-section">
    <h1 className="header_patron">Welcome to the patron application</h1>
    <p className="para-do">Choose the service you want to do</p>
    <div className="patron-card-container">
        <Link to="/BorrowBook" className="patron-card">
        Borrow Book
        </Link>
        <Link to="/SearchBook" className="patron-card">
        Search For Book
        </Link>
    </div>
    </div>
</div>
);
};
