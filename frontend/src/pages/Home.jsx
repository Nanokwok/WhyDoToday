import Header from "@/components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="fixed top-0 left-0 w-full z-10" />
      <div className="flex-1">
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of our application.</p>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default Home;
