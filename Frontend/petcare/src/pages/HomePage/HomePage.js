import React from "react";
import './HomePage.scss';
import Rectangle from '../../assets/images/tempRectangle2.png';
import Dog from '../../assets/images/MainDog.png';
import Dog1 from '../../assets/images/Dog1.png';
import Dog2 from '../../assets/images/Dog2.png';
import Dog3 from '../../assets/images/Dog3.png';
import Dog4 from '../../assets/images/Dog4.png';
import Dog5 from '../../assets/images/Dog5.png';
import Header from "../../components/common/HomePage-Header/Header";
import User1 from '../../assets/images/petOwner.jpeg';
import User2 from '../../assets/images/User1.jpeg';
import User3 from '../../assets/images/Guest.jpeg';

function HomePage() {
    const dogImages = [
        { src: Dog, className: 'dog', alt: 'Main Dog' },
        { src: Dog1, className: 'dog1', alt: 'Dog 1' },
        { src: Dog2, className: 'dog2', alt: 'Dog 2' },
        { src: Dog3, className: 'dog3', alt: 'Dog 3' },
        { src: Dog4, className: 'dog4', alt: 'Dog 4' },
        { src: Dog5, className: 'dog5', alt: 'Dog 5' },
    ];
    const userImages = [
        { src: User1, className: 'user1', alt: ' Pet-Owner',description:'As a PetOwner, you can manage your pets health records, set reminders for vet visits, and track their overall well-being.' },
        { src: User2, className: 'user2', alt: ' Veterenan',description:'As a Veterinarian, you have access to detailed pet health records, can provide professional advice, and manage appointments with pet owners'},
        { src: User3, className: 'user3', alt: ' Guest',description:'As a Guest, explore the features of our PetCare application and see how it can help you manage and improve your pets health.For a better experience try signup and then logging in'},
    ];
    return (
        <div className="home-page">
            <div className="header-section">
                <Header />
            </div>
            <div >
                <div className="left-part">
                    <p className="title">
                        Who is Using this Application ?
                    </p>
                    <div className="user">
                        {userImages.map((user, index) => (
                            <div key={index} className="user-item">
                                <img className={user.className} src={user.src} alt={user.alt} />
                                <div className="user-info">
                                    <p className="user-name">{user.alt}</p>
                                    <p className="user-description">{user.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="right-part">
                    <div>
                        <img className="rectangle" src={Rectangle} alt="bar" />
                    </div>
                    {dogImages.map((dog, index) => (
                        <div key={index} >
                            <img className={dog.className} src={dog.src} alt={dog.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;


