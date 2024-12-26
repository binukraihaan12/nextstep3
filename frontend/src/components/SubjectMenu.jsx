import React from "react";
import { Link } from "react-router-dom";
import { RiBook2Fill } from "@remixicon/react";

const subjects = [
  { name: "Biology", color: "bg-blue-200", iconColor: "bg-blue-400" },
  { name: "Mathematics", color: "bg-teal-200", iconColor: "bg-teal-400" },
  { name: "Physics", color: "bg-purple-200", iconColor: "bg-purple-400" },
  { name: "Chemistry", color: "bg-orange-200", iconColor: "bg-orange-400" },
  { name: "English", color: "bg-sky-200", iconColor: "bg-sky-400" },
  { name: "Music", color: "bg-amber-200", iconColor: "bg-amber-400" },
  { name: "Computer Science", color: "bg-red-200", iconColor: "bg-red-400" },
  { name: "Economics", color: "bg-gray-200", iconColor: "bg-gray-400" },
];

const SubjectMenu = () => {
  return (
    <div className="text-center p-4 mt-5">
      <h2 className="text-orange-500 font-semibold text-sm">
        OUR POPULAR SUBJECTS
      </h2>
      <h1 className="text-3xl font-semibold mt-2 mb-10">
        Find Expert Guidance in Any Subject
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {subjects.map((subject, index) => (
          <>
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/teachers/${subject.name}`}
            >
              <div
                key={index}
                className={`flex items-center justify-start p-4 rounded-lg border hover:shadow-lg transition-all duration-300 cursor-pointer `}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${subject.iconColor} text-white mr-4`}
                >
                  <span className="font-bold">
                    <RiBook2Fill size={20} />
                  </span>
                </div>
                <span className="text-lg">{subject.name}</span>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default SubjectMenu;
