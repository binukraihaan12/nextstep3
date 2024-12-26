import React from "react";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

const Header = () => {
  return (
    // <>
    //   <div className="bg-white">
    //     <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-10">
    //       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    //         <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
    //           <div>
    //             <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
    //               Where Learners Meet, Share, and Succeed
    //             </p>
    //             {/* <img src={"/Picture1.png"} alt="" /> */}
    //             <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
    //               Connect & learn from the experts
    //             </h1>
    //             <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
    //               Grow your career fast with right mentor.
    //             </p>

    //             <a
    //               href="/login"
    //               title=""
    //               className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
    //               role="button"
    //             >
    //               Join for free
    //               <svg
    //                 className="w-6 h-6 ml-8 -mr-2"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   stroke-width="1.5"
    //                   d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
    //                 />
    //               </svg>
    //             </a>
    //           </div>

    //           <div>
    //             {/* <img className="w-full" src={assets.heroimg} alt="" /> */}
    //             <img className="" src={"/pic2.png"} />
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </>
    <div className="">
      <section className="pb-14">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <p className="text-sm font-medium tracking-wide text-blue-500 uppercase">
                Empowering Learners Every Day
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Connect. Learn. <span className="text-blue-500">Succeed</span>.
              </h1>
              <p className="mt-6 text-lg text-gray-700 sm:text-xl">
                Join with ambitious learners and expert guiders to take the
                <span className="font-bold"> NextStep</span> in your journey
                toward success.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center px-8 mb-2 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  role="button"
                >
                  Get Started for Free
                  <svg
                    className="w-6 h-6 ml-3 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
                <a
                  href="https://youtu.be/bJnDJcoeqZs?si=aSULEfOh65jKAcdR"
                  target="_blank"
                  className="inline-flex items-center justify-center px-6 py-4 text-lg font-medium text-blue-600 bg-white border border-blue-600 rounded-full shadow hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  role="button"
                >
                  View Demo
                  <MdOutlineSlowMotionVideo className="w-6 h-6 ml-3 -mr-2" />
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              {/* <div className="absolute inset-0 bg-blue-100 rounded-full -rotate-12 transform"></div> */}
              <img
                className="relative z-10 w-[40rem]"
                src={"/Hero (1).png"}
                alt="Hero Illustration"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
