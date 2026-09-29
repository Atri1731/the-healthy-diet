import { ArrowRight, Mail } from "lucide-react";

function HealthyCTA() {
  return (
<section className="w-full bg-[#FCFAF4] px-5 pt-6 pb-10 sm:px-8 sm:pt-8 sm:pb-12 lg:px-12 lg:pt-10 lg:pb-14 xl:px-16 2xl:px-20">

      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          bg-[#174D32]
          px-6
          py-10

          sm:rounded-[34px]
          sm:px-10
          sm:py-12

          lg:px-16
          lg:py-14
        "
      >

        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-white/10" />

        <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full border border-white/10" />

        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto]">

          {/* Text */}
          <div>

            <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#A9C98B]">
              Stay Healthy
            </p>

            <h2
              className="
                mt-3
                max-w-[600px]
                font-serif
                text-3xl
                font-bold
                leading-tight
                text-white

                sm:text-4xl

                lg:text-[44px]
              "
            >
              Make Healthy Eating
              <span className="block text-[#A9C98B]">
                Part of Your Lifestyle
              </span>
            </h2>

            <p className="mt-4 max-w-[550px] text-sm leading-6 text-white/65 sm:text-base">
              Discover fresh meals, healthy choices and delicious
              food that makes taking care of yourself easier.
            </p>

          </div>


          {/* Button */}
          <div>

            <button
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-6
                py-3.5
                text-sm
                font-bold
                text-[#174D32]
                transition
                hover:bg-[#E7EFDC]
              "
            >
              Explore Menu

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HealthyCTA;