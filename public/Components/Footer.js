import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <footer className="footer-menu">
      <nav className="footer-nav">
        <Link href="/" className="footer-item">
          <img
            src="/Images/svgs/home-svgrepo-com.svg"
            alt="Home"
            className="footer-icon"
          />
          <span>Home</span>
        </Link>
        <a href="#" className="footer-item">
          <img
            src="/Images/svgs/search-svgrepo-com.svg"
            alt="Search"
            className="footer-icon"
          />
          <span>Search</span>
        </a>
<<<<<<< HEAD
        <Link href="/applications" className="footer-item">
=======
        <a href="#" className="footer-item">
>>>>>>> d04a06fe193db3ea6c8dd665e264f1bab460ebbe
          <img
            src="/Images/svgs/book-svgrepo-com.svg"
            alt="Applications"
            className="footer-icon"
          />
          <span>Applications</span>
<<<<<<< HEAD
        </Link>
=======
        </a>
>>>>>>> d04a06fe193db3ea6c8dd665e264f1bab460ebbe
        <Link href="/opportunites" className="footer-item">
          <img
            src="/Images/svgs/bookmark-svgrepo-com.svg"
            alt="Opportunities"
            className="footer-icon"
          />
          <span>Opportunities</span>
        </Link>
<<<<<<< HEAD
        <a href="/favorites" className="footer-item">
=======
        <a href="#" className="footer-item">
>>>>>>> d04a06fe193db3ea6c8dd665e264f1bab460ebbe
          <img
            src="/Images/svgs/heart-svgrepo-com.svg"
            alt="Favorite"
            className="footer-icon"
          />
          <span>Favorite</span>
        </a>
<<<<<<< HEAD
        <Link href="/profile" passHref className="footer-item">
=======
        <a href="#" className="footer-item">
>>>>>>> d04a06fe193db3ea6c8dd665e264f1bab460ebbe
          <img
            src="/Images/svgs/profile-svgrepo-com.svg"
            alt="My Profile"
            className="footer-icon"
          />
          <span>Profile</span>
<<<<<<< HEAD
        </Link>
=======
        </a>
>>>>>>> d04a06fe193db3ea6c8dd665e264f1bab460ebbe
      </nav>
    </footer>
  );
}
