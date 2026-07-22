import React from "react";

const ReturnPolicy = () => {
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
                Return Policy
            </h1>

            <p>
                At <strong>ShopNest</strong>, customer satisfaction is our
                priority. If you are not completely satisfied with your
                purchase, you may request a return under the following
                conditions.
            </p>

            <h2 style={{ color: "#f97316", marginTop: "25px" }}>
                Return Period
            </h2>

            <p>
                Products can be returned within <strong>7 days</strong> of
                delivery if they are unused, undamaged, and in their original
                packaging.
            </p>

            <h2 style={{ color: "#f97316", marginTop: "25px" }}>
                Non-Returnable Items
            </h2>

            <ul>
                <li>Opened personal care products</li>
                <li>Gift cards</li>
                <li>Downloadable digital products</li>
                <li>Products damaged due to misuse</li>
            </ul>

            <h2 style={{ color: "#f97316", marginTop: "25px" }}>
                Refund Process
            </h2>

            <p>
                After the returned product is inspected, your refund will be
                processed within <strong>5–7 business days</strong> using the
                original payment method.
            </p>

            <h2 style={{ color: "#f97316", marginTop: "25px" }}>
                Need Help?
            </h2>

            <p>
                If you have any questions regarding returns or refunds,
                please contact our customer support team.
            </p>
        </div>
    );
};

export default ReturnPolicy;