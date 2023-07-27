# Instagram Parser Tampermonkey Script

## Overview

This Tampermonkey script allows you to parse Instagram user data (followers, followings, and posts) and store it in your own database. By installing this script in your browser, you will be able to see three buttons (Followers, Followings, and Posts) when you visit someone's Instagram profile. Clicking on any of these buttons will initiate the parsing process and save the data to your specified database.

**Important Note:** Before getting started, make sure to read the instructions carefully and customize the script to work with your database. Instagram's website structure and class names may change over time, which could affect the functionality of this script. Users are responsible for updating the class names in the script if Instagram's structure changes.

## Prerequisites

To use this script, you need to have the following:

1. **Tampermonkey:** Tampermonkey is a popular userscript manager for web browsers. Ensure you have Tampermonkey installed in your browser before proceeding.

2. **Database Setup:** You should have a database set up to store the parsed Instagram data. Please make sure you have the necessary credentials and access to your database.

## Installation

To install the Instagram Parser Tampermonkey script, follow these steps:

1. Copy the contents of the `script.js` file provided in this repository.

2. Open Tampermonkey in your browser and navigate to the dashboard.

3. Click on the "Create a new script" option to open the script editor.

4. Remove any existing code in the script editor and paste the copied contents from `script.js`.

5. Save the script by pressing `Ctrl + S` or clicking the "Save" button.

## Usage

1. Open Instagram in your web browser.

2. Go to any user's profile whom you want to parse data from.

3. You should now see three buttons labeled "Followers," "Followings," and "Posts" on the user's profile page. (You won't see them if you didn't change classNames in template carefully)

4. Click on any of the buttons to start the parsing process for that specific data.

5. Before clicking any of the buttons, ensure you have replaced the placeholder URLs in the script with the URLs of your own database. Look for the following lines of code in the script:

   ```javascript
    const template = {
        // ...
        fetch: {
            fetchFollowersUrl: 'https://inst-inst.loc/api/followers',
            fetchFollowingsUrl: 'https://inst-inst.loc/api/followings',
            fetchPostsUrl: 'https://inst-inst.loc/api/profile-content',
        },
    };
   ```

   Replace `https://inst-inst.loc/api/followers`, `https://inst-inst.loc/api/followings`, and `https://inst-inst.loc/api/profile-content` with the appropriate URLs to your respective databases.

6. Additionally, make sure to identify and update the Instagram class names in the script. The lines of code responsible for finding elements on the page will look similar to:

   ```javascript
    const template = {
        // ...
        instagram: {
            instagramHeader: '.zw3Ow',
            instagramProfileClass: '.fDxYl',
            instagramUsersList: '.isgrP',
            instagramUsersNames: ' ._0imsa ._7UhW9',
            instagramUsersDescs: '.DhRcB ._7UhW9',
            instagramPostsCount: '.g47SY',
            instagramPosts: '.v1Nh3 a',
        },
    };
   ```

   If Instagram's class names change in the future, find the updated class names for these buttons and replace them accordingly.

7. Once you've updated the URLs and class names, the script should work with your database.

## Disclaimer

This script is provided as-is and may not work correctly if Instagram's website structure or class names change. Users are responsible for maintaining and updating the script to match Instagram's current structure. Use this script responsibly and in accordance with Instagram's terms of service.

---

Thank you for using the Instagram Parser Tampermonkey script! If you have any questions, issues, or improvements, feel free to open an issue or contribute to the project. Happy parsing!
