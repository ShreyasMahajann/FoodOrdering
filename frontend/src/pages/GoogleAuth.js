import { useEffect, useState } from "react";
import "./GoogleAuth.css"; // Import the CSS file

function GoogleAuth() {
    const [loginMessage, setLoginMessage] = useState("");

    const handleCallbackResponse = (response) => {
        if (response.credential) {
            localStorage.setItem("user", JSON.stringify({ token: response.credential }));
            window.location.reload(); // Refresh to update UI
        }
    };

    useEffect(() => {
        // Create and append the Google API script dynamically
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id:
                        "563385258779-75kq583ov98fk7h3dqp5em0639769a61.apps.googleusercontent.com",
                    callback: handleCallbackResponse,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById("google-button"),
                    {
                        theme: "outline",
                        size: "large",
                        text: "continue_with",
                    }
                );
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="google-auth-container">
            <h1>Login with Google</h1>
            <div id="google-button"></div>
            {loginMessage && (
                <p className={`login-message ${loginMessage.includes("successfully") ? "success" : "error"}`}>
                    {loginMessage}
                </p>
            )}
        </div>
    );
}

export default GoogleAuth;
