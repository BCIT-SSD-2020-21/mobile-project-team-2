#### Mobile Project 2021: Team 2

<div align="center">

## :chart_with_upwards_trend::money_with_wings::gem: Mobile Stock Market App :gem::money_with_wings::chart_with_downwards_trend:

##### Rachel, Thelma, Vlad, Chris, Jianming

</div>


## Build Instructions

#### 1. Clone the project on your local machine: 
```
git clone https://github.com/BCIT-SSD-2020-21/mobile-project-team-2.git
```

#### 2. Navigate to the root and add a .env file, containing:     
```
API_KEY=c1j225748v6t2bkel640
BASE_URL=https://finnhub.io/api/v1`
```

#### 3. Install node_modules: 
```
npm start 
```
#### 4. Run on Android or iOS via Expo: 
```
expo start -c 
```


## Overview
In the groups assigned by your instructor, create a mobile application with as many of the features outlined below as possible. You are free to choose whether your group will create your app with Swift, Kotlin, React-Native, or Flutter…but your team must all agree with the decision. Any conflict with making this decision will default to your instructor’s pick of technology at the end of Day 1 (most likely React-Native).

The overarching goal of this project will be to improve our communication and collaboration skills within a team development environment. We will want to ensure that each team member is investing their time and effort to provide optimal progress for the team/project as a whole. For example, there is a reduced benefit to individual(s) focus on enhancing a back end while the UI is still not able to fully expose the required features that already exist in that back end. Conversely, there is decreased benefit enhancing/building a UI when the back end is unable to support all of the “must-have” features.

## App Description
Each team must build a mobile mock trading app that allows users to “Buy” and “Sell” stocks within a fake “Portfolio”. There are a number of online services available to monitor a company’s fundamentals and the technical indicators for a given stock so we will not invest in adding these features at this time.

## Essential Features
A minimal implementation of each milestone feature must exist before any team member can move on to tasks relating to the next milestone. A review must be conducted by the instructor before the team is approved to advance to the next milestone.

### Milestone 1
- ✅ Authentication (Register, Login, Logout)
- ✅ Consume a Stock Price API (like finnhub.io and/or alphavantage.co)
- ✅ expo install firebase
- ✅ Search and display the current stock price for a given symbol
- User Interface
- ✅ Register/Login Screen
- ✅ Search/Quote Screen
- ✅ Navigation link to Log Out

[Figma Prototye](https://www.figma.com/file/RSOoEmLT3sZSQatMWqtzGz/DiamondHands?node-id=0%3A1)

### Milestone 2
- ✅ Create and consume a user “portfolio” API (single currency)
- ✅ Create a user’s “Cash” (each user to start with $50,000)
- ✅ Perform a “market buy”
- ✅ Create a record for {user, symbol, quotePrice, numShares}
- ✅ Update Cash by subtracting quotePrice x numShares
- ✅ Perform a “market sell” (same as a buy but numShares should be negative and thus Cash should increase)
- ✅ User Interface
- ✅ Buy/Sell Links on the Search/Quote Screen
- ✅ Buy/Sell Screen
### Milestone 3
- ✅ Display “Portfolio Positions” (each position is the sum of the numShares for a given user and symbol, the average price per share, the current price per share, and the profit/loss which is the difference between the average price multiplied by shares held and current price multiplied by shares held).
- ✅ Display “Portfolio Value” = Cash plus the sums of each position currentPrice multiplied by shares held)
- User Interface
- ✅ Portfolio Screen (Display Cash, List of Positions…with Buy/Sell Links, and Portfolio Value)
- ✅ Navigation links to view Portfolio or Search/Quote Screen
### Milestone 4
- Add “Stock Watchlist”
- User Interface
    - ✅Add an icon by stock symbols on the Search/Quote Screen to add/remove from watchlist.
    - ✅Display the watched symbols on the Search/Quote Screen when not displaying a search result.
    - ✅Link to search result screen for a stock when user clicks on a symbol in the Portfolio Screen or the Watchlist.
### Milestone 5
- Add performance Charts (price over time) Line chart on the
- User Interface
    - Line chart on Portfolio screen to display Portfolio Value over time (Week, Month, 3-Month, 6-Month, 12-Month, All Time)
    - Line chart on Search/Quote Screen for search result
## Version Control
Please ensure that a current build is hosted on github and the main branch is the current “deployment ready” version of your app. Each team will need to have a Github Project with an automated Kanban template connected to your main app repo.

### Task Management
Meet as a group each workday (15 minutes max, called a “standup”) to discuss progress/blockers that each team member is having. At this time, you can also add any relevant documentation within the related GitHub issue(s).

- Every member must have at least one issue “in-progress” at all times.
- All commits must be connected to an assigned issue that is in-progress.
- All daily work and commits must be done on branches other than main.
- When a feature or stand-alone part of a feature is complete it must be reviewed by another developer within a pull request. Once the PR is approved, the code can be merged into the main branch, the issue closed, and the branch deleted.
- If any member is going to miss a standup, they are expected to post their update within Slack prior to the meeting.
### README File
Links to all project resources should be kept up to date in your repo README file, this should include any steps for new stakeholders to be able to clone your repo and run it locally at any time.

## Points to Remember
### Authentication
Please use one of the authentication systems that we have covered in class (Identity, Firebase, Cognito, etc.)

### Stock Data
Each team will need to use an API to pull stock data into your app. While there are numerous free and paid options, I recommend https://www.alphavantage.co/ or https://finnhub.io/. This project will be a prototype, so you are not expected to use any paid services.

You can allow all stocks to be in a single currency, you are not required to implement any currency conversion between stocks on multiple exchanges (default to USD for NYSE/NASDAQ or CDN if you choose to only list TSX…no need to do all). You do not need to implement any actual purchase or sales of stocks, this is meant to be a “mock”/gamified trading app.

You do not need to handle more complex orders such as limit, stop limit etc. You only need to mock market orders.

### User Data
Each team will need to have persistent data storage for your user portfolio data. Please create a remote database along with an API with all appropriate endpoints exposed to your app.

### UI/UX
Please ensure that the user interface effectively implements the app features in visually pleasing and user-friendly manner.
