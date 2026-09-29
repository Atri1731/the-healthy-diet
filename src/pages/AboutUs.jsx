
import { Link } from "react-router-dom";
import { Leaf, Heart, Sprout, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "We believe healthy meals start with fresh, thoughtfully selected ingredients.",
  },
  {
    icon: Heart,
    title: "Made with Care",
    description:
      "Every meal is designed to make eating well enjoyable and convenient.",
  },
  {
    icon: Sprout,
    title: "Healthy Choices",
    description:
      "We make it easier to discover nourishing food that fits your everyday life.",
  },
  {
    icon: ShieldCheck,
    title: "Quality First",
    description:
      "We focus on food quality, a smooth ordering experience, and customer satisfaction.",
  },
];

export default function AboutUs() {
  return (
    <main className="overflow-hidden bg-[#FBFCF7] text-[#183D2B]">
      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E7F1DF] px-4 py-2 text-sm font-semibold text-[#397447]">
            <Leaf size={16} />
            A healthier way to eat
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Good food.
            <br />
            <span className="text-[#57965B]">Better living.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            Welcome to The Healthy Diet, where healthy food meets everyday
            convenience. Our goal is to help make nutritious food choices
            simpler, more enjoyable, and easier to fit into your lifestyle.
          </p>

          <Link
            to="/menu"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#285D3D] px-7 py-3.5 font-semibold text-white transition hover:bg-[#1D472E]"
          >
            Explore Our Menu
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-[#E5EFD9]" />

          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85"
            alt="Fresh and colorful healthy salad"
            className="relative h-[340px] w-full rounded-[2rem] object-cover shadow-xl sm:h-[460px]"
          />

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-lg sm:bottom-8 sm:left-8 sm:right-8">
            <p className="font-semibold">Eat well, feel well.</p>
            <p className="mt-1 text-sm text-gray-500">
              Small choices can support a healthier lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#57965B]">
            Our Story
          </span>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Healthy eating, made simpler
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600">
            We created The Healthy Diet around a simple idea: making better
            food choices should feel accessible, not complicated. Whether
            you are exploring new meals or looking for convenient everyday
            options, we want your food journey to be simple, enjoyable, and
            inspiring.
          </p>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-gray-600">
            Our focus is on bringing together food discovery, convenient
            ordering, and a customer-friendly experience in one place.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-20">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=85"
          alt="A table filled with fresh and balanced food"
          className="h-[300px] w-full rounded-3xl object-cover sm:h-[400px]"
          loading="lazy"
        />

        <div>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#57965B]">
            Our Mission
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Helping you make mindful food choices
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            We want to make exploring healthy food more convenient while
            encouraging a balanced approach to everyday eating. Good food
            should bring satisfaction, variety, and enjoyment to your day.
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-flex font-semibold text-[#397447] transition hover:text-[#183D2B]"
          >
            Get in touch →
          </Link>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#F0F5E9] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#57965B]">
              What Matters to Us
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              The values behind every choice
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              A thoughtful food experience begins with the things that matter
              most.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-[#E3EBDD] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7F1DF] text-[#397447]">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#285D3D] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <Sprout className="mx-auto" size={38} />

          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Your journey to better food starts here.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">
            Discover your next favorite meal and make room for more mindful
            choices in your everyday routine.
          </p>

          <Link
            to="/menu"
            className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 font-semibold text-[#285D3D] transition hover:bg-[#E7F1DF]"
          >
            Browse the Menu
          </Link>
        </div>
      </section>
    </main>
  );
}