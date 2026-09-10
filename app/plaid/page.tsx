/**
 * Fallback page for the Financial Copilot Plaid OAuth redirect URI.
 *
 * On iOS with the app installed, this URL is intercepted as a Universal Link
 * (see public/.well-known/apple-app-site-association) and this page never
 * renders. It exists so the redirect URI resolves to a real page instead of a
 * 404 when the app is not installed or the handoff misses.
 */
export default function PlaidRedirectPage() {
  return (
    <main
      style={{
        maxWidth: "32rem",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
        Returning to Financial Copilot
      </h1>
      <p style={{ color: "#555", lineHeight: 1.6 }}>
        If you are not redirected automatically, reopen the Financial Copilot
        app on your device to finish connecting your account.
      </p>
    </main>
  );
}
