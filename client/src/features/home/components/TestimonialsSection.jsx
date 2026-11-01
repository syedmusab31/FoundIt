import { useEffect, useState } from 'react';
import { TESTIMONIALS } from '../content';

const ROTATION_INTERVAL_MS = 5000;

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = TESTIMONIALS[activeIndex];

  useEffect(() => {
    const interval = setInterval(
      () => setActiveIndex((index) => (index + 1) % TESTIMONIALS.length),
      ROTATION_INTERVAL_MS,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="mb-16 text-center text-3xl font-light text-gray-900 lg:text-4xl">What our users say</h2>

        <figure className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm lg:p-12">
          <blockquote className="mb-8 text-xl font-light leading-relaxed text-gray-700 lg:text-2xl">
            &ldquo;{testimonial.text}&rdquo;
          </blockquote>
          <figcaption className="space-y-2">
            <div className="font-medium text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-600">{testimonial.role}</div>
          </figcaption>
        </figure>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show testimonial from ${item.name}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
