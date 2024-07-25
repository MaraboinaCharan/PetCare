import React from "react";
import foot from '../../../assets/images/whiteFoot.png';
import './Header.scss'
import HomeSymbol from '../../../assets/images/HomeLogo.png';
import exit from '../../../assets/images/exit.png'
function Header() {
    const tabsArray = ["Home", "About", "Services", "Store"];
    return (
        <div className="header">
            <div className="logo">
                <img src={foot} alt="foot" />
                <span>PetCare</span>
            </div>
            <div className="tabs">
                {tabsArray.map((tab, index) => (
                    <div key={index} className="tab-item">
                        {tab === "Home" && <img src={HomeSymbol} alt="logo" className="tab-logo" />}
                        {tab}
                    </div>
                ))}
            </div>
            <div className="contact-us">
                <div>
                <span>Contact us</span>
                </div>
                <div>
                <img src={exit} alt="logo"/>
                </div>
            </div>
        </div>

    );
}
export default Header;




