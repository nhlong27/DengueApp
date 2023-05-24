<!-- Improved compatibility of back to top link: See: https://github.com/nhlong27/dengueapp/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/nhlong27/dengueapp">
    <img src="public/assets/logos/logo_better.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">DENGUIDE</h3>

  <p align="center">
    An IoT-based monitoring application for tackling the dengue fever outbreak
    <br />
    Author: Nguyen Hoang Long 
    <br />
    <a href="https://dengueapp.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/nhlong27/dengueapp/issues">Report Bug</a>
    ·
    <a href="https://github.com/nhlong27/dengueapp/issues">Request Feature</a>
  </p>
</div>

## Live Demo
Official website: <a href="https://dengueapp.vercel.app/">https://dengueapp.vercel.app/</a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About The Project</a>
      <ul>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#duration">Duration</a></li>
        <li><a href="#challenges">Challenges</a></li>
        <li><a href="#solutions">Solutions</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting_started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <!-- <li><a href="#contact">Contact</a></li> -->
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
<a id='about'></a>
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://dengueapp.vercel.app/)

This application was developed with the use of several IoT sensors and wireless communication technologies. The use of IoT sensors will enable the application to collect data on the health of patients with dengue fever, including their temperature, pulse, and blood pressure. Data will be transmitted wirelessly to healthcare providers, who can use it to monitor the health of patients in real time.

### Contributors
Special thanks to Do Nguyen Dat - who contributed to the architecture design process and management of the IoT devices 

<br/>
Problems to address:
<ul>
  <li>Shortages of medical workers during outbreaks of diseases like dengue fever
  </li>
  <li>Inefficient traditional methods of monitoring patients' conditions
  </li>
</ul>
Provided solutions:
<ul>
  <li>Provide a monitoring with built in alarm system. Data is collected from IoT wearables
  </li>
  <li>Include a patient management system
  </li>
</ul>


#
<a id='screenshot'></a>
## Screenshots
<details>
  <summary>Toggle Show/Hide</summary>
  
  <!-- <h1>Media page</h1>
  <img src='./screenshots/mediaPage.png' name="mediaPage-screenshot">
  <p align="right"><a href="#screenshot">back to section</a></p> -->
</details>

<a id='duration'></a>
## Duration

Around 2 months - Nov 2022 to Jan 2023 

## User stories  
<!-- <b>Note</b>: media = movie | TV shows -->
<ul>
  <li>User should be able to sign up as either patient, doctor or nuse</li>
  <li>User should be able to edit their profile information such as:<i>Username</i>, <i>Email</i>, <i>Password</i></li>
  <li>User as doctor and nurses should be able to have their own protected routes to sections unavailable to patients</li>
  <li>User as doctor and nurses should be able to access the chatroom and messages</li>
  <li>User as doctor should be able to add and remove new devices, rooms and beds</li>
  <li>User as patients should be able to see their own real-time telemetry data and statuses</li>
</ul>

<!-- 

### Guide
#### **Basic: Landing page, Auth, Dashboard**

- Home page: smoothscroll
- Sign up page: explain why only doctor, show mail validation 
_ Log in page: show logging in with existing doctor account 
- Account page: show avatar uploading, explain update personal info
_ Dashboard/Home: explain each section: dashboard, nurses, facilities, devices

#### **CRUD**
_ Device page: show device creation
_ Facility page: show room & bed creation
- Patient page: show patient registering & bed, device assignment
- Patient Detail page: explain update patient and assigning bed/device

#### **Monitoring: Data collection, Categorization, Alarms** 

- Device page: show device stream (virtual/real), explain receiving/paused
- Patient Detail page: show real-time line charts, show time series history charts
- Patient page: explain status, show categories
 
#### **Interaction: Messages, Scheduling** 

- Nurse page: show nurse registering & room assignment
- Message page: show messaging

#### **Alternatives**

- Nurse View/ Dashboard: show notifications from messages

- Patient View/ Dashboard: show telemetry data stream and line graphs

 -->


<a id='challenges'></a>
<h2>Challenges</h2>

<ul>
  <li>Use 100% Typescript with frontend and backend</li>
  <li>Pick a suitable API</li>
  <li>Pick state management library for client side (between Redux, Zustand, Jotai or React Context, + React Query)</li>
  <li>Pick a UI routing options</li>
  <li>Implement auth</li>
  <li>Pick a suitable database paradigm</li>
  <li>Create unit tests</li>
  <li>Deploy frontend and backend on seperate machines</li>
</ul>

<a id='solutions'></a>
<h2>Solutions</h2>

<h3>API Source</h3>
...

### Solution Stack

Here are all major frameworks/libraries used to bootstrap this project
* [![React][React-badge]][React-url]
* [![Vite][Vite-badge]][Vite-url]
* [![TailwindCSS][TailwindCSS-badge]][TailwindCSS-url]
* [![NodeJS][NodeJS-badge]][NodeJS-url]
* [![Mantine][Mantine-badge]][Mantine-url]
* [![MUI][MUI-badge]][MUI-url]
* [![Jotai][Jotai-badge]][Jotai-url]
* [![Supabase][Supabase-badge]][Supabase-url]
* [![Chartjs][Chartjs-badge]][Chartjs-url]
<br/> 
<br/> 
<b>Note</b>: necessary libraries may have been left out
* React-Query with Axios
* Mongoose
* React Hook Form
* React Router v6
* React Auto-Animated
* React Toastify
* React Infinite Scroll Component
* React Lazy Load Image Component
* React Router Dom

### Images & Icons
* React Icons
* Unsplash

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Installation

_Below is how you can install and set up your app._

1. Default hosts are Thingsboard.cloud and Supabase. Create your own accounts
2. Clone the repo
   ```sh
   git clone https://github.com/nhlong27/dengueapp.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Replace with your local environment variables: VITE_USERNAME, VITE_PASSWORD, VITE_SUPABASE_URL, VITE_SUPABASE_ANON, VITE_DEVICE_PROFILE
   ```js
   const VITE_HOST = 'thingsboard.cloud';
   const VITE_USERNAME = 'your_thingsboard_username';
   const VITE_PASSWORD = 'your_thingsboard_password'; 
   const VITE_DEVICE_PROFILE = 'your_thingsboard_device_profile_id'; 
   const VITE_SUPABASE_URL = 'your_supabase_host'; 
   const VITE_SUPABASE_ANON = 'your_supabase_anon_key'; 
   
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

### Default Assets
_Doctors (firstName lastName - email): 
<ul>
  <!-- <li>Long Nguyen - nhlong2706@gmail.com *</li> -->
</ul>

_Nurses (firstName lastName - email):
<ul>
  <!-- <li>Ms X - long.nguyen2706@hcmut.edu.vn *</li> -->
  <li>Ms Y - MsY@mail.com</li>
  <li>Ms Z - MsZ@mail.com</li>
</ul>
  
_Patients (firstName lastName - email): 
<ul>
  <!-- <li>MrE demo - iamfallers@gmail.com * </li> -->
  <li>MrA febrile - MrA_febrile@mail.com</li>
  <li>MrB critical - MrB_critical@mail.com</li>
  <li>MsC recovery - MsC_recovery@mail.com</li>
  <li>MrD normal - MrD_normal@mail.com</li>
</ul>

_Rooms: 
<ul>
  <!-- <li>A1-201 *</li> -->
  <li>A1_101</li>
</ul>
  
_Beds: 
<ul>
  <!-- <li>A1_201.1 *</li> -->
  <li>A1_101.1</li>
  <li>A1_101.2</li>
  <li>A1_101.3</li>
  <li>A1_101.4</li>
</ul>

_Devices (label - token <MultiSensor>):
<ul>
  <!-- <li>Device_MrE_demo - [your token: E6v3eim55SWRndoHW8n5] *</li> -->
  <li>Device_MrA_febrile - aFebrileToken</li>
  <li>Device_MrB_critical - bCriticalToken</li>
  <li>Device_MsC_recovery - cRecoveryToken</li>
  <li>Device_MrD_normal - dNormalToken</li>
</ul>



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See the [open issues](https://github.com/nhlong27/dengueapp/issues) for a full list of proposed features (and known issues).


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

<!-- Distributed under the MIT License. See `LICENSE.txt` for more information. -->
To be added

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

This space is for resources I found helpful and would like to give credit to.

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

* [Vercel supports websockets](https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections)
* [Hospital Facility Code Convention](https://hptoancau.com/en/hs-code-medical-equipment-vietnam/)
* [Code for Dengue Virus, ICD-10, A90]()
* [Why choose Vite over Webpack?](https://www.reddit.com/r/vuejs/comments/r0fbfw/eli5_why_is_vite_so_much_faster_than_webpack/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/nhlong27/dengueapp.svg?style=for-the-badge
[contributors-url]: https://github.com/nhlong27/dengueapp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nhlong27/dengueapp.svg?style=for-the-badge
[forks-url]: https://github.com/nhlong27/dengueapp/network/members
[stars-shield]: https://img.shields.io/github/stars/nhlong27/dengueapp.svg?style=for-the-badge
[stars-url]: https://github.com/nhlong27/dengueapp/stargazers
[issues-shield]: https://img.shields.io/github/issues/nhlong27/dengueapp.svg?style=for-the-badge
[issues-url]: https://github.com/nhlong27/dengueapp/issues
[license-shield]: https://img.shields.io/github/license/nhlong27/dengueapp.svg?style=for-the-badge
[license-url]: https://github.com/nhlong27/dengueapp/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/long-nguyen-95517b250/

<!-- Screenshots -->
[product-screenshot]: assets/img/readme/homepage.png

<!-- Frameworks/libraries -->
[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite-badge]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TailwindCSS-badge]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[MUI-badge]: https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
[Chartjs-badge]: https://img.shields.io/badge/-Chart.js-pink?style=for-the-badge
[Chartjs-url]: https://www.chartjs.org/
[Jotai-badge]: https://img.shields.io/badge/-Jotai-white?style=for-the-badge
[Jotai-url]: https://jotai.org/
[Mantine-badge]: https://img.shields.io/badge/-Mantine-blue?style=for-the-badge
[Mantine-url]: https://mantine.dev/pages/getting-started/
[NodeJS-badge]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[Supabase-badge]: https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
[Supabase-url]: https://supabase.com/