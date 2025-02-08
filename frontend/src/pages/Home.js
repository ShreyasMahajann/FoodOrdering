import PropTypes from "prop-types";
import { useEffect } from "react";
import "./Home.css";
import UseCart from "../hooks/useCart"; // Adjust the import path as necessary

function Home({ products, user }) {
    const { addToCart } = UseCart();

    const handleCallbackResponse = (response) => {
        // console.log(response);
        console.log(response.credential);
        if (response.credential) {
            localStorage.setItem("user", response.credential);
        }
    };

    useEffect(() => {
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
        <div className="home">
            {/* Header with Login Button */}
            <header className="home-header">
                <h1>Products</h1>
                {!user && <div id="google-button"></div>}
            </header>

            {/* Product Listing */}
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product._id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="price">Price: ${product.price}</p>
                        {user ? (
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        ) : (
                            <button disabled>Login to Add to Cart</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

Home.propTypes = {
    products: PropTypes.array.isRequired,
    user: PropTypes.object,
};

export default Home;
