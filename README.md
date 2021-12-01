# Crypto Dashboard

[Crypto Dashboard](https://crypto-dashboard-with-api.herokuapp.com/) pulls latest cryptocurrency data to showcase price, market cap, supply, etc.  User can dynamically add additional cryptocurrencies to track in the table.

## Overview:

Controller:
- MarketDataController: fetches market data for top 100 cryptocurrencies (by market cap) from [CoinGecko](https://www.coingecko.com/en/api/documentation)'s API
- TrackedCryptoController: posts to and deletes from list of tracked cryptocurrencies on app's Express backend
- LoadTableController: fetches list of tracked cryptocurrencies from app's Express backend

Model:
- MarketDataModel: formats market data for display in PriceTable component

View:
- App: contains Header and Dashboard components
 - Header: contains icon, typography, and dark mode toggle components
 - Dashboard: contains CryptoSearch, FiatSelector, and PriceTable components
 - PriceTable: displays market data by mapping each row object to the reusable component Row


## User interactions:
- Dark mode
- Search cryptocurrencies to dynamically add to the table
- Select fiat currency
- Table header tooltip explains relevant concepts on mouseover


## Material-UI components:
- Typography
- Switch
- Autocomplete
- TextField
- Table
- Tooltip


## Architectural pattern:
- MVC

## Backend:
- Express server (GET, POST, DELETE selected cryptocurrencies)

## 3rd-party API:
- [CoinGecko](https://www.coingecko.com/en/api/documentation)


## Accessibility considerations:

- Provide alt text on image (i.e. crypto logo)
- Ids and labels create proper markup for screenreaders
- Dark and light themes provide sufficient contrast between text and background color
- Avoid red / green colors that are difficult for colorblind individuals to disambiguate

## Installation and set up:
- Using the command line, `git clone https://github.com/NicoleJaneway/crypto-dashboard.git`
- `npm install` to download required libraries
- `npm run build` to create an optimized production build
- `npm start` to deploy

## Screenshots:

#### Base table compares top 5 cryptocurrencies by market cap
*Makes a GET request to 3rd-party API*
![base table](img/00_base_table.png)



#### Search functionality allows user to add additional cryptocurrencies from the top 100 to the table
*Each change to the currencies selected makes a POST / DELETE request to Express backend*
![search](img/01_search.png)



#### Load button adds selected cryptocurrencies to the table
*Makes a GET request to Express backend*
![load](img/02_load.png)



#### Removing a cryptocurrency from the selected list will also remove it from the table the next time the table is loaded
*Makes a DELETE request to Express backend*
![remove](img/03_remove.png)
