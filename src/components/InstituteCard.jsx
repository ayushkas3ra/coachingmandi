import Image from 'next/image';
import Link from 'next/link';
import styles from './InstituteCard.module.css';

export default function InstituteCard({ institute }) {
    return (
        <Link href={`/institutes/${institute._id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={institute.image}
                    alt={institute.name}
                    className={styles.image}
                    width={600}
                    height={400}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className={styles.ratingBadge}>★ {institute.rating}</div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{institute.name}</h3>
                <p className={styles.tagline}>{institute.tagline}</p>
                <p className={styles.location}>📍 {institute.location}</p>
                <div className={styles.divider}></div>
                <div className={styles.footer}>
                    <span>{institute.offerings.length} Courses</span>
                    <span className={styles.viewBtn}>View Details →</span>
                </div>
            </div>
        </Link>
    );
}
