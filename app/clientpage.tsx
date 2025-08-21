"use client"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, Twitter, Linkedin, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"

export default function AthenaAgentLandingClient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)

  const isHeroInView = useInView(heroRef, { once: true })
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const isProblemInView = useInView(problemRef, { once: true, margin: "-100px" })
  const isDemoInView = useInView(demoRef, { once: true, margin: "-200px" })
  const isSocialInView = useInView(socialRef, { once: true, margin: "-100px" })
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" })

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Parallax transforms with different speeds
  const heroY = useTransform(smoothProgress, [0, 1], [0, -100])
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 1.1])
  const demoY = useTransform(smoothProgress, [0.2, 0.8], [100, -100])
  const servicesY = useTransform(smoothProgress, [0.4, 1], [50, -50])
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -200])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Minimal animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.6,
        }}
        className="relative z-40 px-6 py-6 backdrop-blur-md bg-black/80 border-b border-white/5"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
            <div className="text-xl font-medium tracking-tight">
              <span className="text-white">ATHENA</span>
              <span className="text-gray-400 italic font-light ml-1">Agent</span>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Services", "Blog", "About", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={item === "Blog" ? "/blog" : `#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05 + 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <Button className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2 text-sm transition-all duration-200">
              Get started for free
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Announcement Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        className="flex justify-center py-4"
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-800 cursor-pointer"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
          <span className="text-sm text-gray-300">
            AthenaAgent launches enterprise RL platform for production-ready AI agents
          </span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 py-24 overflow-hidden">
        {/* Background GIF with Parallax */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <img src="/hero-background.gif" alt="Hero Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        <motion.div style={{ y: heroY, scale: heroScale }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.h1
              variants={fadeInVariants}
              className="text-6xl lg:text-7xl font-light leading-tight tracking-tight"
            >
              Your intelligent agent.
            </motion.h1>

            <motion.p variants={fadeInVariants} className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Every AI agent, thoughtfully trained.
            </motion.p>

            <motion.div variants={fadeInVariants} className="flex items-center justify-center space-x-4 pt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-black hover:bg-gray-100 font-medium px-8 py-3 text-base">
                  Try for free
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 font-medium px-8 py-3 text-base border border-white/20 hover:border-white/40"
                  onClick={() => window.open("https://cal.com/sachdh/15min", "_blank")}
                >
                  Contact us <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <motion.section
        ref={socialRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={isSocialInView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <p className="text-sm text-gray-500 mb-8">Trusted by top teams at</p>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate={isSocialInView ? "visible" : "hidden"}
            className="flex items-center justify-center space-x-12"
          >
            {["Enterprise Co", "Tech Startup", "AI Labs", "Research Inc"].map((company, index) => (
              <motion.div
                key={company}
                variants={fadeInVariants}
                whileHover={{ opacity: 1, scale: 1.1, y: -2 }}
                className="text-gray-400 font-medium cursor-pointer opacity-40"
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Product Demo */}
      <motion.section ref={demoRef} className="py-24">
        <motion.div style={{ y: demoY }} className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={isDemoInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50 hover:border-gray-700/50 group"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center overflow-hidden"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/business_impact_grid-HnB6TlKSt81ZLAsnpkn1TYvVF74dX5.gif"
                alt="Business Impact Over Time"
                className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-700"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Story Section - Left/Right Split */}
      <section ref={storyRef} className="py-32 bg-gradient-to-b from-gray-950/30 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate={isStoryInView ? "visible" : "hidden"}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Side - Main Content */}
            <motion.div variants={fadeInVariants} className="space-y-8">
              <div className="space-y-6">
                <motion.div className="text-sm text-gray-500 font-medium tracking-wider uppercase">
                  / The Journey
                </motion.div>

                <motion.h2 className="text-4xl lg:text-5xl font-light leading-tight">
                  The AthenaAgent
                  <br />
                  Difference
                </motion.h2>

                <motion.p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                  From brittle prompting to production-ready intelligence. We transform your AI agents through proven
                  reinforcement learning techniques, ensuring reliability at scale.
                </motion.p>
              </div>

              <motion.div className="flex space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-3">
                    Start Your Journey
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 font-medium px-6 py-3 border border-white/20 hover:border-white/40"
                    onClick={() => window.open("https://cal.com/sachdh/15min", "_blank")}
                  >
                    Contact us <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side - Story Steps */}
            <motion.div variants={fadeInVariants} className="space-y-6">
              {[
                {
                  icon: "⚠️",
                  title: "Brittle Prompting",
                  description:
                    "Traditional agents fail in complex scenarios, breaking down when faced with edge cases and real-world complexity.",
                  status: "Before",
                },
                {
                  icon: "🔄",
                  title: "RL Post-Training",
                  description:
                    "Our reinforcement learning pipeline transforms your agent through reward modeling and policy optimization.",
                  status: "During",
                },
                {
                  icon: "🚀",
                  title: "Production Ready",
                  description:
                    "Reliable, scalable AI agents that learn from mistakes and perform consistently in production environments.",
                  status: "After",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group flex items-start space-x-4 p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 hover:border-white/10 hover:bg-black/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-lg">{item.icon}</span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/20">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Minimal */}
      <section ref={servicesRef} id="services" className="py-32">
        <motion.div style={{ y: servicesY }} className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-light mb-6">Our Services</h2>
            <p className="text-gray-400 text-lg">End-to-end RL post-training for enterprise AI agents</p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Main Service - RL Post-Training */}
            <motion.div
              variants={fadeInVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-gradient-to-br from-black/60 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-green-500/30 cursor-pointer md:col-span-2 lg:col-span-3"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/20"
                  >
                    <span className="text-2xl">🧠</span>
                  </motion.div>
                  <h3 className="text-3xl font-medium mb-4 group-hover:text-green-400 transition-colors duration-300">
                    RL Post-Training
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                    Complete reinforcement learning pipeline from reward modeling to policy optimization. Our end-to-end
                    solution ensures your AI agents perform reliably in production environments.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-3">Learn More</Button>
                  </motion.div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Reward Modeling", desc: "Human feedback integration" },
                    { title: "Policy Optimization", desc: "Advanced PPO algorithms" },
                    { title: "Evaluation Setup", desc: "Performance measurement" },
                    { title: "Model Merging", desc: "Advanced techniques" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 rounded-2xl p-4 group-hover:bg-white/10 transition-all duration-500"
                    >
                      <h4 className="text-sm font-medium text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Supporting Services */}
            {[
              {
                icon: "💰",
                title: "Compute Cost Estimation",
                description:
                  "Optimize cloud spending with detailed cost analysis and provider recommendations for maximum efficiency.",
                color: "blue",
              },
              {
                icon: "🗂️",
                title: "Dataset Cleaning",
                description:
                  "Curate high-quality synthetic datasets tailored for your specific RL training requirements.",
                color: "purple",
              },
              {
                icon: "📊",
                title: "Evaluation Setup",
                description: "Comprehensive performance measurement frameworks to track and validate agent behavior.",
                color: "orange",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group bg-black/40 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-${service.color}-500/30 cursor-pointer`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 bg-${service.color}-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-${service.color}-500/20`}
                >
                  <span className="text-lg">{service.icon}</span>
                </motion.div>
                <h3
                  className={`text-lg font-medium mb-3 group-hover:text-${service.color}-400 transition-colors duration-300`}
                >
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        id="about"
        className="py-32"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-light mb-16 text-center"
          >
            About Us
          </motion.h2>

          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-lg text-gray-400 leading-relaxed max-w-4xl mx-auto">
              We're AI researchers working hard to enable building world-changing AI products by securing them against
              real risks. Our goal is to accelerate progress by solving complex security challenges to enable our
              customers build ambitious products. If you are an ambitious techno-optimist, join us to shape the future
              of AI products.
            </p>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                variants={fadeInVariants}
                whileHover={{ scale: 1.05 }}
                className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20 hover:border-white/30 cursor-pointer"
              >
                <img src="https://pbs.twimg.com/profile_images/1660878487232876544/LjtlZ44B_400x400.jpg" alt="Sachin Dharashivkar" className="w-full h-full object-cover" />
              </motion.div>

              <motion.div variants={fadeInVariants} className="space-y-6">
                <div>
                  <div className="text-sm text-blue-400 font-medium tracking-wider uppercase mb-2">FOUNDER</div>
                  <h3 className="text-2xl font-medium mb-2">Sachin Dharashivkar</h3>
                  <p className="text-gray-400">Masters in Computer Science, UMass Amherst</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <p className="text-gray-300 text-sm">
                      Solving real-world problems with deep reinforcement learning agents since 2016
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <p className="text-gray-300 text-sm">
                      Built simulators and agents to execute high volume equity trades at JPMorgan Chase
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <p className="text-gray-300 text-sm">
                      Trained RL agents to play collaborative, multiplayer games at Unity Technologies
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <motion.a
                    href="https://www.linkedin.com/company/athenaagent/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="https://x.com/AthenaAgentRL"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="https://cal.com/sachdh/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label="Schedule a call"
                  >
                    <Calendar className="h-5 w-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        viewport={{ once: true }}
        id="contact"
        className="py-20 border-t border-white/5 bg-gradient-to-t from-gray-950/30 to-transparent"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <motion.div whileHover={{ scale: 1.02 }} className="text-xl font-medium tracking-tight cursor-pointer">
              <span className="text-white">ATHENA</span>
              <span className="text-gray-400 italic font-light ml-1">Agent</span>
            </motion.div>

            <div className="flex items-center space-x-6">
              {[
                { icon: Twitter, href: "https://x.com/AthenaAgentRL", label: "Twitter" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/athenaagent/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:hello@athenaagent.com", label: "Email" },
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => window.open("https://cal.com/sachdh/15min", "_blank")}
                  className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2 text-sm transition-all duration-200"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Contact us
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
