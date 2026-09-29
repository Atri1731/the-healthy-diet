import {
  Check,
  Leaf,
  Heart,
  ShieldCheck,
  Users,
} from "lucide-react";

function HealthyLifestyle() {
  const benefits = [
    {
      icon: Leaf,
      title: "Fresh & Quality Ingredients",
      text: "We source fresh, wholesome ingredients for every meal.",
    },
    {
      icon: Heart,
      title: "Balanced & Nutritious Meals",
      text: "Thoughtfully prepared meals that are good for your body and mind.",
    },
    {
      icon: ShieldCheck,
      title: "Prepared With Care",
      text: "Every meal is prepared with hygiene, care and attention to quality.",
    },
    {
      icon: Users,
      title: "Loved By Our Customers",
      text: "Healthy food made delicious and enjoyed by our growing community.",
    },
  ];

  return (
  <section className="w-full bg-[#FCFAF4] pt-10 pb-8 sm:pt-12 sm:pb-10 lg:pt-14 lg:pb-10">

      <div
        className="
          grid
          w-full
          grid-cols-1
          items-center
          gap-10

          px-5
          sm:px-8

          lg:grid-cols-2
          lg:gap-14
          lg:px-12

          xl:gap-20
          xl:px-16

          2xl:px-20
        "
      >

        {/* =========================
            LEFT CONTENT
        ========================== */}
        <div className="w-full">

          {/* Label */}
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#6B9F45]">
            Why Choose Us
          </p>

          {/* Heading */}
          <h2
            className="
              mt-3
              max-w-[550px]
              font-serif
              text-3xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-[#183126]

              sm:text-4xl

              lg:text-[48px]
            "
          >
            A Healthier Tomorrow

            <span className="block text-[#174D32]">
              Starts Today
            </span>
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-[520px] text-sm leading-7 text-[#66736B] sm:text-base">
            We believe healthy food should be delicious, satisfying
            and easy to enjoy. That's why every meal is made with
            fresh ingredients and thoughtful preparation.
          </p>

          {/* Small stats */}
          <div className="mt-7 flex flex-wrap gap-6 border-y border-[#E5E1D5] py-5">

            <div>
              <p className="font-serif text-2xl font-bold text-[#174D32]">
                100%
              </p>

              <p className="mt-1 text-xs text-[#66736B]">
                Fresh Ingredients
              </p>
            </div>

            <div>
              <p className="font-serif text-2xl font-bold text-[#174D32]">
                25+
              </p>

              <p className="mt-1 text-xs text-[#66736B]">
                Healthy Options
              </p>
            </div>

            <div>
              <p className="font-serif text-2xl font-bold text-[#174D32]">
                4.8★
              </p>

              <p className="mt-1 text-xs text-[#66736B]">
                Customer Rating
              </p>
            </div>

          </div>

        </div>


        {/* =========================
            RIGHT CONTENT
        ========================== */}
        <div className="w-full">

          <div className="overflow-hidden rounded-[28px] border border-[#E5E1D5] bg-[#F7F3E8] p-3 sm:rounded-[34px] sm:p-4">

            <div className="relative overflow-hidden rounded-[22px] sm:rounded-[28px]">

              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=90"
                alt="Fresh healthy ingredients"
                className="
                  aspect-[4/3]
                  w-full
                  object-cover
                "
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D3522]/50 via-transparent to-transparent" />

              {/* Image text */}
              <div className="absolute bottom-5 left-5 right-5">

                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#DCEBCB]">
                  Eat Better
                </p>

                <p className="mt-1 font-serif text-xl font-bold text-white sm:text-2xl">
                  Feel Better Every Day
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          BENEFITS
      ========================== */}
      <div
        className="
          mt-12
          grid
          w-full
          grid-cols-1
          gap-3

          px-5
          sm:grid-cols-2
          sm:px-8

          lg:mt-14
          lg:grid-cols-4
          lg:px-12

          xl:px-16

          2xl:px-20
        "
      >

        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="
                group
                flex
                gap-4
                rounded-2xl
                border
                border-[#E5E1D5]
                bg-white
                p-4
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_30px_rgba(24,49,38,0.08)]
              "
            >

              {/* Icon */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E7EFDC]
                  text-[#174D32]
                  transition
                  group-hover:bg-[#174D32]
                  group-hover:text-white
                "
              >
                <Icon size={18} />
              </div>

              {/* Text */}
              <div>

                <h3 className="text-sm font-bold text-[#183126]">
                  {benefit.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#66736B]">
                  {benefit.text}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default HealthyLifestyle;