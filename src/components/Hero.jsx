

// import { Link } from "react-router-dom";
// import { ArrowRight, Leaf, Heart, Truck } from "lucide-react";

// function Hero() {
//   return (
//     <section className="w-full overflow-hidden bg-[#F7F3E8]">
//       <div
//         className="
//           grid
//           w-full
//           grid-cols-1
//           items-center
//           gap-8
//           px-4
//           py-8
//           sm:gap-10
//           sm:px-8
//           sm:py-12
//           lg:grid-cols-2
//           lg:gap-12
//           lg:px-14
//           lg:py-16
//           xl:px-20
//           2xl:px-24
//         "
//       >
//         {/* LEFT CONTENT */}
//         <div className="min-w-0 lg:max-w-[650px]">
//           {/* Eyebrow */}
//           <div className="flex items-center gap-3">
//             <span className="h-[2px] w-7 shrink-0 rounded-full bg-[#6B9F45]" />

//             <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#174D32] sm:text-[11px] sm:tracking-[2.5px]">
//               Healthy Food · Happy Life
//             </span>
//           </div>

//           {/* Heading */}
//           <h1
//             className="
//               mt-4
//               max-w-[540px]
//               font-serif
//               text-[38px]
//               font-bold
//               leading-[1.04]
//               tracking-[-1px]
//               text-[#183126]
//               sm:mt-5
//               sm:text-[50px]
//               sm:tracking-[-1.2px]
//               lg:text-[56px]
//               xl:text-[60px]
//             "
//           >
//             Good Food
//             <span className="block text-[#174D32]">
//               For A Better You
//             </span>
//           </h1>

//           {/* Description */}
//           <p
//             className="
//               mt-5
//               max-w-[500px]
//               text-[14px]
//               leading-6
//               text-[#66736B]
//               sm:mt-6
//               sm:text-[15px]
//               sm:leading-7
//             "
//           >
//             Fresh, nutritious and delicious meals made with carefully selected
//             ingredients. Because your health deserves the best.
//           </p>

//           {/* Buttons */}
//           <div
//             className="
//               mt-6
//               flex
//               flex-col
//               items-stretch
//               gap-3
//               sm:mt-7
//               sm:flex-row
//               sm:items-center
//               sm:justify-start
//             "
//           >
//             <Link
//               to="/menu"
//               className="
//                 group
//                 inline-flex
//                 h-12
//                 w-full
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
//                 sm:w-auto
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
//                 w-full
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
//                 sm:w-auto
//               "
//             >
//               Explore Menu
//             </Link>
//           </div>

//           {/* Benefits */}
//       <div
//   className="
//     mt-7
//     grid
//     grid-cols-3
//     gap-2
//     border-t
//     border-[#DED8CA]
//     pt-6
//     sm:mt-8
//     sm:gap-5
//   "
// >
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

//         {/* RIGHT IMAGE */}
//         <div
//           className="
//             relative
//             mx-auto
//             mt-0
//             w-full
//             max-w-[330px]
//             sm:max-w-[440px]
//             md:max-w-[480px]
//             lg:max-w-[520px]
//             xl:max-w-[560px]
//           "
//         >
//           {/* Soft background shape */}
//           <div
//             className="
//               absolute
//               inset-2
//               rounded-[30px]
//               bg-[#E5EEDB]
//               sm:inset-5
//               sm:rounded-[42px]
//             "
//           />

//           {/* Main Image */}
//           <div
//             className="
//               relative
//               w-full
//               overflow-hidden
//               rounded-[26px]
//               shadow-[0_20px_50px_rgba(23,77,50,0.12)]
//               sm:rounded-[34px]
//               lg:rounded-[38px]
//             "
//           >
//             <img
//               src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=90"
//               alt="Fresh healthy salad"
//               className="aspect-square w-full object-cover"
//             />
//           </div>

//           {/* Floating Card */}
//           <div
//             className="
//               absolute
//               bottom-3
//               left-3
//               flex
//               items-center
//               gap-2.5
//               rounded-2xl
//               bg-[#FCFAF4]
//               px-3
//               py-2.5
//               shadow-[0_10px_30px_rgba(0,0,0,0.12)]
//               sm:bottom-7
//               sm:left-6
//               sm:gap-3
//               sm:px-4
//               sm:py-3
//             "
//           >
//             <div
//               className="
//                 flex
//                 h-9
//                 w-9
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-full
//                 bg-[#E5EEDB]
//                 sm:h-10
//                 sm:w-10
//               "
//             >
//               <Leaf size={18} className="text-[#174D32] sm:size-[19px]" />
//             </div>

//             <div>
//               <p className="font-serif text-sm font-bold text-[#183126]">
//                 Eat Good
//               </p>

//               <p className="text-[10px] text-[#66736B] sm:text-[11px]">
//                 Feel Great
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* BENEFIT COMPONENT */
// function HeroBenefit({ icon, title, description }) {
//   return (
//     <div className="flex min-w-0 flex-col items-center text-center sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:text-left">
//       <div
//   className="
//     flex
//     h-10
//     w-10
//     shrink-0
//     items-center
//     justify-center
//     rounded-full
//     bg-[#E5EEDB]
//     text-[#174D32]
//   "
// >
//         {icon}
//       </div>

//     <div className="mt-2 min-w-0 sm:mt-0">
//     <p className="text-[11px] font-bold leading-4 text-[#183126] sm:text-xs">
//   {title}
// </p>

// <p className="mt-1 text-[9px] leading-4 text-[#66736B] sm:text-[11px]">
//   {description}
// </p>
//       </div>
//     </div>
//   );
// }

// export default Hero;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Leaf,
//   Heart,
//   Truck,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import api from "../services/api";

// const fallbackImage =
//   "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=90";

// function Hero() {
//   const [meals, setMeals] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [paused, setPaused] = useState(false);
// const [isTransitioning, setIsTransitioning] = useState(false);

//   // Fetch available meals from MongoDB through the existing API.
//   useEffect(() => {
//     let mounted = true;

//     const fetchMeals = async () => {
//       try {
//         const response = await api.get("/products");

//         if (mounted) {
//           const products = (response.data.products || []).filter(
//             (meal) => meal.isAvailable !== false
//           );

//           setMeals(products);
//         }
//       } catch (error) {
//         console.error("Unable to load hero slider images:", error);
//       }
//     };

//     fetchMeals();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // Automatically change the image every five seconds.
// useEffect(() => {
//   if (paused || meals.length < 2) return;

//   const timer = setInterval(() => {
//     setIsTransitioning(true);

//     setTimeout(() => {
//       setCurrentIndex((previous) => (previous + 1) % meals.length);
//       setIsTransitioning(false);
//     }, 250);
//   }, 5000);

//   return () => clearInterval(timer);
// }, [meals.length, paused]);

//   const activeMeal = meals[currentIndex];

//   const mealId = activeMeal?._id || activeMeal?.id;

//   const mealLink = mealId ? `/menu/${mealId}` : "/menu";

//   const nextSlide = () => {
//     if (meals.length < 2) return;

//     setCurrentIndex((previous) => (previous + 1) % meals.length);
//   };

//   const previousSlide = () => {
//     if (meals.length < 2) return;

//     setCurrentIndex(
//       (previous) => (previous - 1 + meals.length) % meals.length
//     );
//   };

//   return (
//     <section className="w-full overflow-hidden bg-[#F7F3E8]">
//       <div
//       className="
//   grid
//   w-full
//   grid-cols-1
//   items-center
//   gap-8
//   px-4
//   py-8
//   sm:gap-10
//   sm:px-8
//   sm:py-12
//   md:grid-cols-2
//   md:gap-8
//   md:px-8
//   md:py-10
//   lg:gap-12
//   lg:px-14
//   lg:py-16
//   xl:px-20
//   2xl:px-24
// "
//       >
//         {/* LEFT CONTENT - ORIGINAL DESIGN */}
//         <div className="min-w-0 lg:max-w-[650px]">
//           {/* Eyebrow */}
//           <div className="flex items-center gap-3">
//             <span className="h-[2px] w-7 shrink-0 rounded-full bg-[#6B9F45]" />

//             <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#174D32] sm:text-[11px] sm:tracking-[2.5px]">
//               Healthy Food · Happy Life
//             </span>
//           </div>

//           {/* Original Heading */}
//           <h1
//             className="
//               mt-4 max-w-[540px] font-serif text-[38px]
//               font-bold leading-[1.04] tracking-[-1px] text-[#183126]
//               sm:mt-5 sm:text-[50px] sm:tracking-[-1.2px]
//               lg:text-[56px] xl:text-[60px]
//             "
//           >
//             Good Food
//             <span className="block text-[#174D32]">
//               For A Better You
//             </span>
//           </h1>

//           {/* Original Description */}
//           <p
//             className="
//               mt-5 max-w-[500px] text-[14px] leading-6
//               text-[#66736B] sm:mt-6 sm:text-[15px] sm:leading-7
//             "
//           >
//             Fresh, nutritious and delicious meals made with carefully selected
//             ingredients. Because your health deserves the best.
//           </p>

//           {/* Original Buttons */}
//           <div
//             className="
//               mt-6 flex flex-col items-stretch gap-3
//               sm:mt-7 sm:flex-row sm:items-center sm:justify-start
//             "
//           >
//             <Link
//               to="/menu"
//               className="
//                 group inline-flex h-12 w-full items-center
//                 justify-center gap-2 rounded-full bg-[#174D32]
//                 px-6 text-sm font-semibold text-white transition
//                 hover:bg-[#0D3522] sm:w-auto
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
//                 inline-flex h-12 w-full items-center justify-center
//                 rounded-full border border-[#D4CEC0] bg-[#FCFAF4]
//                 px-6 text-sm font-semibold text-[#174D32]
//                 transition hover:border-[#174D32] sm:w-auto
//               "
//             >
//               Explore Menu
//             </Link>
//           </div>

//           {/* Original Benefits */}
//           <div
//             className="
//               mt-7 grid grid-cols-3 gap-2 border-t
//               border-[#DED8CA] pt-6 sm:mt-8 sm:gap-5
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

//         {/* RIGHT IMAGE SLIDER */}
//         <div
//           className="
//             relative mx-auto mt-0 w-full max-w-[330px]
//             sm:max-w-[440px] md:max-w-[480px]
//             lg:max-w-[520px] xl:max-w-[560px]
//           "
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => setPaused(false)}
//           onFocus={() => setPaused(true)}
//           onBlur={(event) => {
//             if (!event.currentTarget.contains(event.relatedTarget)) {
//               setPaused(false);
//             }
//           }}
//         >
//           {/* Soft Background Shape */}
//           <div
//             className="
//               absolute inset-2 rounded-[30px] bg-[#E5EEDB]
//               sm:inset-5 sm:rounded-[42px]
//             "
//           />

//           {/* Clickable Meal Image */}
//           <Link
//             to={mealLink}
//             aria-label={
//               activeMeal
//                 ? `View details for ${activeMeal.name}`
//                 : "Explore healthy meals"
//             }
//             className="
//               group relative block w-full overflow-hidden
//               rounded-[26px]
//               shadow-[0_20px_50px_rgba(23,77,50,0.12)]
//               focus-visible:outline-2 focus-visible:outline-[#174D32]
//               sm:rounded-[34px] lg:rounded-[38px]
//             "
//           >
//             <img
//               src={activeMeal?.image || fallbackImage}
//               alt={activeMeal?.name || "Fresh healthy salad"}
//               onError={(event) => {
//                 event.currentTarget.onerror = null;
//                 event.currentTarget.src = fallbackImage;
//               }}
//             className={`
//   aspect-square w-full object-cover
//   transition-all duration-700 ease-in-out
//   motion-reduce:transition-none
//   ${
//     isTransitioning
//       ? "scale-[1.04] opacity-60"
//       : "scale-100 opacity-100"
//   }
// `}
//             />

//             {/* Hover Overlay */}
//             {/* <div className="absolute inset-0 flex items-end justify-center bg-black/0 pb-8 transition-colors duration-300 group-hover:bg-black/20">
//               <span className="translate-y-3 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#174D32] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//                 View Meal Details →
//               </span>
//             </div> */}

//             {/* Top-right Arrow */}
//             {/* <span
//               className="
//                 absolute right-4 top-4 flex h-10 w-10
//                 items-center justify-center rounded-full
//                 bg-white/90 text-[#174D32] shadow-md
//               "
//             >
//               <ArrowRight size={19} />
//             </span> */}
//           </Link>

//           {/* Previous / Next Arrows */}
//           {meals.length > 1 && (
//             <>
//               <button
//                 type="button"
//                 onClick={previousSlide}
//                 aria-label="Previous meal"
//                 className="
//                   absolute left-2 top-1/2 z-20 flex h-10 w-10
//                   -translate-y-1/2 items-center justify-center
//                   rounded-full bg-white/95 text-[#174D32]
//                   shadow-lg transition hover:scale-110 sm:left-4
//                 "
//               >
//                 <ChevronLeft size={22} />
//               </button>

//               <button
//                 type="button"
//                 onClick={nextSlide}
//                 aria-label="Next meal"
//                 className="
//                   absolute right-2 top-1/2 z-20 flex h-10 w-10
//                   -translate-y-1/2 items-center justify-center
//                   rounded-full bg-white/95 text-[#174D32]
//                   shadow-lg transition hover:scale-110 sm:right-4
//                 "
//               >
//                 <ChevronRight size={22} />
//               </button>
//             </>
//           )}

//           {/* Floating Card */}
//           <Link
//             to={mealLink}
//             className="
//               absolute bottom-3 left-3 flex max-w-[80%]
//               items-center gap-2.5 rounded-2xl bg-[#FCFAF4]
//               px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]
//               transition hover:-translate-y-1
//               sm:bottom-7 sm:left-6 sm:gap-3 sm:px-4 sm:py-3
//             "
//           >
//             <div
//               className="
//                 flex h-9 w-9 shrink-0 items-center justify-center
//                 rounded-full bg-[#E5EEDB] sm:h-10 sm:w-10
//                 transition-all duration-500 ease-out hover:-translate-y-1
//               "
//             >
//               <Leaf size={19} className="text-[#174D32]" />
//             </div>

//             <div className="min-w-0">
//               <p className="truncate font-serif text-sm font-bold text-[#183126]">
//                 {activeMeal?.name || "Eat Good"}
//               </p>

//               <p className="text-[10px] text-[#66736B] sm:text-[11px]">
//                 {activeMeal
//                   ? "View meal details"
//                   : "Feel Great"}
//               </p>
//             </div>
//           </Link>

// {/* Slide Indicators */}
// {meals.length > 1 && (
//   <div
//     className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2"
//     aria-label="Choose featured meal"
//   >
//     {meals.map((meal, index) => (
//       <button
//         key={meal._id || meal.id}
//         type="button"
//         onClick={() => setCurrentIndex(index)}
//         aria-label={`Show ${meal.name}`}
//         aria-current={currentIndex === index ? "true" : undefined}
//         className={`
//           h-2 rounded-full transition-all duration-500 ease-in-out
//           ${
//             currentIndex === index
//               ? "w-8 bg-[#174D32]"
//               : "w-2 bg-[#B8C7AD] hover:bg-[#6B9F45]"
//           }
//         `}
//       />
//     ))}
//   </div>
// )}

//         </div>
//       </div>
//     </section>
//   );
// }

// /* BENEFIT COMPONENT */
// function HeroBenefit({ icon, title, description }) {
//   return (
//     <div className="flex min-w-0 flex-col items-center text-center sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:text-left">
//       <div
//         className="
//           flex h-10 w-10 shrink-0 items-center justify-center
//           rounded-full bg-[#E5EEDB] text-[#174D32]
//         "
//       >
//         {icon}
//       </div>

//       <div className="mt-2 min-w-0 sm:mt-0">
//         <p className="text-[11px] font-bold leading-4 text-[#183126] sm:text-xs">
//           {title}
//         </p>

//         <p className="mt-1 text-[9px] leading-4 text-[#66736B] sm:text-[11px]">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Hero;







// import { useCallback, useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Leaf,
//   Heart,
//   Truck,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import api from "../services/api";

// const fallbackImage =
//   "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=90";

// const ANIMATION_DURATION = 700;
// const SLIDE_INTERVAL = 5000;

// function Hero() {
//   const [meals, setMeals] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [outgoingMeal, setOutgoingMeal] = useState(null);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [fadeStarted, setFadeStarted] = useState(false);
//   const [paused, setPaused] = useState(false);

//   const currentIndexRef = useRef(0);
//   const mealsRef = useRef([]);
//   const timeoutRef = useRef(null);
//   const animationFrameRef = useRef(null);

//   // Fetch available products from the existing backend.
//   useEffect(() => {
//     let mounted = true;

//     async function fetchMeals() {
//       try {
//         const response = await api.get("/products");

//         if (!mounted) return;

//         const products = (response.data.products || []).filter(
//           (meal) =>
//             meal.isAvailable !== false &&
//             (meal._id || meal.id)
//         );

//         mealsRef.current = products;
//         setMeals(products);
//       } catch (error) {
//         console.error("Unable to load hero meals:", error);
//       }
//     }

//     fetchMeals();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // Clean up animation timers when the component unmounts.
//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }

//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, []);

//   // Change slides with an overlapping-image crossfade.
//   const goToSlide = useCallback((nextIndex) => {
//     const products = mealsRef.current;
//     const previousIndex = currentIndexRef.current;

//     if (
//       products.length < 2 ||
//       nextIndex === previousIndex ||
//       nextIndex < 0 ||
//       nextIndex >= products.length
//     ) {
//       return;
//     }

//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current);
//     }

//     setOutgoingMeal(products[previousIndex]);
//     setIsTransitioning(true);
//     setFadeStarted(false);

//     currentIndexRef.current = nextIndex;
//     setCurrentIndex(nextIndex);

//     // Allow the old image to render before starting the fade.
//     animationFrameRef.current = requestAnimationFrame(() => {
//       setFadeStarted(true);
//     });

//     timeoutRef.current = setTimeout(() => {
//       setOutgoingMeal(null);
//       setIsTransitioning(false);
//       setFadeStarted(false);
//       timeoutRef.current = null;
//       animationFrameRef.current = null;
//     }, ANIMATION_DURATION);
//   }, []);

//   // Automatically advance every five seconds.
//   useEffect(() => {
//     if (paused || meals.length < 2) return;

//     const interval = setInterval(() => {
//       const nextIndex =
//         (currentIndexRef.current + 1) % mealsRef.current.length;

//       goToSlide(nextIndex);
//     }, SLIDE_INTERVAL);

//     return () => clearInterval(interval);
//   }, [meals.length, paused, goToSlide]);

//   const activeMeal = meals[currentIndex];

//   const mealId = activeMeal?._id || activeMeal?.id;
//   const mealLink = mealId ? `/menu/${mealId}` : "/menu";

//   const nextSlide = () => {
//     if (meals.length < 2) return;

//     goToSlide((currentIndexRef.current + 1) % mealsRef.current.length);
//   };

//   const previousSlide = () => {
//     if (meals.length < 2) return;

//     goToSlide(
//       (currentIndexRef.current - 1 + mealsRef.current.length) %
//         mealsRef.current.length
//     );
//   };

//   return (
//     <section className="w-full overflow-hidden bg-[#F7F3E8]">
//       <div
//         className="

// grid w-full grid-cols-1 items-center gap-5
// px-4 py-5 sm:gap-6 sm:px-8 sm:py-7
// md:grid-cols-2 md:gap-7 md:px-8 md:py-8
// lg:gap-8 lg:px-14 lg:py-10
// xl:px-20 2xl:px-24
//         "
//       >
//         {/* LEFT CONTENT — YOUR ORIGINAL DESIGN */}
//         <div className="min-w-0 lg:max-w-[650px]">
//           <div className="flex items-center gap-3">
//             <span className="h-[2px] w-7 shrink-0 rounded-full bg-[#6B9F45]" />

//             <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#174D32] sm:text-[11px] sm:tracking-[2.5px]">
//               Healthy Food · Happy Life
//             </span>
//           </div>

//           <h1
//             className="
//               mt-4 max-w-[540px] font-serif text-[38px]
//               font-bold leading-[1.04] tracking-[-1px] text-[#183126]
//               sm:mt-5 sm:text-[50px] sm:tracking-[-1.2px]
//               lg:text-[56px] xl:text-[60px]
//             "
//           >
//             Good Food
//             <span className="block text-[#174D32]">
//               For A Better You
//             </span>
//           </h1>

//           <p
//             className="
//               mt-5 max-w-[500px] text-[14px] leading-6
//               text-[#66736B] sm:mt-6 sm:text-[15px] sm:leading-7
//             "
//           >
//             Fresh, nutritious and delicious meals made with carefully selected
//             ingredients. Because your health deserves the best.
//           </p>

//           {/* Original Buttons */}
//           <div
//             className="
//               mt-6 flex flex-col items-stretch gap-3
//               sm:mt-7 sm:flex-row sm:items-center sm:justify-start
//             "
//           >
//             <Link
//               to="/menu"
//               className="
//                 group inline-flex h-12 w-full items-center
//                 justify-center gap-2 rounded-full bg-[#174D32]
//                 px-6 text-sm font-semibold text-white transition
//                 hover:bg-[#0D3522] sm:w-auto
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
//                 inline-flex h-12 w-full items-center justify-center
//                 rounded-full border border-[#D4CEC0] bg-[#FCFAF4]
//                 px-6 text-sm font-semibold text-[#174D32]
//                 transition hover:border-[#174D32] sm:w-auto
//               "
//             >
//               Explore Menu
//             </Link>
//           </div>

//           {/* Original Benefits */}
//           <div
//             className="
//               mt-5 grid grid-cols-3 gap-2 border-t
// border-[#DED8CA] pt-4 sm:mt-6 sm:gap-5 sm:pt-5
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

//         {/* RIGHT SIDE — ANIMATED IMAGE SLIDER */}
//         <div
//           className="
//             // relative mx-auto w-full max-w-[340px]
//             // sm:max-w-[440px] md:max-w-none
//             // lg:max-w-[520px] xl:max-w-[560px]

//             relative w-full min-w-0
//           "
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => setPaused(false)}
//           onFocus={() => setPaused(true)}
//           onBlur={(event) => {
//             if (!event.currentTarget.contains(event.relatedTarget)) {
//               setPaused(false);
//             }
//           }}
//         >
//           {/* Soft Background Shape */}
//           <div
//             className="
//               absolute inset-2 rounded-[30px] bg-[#E5EEDB]
//               sm:inset-5 sm:rounded-[42px]
//             "
//           />

//           {/* Clickable Image Area */}
//           <Link
//             to={mealLink}
//             aria-label={
//               activeMeal
//                 ? `View details for ${activeMeal.name}`
//                 : "Explore healthy meals"
//             }

// // className="
// //   group relative block h-[320px] w-full overflow-hidden
// //   rounded-[26px]
// //   shadow-[0_20px_50px_rgba(23,77,50,0.12)]
// //   focus-visible:outline-2 focus-visible:outline-[#174D32]
// //   sm:h-[420px] sm:rounded-[34px]
// //   lg:h-[500px] xl:h-[540px] lg:rounded-[38px]
// // "


// className="
 
// group relative block h-[300px] w-full overflow-hidden
// rounded-2xl bg-[#E5EEDB]
// shadow-[0_20px_45px_rgba(23,77,50,0.16)]
// ring-1 ring-black/5
// focus-visible:outline-2 focus-visible:outline-[#174D32]
// sm:h-[380px] sm:rounded-3xl
// lg:h-[460px] xl:h-[500px]

// "

//           >
//             {/* Previous Image — fades away */}
//             {outgoingMeal && (
//               <img
//                 src={outgoingMeal.image || fallbackImage}
//                 alt=""
//                 aria-hidden="true"
//                 // className={`
//                 //   absolute inset-0 z-10 h-full w-full object-cover
//                 //   transition-[opacity,transform] duration-700 ease-in-out
//                 //   motion-reduce:transition-none
//                 //   ${
//                 //     fadeStarted
//                 //       ? "scale-105 opacity-0"
//                 //       : "scale-100 opacity-100"
//                 //   }
//                 // `}


// className={`
//   absolute inset-0 h-full w-full object-cover object-center
//   transition-[opacity,transform] duration-700 ease-in-out
//   motion-reduce:transition-none
//   ${
//     isTransitioning && !fadeStarted
//       ? "scale-[1.04] opacity-0"
//       : "scale-100 opacity-100"
//   }
//   group-hover:scale-[1.03]
// `}


//               />
//             )}

//             {/* Current Image — fades in with gentle zoom */}
//             <img
//               src={activeMeal?.image || fallbackImage}
//               alt={activeMeal?.name || "Fresh healthy salad"}
//               onError={(event) => {
//                 event.currentTarget.onerror = null;
//                 event.currentTarget.src = fallbackImage;
//               }}
//               className={`
              
// absolute inset-0 h-full w-full object-cover object-center

//                 transition-[opacity,transform] duration-700 ease-in-out
//                 motion-reduce:transition-none
//                 ${
//                   isTransitioning && !fadeStarted
//                     ? "scale-105 opacity-0"
//                     : "scale-100 opacity-100"
//                 }
//                 group-hover:scale-[1.02]
//               `}
//             />
            
// <div
//   aria-hidden="true"
//   className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-[#10291D]/45 via-transparent to-transparent"
// />

//           </Link>

//           {/* Previous / Next Arrows */}
//           {meals.length > 1 && (
//             <>
//               <button
//                 type="button"
//                 onClick={previousSlide}
//                 aria-label="Previous meal"
//                 className="
//                   absolute left-2 top-1/2 z-20 flex h-10 w-10
//                   -translate-y-1/2 items-center justify-center
//                   rounded-full bg-white/95 text-[#174D32]
//                   shadow-lg transition duration-300
//                   hover:scale-110 hover:bg-white
//                   focus-visible:outline-2 focus-visible:outline-[#174D32]
//                   sm:left-4
//                 "
//               >
//                 <ChevronLeft size={22} />
//               </button>

//               <button
//                 type="button"
//                 onClick={nextSlide}
//                 aria-label="Next meal"
//                 className="
//                   absolute right-2 top-1/2 z-20 flex h-10 w-10
//                   -translate-y-1/2 items-center justify-center
//                   rounded-full bg-white/95 text-[#174D32]
//                   shadow-lg transition duration-300
//                   hover:scale-110 hover:bg-white
//                   focus-visible:outline-2 focus-visible:outline-[#174D32]
//                   sm:right-4
//                 "
//               >
//                 <ChevronRight size={22} />
//               </button>
//             </>
//           )}

//           {/* Floating Meal Card */}
//           <Link
//             to={mealLink}
//             // className="
//             //   absolute bottom-3 left-3 z-20 flex max-w-[80%]
//             //   items-center gap-2.5 rounded-2xl bg-[#FCFAF4]
//             //   px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]
//             //   transition-transform duration-300 hover:-translate-y-1
//             //   sm:bottom-7 sm:left-6 sm:gap-3 sm:px-4 sm:py-3
//             // "


// className="
//   absolute bottom-4 left-4 z-20 flex max-w-[85%]
//   items-center gap-3 rounded-2xl
//   border border-white/70 bg-[#FCFAF4]/95
//   px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.16)]
//   backdrop-blur-md transition-transform duration-300
//   hover:-translate-y-1
//   sm:bottom-6 sm:left-6
// "


//           >
//             <div
//               className="
//                 flex h-9 w-9 shrink-0 items-center justify-center
//                 rounded-full bg-[#E5EEDB] sm:h-10 sm:w-10
//               "
//             >
//               <Leaf size={19} className="text-[#174D32]" />
//             </div>

//             <div className="min-w-0">
//               <p className="truncate font-serif text-sm font-bold text-[#183126]">
//                 {activeMeal?.name || "Eat Good"}
//               </p>

//               <p className="text-[10px] text-[#66736B] sm:text-[11px]">
//                 View meal details
//               </p>
//             </div>
//           </Link>

//           {/* Animated Slide Indicators */}
//           {meals.length > 1 && (
//             <div
//               className="
//                absolute -bottom-4 left-1/2 flex
//                 -translate-x-1/2 items-center gap-2
//               "
//               aria-label="Choose featured meal"
//             >
//               {meals.map((meal, index) => (
//                 <button
//                   key={meal._id || meal.id}
//                   type="button"
//                   onClick={() => goToSlide(index)}
//                   aria-label={`Show ${meal.name}`}
//                   aria-current={
//                     currentIndex === index ? "true" : undefined
//                   }
//                   className={`
//                     h-2 rounded-full
//                     transition-all duration-500 ease-in-out
//                     motion-reduce:transition-none
//                     ${
//                       currentIndex === index
//                         ? "w-8 bg-[#174D32]"
//                         : "w-2 bg-[#B8C7AD] hover:bg-[#6B9F45]"
//                     }
//                   `}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* BENEFIT COMPONENT */
// function HeroBenefit({ icon, title, description }) {
//   return (
//     <div className="flex min-w-0 flex-col items-center text-center sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:text-left">
//       <div
//         className="
//           flex h-10 w-10 shrink-0 items-center justify-center
//           rounded-full bg-[#E5EEDB] text-[#174D32]
//         "
//       >
//         {icon}
//       </div>

//       <div className="mt-2 min-w-0 sm:mt-0">
//         <p className="text-[11px] font-bold leading-4 text-[#183126] sm:text-xs">
//           {title}
//         </p>

//         <p className="mt-1 text-[9px] leading-4 text-[#66736B] sm:text-[11px]">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Hero;







import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Heart,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "../services/api";

const fallbackImage =
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=90";

const ANIMATION_DURATION = 700;
const SLIDE_INTERVAL = 5000;

function Hero() {
  const [meals, setMeals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outgoingMeal, setOutgoingMeal] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeStarted, setFadeStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const currentIndexRef = useRef(0);
  const mealsRef = useRef([]);
  const timeoutRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Fetch products from your existing backend.
  useEffect(() => {
    let mounted = true;

    async function fetchMeals() {
      try {
        const response = await api.get("/products");

        if (!mounted) return;

        const data = response.data;
        const products = (
          Array.isArray(data) ? data : data.products || []
        ).filter(
          (meal) =>
            meal.isAvailable !== false && (meal._id || meal.id)
        );

        mealsRef.current = products;
        currentIndexRef.current = 0;
        setMeals(products);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Unable to load hero meals:", error);
      }
    }

    fetchMeals();

    return () => {
      mounted = false;
    };
  }, []);

  // Clean up timers and animation frames.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Smooth overlapping image crossfade.
  const goToSlide = useCallback((nextIndex) => {
    const products = mealsRef.current;
    const previousIndex = currentIndexRef.current;

    if (
      products.length < 2 ||
      nextIndex === previousIndex ||
      nextIndex < 0 ||
      nextIndex >= products.length
    ) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setOutgoingMeal(products[previousIndex]);
    setIsTransitioning(true);
    setFadeStarted(false);

    currentIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);

    animationFrameRef.current = requestAnimationFrame(() => {
      setFadeStarted(true);
    });

    timeoutRef.current = setTimeout(() => {
      setOutgoingMeal(null);
      setIsTransitioning(false);
      setFadeStarted(false);
      timeoutRef.current = null;
      animationFrameRef.current = null;
    }, ANIMATION_DURATION);
  }, []);

  // Automatic slideshow.
  useEffect(() => {
    if (paused || meals.length < 2) return;

    const interval = setInterval(() => {
      const nextIndex =
        (currentIndexRef.current + 1) % mealsRef.current.length;

      goToSlide(nextIndex);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [meals.length, paused, goToSlide]);

  const activeMeal = meals[currentIndex];
  const mealId = activeMeal?._id || activeMeal?.id;
  const mealLink = mealId ? `/menu/${mealId}` : "/menu";

  const nextSlide = () => {
    goToSlide((currentIndexRef.current + 1) % mealsRef.current.length);
  };

  const previousSlide = () => {
    goToSlide(
      (currentIndexRef.current - 1 + mealsRef.current.length) %
        mealsRef.current.length
    );
  };

  const imageClasses = `
    absolute inset-0 h-full w-full object-cover object-center
    transition-[opacity,transform] duration-700 ease-in-out
    motion-reduce:transition-none
  `;

  return (
    <section className="relative w-full overflow-hidden bg-[#F7F3E8]">
      <div
        className="
          mx-auto grid w-full max-w-[1600px] grid-cols-1
       
items-center gap-6 px-5 py-6
sm:px-8 sm:py-8
md:grid-cols-2 md:gap-7 md:px-8 md:py-8
lg:gap-10 lg:px-12 lg:py-10
xl:gap-12 xl:px-16 xl:py-12
2xl:px-20

          2xl:px-24
        "
      >
        {/* LEFT CONTENT */}
        <div className="relative z-10 min-w-0 md:py-3 lg:py-6">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 shrink-0 rounded-full bg-[#6B9F45]" />

            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#174D32] sm:text-xs sm:tracking-[2.5px]">
              Healthy Food · Happy Life
            </span>
          </div>

          <h1
            className="
              mt-5 max-w-[600px] font-serif
              text-[clamp(2.5rem,5vw,4.5rem)]
              font-bold leading-[1.06] tracking-[-1.5px]
              text-[#183126]
            "
          >
            Good Food
            <span className="mt-1 block text-[#174D32]">
              For A Better You
            </span>
          </h1>

          <p className="mt-5 max-w-[480px] text-sm leading-7 text-[#66736B] sm:mt-6 sm:text-base">
            Fresh, nutritious and delicious meals made with carefully
            selected ingredients. Because your health deserves the best.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to="/menu"
              className="
                group inline-flex h-12 w-full items-center
                justify-center gap-2 rounded-full
                bg-[#174D32] px-7 text-sm font-semibold text-white
                shadow-[0_8px_20px_rgba(23,77,50,0.15)]
                transition duration-300 hover:-translate-y-0.5
                hover:bg-[#0D3522]
                sm:w-auto
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#174D32]
              "
            >
              Order Now
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/menu"
              className="
                inline-flex h-12 w-full items-center justify-center
                rounded-full border border-[#D4CEC0]
                bg-[#FCFAF4] px-7 text-sm font-semibold
                text-[#174D32] transition duration-300
                hover:-translate-y-0.5 hover:border-[#174D32]
                hover:bg-white sm:w-auto
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#174D32]
              "
            >
              Explore Menu
            </Link>
          </div>

          {/* BENEFITS */}
          <div
            className="
              mt-8 grid grid-cols-3 gap-2
              border-t border-[#DED8CA] pt-6
              sm:mt-10 sm:gap-4
              lg:mt-12 lg:gap-5
            "
          >
            <HeroBenefit
              icon={<Leaf size={19} />}
              title="100% Fresh"
              description="Quality ingredients"
            />

            <HeroBenefit
              icon={<Heart size={19} />}
              title="Nutritious"
              description="Balanced meals"
            />

            <HeroBenefit
              icon={<Truck size={19} />}
              title="Fast Delivery"
              description="Fresh at your door"
            />
          </div>
        </div>

        {/* RIGHT SIDE: RESPONSIVE IMAGE SLIDER */}
        <div
          className="
            relative mx-auto w-full min-w-0
            md:ml-auto md:mr-0
          "
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute -inset-2
              rounded-[28px] bg-[#E5EEDB]
              sm:-inset-3 sm:rounded-[36px]
              lg:-inset-4 lg:rounded-[42px]
            "
          />

          {/* Image frame */}
          <div
         
className="
  group relative isolate
  aspect-[4/3] w-full overflow-hidden
  rounded-[22px] bg-[#E5EEDB]
  shadow-[0_22px_55px_rgba(23,77,50,0.16)]
  ring-1 ring-black/5
  sm:rounded-[30px]
  md:aspect-[4/3] md:rounded-[32px]
  lg:aspect-[5/4] lg:rounded-[38px]
"

          >
            <Link
              to={mealLink}
              aria-label={
                activeMeal
                  ? `View details for ${activeMeal.name}`
                  : "Explore healthy meals"
              }
              className="
                absolute inset-0 block overflow-hidden
                focus-visible:outline-2
                focus-visible:outline-[#174D32]
              "
            >
              {/* Previous image */}
              {outgoingMeal && (
                <img
                  key={outgoingMeal._id || outgoingMeal.id}
                  src={outgoingMeal.image || fallbackImage}
                  alt=""
                  aria-hidden="true"
                  className={`
                    ${imageClasses}
                    z-10
                    ${
                      fadeStarted
                        ? "scale-[1.04] opacity-0"
                        : "scale-100 opacity-100"
                    }
                  `}
                />
              )}

              {/* Active image */}
              <img
                key={mealId || "fallback"}
                src={activeMeal?.image || fallbackImage}
                alt={activeMeal?.name || "Fresh healthy salad"}
                fetchPriority="high"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackImage;
                }}
                className={`
                  ${imageClasses}
                  z-0
                  ${
                    isTransitioning
                      ? fadeStarted
                        ? "scale-100 opacity-100"
                        : "scale-[1.04] opacity-0"
                      : "scale-100 opacity-100"
                  }
                  group-hover:scale-[1.035]
                `}
              />

              {/* Readability overlay */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0 z-[11]
                  bg-gradient-to-t
                  from-[#10291D]/55 via-transparent to-[#10291D]/10
                "
              />
            </Link>

            {/* Previous / Next controls */}
            {meals.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous meal"
                  className="
                    absolute left-3 top-1/2 z-20
                    flex h-10 w-10 -translate-y-1/2
                    items-center justify-center rounded-full
                    border border-white/60 bg-white/90
                    text-[#174D32] shadow-lg backdrop-blur-sm
                    transition duration-300
                    hover:scale-110 hover:bg-white
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-[#174D32]
                    sm:left-4 sm:h-12 sm:w-12
                  "
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next meal"
                  className="
                    absolute right-3 top-1/2 z-20
                    flex h-10 w-10 -translate-y-1/2
                    items-center justify-center rounded-full
                    border border-white/60 bg-white/90
                    text-[#174D32] shadow-lg backdrop-blur-sm
                    transition duration-300
                    hover:scale-110 hover:bg-white
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-[#174D32]
                    sm:right-4 sm:h-12 sm:w-12
                  "
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            {/* Featured meal card */}
            <Link
              to={mealLink}
              className="
                absolute bottom-4 left-3 z-20
                flex max-w-[calc(100%-24px)]
                items-center gap-3 rounded-2xl
                border border-white/60 bg-[#FCFAF4]/95
                px-3 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.16)]
                backdrop-blur-md transition duration-300
                hover:-translate-y-1
                sm:bottom-5 sm:left-5 sm:gap-3.5 sm:px-4
                lg:bottom-6 lg:left-6
              "
            >
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center
                  justify-center rounded-full bg-[#E5EEDB]
                  text-[#174D32] sm:h-11 sm:w-11
                "
              >
                <Leaf size={20} />
              </div>

              <div className="min-w-0">
                <p className="truncate font-serif text-sm font-bold text-[#183126] sm:text-base">
                  {activeMeal?.name || "Eat Good, Feel Good"}
                </p>

                <p className="mt-0.5 text-[10px] text-[#66736B] sm:text-xs">
                  Discover your next favourite meal
                </p>
              </div>

              <ArrowRight
                size={16}
                className="ml-1 shrink-0 text-[#174D32]"
              />
            </Link>

            {/* Slide indicators inside image */}
            {meals.length > 1 && (
              <div
                className="
                  absolute bottom-5 right-3 z-20
                  flex max-w-[42%] items-center gap-1.5
                  rounded-full border border-white/20
                  bg-black/25 px-2.5 py-2 backdrop-blur-sm
                  sm:bottom-6 sm:right-5 sm:gap-2
                  lg:bottom-7 lg:right-6
                "
                aria-label="Choose featured meal"
              >
                {meals.map((meal, index) => (
                  <button
                    key={meal._id || meal.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Show ${meal.name}`}
                    aria-current={
                      currentIndex === index ? "true" : undefined
                    }
                    className={`
                      h-1.5 rounded-full
                      transition-all duration-300
                      motion-reduce:transition-none
                      ${
                        currentIndex === index
                          ? "w-6 bg-white sm:w-8"
                          : "w-1.5 bg-white/60 hover:bg-white"
                      }
                    `}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBenefit({ icon, title, description }) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center sm:flex-row sm:items-center sm:gap-2.5 sm:text-left lg:gap-3">
      <div
        className="
          flex h-9 w-9 shrink-0 items-center justify-center
          rounded-full bg-[#E5EEDB] text-[#174D32]
          sm:h-10 sm:w-10
        "
      >
        {icon}
      </div>

      <div className="mt-2 min-w-0 sm:mt-0">
        <p className="text-[10px] font-bold leading-4 text-[#183126] sm:text-xs">
          {title}
        </p>

        <p className="mt-1 text-[9px] leading-4 text-[#66736B] sm:text-[10px] lg:text-[11px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Hero;
