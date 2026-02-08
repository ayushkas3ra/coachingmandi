import styles from './Hero.module.css';

export default function Hero({ searchQuery, setSearchQuery }) {
    return (
        <div className={styles.hero}>
            <div className={`container ${styles.content}`}>
                <h1 className={styles.title}>
                    Find the Best <span className="text-gradient">Guru</span> for You
                </h1>
                <p className={styles.subtitle}>
                    Compare ratings, fees, and reviews of top coaching institutes in Kanpur(100+ institutes listed).
                </p>
                <div className={styles.searchBox}>
                    <input type="text" placeholder="Search for Physics, JEE, Kanpur..." className={styles.input} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button className="btn" style={{ borderRadius: '0 5px 5px 0' }}>Search</button>
                </div>
            </div>
        </div>
    );
}
