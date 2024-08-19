import React from "react";

const About = () => {
  return (
    <div className="bg-stone-800 h-heightWithoutNavbar flex flex-col items-center justify-start p-5 lg:flex-row">
      <div className="grid h-full w-full place-content-center">
        <img
          src="./aboutUs.svg"
          alt="About Us"
          className="w-[300px] sm:w-[400px] md:w-[450px] lg:w-[600px]"
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div>
          <h1 className="relative mb-3 text-2xl font-black text-white before:absolute before:top-[30px] before:h-[3px] before:w-[200px] before:bg-yellow-400">
            About Us
          </h1>
          <p className="mt-1 text-[15px] lg:mt-3 text-gray-200">
            Welcome to Notorite, your ultimate hub for effortlessly sharing and accessing educational resources. Our platform is dedicated to facilitating the exchange of study materials, creating a collaborative and enriching academic environment for students across various institutions.
          </p>
        </div>
        <div>
          <h1 className="relative mb-3 text-2xl font-black text-white before:absolute before:top-[30px] before:h-[3px] before:w-[200px] before:bg-yellow-400">
            Who We Are
          </h1>
          <p className="mt-1 text-[15px] lg:mt-3 text-gray-200">
            Notorite is more than just a platform; it's a community-driven initiative rooted in the passion for learning. Founded by a group of dedicated students, we believe education is a shared journey. Our team is made up of tech enthusiasts, educators, and creative thinkers, all united by a mission to reshape the learning experience.
          </p>
        </div>
        <div>
          <h1 className="relative mb-3 text-2xl font-black text-white before:absolute before:top-[30px] before:h-[3px] before:w-[200px] before:bg-yellow-400">
            Our Mission
          </h1>
          <p className="mt-1 text-[15px] lg:mt-3 text-gray-200">
            Our mission at Notorite is simple: to empower students by providing a centralized platform where knowledge knows no limits. We strive to remove the barriers to academic success, ensuring that valuable study materials are accessible to all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
