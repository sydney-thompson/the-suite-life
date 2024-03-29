# The Suite Life

The Suite Life is an app built to handle the daily frustrations of living with roommates. Easily keep track of suite to-dos, including chores and transactions, and stop chasing down your suitemates for the small stuff.

# Setup

This project was developed using **React Native** and can be run using the **Expo Go** app. After installing Expo Go within the app, run ‘expo start’ to generate a QR code that will permit local/simulator run.

Firebase API keys have been stripped from the repository. To run the app, you will need to re-add the configuration file. If you have access to our firebase, you should have been provided with a file called `firebaseConfig.js`. Please insert this file into the `suite-life/app/components/firebase` folder.

# How to Use the App

Instructions for general usage

## Account Creation & Login

The Suite Life uses **Google authentication**, meaning that you can use your Google account to log in. Once you have created your account, you will be prompted to either create and name a suite or join a suite (using the 8-digit code displayed on the suitemates screen in-app). You will then be asked to accept a list of **suite rules**; these are visible to and editable by the entire suite, so that everyone agrees on a basic set of rules.

<img src="https://i.imgur.com/9PFccUE.png" height="500">
<img src="https://i.imgur.com/fp8Ps5Q.png" height="500">
<img src="https://i.imgur.com/BJ9fcQD.png" height="500">

## Home Screen

The home screen (central button) contains a list of **your chores** and **uncleared transactions** for easy access to all of your to-do tasks. These are scrollable (left/right).

<img src="https://i.imgur.com/14UzDq9.png" height="500">

## Payments Screen

The payments screen (far left) contains a list of all of your outstanding balances with suitemates (**green** if they owe you, **red** if you owe them, and **gray** if balanced). 

To view your **transaction history** with each suitemate, simply click their name. On the transaction history screen, you will be able to “**balance**” all your transactions with that suitemate, which will set your outstanding balances to 0. You can also balance individual transactions by swiping left on them.

<img src="https://i.imgur.com/LwKtMuj.png" height="500">

## Chores Screen

The chores screen contains a list of **all of the chores in the suite** (the home screen only shows *your* chores) and displays the profile pictures of each of the suitemates that are assigned to the chores. They are editable by clicking, and completable/deletable by swiping left. You can click the “Add chore +” button to add new chores; you will be able to name the chore, add details, set deadlines, and assign suitemates.

<img src="https://i.imgur.com/CKNyVJV.png" height="500">

## Suite Screen

The suite screen contains a list of **all of your suitemates** and their profile pictures. It also has a “**View Rules**” button which allows you to view and edit the suite-wide rules for everyone.

<img src="https://i.imgur.com/7ZcQvwE.png" height="500">
<img src="https://i.imgur.com/BMpXSim.png" height="500">

## Account Screen

The account screen (far right) displays your profile picture, display name, and has buttons to enable providing **feedback** and **logging out**. The profile picture is customizable and in the upper right hand corner, you can also go to **edit your account** information.

<img src="https://i.imgur.com/YOvNM49.png" height="500">
