"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Hero from "../components/Hero";
import InstituteCard from "../components/InstituteCard";

export default function Home() {
  const BATCH_SIZE = 12;
  const [institutes, setInstitutes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/institutes`)
      .then((res) => res.json())
      .then((data) => {
        setInstitutes(data);
        setLoading(false);
      })
      .catch((err) => console.log("Error loading institutions", err));
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + BATCH_SIZE);
  };

  if (loading) return <div className="container">Loading institutes...</div>;

  const filteredInstitutes = Array.isArray(institutes)
    ? institutes.filter(
        (inst) =>
          inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inst.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <div>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div
        className="container"
        style={{ marginTop: "-50px", position: "relative", zIndex: 10 }}
      >
        <h2
          style={{ marginBottom: "20px", fontSize: "2rem", fontWeight: "bold" }}
        >
          Featured Institutes
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
            paddingBottom: "20px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredInstitutes.slice(0, visibleCount).map((institute) => (
              <motion.div key={institute._id} layout>
                {" "}
                <InstituteCard institute={institute} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < filteredInstitutes.length && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "40px 0",
            }}
          >
            <button onClick={handleShowMore} style={buttonStyle}>
              <PlusCircle size={20} />
              Show More Institutes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 30px",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "1.1rem",
  cursor: "pointer",
  boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
};
