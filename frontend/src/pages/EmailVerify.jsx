import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.css";
import { toast } from "react-toastify";

const EmailVerify = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "");
    const [otp, setOtp] = useState("");
    const [resending, setResending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/auth/emailverify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Email verified successfully!");
                navigate("/login", { state: { email } });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    const handleResend = async () => {
        if (!email || resending) {
            return;
        }

        setResending(true);
        try {
            const response = await fetch("/api/auth/resendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.info("New OTP sent successfully.");
            } else {
                toast.warning(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setResending(false);
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
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    required
                />
                <button type="submit" className="btn">Verify OTP</button>
                <p style={{ marginTop: "15px" }}>
                    Didn't receive OTP?{" "}
                    <button type="button" onClick={handleResend} disabled={resending}>
                        {resending ? "Sending..." : "Resend OTP"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default EmailVerify;
