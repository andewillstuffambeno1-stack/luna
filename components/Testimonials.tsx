'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Digital Nomad',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy4ekOCQHCos8sxjOodCgUxYr1vS5MyYpPteCKuUQei2vwSzkwTMra-CHAVAwD6faJoo9goWr7CQemyuFvu9bMCh_sq8tsugvL7rbhdsIlct3PY447SMmONx6YBYxsSpSr0vTy2yCxTHsyktq8E0edhHR2b4anwPcZe5GxgfvBpfSiQfKaa-MIhlPsotISflwN7BtRXbrkxuL8ggaOlY9u1rleuz7O026_RnhbfJXa4gC0H6m4Dky32o2JM9_SNuI95QDT_whVZRQ',
    quote: 'Lunaflight saved me 3 weeks of research time on my work visa application',
  },
  {
    name: 'James L.',
    role: 'Student Traveler',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjWclt3YGy8Uwm-mG9cPwuO16U50XyEdjTUkI4y4SOglLnoz7CDiNaFQwo_UUkO_3OtWK6qw5jMzIWWrjG8eAr19JFuypOp0BoOosgYQbPofT5ZkWFHsflx9-ODtiMT-E6qE_M0sJvZSn1mjb7ovXy-cdyUOJ76o_JLnOXJyuwoeuhSqaNQ1jffrTqUwFnedcKPT6iEAibw54ZeW_lhWH2LJAJnl_ofT6NTqfRq9ti__Srt8NyzcJ7_X4lrfin8e_s5SrgCjQz12w',
    quote: 'The document verification feature gave me peace of mind after a bad experience with an agent',
  },
  {
    name: 'Elena R.',
    role: 'Business Traveler',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACHwBXtmatdlPAGQCZpukxabtM88W_qGqo2sJunqtTj0nkn63dTdhPfypeFg02casQzXHVLtnBvtsCk540xLaguATAfS9JDAVZ_NbWLu4kTM6b8VUntk0ag4Oz2AjTEnK8dEn0S-iBIRZcg_CoDDiWQJOTwxrpvoPWJy4uDtH4bnK9gyuspk9jdosiYa_GBCyU7SN5JnmlIaDy4nXicjxYUgHdeebAZnPoDr-mnLzECkFaBmZv5NNPRVLfUCR1fXIsKbfjJafLcFM',
    quote: 'Finally an app that makes government procedures feel human and achievable',
  },
];

export default function Testimonials() {
  return (
    <div className="px-4 md:px-10 lg:px-20 flex justify-center py-10 md:py-20">
      <div className="flex flex-col max-w-5xl flex-1 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="tracking-tight text-3xl font-bold md:text-4xl text-text-light dark:text-text-dark">
            Trusted by Travel Experts Worldwide
          </h2>
          <p className="text-subtext-light dark:text-subtext-dark text-lg max-w-3xl mx-auto">
            See what early users are saying about their Lunaflight experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-col gap-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 transition-all duration-300 hover:border-primary hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-text-light dark:text-text-dark">{testimonial.name}</p>
                  <p className="text-sm text-subtext-light dark:text-subtext-dark">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-subtext-light dark:text-subtext-dark italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

