/* eslint-disable @next/next/no-img-element */
export default function Header() {
  return (
    <header className="main-header">
      <button className="return-icon">
        <img
          src="/Images/svgsInformation/arrow.svg"
          className="return"
          alt="return"
        />
      </button>

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

      <button className="chat-icon">
        <img
          className="chat"
          src="/Images/svgsInformation/message5.svg"
          alt="chat"
        />
      </button>
    </header>
  );
}
