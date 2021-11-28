# Crypto Dashboard

[demo](https://crypto-dashboard-with-api.herokuapp.com/)

Overview:

- Component #1 - xyz

User interactions:

- Tooltip explains relevant concepts on mouseover
- Text field to change comparator fiat currency

Material-UI:

- Table
- Tooltip
- Text field

Architectural pattern:

- MVVM

API:

- [Coinbase](https://developers.coinbase.com/api/v2?javascript#)
  - Payload:
  - Response
- [CoinGecko](https://www.coingecko.com/en/api/documentation)

Requirements:

- App should be able to be interacted with in at least 3 different ways by the user
- Use a specified architectural pattern (e.g. MVC, MVP, MVVM, etc.)
- Integrate with a custom backed that uses CRUD operations
- Integrate with 3rd party RESTful API
- Use 5 UI components from material-ui/@core
- Use reusable component

Accessibility considerations:

- Provide alt text on images
- TextField with an id and label creates the proper markup
- Use sufficient contrast between text and background color
- Avoid red / green colors that are difficult for colorblind individuals to disambiguate

Screenshots:

###### Base table compares top 5 cryptocurrencies by market cap

*Makes a GET request to 3rd-party API*
![base table](img/00_base_table.png)



###### Search functionality allows user to add additional cryptocurrencies from the top 100 to the table*

*Each change to the currencies selected makes a POST / DELETE request to express backend*
![search](img/01_search.png)


###### Load button adds selected cryptocurrencies to the table*

*Makes a GET request to express backend*
![load](img/02_load.png)



###### Removing a cryptocurrency from the selected list will also remove it from the table the next time the table is loaded*

*Makes a DELETE request to express backend*

![remove](img/03_remove.png)
