import React from "react";

const About = () => {
    return (
        <div
            style={{
                maxWidth: "1000px",
                margin: "40px auto",
                padding: "40px",
                color: "white",
                background: "#18181b",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                lineHeight: "1.8",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#f97316",
                    marginBottom: "20px",
                    fontSize: "2.5rem",
                }}
            >
                About ShopNest
            </h1>

            <p
                style={{
                    textAlign: "center",
                    color: "#d4d4d8",
                    marginBottom: "30px",
                    fontSize: "1.1rem",
                }}
            >
                Welcome to <strong>ShopNest</strong>, your trusted destination
                for quality products at affordable prices. We are committed to
                providing a simple, secure, and enjoyable online shopping
                experience.
            </p>

            <h2 style={{ color: "#f97316", marginTop: "20px" }}>
                Our Mission
            </h2>

            <p>
                Our mission is to deliver high-quality products with excellent
                customer service while making online shopping easy, affordable,
                and reliable for everyone.
            </p>

            <h2 style={{ color: "#f97316", marginTop: "25px" }}>
                Why Choose ShopNest?
            </h2>

            <ul style={{ paddingLeft: "20px" }}>
                <li style={{ marginBottom: "10px" }}>
                    ✔ Premium quality products
                </li>
                <li style={{ marginBottom: "10px" }}>
                    ✔ Affordable prices
                </li>
                <li style={{ marginBottom: "10px" }}>
                    ✔ Secure payment system
                </li>
                <li style={{ marginBottom: "10px" }}>
                    ✔ Fast and reliable delivery
                </li>
                <li style={{ marginBottom: "10px" }}>
                    ✔ Friendly customer support
                </li>
            </ul>

            <h2 style={{ color: "#f97316", marginTop: "25px" }}>
                Our Vision
            </h2>

            <p>
                We aim to become one of the most trusted online shopping
                platforms by offering exceptional service, innovative solutions,
                and a wide variety of products that meet our customers' needs.
            </p>

            <div
                style={{
                    marginTop: "40px",
                    textAlign: "center",
                    color: "#a1a1aa",
                    fontStyle: "italic",
                }}
            >
                Thank you for choosing <strong>ShopNest</strong>. ❤️
            </div>
        </div>
    );
};

export default About;