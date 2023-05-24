import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section class="bg-primary relative z-10 py-[120px]">
  <div class="container mx-auto">
    <div class="-mx-4 flex">
      <div class="w-full px-4">
        <div class="mx-auto max-w-[400px] text-center">
          <h2
            class="mb-2 text-[50px] font-bold leading-none text-pink-50 sm:text-[80px] md:text-[100px]"
          >
            404
          </h2>
          <h4 class="mb-3 text-[22px] font-semibold leading-tight text-pink-50">
            Oops! That page can’t be found
          </h4>
          <p class="mb-8 text-lg text-pink-50">
            The page you are looking for it maybe deleted
          </p>
          <Link
            to="/"
            class="hover:text-primary inline-block rounded-lg border border-pink-50 px-8 py-3 text-center text-base font-semibold text-pink-50 transition hover:bg-pink-50"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div
    class="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14"
  >
    <div
      class="h-full w-1/3 "
    ></div>
    <div class="flex h-full w-1/3">
      <div
        class="h-full w-1/2 "
      ></div>
      <div
        class="h-full w-1/2 "
      ></div>
    </div>
    <div
      class="h-full w-1/3 "
    ></div>
  </div>
</section>
  )
}

export default ErrorPage