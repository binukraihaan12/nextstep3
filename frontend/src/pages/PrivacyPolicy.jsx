import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-sm mb-8 text-center text-gray-500">
        Effective Date: November 10, 2024 | Last Updated: November 10, 2024
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            When you use our platform, we may collect various types of
            information:
          </p>
          <p className="font-semibold mb-1">Personal Information:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              Account Information: Such as your name, email address, and phone
              number.
            </li>
            <li>
              Profile Details: For teachers, information such as qualifications
              and experience.
            </li>
            <li>
              Usage Data: Information on how you interact with our platform.
            </li>
          </ul>
          <p className="font-semibold mb-1">Non-Personal Information:</p>
          <p className="mb-4">
            We may collect non-personal information, such as device type and
            browser version, to improve our services.
          </p>
          <p className="font-semibold mb-1">
            Cookies and Tracking Technologies:
          </p>
          <p>
            We use cookies and tracking technologies to enhance your experience
            and analyze usage patterns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc ml-6">
            <li>Provide and maintain the platform.</li>
            <li>Communicate updates, announcements, and changes.</li>
            <li>Enhance and personalize your experience.</li>
            <li>Ensure security and compliance with legal requirements.</li>
            <li>Display relevant advertisements.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. How We Share Your Information
          </h2>
          <p className="mb-4">
            We do not sell your personal information. However, we may share
            information in specific cases:
          </p>
          <ul className="list-disc ml-6">
            <li>
              With service providers to support certain platform functions.
            </li>
            <li>To comply with legal obligations.</li>
            <li>With consent, as necessary for fulfilling services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            data, though no system is entirely secure. We encourage you to use
            secure passwords.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
          <p>
            We retain your information as long as needed to provide services, or
            as required by law. You may request deletion of your data at any
            time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Your Rights and Choices
          </h2>
          <p>
            Depending on your location, you may have rights regarding your data,
            including the right to access, correct, delete, or opt out of
            communications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            7. International Data Transfers
          </h2>
          <p>
            By using our platform, you consent to the transfer of your data to
            countries where we operate, in compliance with applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Children's Privacy</h2>
          <p>
            Our platform is not intended for children under 05. If we
            inadvertently collect information from a child, we will delete it
            promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            9. Updates to This Privacy Policy
          </h2>
          <p>
            We may update this policy periodically. Please review this page
            regularly for updates.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>If you have questions, please contact us at:</p>
          <ul className="list-none ml-6">
            <li>
              Email: <span className="text-gray-600">hi@nextstep.edu</span>
            </li>
            <li>
              Address:{" "}
              <span className="text-gray-600">
                No 23/8, Second Lane, Badulla
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
