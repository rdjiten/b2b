// app/not-found.jsx
export default function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Product Not Found</h1>
            <p>The Product you're looking for does not exist or may have been removed.</p>
            <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
                Go back to Home
            </a>
        </div>
    );
}
