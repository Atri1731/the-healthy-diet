import Hero from "../components/Hero";
import Categories from "../components/Categories";
import PopularFoods from "../components/PopularFoods";
import HealthyLifestyle from "../components/HealthyLifestyle";
import Footer from "../components/Footer";
import HealthyCTA from "../components/HealthyCTA";

function Home() {
  return (
    <div className="min-h-screen bg-[#FCFAF4]">

    

      <main>
        <Hero />

        <Categories />

        <PopularFoods />

        <HealthyLifestyle />

        <HealthyCTA />
      </main>

      <Footer />

    </div>
  );
}

export default Home;