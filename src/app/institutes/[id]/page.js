"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

export default function InstituteRequest({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [institute, setInstitute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://coachingmandi-server.onrender.com";

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/api/institutes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setInstitute(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id, API_URL]);

  const handleRequestCallBack = () => {
    setShowModal(true);
  };

  const handleCallBackSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10 digit phone number.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/callbacks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          instituteId: id,
          instituteName: institute.name,
        }),
      });

      if (res.ok) {
        alert("Success!");
        setShowModal(false);
        setFormData({ name: "", phone: "" });
      } else {
        alert("Server error. Please try again later.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Network error. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="container" style={{ padding: "50px" }}>
        <h1 style={{ color: "white" }}>Loading...</h1>
      </div>
    );

  if (!institute) {
    return (
      <div
        className="container"
        style={{ padding: "50px", textAlign: "center" }}
      >
        <h1 style={{ color: "white" }}>Institute not found</h1>
        <Link href="/" style={{ color: "var(--primary)" }}>
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          background: `linear-gradient(rgba(26, 26, 46, 0.9), rgba(26, 26, 46, 0.9)), url(${institute.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0 50px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
            {institute.name}
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#a0a0a0",
              marginBottom: "20px",
            }}
          >
            {institute.tagline}
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.1)",
              padding: "10px 20px",
              borderRadius: "50px",
            }}
          >
            <span style={{ color: "#fbbf24", fontSize: "1.5rem" }}>
              ★ {institute.rating}
            </span>
            <span style={{ color: "#a0a0a0" }}>|</span>
            <span>{institute.location}</span>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{ marginTop: "50px", paddingBottom: "100px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "50px",
          }}
        >
          <div>
            <section style={{ marginBottom: "40px" }}>
              <h2
                style={{
                  marginBottom: "20px",
                  borderBottom: "2px solid var(--primary)",
                  display: "inline-block",
                }}
              >
                About
              </h2>
              <p style={{ fontSize: "1.1rem", color: "#d1d1d1" }}>
                {institute.description}
              </p>
            </section>

            <section style={{ marginBottom: "40px" }}>
              <h2 style={{ marginBottom: "20px" }}>Courses Offered</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {institute.offerings?.map((offer, index) => (
                  <div
                    key={index}
                    className="glass"
                    style={{
                      padding: "20px",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: "1.1rem" }}>{offer.name}</h3>
                      <span style={{ fontSize: "0.9rem", color: "#a0a0a0" }}>
                        Duration: {offer.duration}
                      </span>
                    </div>
                    <div
                      style={{ color: "var(--primary)", fontWeight: "bold" }}
                    >
                      {offer.fee}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>
            <div
              className="glass"
              style={{
                padding: "30px",
                borderRadius: "10px",
                position: "sticky",
                top: "100px",
              }}
            >
              <h3 style={{ marginBottom: "20px" }}>Contact Institute</h3>
              <button
                onClick={handleRequestCallBack}
                className="btn btn-primary"
                style={{ width: "100%", marginBottom: "15px" }}
              >
                Request Call Back
              </button>
              <button
                className="btn"
                style={{
                  width: "100%",
                  border: "1px solid var(--primary)",
                  color: "var(--primary)",
                }}
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="glass"
            style={{
              padding: "30px",
              borderRadius: "15px",
              width: "350px",
              border: "1px solid #444",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                textAlign: "center",
                color: "white",
              }}
            >
              Call Back Request
            </h3>
            <form onSubmit={handleCallBackSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  background: "#131a26",
                  border: "1px solid #333",
                  color: "white",
                }}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "20px",
                  borderRadius: "8px",
                  background: "#131a26",
                  border: "1px solid #333",
                  color: "white",
                }}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "12px",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Sending..." : "Submit Request"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  background: "transparent",
                  color: "#666",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
