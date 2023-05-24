import React from 'react'

const Contacts = () => {
  return (
    <section class="relative z-10 overflow-hidden bg-white py-20 lg:py-[120px] rounded-sm mt-8">
      <div class="container mx-auto">
        <div class="-mx-4 flex flex-wrap lg:justify-between">
          <div class="w-full px-4 lg:w-1/2 xl:w-6/12">
            <div class="mb-12 max-w-[570px] lg:mb-0">
              <span class="text-primary mb-4 block text-base font-semibold">
                Contact Us
              </span>
              <h2 class="text-dark mb-6 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                GET IN TOUCH WITH US
              </h2>
              <p class="text-body-color mb-9 text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius
                tempor incididunt ut labore et dolore magna aliqua. Ut enim adiqua minim
                veniam quis nostrud exercitation ullamco
              </p>
              <div class="mb-8 flex w-full max-w-[370px]">
                <div class="w-full">
                  <h4 class="text-dark mb-1 text-xl font-bold">Our Location</h4>
                  <p class="text-body-color text-base">
                    99 S.t Jomblo Park Pekanbaru 28292. Indonesia
                  </p>
                </div>
              </div>
              <div class="mb-8 flex w-full max-w-[370px]">
                <div class="w-full">
                  <h4 class="text-dark mb-1 text-xl font-bold">Phone Number</h4>
                  <p class="text-body-color text-base">(+62)81 414 257 9980</p>
                </div>
              </div>
              <div class="mb-8 flex w-full max-w-[370px]">
                <div class="w-full">
                  <h4 class="text-dark mb-1 text-xl font-bold">Email Address</h4>
                  <p class="text-body-color text-base">info@yourdomain.com</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div class="relative rounded-lg bg-white p-8 shadow-lg sm:p-12">
              <form>
                <div class="mb-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    class="text-body-color focus:border-primary w-full rounded border border-[f0f0f0] py-3 px-[14px] text-base outline-none focus-visible:shadow-none"
                  />
                </div>
                <div class="mb-6">
                  <input
                    type="email"
                    placeholder="Your Email"
                    class="text-body-color focus:border-primary w-full rounded border border-[f0f0f0] py-3 px-[14px] text-base outline-none focus-visible:shadow-none"
                  />
                </div>
                <div class="mb-6">
                  <input
                    type="text"
                    placeholder="Your Phone"
                    class="text-body-color focus:border-primary w-full rounded border border-[f0f0f0] py-3 px-[14px] text-base outline-none focus-visible:shadow-none"
                  />
                </div>
                <div class="mb-6">
                  <textarea
                    rows="6"
                    placeholder="Your Message"
                    class="text-body-color focus:border-primary w-full resize-none rounded border border-[f0f0f0] py-3 px-[14px] text-base outline-none focus-visible:shadow-none"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    class="bg-primary border-primary w-full rounded border p-3 text-white transition hover:bg-opacity-90"
                  >
                    Send Message
                  </button>
                </div>
              </form>
              <div>
                <span class="absolute -top-10 -right-9 z-[-1]">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts