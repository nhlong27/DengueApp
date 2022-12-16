Author: Nguyen Hoang Long _ StudentID: 185216*
Title: An IoT-based Remote Patient Monitoring System for Tackling the Dengue Fever Outbreak

# App Components & Features

## Navigate
- Sign up/ Login 
- Profile (add Avatar) 
- Logout 
- User Guide

## Core functionalities

### CRUD
+ Facilities
<!-- Devices -> access tokens + HOST to configure devices -->
+ Nurses -> Invite, Assign available (room assigned?) 
+ Patients -> Invite, Assign available (bed, device assigned?)

### Data Streaming
++ Device sending data -> Device status, Patient Telemetry in Line charts
++ Query timeseries
+ Dashboard Patient Info -> navigate to Facilities (Bed assigned - patient info) (Nurse assigned), Nurse assigned and Device assigned section

### Status & Alarm
++ Alarm threshold & status
- Sort by phases

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


# Some additional background facts:

## Vite vs Webpack
https://www.reddit.com/r/vuejs/comments/r0fbfw/eli5_why_is_vite_so_much_faster_than_webpack/
## Related questions about deployment
https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections


![Project Screenshot](assets/project-screenshot.png?raw=true)