import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCertificate, FaCode, FaAward } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

export default function EducationCertifications() {
  const education = [
    {
      institution: "Vellore Institute of Technology, Bhopal",
      degree: "B.Tech in Computer Science and Engineering",
      duration: "2023 – 2027",
      metric: "CGPA: 8.2",
      location: "Madhya Pradesh",
    },
    {
      institution: "Sunbeam School",
      degree: "Class XII",
      duration: "2020 – 2021",
      metric: "Percentage: 78%",
      location: "Mau, Uttar Pradesh",
    },
  ];

  const certifications = [
    {
      title: "Oracle Cloud Infrastructure (OCI) Certified Generative AI Professional",
      provider: "Oracle",
      date: "Sep 2025",
    },
    {
      title: "GenAI - Powered Data Analytics Simulation",
      provider: "TATA Forage",
      date: "July 2025",
    },
    {
      title: "Intro to Artificial Intelligence",
      provider: "Infosys Springboard",
      date: "June 2025",
    },
    {
      title: "CSS, Bootstrap, JS, and PHP Stack",
      provider: "Udemy",
      date: "April 2025",
    },
  ];

  return (
    <section
      id="education-certifications"
      className="min-h-screen w-full relative bg-black text-white py-20 px-6 overflow-hidden"
    >
      {/* Decorative Glow Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#302b63] to-[#00bf8f] opacity-20 blur-[130px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#302b63] opacity-20 blur-[130px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col gap-16">
        {/* Section Title */}
        <div className="text-center">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Education & Qualifications
          </motion.h2>
          <motion.p
            className="mt-3 text-gray-400 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Academic background, professional certifications, and problem-solving metrics.
          </motion.p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Education & DSA (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Education Card */}
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <FaGraduationCap className="text-3xl text-[#1cd8d2]" />
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-white/10 last:pb-0 pb-6"
                  >
                    <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#1cd8d2] border-2 border-black" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <h4 className="text-lg font-semibold text-white text-left">
                        {edu.institution}
                      </h4>
                      <span className="text-sm font-medium text-gray-400 shrink-0">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1 text-left">{edu.degree}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs font-semibold justify-start">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[#00bf8f]">
                        {edu.metric}
                      </span>
                      <span className="text-gray-400 font-normal">
                        {edu.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Problem Solving & DSA Stats */}
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaCode className="text-3xl text-[#00bf8f]" />
                <h3 className="text-2xl font-bold text-white">Problem Solving</h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 text-left">
                Active competitive programmer and DSA practitioner. Solved algorithmic problems in Java, focusing on complexity optimization, data structure design, and algorithmic problem-solving.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Stats */}
                <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-4xl font-extrabold text-[#00bf8f]">150+</span>
                  <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase mt-1">
                    DSA Problems Solved
                  </span>
                  <span className="text-[10px] text-gray-500 mt-0.5">Java / OOP Focus</span>
                </div>

                {/* Profiles */}
                <div className="flex flex-col gap-3 justify-center">
                  <a
                    href="https://leetcode.com/u/yadavaman01/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 hover:border-[#1cd8d2] transition-all"
                  >
                    <SiLeetcode className="text-2xl text-[#f89f1b]" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-white">LeetCode</h4>
                      <p className="text-[11px] text-gray-400">@yadavaman01</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
                    <SiCodeforces className="text-2xl text-[#3182ce]" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-white">Codeforces</h4>
                      <p className="text-[11px] text-gray-400">Competitive Programming</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Certifications (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <FaCertificate className="text-3xl text-[#1cd8d2]" />
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>

              <div className="flex flex-col gap-5">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all flex gap-3.5 items-start text-left"
                  >
                    <div className="p-2 rounded-lg bg-[#1cd8d2]/10 text-[#1cd8d2] shrink-0 mt-0.5">
                      <FaAward />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {cert.provider} • {cert.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
