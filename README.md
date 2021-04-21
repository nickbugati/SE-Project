This README details the features and utilities of the WECE Maker's Garage Manager

The WECE Maker's Garage Manager is a website which displays live information about multiple aspects of the WECE Maker's Garage.
These features are:

- The current capacity of the garage
- The current occupancy of the garage
- Which officer is currently managing the garage
- The open hours of the garage
- Information of what the garage is used for
- The location on campus of the garage
- Announcements made by WECE Officers

There are 4 tabs on the website:

- Home
- Location
- About
- Admin Management

All pages are accessible to anyone expect the Admin Management Page

- The Home page will list all the live information regarding the garage such as occupancy, announcements, officer in the garage, and open hours
- The Location page will show the location of the Maker's Garage on campus
- The About page will list information regarding the uses of the WECE Maker's Garage
- The Admin Management page is where Officers will make announcements and changes to information being displayed on the Home page

The Admin Management page requires a log-in to an admin account to access the page, so only Officers with permission can make changes to the website

Technical Details
-----------------

We used MongoDB to store Officer's information to a cloud database.
We used a seperate database associated with Auth0 to store log-in credentials.

