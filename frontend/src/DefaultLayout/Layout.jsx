import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
