'use client';

import { motion } from 'framer-motion';

const profileImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDy4ekOCQHCos8sxjOodCgUxYr1vS5MyYpPteCKuUQei2vwSzkwTMra-CHAVAwD6faJoo9goWr7CQemyuFvu9bMCh_sq8tsugvL7rbhdsIlct3PY447SMmONx6YBYxsSpSr0vTy2yCxTHsyktq8E0edhHR2b4anwPcZe5GxgfvBpfSiQfKaa-MIhlPsotISflwN7BtRXbrkxuL8ggaOlY9u1rleuz7O026_RnhbfJXa4gC0H6m4Dky32o2JM9_SNuI95QDT_whVZRQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBjWclt3YGy8Uwm-mG9cPwuO16U50XyEdjTUkI4y4SOglLnoz7CDiNaFQwo_UUkO_3OtWK6qw5jMzIWWrjG8eAr19JFuypOp0BoOosgYQbPofT5ZkWFHsflx9-ODtiMT-E6qE_M0sJvZSn1mjb7ovXy-cdyUOJ76o_JLnOXJyuwoeuhSqaNQ1jffrTqUwFnedcKPT6iEAibw54ZeW_lhWH2LJAJnl_ofT6NTqfRq9ti__Srt8NyzcJ7_X4lrfin8e_s5SrgCjQz12w',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuACHwBXtmatdlPAGQCZpukxabtM88W_qGqo2sJunqtTj0nkn63dTdhPfypeFg02casQzXHVLtnBvtsCk540xLaguATAfS9JDAVZ_NbWLu4kTM6b8VUntk0ag4Oz2AjTEnK8dEn0S-iBIRZcg_CoDDiWQJOTwxrpvoPWJy4uDtH4bnK9gyuspk9jdosiYa_GBCyU7SN5JnmlIaDy4nXicjxYUgHdeebAZnPoDr-mnLzECkFaBmZv5NNPRVLfUCR1fXIsKbfjJafLcFM',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-8-x1Clf0Xjjy8CVqEvWR9_VmpN3L0RuPF2mZupiZ8YqzlBZjNSyH2AP-T3jTrDRt-0tiPjhucCj_OHhx7wrBAka3Sj_tbGjrs4iFMRRVQjQY9nhtbbuxFb1jEjtsuIHG_bVLI73yjVZ3qi9sTjoCdlNgcLnnEfjRYo19s-o38qnWOZqw5DMsKOCG5zw__b46Jy24tl8JfNsfKoyPsHbPtFSwhCgiDbBVQv3hc8tio-Ql6rl0M_xh458ITeNV2HaR5w3wp31O960',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBmxYayuUdhKaXapdPAcZlyKy7PIxXMUhczm4PyVIk9zFhfURPXDVv5lcIZwh1tH0_DJd9ewksLl4aRml-nJKR4sHF99mj4kuUWCL4UshJ4eIkcKN7VZk-1AhbYnqPnXmskem8FHOPGJRwc0s4mTgCThV36zBPQ28RMwu6oMLIDrWMBJ86c7jl5RqEUQQmEaucYSmpY0x_eUlKdiR_Bcs6_8ZALk_TveHWmDxI0udeld6EKcX-Ibs3gZII5PfnqLqTb9Fvtiq5voyQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDg1YtEbl9fsjDr4GkP06QRpkeMCm1o_43506wuMASmEPP_4vMiAxvWcJiZjExtBH9hhMFWR5W9wJup_Uubr6WvCKgMZkYY-sgo_jf5e8oWv9WpziaGZP2QFAivhw_na33oobzARN7gvGOK-XzupPvYdtxsejyEbVR00GYl4h9Ibenv_BflDFB1jqVs_oFTE5UCDK3mOqgtrV4vrvdNQuSoBbKejZyGlcLChJDfJQAvu8rgj-4peylzArNhS1SCqKZPJkwH8O78ANo',
];

export default function CommunitySection() {
  return (
    <div className="px-4 md:px-10 lg:px-20 flex justify-center py-10 md:py-20 bg-card-light dark:bg-card-dark">
      <div className="flex flex-col max-w-5xl flex-1 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="tracking-tight text-3xl font-bold md:text-4xl text-text-light dark:text-text-dark">
            Join a Growing Community
          </h2>
          <p className="text-subtext-light dark:text-subtext-dark text-lg max-w-3xl mx-auto">
            See who's already on board and ready to simplify their journey with Lunaflight.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center w-full">
          <div className="flex -space-x-4">
            {profileImages.map((image, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ zIndex: 10, scale: 1.1 }}
                alt={`Profile photo ${index + 1}`}
                className="h-14 w-14 rounded-full border-2 border-background-light dark:border-background-dark object-cover grayscale transition-all duration-300 hover:grayscale-0"
                src={image}
              />
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: profileImages.length * 0.1 }}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-subtext-light dark:text-subtext-dark"
            >
              <span className="text-lg font-bold">1k+</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

