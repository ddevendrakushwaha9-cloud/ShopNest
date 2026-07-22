import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.css";
import { toast } from "react-toastify";

const EmailVerify = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState(location.state?.email || "");
    const [otp, setOtp] = useState("");

    // Verify OTP
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/emailverify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Email verified successfully!");
                navigate("/login");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        if (!email) {
            toast.warning("Please enter your email first.");
            return;
        }

        try {
            const res = await fetch("/api/auth/resendOtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.info("New OTP sent successfully.");
            } else {
                toast.warning(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Email Verification</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />

                <button type="submit" className="btn">
                    Verify OTP
                </button>

                <p style={{ marginTop: "15px" }}>
                    Didn't receive OTP?{" "}
                    <button type="button" onClick={handleResendOTP}>
                        Resend OTP
                    </button>
                </p>
            </form>
        </div>
    );
};

export default EmailVerify;