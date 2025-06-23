"use client";
import Link from "next/link";
import React from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaHeadset,
  FaTruck,
  FaUtensils,
  FaDollarSign,
  FaArrowRight,
  FaBusinessTime,
} from "react-icons/fa";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Header */}
      <motion.header
        className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href={"/"} className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
              IP
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              REVSENSE
            </h1>
          </Link>
          <nav className="hidden sm:flex items-center space-x-8">
            <Link
              href={"#features"}
              className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium"
            >
              Features
            </Link>
            <Link
              href={"#how-it-works"}
              className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium"
            >
              How It Works
            </Link>
            <Link
              href={"#testimonials"}
              className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium"
            >
              Testimonials
            </Link>
            {isSignedIn && <UserButton afterSignOutUrl="/" />}
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Transform Customer Reviews into Business Growth
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Analyze customer feedback using advanced sentiment analysis to
              identify key pain points and drive business improvement.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {isSignedIn ? (
                <Link
                  href={"/dashboard"}
                  className="px-8 py-4 bg-white text-orange-500 rounded-full hover:bg-gray-50 transition-all duration-300 text-center font-medium shadow-lg shadow-orange-200 flex items-center justify-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href={"/sign-in"}
                  className="px-8 py-4 bg-white text-orange-500 rounded-full hover:bg-gray-50 transition-all duration-300 text-center font-medium shadow-lg shadow-orange-200 flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link
                href={"#features"}
                className="px-8 py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 text-center font-medium backdrop-blur-sm border border-white/20"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Choose REVSENSE?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our advanced analytics platform helps you understand customer
              feedback and make data-driven decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Customer Satisfaction",
                desc: "Track customer satisfaction metrics and retention patterns to improve loyalty.",
                icon: <FaHeadset className="w-8 h-8" />,
                color: "from-blue-500 to-blue-600",
                href: "/customer-satisfaction",
              },
              {
                title: "Delivery Performance",
                desc: "Monitor delivery operations and optimize logistics efficiency.",
                icon: <FaTruck className="w-8 h-8" />,
                color: "from-purple-500 to-purple-600",
                href: "/delivery-performance",
              },
              {
                title: "Food Quality",
                desc: "Track food quality metrics and maintain high product standards.",
                icon: <FaUtensils className="w-8 h-8" />,
                color: "from-orange-500 to-orange-600",
                href: "/food-quality",
              },
              {
                title: "Pricing Strategy",
                desc: "Analyze pricing effectiveness and optimize discount strategies.",
                icon: <FaDollarSign className="w-8 h-8" />,
                color: "from-green-500 to-green-600",
                href: "/pricing-strategy",
              },
              {
                title: "Business Insights",
                desc: "Deep analysis of business metrics, customer feedback, and actionable insights.",
                icon: <FaBusinessTime className="w-8 h-8" />,
                color: "from-indigo-500 to-indigo-600",
                href: "/business-insights",
              },
              {
                title: "Real-time Analytics",
                desc: "Get instant insights and track improvements over time.",
                icon: <FaChartLine className="w-8 h-8" />,
                color: "from-red-500 to-red-600",
              },
              {
                title: "Custom Reports",
                desc: "Generate detailed reports tailored to your business needs.",
                icon: <FaChartBar className="w-8 h-8" />,
                color: "from-yellow-500 to-yellow-600",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg mb-4">{feature.desc}</p>
                {feature.href && (
                  <Link
                    href={feature.href}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mt-4"
                  >
                    View Analysis
                    <FaArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-orange-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Get started with our review analysis platform in minutes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Upload Reviews",
                desc: "Import your customer reviews from various sources",
                icon: "📥",
              },
              {
                step: "2",
                title: "Analysis",
                desc: "Our AI analyzes sentiment and categorizes feedback",
                icon: "🔍",
              },
              {
                step: "3",
                title: "Insights",
                desc: "Get detailed insights and recommendations",
                icon: "💡",
              },
              {
                step: "4",
                title: "Action",
                desc: "Implement improvements based on insights",
                icon: "⚡",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-200">
                    {step.step}
                  </div>
                </div>
                <div className="text-4xl mb-6 mt-4">{step.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Join businesses that have transformed their customer feedback into
              growth opportunities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Customer Success Manager",
                review:
                  "REVSENSE has revolutionized how we handle customer feedback. The sentiment analysis is incredibly accurate.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Product Manager",
                review:
                  "The categorization of reviews helps us identify specific areas for improvement quickly.",
                rating: 5,
              },
              {
                name: "Emma Davis",
                role: "Business Analyst",
                review:
                  "The actionable insights have helped us make data-driven decisions that improved customer satisfaction.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-orange-500 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex text-orange-500 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-2xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-lg italic">
                  "{testimonial.review}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Customer Reviews?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-xl">
            Start analyzing your customer feedback and turn insights into
            business growth.
          </p>
          {!isSignedIn && (
            <Link
              href={"/sign-in"}
              className="inline-block px-8 py-4 bg-white text-orange-500 rounded-full hover:bg-gray-50 transition-all duration-300 font-medium shadow-lg shadow-orange-200 flex items-center space-x-2 mx-auto"
            >
              <span>Get Started Now</span>
              <FaArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                REVSENSE
              </h3>
              <p className="text-gray-400 text-lg">
                Transform customer feedback into actionable business insights.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#features"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Support</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2025 REVSENSE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
