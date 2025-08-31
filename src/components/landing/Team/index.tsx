"use client";
import React from "react";
import teamData from "./teamData";
import TeamMemberCard from "./TeamMember";
import SectionHeader from "../Common/SectionHeader";

const Team = () => {
  return (
    <>
      {/* <!-- ===== Team Start ===== --> */}
      <section id="team" className="py-20 lg:py-25 xl:py-30">
        <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "OUR TEAM",
              subtitle: "Meet the StreamPay Team",
              description: `Meet the passionate team behind StreamPay. We're a group of fintech veterans, 
              engineers, and financial experts dedicated to revolutionizing how people access their earnings.`,
            }}
          />
          {/* <!-- Section Title End --> */}

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-4 xl:mt-20 xl:gap-12.5">
            {/* <!-- Team Members --> */}
            {teamData.map((member, key) => (
              <TeamMemberCard member={member} key={key} />
            ))}
            {/* <!-- Team Members End --> */}
          </div>
        </div>
      </section>
      {/* <!-- ===== Team End ===== --> */}
    </>
  );
};

export default Team;
