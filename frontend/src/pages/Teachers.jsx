import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const subjects = [
  "All",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
  "Economics",
  "English",
  "Computer Science",
  "Music",
];

const Teachers = () => {
  const { subject } = useParams();
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

  const navigate = useNavigate();
  const { teachers } = useContext(AppContext);

  // Filter teachers based on the selected subject
  useEffect(() => {
    if (subject) {
      setFilteredTeachers(teachers.filter((tec) => tec.subject === subject));
    } else {
      setFilteredTeachers(teachers);
    }
  }, [teachers, subject]);

  const filterOptions = useMemo(
    () =>
      subjects.map((subj) => (
        <p
          key={subj}
          className={`w-[94vw] sm:w-56 pl-3 pr-16 border pt-3 pb-3 sm:p-2 border-orange-200 rounded transition-all cursor-pointer ${
            subject === subj || (!subject && subj === "All")
              ? "bg-yellow-100 text-black"
              : ""
          }`}
          onClick={() => {
            navigate(subj === "All" ? "/teachers" : `/teachers/${subj}`);
            setShowFilters(false); // Close the filters when a subject is selected
          }}
          style={{ marginBottom: "0.5rem" }}
          aria-label={`Filter by ${subj}`}
        >
          {subj}
        </p>
      )),
    [subject, navigate]
  );

  return (
    <div>
      <p className="text-gray-600">
        Find the best teachers tailored to your needs.
      </p>
      <button
        className="sm:hidden bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filters Section */}
        <div
          className={`flex flex-col gap-4 text-base text-gray-600 transition-all ${
            showFilters ? "block" : "hidden"
          } sm:block`}
        >
          {filterOptions}
        </div>

        {/* Teacher Cards Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((item, index) => (
              <div
                key={item._id || index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  className="bg-blue-50 w-full h-56 object-cover"
                  src={item.image}
                  alt={`${item.name}`}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-lg text-gray-900 font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.subject}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No teachers available for this subject.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
