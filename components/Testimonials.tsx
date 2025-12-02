import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "I was skeptical at first, but the song for my wife's birthday made her cry! The lyrics were spot on and the melody was catchy.",
      author: "Michael R.",
      role: "Verified Customer",
      image: "https://picsum.photos/seed/michael/150/150",
    },
    {
      quote: "As a YouTuber, I needed intro music that wouldn't get copyright striked. MelodyCraft delivered a banger in 24 hours. Highly recommend the Pro plan!",
      author: "Sarah Jenkins",
      role: "Content Creator",
      image: "https://picsum.photos/seed/sarah/150/150",
    },
    {
      quote: "The process was so easy. I just typed a few ideas and the AI drafted a perfect concept, then the musicians brought it to life beautifully.",
      author: "David Chen",
      role: "Verified Customer",
      image: "https://picsum.photos/seed/david/150/150",
    },
  ];

  return (
    <section id="testimonials" className="py-32 bg-white border-t border-slate-200 bg-grid-pattern">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-20">
          Loved by 10,000+ Customers
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-8 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-xl text-slate-700 mb-10 leading-relaxed font-medium">"{t.quote}"</p>
              
              <div className="flex items-center gap-5">
                <img 
                  src={t.image} 
                  alt={t.author} 
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-slate-50" 
                />
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{t.author}</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};