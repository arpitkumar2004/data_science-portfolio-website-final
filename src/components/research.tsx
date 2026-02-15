import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Terminal } from 'lucide-react';

const researchData = [
  {
    id: "01",
    tag: "Optimization",
    title: "Production AI for Engineering",
    description: "Deploying ML-driven optimization that cuts operational costs and accelerates process control—transforming theoretical models into revenue-generating systems at industrial scale."
  },
  {
    id: "02",
    tag: "Architecture",
    title: "Neural Systems at Scale",
    description: "Architecting Transformer and LSTM networks that handle millions of time-series data points per second—delivering sub-millisecond predictions for mission-critical forecasting."
  },
  {
    id: "03",
    tag: "Predictive Systems",
    title: "High-Stakes Prediction Engines",
    description: "Building ensemble models that reduce business risk through validated predictive accuracy—turning uncertain futures into actionable intelligence for strategic decisions."
  },
  {
    id: "04",
    tag: "Analytics",
    title: "Signal-to-Insight Pipelines",
    description: "Engineering feature extraction workflows that uncover hidden patterns in large-scale datasets—converting raw noise into competitive advantage through statistical rigor."
  },
  {
    id: "05",
    tag: "Interpretability",
    title: "Explainable AI Systems",
    description: "Shipping interpretable models that stakeholders trust and regulators approve—bridging cutting-edge theory with compliance-ready, production-grade implementations."
  },
];

const ResearchComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = researchData.length - itemsToShow;
  const nextSlide = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto ">
      {/* Header with Research Meta-data */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={16} className="text-blue-600" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
              Core Capabilities & Impact Domains
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
            Where Theory Meets Production 
          </h2>
          <p className="text-slate-500 dark:text-slate-300 mt-6 text-lg leading-relaxed font-medium">
            I shiped AI that drives measurable outcomes—fusing rigorous engineering principles with neural architectures to solve complex, revenue-critical problems at scale. Like ...
          </p>
        </div>
        
        {/* Navigation - Top Right for Desktop */}
        <div className="hidden md:flex gap-3">
          <button onClick={prevSlide} className="p-4 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-900 hover:text-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="p-4 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-900 hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative cursor-grab active:cursor-grabbing">
        <div className="overflow-visible lg:overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) nextSlide();
              if (info.offset.x > 50) prevSlide();
            }}
            animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {researchData.map((item, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-3 w-full md:w-1/2 lg:w-1/3"
              >
                <div className="group h-full bg-white dark:bg-[#161616] border border-slate-100 dark:border-white/10 rounded-2xl p-8 hover:bg-white dark:hover:bg-white/5 hover:border-blue-600 transition-all duration-500 flex flex-col shadow-sm hover:shadow-xl hover:shadow-blue-900/5 ">
                  
                  {/* Card Header: ID & Tag */}
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xl font-mono font-black text-slate-200 dark:text-slate-700 group-hover:text-blue-600/20 transition-colors">
                      {item.id}
                    </span>
                    <span className="px-3 py-1 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 group-hover:text-blue-600 group-hover:border-blue-100">
                      {item.tag}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-white/10 group-hover:border-blue-600 transition-all duration-500">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-300 leading-relaxed text-sm font-medium dark:font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-12 pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em]">
                      <span>View Methodology</span>
                      <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile/Tablet Controls */}
        <div className="flex md:hidden justify-center items-center mt-12 gap-6">
          <button onClick={prevSlide} className="p-4 rounded-full border border-slate-200 dark:border-white/10"><ChevronLeft size={20} /></button>
          <div className="flex gap-1.5">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${currentIndex === i ? "w-6 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-white/10"}`} />
            ))}
          </div>
          <button onClick={nextSlide} className="p-4 rounded-full border border-slate-200 dark:border-white/10"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
};

export default ResearchComponent;