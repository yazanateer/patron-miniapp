import React from "react";
import "./Home.css";
import cards from "../services.json";

export const Home = () => {

    return (

        <div className="home-container">
            <div className="home-section first-section">
                <div className="centered-rectangle">
                    <h2>welcome to the </h2>
                    <h1>CityLibrary </h1>

                    <div className="paragraph-city">
                    <p>The city library system aims to streamline operations and services across multiple libraries in the city <br/>
                    Here you can borrow books and reserve a rooms , also the ability to search for a book according to a criteria and get the information about the book , and where you can find it<br/></p>
                    </div>
                
                </div>
            </div>

            <div className="home-section second-section">
            <h1 className="second-title">Here the services that we provide</h1>

                <div className="cards-container">
                    {cards.map( card => (
                        <div key = {card.id} className="card">
                            <h2>{card.service_name}</h2>
                            <p>{card.describe}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}