import "../styles/globals.css";
import "../styles/theme.css";
import Navbar from "../components/Navbar";
import PreferenceLoader from "../components/PreferenceLoader";

export const metadata = {
  title: "DeafAid",
  description: "Accessibility-focused communication app for deaf and hard-of-hearing users.",
  icons: { icon: "/favicon.ico" },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PreferenceLoader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}