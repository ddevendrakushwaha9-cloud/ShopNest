import React from "react";

const Disclaimer = () => {
    return (
        <div
            style={{
                maxWidth: "1000px",
                margin: "40px auto",
                padding: "40px",
                background: "#18181b",
                color: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                lineHeight: "1.8",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#f97316",
                    marginBottom: "25px",
                }}
            >
                Disclaimer
            </h1>

            <p>
                The information provided on <strong>ShopNest</strong> is for
                general informational purposes only. While we strive to keep
                product details accurate and up to date, we do not guarantee
                the completeness or accuracy of all information.
            </p>

            <h2 style={{ color: "#f97316", marginTop: "25px" }}>
                Product Information
            </h2>

            <p>
                Product images, descriptions, and prices may change without
                prior notice. Actual products may vary slightly from the
                images displayed.
            </p>

            <h2 style={{ color: "#f97316", marginTop: "25px" }}>
                External Links
            </h2>

            <p>
                ShopNest may contain links to third-party websites. We are
                not responsible for the content, privacy policies, or
                practices of those websites.
            </p>

            <h2 style={{ color: "#f97316", marginTop: "25px" }}>
                Limitation of Liability
            </h2>

            <p>
                ShopNest shall not be held responsible for any direct or
                indirect damages arising from the use of this website or the
                products purchased through it.
            </p>
        </div>
    );
};

export default Disclaimer;