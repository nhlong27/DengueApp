import React from 'react'
import hospital from '/assets/backgrounds/hospital.png';
import iot from '/assets/backgrounds/iot.png';
import mosquito from '/assets/backgrounds/background_mobile.png';

const Features = () => {
  return (
    <section class="z-10 mt-16 md:-mt-20 rounded-md bg-white pb-10 shadow-lg  lg:pt-[80px] lg:pb-20 px-4">
      <div class="container mx-auto">
        <div class="-mx-4 flex flex-wrap justify-center">
          <div class="w-full px-4">
            <div class="mx-auto mb-[60px] flex max-w-[700px] flex-col items-center justify-center text-center lg:mb-20">
              <span class="text-primary mb-2 block text-lg font-semibold">Our goals</span>
              <h2 class="text-dark mb-4 max-w-[600px] text-3xl font-bold sm:text-4xl md:text-[30px]">
                An IoT-based monitoring application for tackling the dengue fever outbreak
              </h2>
              <p class="text-body-color text-base">
                The use of IoT sensors will enable the application to collect data on the
                health of patients with dengue fever. Data will be transmitted wirelessly
                to healthcare providers, who can use it to monitor the health of patients
                in real time.
              </p>
            </div>
          </div>
        </div>
        <div class="-mx-4 flex flex-wrap">
          <div class="w-full px-4 md:w-1/2 lg:w-1/3">
            <div class="mx-auto mb-10 max-w-[370px]">
              <div class="mb-8 overflow-hidden rounded">
                <img
                  src={hospital}
                  alt="image"
                  class="w-full"
                />
              </div>
              <div>
                <span class="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-lg font-semibold leading-loose text-pink-500">
                  Reason 1
                </span>
                <h3>
                  <a
                    href="javascript:void(0)"
                    class="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"
                  >
                    Overcrowded facilities
                  </a>
                </h3>
                <p class="text-body-color text-base">
                  Shortages of medical workers during outbreaks of diseases like dengue
                  fever
                </p>
              </div>
            </div>
          </div>
          <div class="w-full px-4 md:w-1/2 lg:w-1/3">
            <div class="mx-auto mb-10 max-w-[370px]">
              <div class="mb-8 overflow-hidden rounded">
                <img
                  src={mosquito}
                  alt="image"
                  class="w-full"
                />
              </div>
              <div>
                <span class="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-lg font-semibold leading-loose text-pink-500">
                  Reason 2
                </span>
                <h3>
                  <a
                    href="javascript:void(0)"
                    class="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"
                  >
                    The rise of dengue 
                  </a>
                </h3>
                <p class="text-body-color text-base">
                  Due to rainy seasons and inefficient traditional methods of monitoring patients' conditions
                </p>
              </div>
            </div>
          </div>
          <div class="w-full px-4 md:w-1/2 lg:w-1/3">
            <div class="mx-auto mb-10 max-w-[370px]">
              <div class="mb-8 overflow-hidden rounded">
                <img
                  src={iot}
                  alt="image"
                  class="w-full"
                />
              </div>
              <div>
                <span class="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-lg font-semibold leading-loose text-pink-500">
                  Reason 3
                </span>
                <h3>
                  <a
                    href="javascript:void(0)"
                    class="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"
                  >
                    Advancements in IoT technology
                  </a>
                </h3>
                <p class="text-body-color text-base">
                  Better IoMT (Internet of Medical Things) technology is being used more and more today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features