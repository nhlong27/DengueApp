import React from 'react'
import {AiOutlineGithub} from 'react-icons/ai'

const CallToAction = () => {
  return (
    <section class="py-20 lg:py-[80px]">
      <div class="container mx-auto">
        <div class="bg-primary relative z-10 overflow-hidden rounded py-12 px-8 md:p-[70px]">
          <div class="-mx-4 flex flex-wrap items-center">
            <div class="w-full px-4 lg:w-1/2">
              <span class="mb-2 text-base font-semibold text-white">
                Interested in how we built this?
              </span>
              <h2 class="mb-6 text-3xl font-bold leading-tight text-white sm:mb-8 sm:text-[38px] lg:mb-0">
                Visit our <br class="hidden xs:block" />
                Documentation
              </h2>
            </div>
            <div class="w-full px-4 lg:w-1/2">
              <div class="flex flex-wrap lg:justify-end">
                <a
                  href="assets/pdfs/report.pdf"
                  target="_blank"
                  class="hover:text-primary my-1 mr-4 flex items-center gap-2 rounded bg-white bg-opacity-[25%] py-4 px-6 text-base font-medium text-white transition hover:bg-opacity-100 hover:text-stone-900 md:px-9 lg:px-6 xl:px-9"
                >
                  Report
                </a>
                <a
                  href="https://github.com/nhlong27/dengueapp"
                  target="_blank"
                  class="my-1 flex items-center gap-2 rounded bg-blue-500 py-4 px-6 text-base font-medium text-white transition hover:bg-opacity-80 md:px-9 lg:px-6 xl:px-9"
                >
                  <AiOutlineGithub size-={50} />
                  Github
                </a>
              </div>
            </div>
          </div>
          <div>
            <span class="absolute top-0 left-0 z-[-1]">
              <svg
                width="189"
                height="162"
                viewBox="0 0 189 162"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="16"
                  cy="-16.5"
                  rx="173"
                  ry="178.5"
                  transform="rotate(180 16 -16.5)"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="-157"
                    y1="-107.754"
                    x2="98.5011"
                    y2="-106.425"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" stop-opacity="0.07" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span class="absolute bottom-0 right-0 z-[-1]">
              <svg
                width="191"
                height="208"
                viewBox="0 0 191 208"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="173"
                  cy="178.5"
                  rx="173"
                  ry="178.5"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="-3.27832e-05"
                    y1="87.2457"
                    x2="255.501"
                    y2="88.5747"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" stop-opacity="0.07" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction