import React from "react";

const OutStorySection = () => {
  return (
    <div className="mb-5">
     
        <div className="container bg-cardBg py-10 rounded-xl">
          {/* Heading */}
          <h2 className="text-4xl font-bold mb-8 font-heading text-center">
            Our <span style={{ color: "#00FF62" }}>Story</span>
          </h2>

          {/* Story Content */}
          <div className="space-y-6 text-gray-400 text-base leading-relaxed">
            <p>
              Founded in 2018 by former professional football titans and tech
              visionaries, Analytics CVs is the first dedicated platform built
              on a simple observation: the modern game demands data-driven
              insights. Players, coaches, and clubs need comprehensive
              performance analytics to stay ahead of the curve and unlock their
              true potential.
            </p>

            <p>
              What started as a basic tracking tool has evolved into a
              comprehensive ecosystem connecting players, scouts, coaches, and
              clubs. From junior development programs to elite professional
              leagues, our platform enables data-driven decisions and empowers
              every stakeholder to perform at their peak. We&apos;ve helped
              thousands of players showcase their abilities to the world and
              connected scouts with top talent they wouldn&apos;t have found
              otherwise.
            </p>

            <p>
              Today, we&apos;re proud to lead the industry in transforming how
              talent is discovered, developed, and deployed. We identify talent
              and accelerate careers. We&apos;re proud to have played a role in
              launching the careers of hundreds of professional players and
              scouts worldwide.
            </p>
          </div>
        </div>
     
    </div>
  );
};

export default OutStorySection;
