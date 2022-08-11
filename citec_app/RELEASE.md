# Upcoming Release 0.0.6

## What’s new

-  Added unit test cases for custom hooks use-app-redux-loader, use-delete-idea, use-fetch-api

## What’s been fixed

-  Fix error promise filter in home

## What’s been improved

# Release 0.0.6b

## What’s new

-  Create a range of number of stocks based on the cash used to create the portfolio
-  Message to logout if not has token
-  Send welcome email logic
-  Summary save button tooltip
-  Download sotck screener
-  Autocomplete in tickers input

## What’s been fixed

-  Fix summary trades kpi investment text
-  Fix broken criteria on refresh
-  Updated unit test case for use-select-universe
-  Fix styles of analyze and link account buttons

## What’s been improved

-  Summary save button tooltip
-  Update Criteria format with new figma design

# Release 0.0.6a

## What’s new

-  Review kpis from summary
-  Create a range of number of stocks based on the cash used to create the portfolio

## What’s been fixed

-  Feedback risk and return
-  Recheck 10% validation
-  Reset static_data in Home
-  Add static_data to black_list of Redux Persist
-  Fix misalignment on overview table
-  Delete text in Home in My Investments and My ideas when not exist anything
-  Add validation ticker to_include and to_exclude in universe definition
-  Idea is deleted correctly when clicking on trash icon in My ideas
-  Formated dates in US format
-  resetStaticData had been deleted in home page by mistake
-  Delete back button and move up save button in trades tab
-  Put correct values in Theoretical Investment and Real Investment in trades table
-  Deactivate exchange trades validation just checking the tickers
-  Fix problem showing up alpaca my investment in some accounts
-  Add functionality to rebalance button on my investments table
-  Save button visible even if user is not logged in Alpaca account

## What’s been improved

-  Changes in calculates of Investment
-  Format positions in portfolio analysis table

---

# Release 0.0.5

## What’s new

-  Check expiration_date of subscription in Auth0
-  Add logical to edit benchmark in pencil portfolio loader
-  Modify dates of returns grahps
-  Modify dates of returns graphs
-  Check the market/exchange int the assets to trade before execution

## What’s been fixed

-  Disable button plan Professional
-  Fix benchmark fixed
-  Fix Inconsistency with benchmarks in rebalancing with portfolio saved
-  Fix validation on 10% percentage
-  Solve my profile is inaccessible
-  Tracking error multiply 100
-  Set predetermine portfolio to alpaca portfolio as it does not have one

## What’s been improved

-  Move loadIdeaOnRedux and RemoveIdeaFromRedux to correct location
-  Refactor user validation in home
-  Test of useAppNavigate Hook
-  Change Objective, add Diversification Ration and delete Sharpe

---

# Release 0.0.5-d

## What’s new

-  Add Benchmark column in key metrics and sector composition
-  Add validation tickers
-  Download portfolio in local pc
-  Factorization folder structure
-  Fix 100% investment option
-  Fix kpis tax harvesting when select investment option
-  Live sesion overview
-  Mark sell positions in redux
-  Mark sell positions in redux
-  Integrate Google Tag Manager to set up hotjar
-  New mono-repo migration from citec_ecosystem to citec_platform
-  New mono-repo migration from citec_ecosystem to citec_platform
-  Factorization folder structure
-  Show alert when difference between Theoretical volume and expected volume is too big
-  Refactorization folder structure
-  Move savePortfolio() to other folder
-  Mark sell positions in redux
-  New routes in Stripe
-  Add features into the left bar

## What’s been fixed

-  Fix portfolio validation broken
-  Fix details in portfolio analisys
-  Fix broken overview
-  Home ui and table format issues
-  Improve my ideas download structure

## What’s been improved

---

# Release 0.0.5-c

## What’s new

-  Add tax harvesting constrains
-  Save portfolio in Portfolio Analysis
-  Logical to button Rebalance and Analysis of table Ideas in Home
-  Remove ideas
-  Replace `tracking_expected` by `te_distribution`
-  Validate sell minimum 10% of portfolio
-  Hide $CASH in trades
-  Get circular shape to logos
-  Create portfolio in investment view

## What’s been fixed

-  Load ideas in Redux
-  Tracking difference round
-  Add REIT like type allowed, like Common Stock
-  hist_w case
-  Fix format of portfolios over one million
-  Order Calls positions in Home

## What’s been improved

-  Load of ideas from backend
-  Refactor convertArray and derivatives

---

# Release 0.0.5-b

## What’s new

## What’s been fixed

-  Old design skeleton
-  Execute trades correctly when clicking on button for this
-  Change error message connection to backend
-  Fix bugs in criteria screen

## What’s been improved

---

# Release 0.0.5-a

## What’s new

-  Total trades in Summary
-  Execution multiple buy and cell with alpaca

## What’s been fixed

-  Binding Benchmark with Universe screening
-  Multiply tracking_difference by 100
-  Overview UI Factors
-  Rename engine-configurator by criteria
-  Fix sector composition chart bugs
-  Fix upload positions format

## What’s been improved

-  Tracking Error graph in Overview
-  Redirect in Trades to Home after Save portfolio

---

# Release 0.0.4

## What’s new

-  Table My ideas with real data in Home page

## What’s been fixed

-  Slice static_data is refilled when page is refreshed

## What’s been improved

---

# Release 0.0.4-g

## What’s new

## What’s been fixed

-  Fix Auth0 token null in calls
-  Fix minor formatting in backtest
-  Fix home page bottom space

## What’s been improved

-  Improve design skeleton in universe screening

---

# Release 0.0.4-f

## What’s new

-  Create user in db
-  New design of tax harvesting
-  Save portfolios in Summary
-  Screen investment for Rebalance

## What’s been fixed

-  Change call portfolio in portfolio-analysis in Summary
-  Fix button range active color in graph alpaca
-  Fix console warnings
-  Fix height scroll in trades view
-  Fix KPIs images in tax harvesting
-  Fix summary overview names as figma
-  Fix sweetalert popup text align
-  Fixed unnecessary calls in summary
-  Set color in KPIs boxes to gray
-  tracking_error and difference multiply by 100
-  Fixed unnecessary calls in summary
-  Set color in KPIs boxes to gray
-  tracking_error and difference multiply by 100
-  Remove trades.xlsx and add it to gitignore

## What’s been improved

-  Deleted unnecessary files
-  Implemented currency.js to handle implemented currency.js to handle amounts of money

# Release 0.0.4-e

## What’s new

## What’s been fixed

-  Change portfolio in portfolio-analysis in Summary
-  Fix criteria run button clickable area

## What’s been improved

---

# Release 0.0.4-d

## What’s new

## What’s been fixed

-  Fixed unnecessary calls in summary
-  Fix button range active color in graph alpaca
-  Overview sector composition sorted
-  Fix NAN in Account balance Alpaca
-  Change benchmarks, universes and sectors name
-  Fix criteria button format

## What’s been improved

---

# Release 0.0.4-c

## What’s new

-  Add simultaneously Optimization, trades and backtest
-  Alpaca History Charts
-  Alpaca my invest resume
-  Logical to Investment page
-  Integrate Alpaca with Portfolio Analysis
-  Page for recurring payments
-  Tab Backtest in Portfolio Analysis
-  Add Row ETF's in my investments for Alpaca
-  Tab Positions in Portfolio Analysis
-  Tab Overview and Risk in Summary

## What’s been fixed

-  Changed info icons color
-  Fix bigger back button in portfolio loader
-  Fix delay portfolio analysis
-  Fix left and right margin to 100px
-  Fix manually positions numbers to string
-  Fix NaN in inputs of table
-  Fix placeholder to numbers inputs on load portfolio
-  Fix portfolio analysis text and overview box height
-  Changed info icons color
-  Fix icons i information of summary
-  Upload positions boxes aligned with header
-  Fix Show options left-bar rebalance whit alpaca
-  Fix columns my invest because in merge crash
-  Fix html tags in criteria
-  Fix buttons positions in portfolio loader
-  Fix height scroll in trades view

## What’s been improved

-  Migrate new design universe screening popup

---

# Release 0.0.4-b

## What’s new

-  Alpaca Balance and buying Power view
-  Design of Investment page

## What’s been fixed

-  Add Others sector in Universe screening
-  Changed analysis portfolio message
-  Fix create new portfolio broken
-  Fix format on add positions screen
-  Fix include tickers inputs in universe definition
-  Fix call error on Trades tab
-  Fix icons i information of portfolio analysis

## What’s been improved

---

# Release 0.0.4-a

## What’s new

-  Alpaca Balance and Buying Power view
-  Design of Investment page
-  Criteria customize button

## What’s been fixed

-  Fixed popups hover colors
-  Change name Risk parity button
-  Fix Token saving in localstorage in new sessions
-  Fix Left bar adapting design to small screens, not show as cut
-  Fix Next button must be green only when selected any option.
-  Concentration chart point in X-axis set to 10
-  Fix my profile path
-  Fix logo in left bar
-  Add types and tests overview tab
-  Fix broken tax harvesting

## What’s been improved

-  Migrate new design portfolio analysis
-  Left bar fixed
-  Different hist_w parameter for the optimization depending on objective
-  New calculations for min_weight

## What’s been deprecated

---

# Release 0.0.3b

Citec app front end

## What’s new

-  Move some components and functions to customs hooks
-  New design of trades integrated
-  New design portfolio Analysis
-  New design backtest integrated
-  Download trades in excel

## What’s been fixed

-  Universe logical
-  US format in numbers
-  Fixed validation portfolio loaded on new design
-  Fixed validation benchmark and objectives are selected
-  Fixed name hook validation benchmark
-  Fixed question mark on citec logo left bar
-  Fixed title and favicon of application
-  Fixed left bar icon color
-  Fixed green top bar logo redirects home

## What’s been improved

-  Exclude from the coverage report files that should not be tested

## What’s been deprecated

-  Delete images, icons and files that not been in use

---

# Release 0.0.3a

Citec app front end

## What’s new

-  New design of home integrated
-  New design Workflow
-  Alpaca OAuth
-  Add globals mui styles on app
-  New design portfolio loader integrated

## What’s been fixed

-  Fixed setupUniverse screen
-  Fixed warnings npm run build
-  Fixed spanish error message
-  Check license did not check the \*.ts files
-  Fixed some test with low coverage
-  Fixed reload of portfolio-optimized
-  Trades in Redux are updated in real time

## What’s been improved

-  Add timeout to Axios custom hook
-  Migrate engine configurator new design

## What’s been deprecated

---

# Release 0.0.2b

Citec app front end

## What’s new

-  New design of top bar and left bar integrated
-  New logic for top bar and left bar

## What’s been fixed

-  Add / to the end of all endpoints

## What’s been improved

-  Upgrade React Router Dom to v6

## What’s been deprecated

---

# Release 0.0.2

Citec app front end

## What’s new

-  Creation of home page
-  Centralization of api calls with custom hook 'useFetchApi'
-  Add dependency sweetalert2
-  Add portfolio Optimized slice to redux
-  Add Objectives and Benchmarks to Initial State in Redux
-  Create Slice Trades in Redux
-  Add persist redux state
-  Add backend integration with trades page
-  Add Engine configurator data in Redux
-  Add file that act like a middleware between app.tsx and redux
-  Connect Portfolio Analysis with backend
-  Connect Backtest with backend
-  Tests to local APIs

## What’s been fixed

-  Fixed footer navigability
-  Add tag Latest to Docker images of Frontend
-  Fixed range call api
-  Fixed calc tax harvesting
-  Fixed slider engine configurator
-  Fixed min_weight in redux
-  Fixed show portfolio loaded in table at /portfolio-loader
-  Ranges to Factors in Universe screening
-  Fixed a lots of calls to universe/summary/
-  Change name variables and Titles "taxalpa" by "taxalpha"
-  Change Universe by default to SP500
-  Change URL of Template portfolio
-  Restore check vulnerability to High mode
-  Fix redirect to /workflow when portfolio isn't loaded
-  Fixed calls to ai/portfolio/optimization and validate resp
-  Fixed charts of back test

## What’s been improved

-  Restructuring Redux data
-  Create input in Redux called static-data with the data being initialized only once

## What’s been deprecated

---

# Release 0.0.1

Citec app front end

## What’s new

-  It uses artificial intelligence services provided by citec_engine:
   -  🏁 Portfolio optimization: Tracking benchmark, maximizes sharpe ratio, minimizes volatility, maximizes excess returns and risk parity
   -  📈 Portfolio analysis:
      -  Fundamental metrics
      -  Risk metrics

## What’s been fixed

## What’s been improved

## What’s been deprecated

---

# Release 0.0.0

Just for template purposes.

## What’s new

## What’s been fixed

## What’s been improved

## What’s been deprecated
