import React, { useState, useEffect } from "react";
import "./App.css";

const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const prompt = `Write a brief, natural-sounding 5-star customer review for Mahadev Taxi Service. Requirements:

Highlight the cleanliness of the vehicle, the professionalism and courteous behaviour of the driver Ankit

Naturally include a different SEO keyword each time such as “taxi service”, “cab service”, “taxi service in Rohtak”, “cab service in Rohtak”, “Rohtak taxi booking”, “Rohtak cab booking”, “Rohtak taxi service”, “Rohtak cab service”, “taxi service near me”, “cab service near me”

Keep the review to 200 words

Vary the sentence structure and tone frequently to sound human and authentic

Make it feel like a real personal experience (e.g., mention the time, how easy the journey was, why you were travelling, etc.)

Mention the name of a different city in Haryana state each time in the review text

Mention the driver’s name (Ankit) naturally and respectfully

Avoid repeating the beginning of the sentence again and again (e.g., don’t always start with “great experience...”)

Each review should sound a little different, e.g. It must be written by another customer

Include specific, credible touchpoints (e.g., ease of booking, comfort, punctuality, route information, etc.)

Don’t write a return review text with just the first and last name without any quotation marks or formatting.`;
const fallbackReviews = [
  "Mahadev Taxi Service in Rohtak offers reliable, clean, and punctual rides. The drivers are courteous and know all local routes. Highly recommended!",
  "Excellent cab service near me! Driver arrived on time, vehicle was spotless, and the fare was reasonable. Will definitely use Mahadev Taxi Service again.",
  "Best taxi service in Rohtak! Professional drivers, well-maintained cars, and always punctual. Great local knowledge too. 5 stars!",
  "Outstanding service from Mahadev Taxi! Clean vehicle, polite driver, and reached destination safely. Highly recommend this cab service.",
  "Reliable and affordable taxi service in Rohtak. Driver was professional and the car was in excellent condition. Will book again!",
  "Fantastic experience with Mahadev Taxi Service! Punctual pickup, smooth ride, and friendly driver. Best cab service in Rohtak area.",
  "Impressed with the service quality! Clean cars, reasonable rates, and drivers who know every corner of Rohtak. Definitely recommend!",
  "Top-notch taxi service! Called for a ride and they arrived within minutes. Professional service and fair pricing. Will use again!",
  "Great local taxi service in Rohtak! Driver was helpful, car was comfortable, and the journey was smooth. Highly satisfied!",
  "Superb cab service! Always on time, well-maintained vehicles, and courteous drivers. Mahadev Taxi Service is my go-to choice in Rohtak.",
  "Amazing taxi service in Rohtak! Booked through a simple call, driver was punctual and polite. Clean car and smooth ride. Highly recommend!",
  "Excellent cab service near me! Fair pricing, professional drivers, and they know all the shortcuts in Rohtak. Will definitely use again!",
  "Perfect taxi service! Called Mahadev Taxi and they arrived exactly on time. Driver was friendly and the vehicle was well-maintained. 5 stars!",
  "Best local taxi service in Rohtak! Quick booking, reliable service, and reasonable rates. The driver was helpful and knew the area well.",
  "Outstanding experience with Mahadev Taxi Service! Professional service, clean vehicles, and always punctual. My go-to cab service in Rohtak!"
];

function getFallbackReview() {
  return fallbackReviews[Math.floor(Math.random() * fallbackReviews.length)];
}

function App() {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReview = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 120,
          temperature: 0.7,
          top_p: 0.9
        })
      });

      if (!res.ok) throw new Error(`Groq API error: ${res.status}`);

      const data = await res.json();
      const reviewText = data.choices?.[0]?.message?.content?.trim();
      if (reviewText) {
        setReview(reviewText);
      } else {
        setReview(getFallbackReview());
        setError("Could not generate review, showing fallback.");
      }
    } catch (err) {
      setReview(getFallbackReview());
      setError("Failed to generate review, showing fallback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  const copyReview = async () => {
    try {
      await navigator.clipboard.writeText(review);
      alert("Copied to clipboard!");
    } catch {
      alert("Failed to copy!");
    }
  };

  const postReview = () => {
    window.open("https://g.page/r/CWshVq7I_6JLEBM/review", "_blank");
  };

  return (
    <div className="main-container">
    <div className="container py-5" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      <div className="text-center mb-5">
        <img
          src="logo.jpg"
          alt="Logo"
          className="logo-image"
          style={{
            maxWidth: 200,
            borderRadius: "50%",
            border: "4px solid #ffc107",
            padding: 8,
            background: "linear-gradient(45deg, #ffc107, #ffed4e)"
          }}
          onError={e => (e.target.style.display = "none")}
        />
        <h1 className="display-5 fw-bold mt-3" style={{ color: "yellow" }}>
          Mahadev Taxi Service Rohtak
        </h1>
        <p className="text-muted fw-semibold">Google Review</p>
      </div>

      <div className="review-card" style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="card shadow-lg">
          <div className="card-header text-center">
            <h3>
              <i className="fas fa-star me-2"></i>Customer Review
            </h3>
          </div>
          <div className="card-body">
            {error && (
              <div
                className="error-message"
                style={{
                  color: "#dc3545",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  padding: 10,
                  borderRadius: 5,
                  margin: "10px 0"
                }}
              >
                {error}
              </div>
            )}
            <blockquote className="blockquote text-center">
              <p id="reviewText" className="fs-5">
                "{review}"
              </p>
            </blockquote>
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-success copy-btn"
                onClick={copyReview}
                style={{ margin: 5, fontSize: "1rem", padding: "10px 25px", borderRadius: 6 }}
              >
                <i className="fas fa-copy me-2"></i>Copy Review
              </button>
              <button
                className="btn btn-outline-primary post-btn"
                onClick={postReview}
                style={{ margin: 5, fontSize: "1rem", padding: "10px 25px", borderRadius: 6 }}
              >
                <i className="fas fa-share-alt me-2"></i>Post Review
              </button>
              <button
                className="btn btn-primary generate-btn"
                onClick={fetchReview}
                disabled={loading}
                style={{ margin: 5, fontSize: "1rem", padding: "10px 25px", borderRadius: 6 }}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>Generating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sync-alt me-2"></i>Generate New Review
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-5">
        <p className="text-muted">Made for Mahadev Taxi Service Rohtak</p>
      </footer>

      <link
        href="https://cdn.replit.com/agent/bootstrap-agent-dark-theme.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
    </div>
    </div>
  );
}

export default App;
