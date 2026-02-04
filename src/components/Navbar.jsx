import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    Coaching<span style={{ color: 'var(--primary)' }}>Mandi</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="#" className={styles.link}>Top Rated</Link>
                    <button className="btn btn-primary">Login</button>
                </div>
            </div>
        </nav>
    );
}
