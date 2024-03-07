/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from 'react';



export default function Header({ showBackButton = true }) {

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const notificationRef = useRef();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Fetch notifications when opening the dropdown
      fetch(`/api/notifications`)
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data);
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="main-header">
      {showBackButton && (
        <button className="return-icon">
          <img
            src="/Images/svgsInformation/arrow.svg"
            className="return"
            alt="return"
          />
        </button>
      )}
      
      <img
        src="/Images/logo.PNG"
        alt="Voluntree Logo"
        className="header-logo"
      />

        <button className="notifications-icon" onClick={toggleNotifications}>
          <img
            className="notification"
            src="/Images/svgsInformation/notification.svg"
            alt="Notification"
          />
      </button>

      {showNotifications && (
        <div ref={notificationRef} className="notifications-dropdown">
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification._id}>{notification.message}</li>
              ))
            ) : (
              <li>No new notifications</li>
            )}
          </ul>
        </div>
      )}

    </header>
  );
}
