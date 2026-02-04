import { institutes } from '../../../data/institutes';
import Link from 'next/link';

export default function InstituteRequest({ params }) {
 
  const id = params.id;
  const institute = institutes.find(i => i.id === id);

  if (!institute) {
    return <div className="container" style={{padding: '50px', textAlign: 'center'}}><h1>Institute not found</h1></div>;
  }

  return (
    <div>
      <div style={{ 
        background: `linear-gradient(rgba(26, 26, 46, 0.9), rgba(26, 26, 46, 0.9)), url(${institute.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0 50px',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{institute.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#a0a0a0', marginBottom: '20px' }}>{institute.tagline}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '50px' }}>
            <span style={{ color: '#fbbf24', fontSize: '1.5rem' }}>★ {institute.rating}</span>
            <span style={{ color: '#a0a0a0' }}>|</span>
            <span>{institute.location}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '50px', paddingBottom: '100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px' }}>
          
          {/* Main Content */}
          <div>
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '20px', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '5px' }}>About</h2>
              <p style={{ fontSize: '1.1rem', color: '#d1d1d1' }}>{institute.description}</p>
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '20px' }}>Courses Offered</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {institute.offerings.map((offer, index) => (
                  <div key={index} className="glass" style={{ padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{offer.name}</h3>
                      <span style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>Duration: {offer.duration}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 'bold' }}>{offer.fee}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 style={{ marginBottom: '20px' }}>Student Reviews</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {institute.reviews.map((review, index) => (
                  <div key={index} style={{ background: '#131a26', padding: '20px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 'bold' }}>{review.user}</span>
                      <span style={{ color: '#fbbf24' }}>{'★'.repeat(review.rating)}</span>
                    </div>
                    <p style={{ color: '#d1d1d1', fontStyle: 'italic' }}>"{review.comment}"</p>
                    <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#6c757d' }}>{review.date}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div className="glass" style={{ padding: '30px', borderRadius: '10px', position: 'sticky', top: '100px' }}>
              <h3 style={{ marginBottom: '20px' }}>Contact Institute</h3>
              <button className="btn btn-primary" style={{ width: '100%', marginBottom: '15px' }}>Request Call Back</button>
              <button className="btn" style={{ width: '100%', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Download Brochure</button>
              <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#a0a0a0', textAlign: 'center' }}>
                Typical response time: 2 hours
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
