// import {Link} from "react-router-dom";
// import {ArrowRight, Leaf, Heart, Truck} from "lucide-react";

// function Hero() {
//   return (
//     <section className="w-full overflow-hidden bg-[#F7F3E8]">
//       <div
//         className="
//     grid
//     w-full
//     grid-cols-1
//     items-center

//     lg:grid-cols-2

//     px-5
//     py-10

//     sm:px-8
//     sm:py-14

//     lg:px-14
//     lg:py-16

//     xl:px-20
//     2xl:px-24
//   "
//       >
//         {/* =========================
//             LEFT CONTENT
//         ========================== */}
//       <div className="min-w-0 lg:max-w-[650px]">
//           {/* Eyebrow */}
//           <div className="flex items-center gap-3">
//             <span className="h-[2px] w-7 rounded-full bg-[#6B9F45]" />

//             <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#174D32]">
//               Healthy Food · Happy Life
//             </span>
//           </div>

//           {/* Heading */}
//           <h1
//             className="
//               mt-5
//               max-w-[540px]
//               font-serif
//               text-[42px]
//               font-bold
//               leading-[1.02]
//               tracking-[-1.2px]
//               text-[#183126]

//               sm:text-[50px]

//               lg:text-[56px]

//               xl:text-[60px]
//             "
//           >
//             Good Food
//             <span className="block text-[#174D32]">For A Better You</span>
//           </h1>

//           {/* Description */}
//           <p
//             className="
//               mt-6
//               max-w-[500px]
//               text-[14px]
//               leading-7
//               text-[#66736B]

//               sm:text-[15px]
//             "
//           >
//             Fresh, nutritious and delicious meals made with carefully selected
//             ingredients. Because your health deserves the best.
//           </p>

//           {/* Buttons */}
//           <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
//             <Link
//               to="/menu"
//               className="
//                 group
//                 inline-flex
//                 h-12
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-full
//                 bg-[#174D32]
//                 px-6
//                 text-sm
//                 font-semibold
//                 text-white
//                 transition
//                 hover:bg-[#0D3522]
//               "
//             >
//               Order Now
//               <ArrowRight
//                 size={16}
//                 className="transition-transform group-hover:translate-x-1"
//               />
//             </Link>

//             <Link
//               to="/menu"
//               className="
//                 inline-flex
//                 h-12
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-[#D4CEC0]
//                 bg-[#FCFAF4]
//                 px-6
//                 text-sm
//                 font-semibold
//                 text-[#174D32]
//                 transition
//                 hover:border-[#174D32]
//               "
//             >
//               Explore Menu
//             </Link>
//           </div>

//           {/* Benefits */}
//           <div
//             className="
//               mt-8
//               grid
//               grid-cols-1
//               gap-4
//               border-t
//               border-[#DED8CA]
//               pt-6

//               sm:grid-cols-3
//               sm:gap-5
//             "
//           >
//             <HeroBenefit
//               icon={<Leaf size={18} />}
//               title="100% Fresh"
//               description="Quality ingredients"
//             />

//             <HeroBenefit
//               icon={<Heart size={18} />}
//               title="Nutritious"
//               description="Balanced meals"
//             />

//             <HeroBenefit
//               icon={<Truck size={18} />}
//               title="Fast Delivery"
//               description="Fresh at your door"
//             />
//           </div>
//         </div>

//         {/* =========================
//             RIGHT IMAGE
//         ========================== */}
//    <div
//   className="
//     relative
//     mx-auto
//     mt-5
//     w-full
//     max-w-[380px]
//     sm:mt-6
//     sm:max-w-[440px]
//     md:max-w-[480px]
//     lg:mt-0
//     lg:max-w-[520px]
//     xl:max-w-[560px]
//   "
// >
//           {/* Soft background shape */}
//           <div
//             className="
//               absolute
//               inset-3
//               rounded-[38px]
//               bg-[#E5EEDB]

//               sm:inset-5
//               sm:rounded-[42px]
//             "
//           />

//           {/* Main Image */}
// <div
//   className="
//     relative

//     w-full
//     overflow-hidden
//     rounded-[28px]
//     shadow-[0_20px_50px_rgba(23,77,50,0.12)]
//     sm:rounded-[34px]
//     lg:rounded-[38px]
//   "
// >
//             <img
//               src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=90"
//               alt="Fresh healthy salad"
//               className="
//                 aspect-square
//                 w-full
//                 object-cover
//               "
//             />
//           </div>

//           {/* Floating Card */}
//           <div
//             className="
//               absolute
//               bottom-4
//               left-4
//               flex
//               items-center
//               gap-3
//               rounded-2xl
//               bg-[#FCFAF4]
//               px-4
//               py-3
//               shadow-[0_10px_30px_rgba(0,0,0,0.12)]

//               sm:bottom-7
//               sm:left-6
//             "
//           >
//             <div
//               className="
//                 flex
//                 h-10
//                 w-10
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-full
//                 bg-[#E5EEDB]
//               "
//             >
//               <Leaf size={19} className="text-[#174D32]" />
//             </div>

//             <div>
//               <p className="font-serif text-sm font-bold text-[#183126]">
//                 Eat Good
//               </p>

//               <p className="text-[11px] text-[#66736B]">Feel Great</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* =========================
//    BENEFIT COMPONENT
// ========================= */

// function HeroBenefit({icon, title, description}) {
//   return (
//     <div className="flex items-center justify-center gap-3">
//       <div
//         className="
//           flex
//           h-10
//           w-10
//           shrink-0
//           items-center
//           justify-center
//           rounded-full
//           bg-[#E5EEDB]
//           text-[#174D32]
//         "
//       >
//         {icon}
//       </div>

//       <div className="sm:mt-3">
//         <p className="text-xs font-bold text-[#183126]">{title}</p>

//         <p className="mt-1 text-[11px] text-[#66736B]">{description}</p>
//       </div>
//     </div>
//   );
// }

// export default Hero;


import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Heart, Truck } from "lucide-react";

function Hero() {
  return (
    <section className="w-full overflow-hidden bg-[#F7F3E8]">
      <div
        className="
          grid
          w-full
          grid-cols-1
          items-center
          gap-8
          px-4
          py-8
          sm:gap-10
          sm:px-8
          sm:py-12
          lg:grid-cols-2
          lg:gap-12
          lg:px-14
          lg:py-16
          xl:px-20
          2xl:px-24
        "
      >
        {/* LEFT CONTENT */}
        <div className="min-w-0 lg:max-w-[650px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-7 shrink-0 rounded-full bg-[#6B9F45]" />

            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#174D32] sm:text-[11px] sm:tracking-[2.5px]">
              Healthy Food · Happy Life
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              mt-4
              max-w-[540px]
              font-serif
              text-[38px]
              font-bold
              leading-[1.04]
              tracking-[-1px]
              text-[#183126]
              sm:mt-5
              sm:text-[50px]
              sm:tracking-[-1.2px]
              lg:text-[56px]
              xl:text-[60px]
            "
          >
            Good Food
            <span className="block text-[#174D32]">
              For A Better You
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-[500px]
              text-[14px]
              leading-6
              text-[#66736B]
              sm:mt-6
              sm:text-[15px]
              sm:leading-7
            "
          >
            Fresh, nutritious and delicious meals made with carefully selected
            ingredients. Because your health deserves the best.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-6
              flex
              flex-col
              items-stretch
              gap-3
              sm:mt-7
              sm:flex-row
              sm:items-center
              sm:justify-start
            "
          >
            <Link
              to="/menu"
              className="
                group
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#174D32]
                px-6
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#0D3522]
                sm:w-auto
              "
            >
              Order Now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/menu"
              className="
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                rounded-full
                border
                border-[#D4CEC0]
                bg-[#FCFAF4]
                px-6
                text-sm
                font-semibold
                text-[#174D32]
                transition
                hover:border-[#174D32]
                sm:w-auto
              "
            >
              Explore Menu
            </Link>
          </div>

          {/* Benefits */}
      <div
  className="
    mt-7
    grid
    grid-cols-3
    gap-2
    border-t
    border-[#DED8CA]
    pt-6
    sm:mt-8
    sm:gap-5
  "
>
            <HeroBenefit
              icon={<Leaf size={18} />}
              title="100% Fresh"
              description="Quality ingredients"
            />

            <HeroBenefit
              icon={<Heart size={18} />}
              title="Nutritious"
              description="Balanced meals"
            />

            <HeroBenefit
              icon={<Truck size={18} />}
              title="Fast Delivery"
              description="Fresh at your door"
            />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="
            relative
            mx-auto
            mt-0
            w-full
            max-w-[330px]
            sm:max-w-[440px]
            md:max-w-[480px]
            lg:max-w-[520px]
            xl:max-w-[560px]
          "
        >
          {/* Soft background shape */}
          <div
            className="
              absolute
              inset-2
              rounded-[30px]
              bg-[#E5EEDB]
              sm:inset-5
              sm:rounded-[42px]
            "
          />

          {/* Main Image */}
          <div
            className="
              relative
              w-full
              overflow-hidden
              rounded-[26px]
              shadow-[0_20px_50px_rgba(23,77,50,0.12)]
              sm:rounded-[34px]
              lg:rounded-[38px]
            "
          >
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=90"
              alt="Fresh healthy salad"
              className="aspect-square w-full object-cover"
            />
          </div>

          {/* Floating Card */}
          <div
            className="
              absolute
              bottom-3
              left-3
              flex
              items-center
              gap-2.5
              rounded-2xl
              bg-[#FCFAF4]
              px-3
              py-2.5
              shadow-[0_10px_30px_rgba(0,0,0,0.12)]
              sm:bottom-7
              sm:left-6
              sm:gap-3
              sm:px-4
              sm:py-3
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#E5EEDB]
                sm:h-10
                sm:w-10
              "
            >
              <Leaf size={18} className="text-[#174D32] sm:size-[19px]" />
            </div>

            <div>
              <p className="font-serif text-sm font-bold text-[#183126]">
                Eat Good
              </p>

              <p className="text-[10px] text-[#66736B] sm:text-[11px]">
                Feel Great
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* BENEFIT COMPONENT */
function HeroBenefit({ icon, title, description }) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:text-left">
      <div
  className="
    flex
    h-10
    w-10
    shrink-0
    items-center
    justify-center
    rounded-full
    bg-[#E5EEDB]
    text-[#174D32]
  "
>
        {icon}
      </div>

    <div className="mt-2 min-w-0 sm:mt-0">
    <p className="text-[11px] font-bold leading-4 text-[#183126] sm:text-xs">
  {title}
</p>

<p className="mt-1 text-[9px] leading-4 text-[#66736B] sm:text-[11px]">
  {description}
</p>
      </div>
    </div>
  );
}

export default Hero;