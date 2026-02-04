import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ background: '#0b0c10', padding: '50px 0', borderTop: '1px solid #1f2833' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 style={{ color: 'white', marginBottom: '20px' }}>Coaching<span style={{ color: 'var(--primary)' }}>Mandi</span></h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                    <Link href="#" style={{ color: 'var(--text-secondary)' }}>About Us</Link>
                    <Link href="#" style={{ color: 'var(--text-secondary)' }}>Add Institute</Link>
                    <Link href="#" style={{ color: 'var(--text-secondary)' }}>Terms</Link>
                    <Link href="#" style={{ color: 'var(--text-secondary)' }}>Privacy</Link>
                </div>
                <Link target="blank" href="https://www.x.com/ayushkas3ra" style={{ color: '#07c9fa' }}>Designed & developed by - ayush</Link>
                <p style={{ color: '#454d55', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} CoachingMandi Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
