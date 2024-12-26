import React from "react";

const Testemonial = () => {
  return (
    <>
      <div className="text-gray-600 " id="reviews">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="mb-10 space-y-4 px-6 md:px-0 text-center">
            <h2 className="text-orange-500 font-semibold text-sm">
              OUR TESTIMONTIALS
            </h2>
            <h1 className="text-3xl font-semibold text-black mt-2 mb-10">
              What Our Students Say About Us
            </h1>
          </div>
          <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
            <div className="aspect-auto p-8 border border-gray-200 rounded-3xl bg-white">
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://randomuser.me/api/portraits/men/19.jpg"
                  alt="user avatar"
                  width="400"
                  height="400"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700">
                    Sajith Perera
                  </h6>
                  <p className="text-sm text-gray-500 ">Student</p>
                </div>
              </div>
              <p className="mt-8">
                "Learning with my teacher transformed my understanding! The
                Physics concepts became clear, and I can now apply them with
                confidence. Highly recommend this platform!"
              </p>
            </div>
            <div className="aspect-auto p-8 border border-gray-200 rounded-3xl bg-white">
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="user avatar"
                  width="200"
                  height="200"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700">
                    Kavindu Lakshitha{" "}
                  </h6>
                  <p className="text-sm text-gray-500 ">Student</p>
                </div>
              </div>
              <p className="mt-8">
                "The Chemistry lessons were incredibly insightful! I appreciated
                the step-by-step explanations and support throughout my learning
                journey."
              </p>
            </div>
            <div className="aspect-auto p-8 border border-gray-200 rounded-3xl bg-white">
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://randomuser.me/api/portraits/women/18.jpg"
                  alt="user avatar"
                  width="200"
                  height="200"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700 ">
                    Tharushi Fernando{" "}
                  </h6>
                  <p className="text-sm text-gray-500 ">Student</p>
                </div>
              </div>
              <p className="mt-8">
                "My Mathematics teacher provided strategies that changed my
                approach to problem-solving. The interactive sessions made every
                lesson enjoyable and effective!"
              </p>
            </div>

            <div className="aspect-auto p-8 border border-gray-200 rounded-3xl bg-white">
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://avatar.iran.liara.run/username?username=Nimali+Perera"
                  alt="user avatar"
                  width="200"
                  height="200"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700 ">
                    Nimal Perera{" "}
                  </h6>
                  <p className="text-sm text-gray-500 ">English Teacher</p>
                </div>
              </div>
              <p className="mt-8">
                "The English course was well-structured, and the students showed
                great improvement. Seeing them become confident in their
                language skills has been truly rewarding!"
              </p>
            </div>

            <div className="aspect-auto p-8 border border-gray-200 rounded-3xl bg-white">
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://avatar.iran.liara.run/username?username=Shalika+Perera"
                  alt="user avatar"
                  width="200"
                  height="200"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700">
                    Shalika Wijesinghe{" "}
                  </h6>
                  <p className="text-sm text-gray-500">Biology Teacher</p>
                </div>
              </div>
              <p className="mt-8">
                "Guiding my students in Biology has been a fulfilling journey.
                Watching them understand complex topics and apply them in
                real-world scenarios has been inspiring!"
              </p>
            </div>

            <div className="aspect-auto p-8 border border-gray-200 rounded-3xl bg-white">
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://randomuser.me/api/portraits/men/88.jpg"
                  alt="user avatar"
                  width="400"
                  height="400"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700">
                    Priyantha de Silva{" "}
                  </h6>
                  <p className="text-sm text-gray-500 ">Mathematics Teacher</p>
                </div>
              </div>
              <p className="mt-8">
                "Teaching Mathematics has allowed me to witness my students
                develop strong problem-solving abilities. Their dedication and
                progress make every lesson a meaningful experience!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testemonial;
