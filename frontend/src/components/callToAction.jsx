import React from "react";

const CallToAction = () => {
  return (
    <>
      <div>
        <section
          className="relative z-10 overflow-hidden py-16 px-8 mt-10 bg-blue-800 mb-10"
          //   style={{
          //     backgroundColor: "rgba(75, 85, 99)", // Solid color with opacity
          //     backdropFilter: "blur(10px)", // Blur effect
          //   }}
        >
          <div className="container">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-1/2">
                <div className="text-center lg:text-left ">
                  <div className="mb-10 lg:mb-0 ">
                    <h1 className="mt-0 mb-3 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-[40px] md:leading-tight text-white ">
                      Connect with Expert Teachers Today
                    </h1>
                    <p className="w-full text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed text-white"></p>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <div className="text-center lg:text-right">
                  <a
                    className="font-semibold rounded-lg mx-auto inline-flex items-center justify-center bg-white py-4 px-9 hover:bg-opacity-90"
                    href="/teachers"
                  >
                    Find Your Tutor Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CallToAction;
