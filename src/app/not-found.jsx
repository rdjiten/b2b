// app/not-found.jsx
export default function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Page Not Found</h1>
            <p>The Page you're looking for does not exist or may have been removed.</p>
            <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
                Go back to Home
            </a>
        </div>
    );
}
