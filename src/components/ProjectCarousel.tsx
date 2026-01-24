import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

type Props = {
  projects: any[];
  headerLeft?: React.ReactNode;
  showGrid?: boolean;
};

const ProjectCarousel: React.FC<Props> = ({ projects, headerLeft, showGrid = false }) => {
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

  const maxIndex = Math.max(0, projects.length - itemsToShow);
  const next = () => setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1));
  const prev = () => setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1));

  return (
    <section className="py-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-1 mb-6 ">
        <div className="flex-1 max-w-8xl mb-5">
          {headerLeft}
        </div>

        <div className="hidden md:flex gap-3 items-center mt-20">
          <button onClick={prev} className="p-3 rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-all">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="p-3 rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative cursor-grab active:cursor-grabbing">
        <div className="overflow-visible lg:overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) next();
              if (info.offset.x > 50) prev();
            }}
            animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            {projects.map((p, i) => (
              <div key={p.id || i} className="flex-shrink-0 px-3 w-full md:w-1/2 lg:w-1/3">
                <ProjectCard {...p} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex md:hidden justify-center items-center mt-6 gap-4">
          <button onClick={prev} className="p-3 rounded-full border border-slate-200"><ChevronLeft size={18} /></button>
          <div className="flex gap-1.5 items-center">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${currentIndex === i ? 'w-6 bg-blue-600' : 'w-1.5 bg-slate-200'}`} />
            ))}
          </div>
          <button onClick={next} className="p-3 rounded-full border border-slate-200"><ChevronRight size={18} /></button>
        </div>
      </div>

      {showGrid && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:hidden">
          {projects.map((p) => (
            <div key={p.id || p.title} className="group relative">
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectCarousel;
