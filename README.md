Author: Nguyen Hoang Long _ StudentID: 185216*
Title: An IoT-based Remote Patient Monitoring System for Tackling the Dengue Fever Outbreak

# App Components & Features

## Navigate
+ Sign up/ Login 
+ Profile (add Avatar) Update
* Delete Auth user not possible (manually through web editor)
<!-- - Logout  -->
- User Guide

## Core functionalities

### CRUD
<!-- + Facilities -->
<!-- + Devices -> access tokens + HOST to configure devices -->
+ Nurses 
->  Invite, 
<!-- ->  Assign available (room assigned?)  -->

+ Patients 
 -> Invite,
  <!-- -> Assign available (bed, device assigned?) -->

### Data Streaming
<!-- ++ Device sending data -> Device status, Patient Telemetry in Line charts -->
++ Query timeseries
+ Dashboard Patient Info -> navigate to Facilities (Bed assigned - patient info) (Nurse assigned), Nurse assigned and Device assigned section

### Status & Alarm
<!-- ++ Alarm threshold & status -->
+ Sort by phases
<!-- -> Simple -->
-> Graphs

## Others
- Dashboard Search, Chatbox, Schedule, Notifications

# Bonus
<!-- Refresh  -->
- Keep session
- Invite (server api)
- Remaster UI/UX 
- Already existed (token, fname, lname, ...) --> Announce error
- Show and hide sensitive information
<!-- Sticky info  -->
- Local storage
- Manually Open & Close websocket
- Breadcrumbs
- subscriptions: devices & facilities
- update patient status when device stops connecting
- react route persists on refresh (sessionStorage and window clear?)


# Some additional background facts:

## Vite vs Webpack
https://www.reddit.com/r/vuejs/comments/r0fbfw/eli5_why_is_vite_so_much_faster_than_webpack/
## Related questions about deployment
https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections
## HS code
https://hptoancau.com/en/hs-code-medical-equipment-vietnam/
## ICD-10, A90



![Project Screenshot](assets/project-screenshot.png?raw=true)


# User Guide

## Basic (Auth, Doctor View, CRUD)

<!-- - Home page (whole, smoothscroll) -->
<!-- - Login page (sign up new user, mail validate, log in) _ DrLong, nhlong2706@hcmut.edu.vn  -->
<!-- - Account page (upload avatar, update username, guide through each section: dashboard, nurses, facilities, devices) -->

<!-- - CRUD (add new patient, add device, add room & bed, assign device and bed to patient) Dat Do, iamfal****@gmail.com, D_demo, accessToken:___ , R_demo, B_demo -->

## Core (Virtual Device, Real Device Stream, Patient View, Catergories, Chart, Calendar View - Queries)

- Real Device stream (Charts, Settings -> Alarm Configuration) 10s

- Categories (<existing account>, Virtual Device, script, search) nhlong****@gmail.com, 5 (none/normal, incubation, febrile, emergency, recovery)

- Queries (Calendar View)
 
## Interaction (Nurse View, Chat, Schedule)

- Real Time Chat (<existing account> create nurse, assign to room, chat, send images)

- Make schedules (assign task to nurse with patient)

- Nurse View

- Patient View