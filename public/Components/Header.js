/* eslint-disable @next/next/no-img-element */
export default function Header({ showBackButton = true }) {
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

      <button className="notifications-icon">
        <img
          className="notification"
          src="/Images/svgsInformation/notification.svg"
          alt="Notification"
        />
      </button>
    </header>
  );
}
