import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/content';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-light via-primary to-primary relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-light/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display text-white mb-6">Ce qu'ils en disent</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-light/20 rounded-2xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-full border border-white/10 transform transition-all duration-300 group-hover:-translate-y-2">
                <Quote className="w-10 h-10 text-accent mb-6 opacity-50" />
                
                <blockquote className="text-white/90 mb-6 leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                
                <div className="mt-6">
                  <div className="w-12 h-0.5 bg-accent/30 mb-4"></div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                    <p className="text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};