// Copyright (C) 2021-Present CITEC Inc. <https://citecsolutions.com/>
// All rights reserved
//
// This file is part of CITEC Inc. source code.
// This software framework contains the confidential and proprietary information
// of CITEC Inc., its affiliates, and its licensors. Your use of these
// materials is governed by the terms of the Agreement between your organisation
// and CITEC Inc., and any unauthorised use is forbidden. Except as otherwise
// stated in the Agreement, this software framework is for your internal use
// only and may only be shared outside your organisation with the prior written
// permission of CITEC Inc.
// CITEC Inc. source code can not be copied and/or distributed without the express
// permission of CITEC Inc.
import Swal from 'sweetalert2'
import { commonsConfig } from './commons-config'

type NamesPopup =
   | 'alfaAlert'
   | 'unrealizedAlert'
   | 'harvestingAlert'
   | 'avgMarketCapAlert'
   | 'betaAlert'
   | 'cagrAlert'
   | 'cagrAlert'
   | 'dividendYieldAlert'
   | 'factorsAlert'
   | 'priceEarningAlert'
   | 'pricePerBookAlert'
   | 'rsquareAlert'
   | 'sectorCompositionAlert'
   | 'segmentMatrixAlert'
   | 'trackingDifferenceAlert'
   | 'trackingErrorAlert'
   | 'cagrAlert'
   | 'rsquareAlert'

const avgMarketCapAlert = `<div class="align-left">            
<b>Market capitalization</b> is the total market value of a company's outstanding 
shares of stock. It's calculated by multiplying the total number of a company's 
outstanding shares by the current market price of one share.
</div>`

const unrealizedAlert = `<div class="align-left">
<b>Unrealized Capital Gains</b> are the <u>Capital Gains / losses</u>  currently 
outstanding in the portfolio and that haven't been yet sold / realized yet. 
This gains are not taxed until the position is sold.
</div>`

const harvestingAlert = `<div class="align-left">
<b>Tax-loss harvesting</b> consist in selling the positions in your portfolio with outstanding 
capital losses to offset realized capital gains on previous trades. Harvest Opportunity is the 
sum of the unreliazed losses currently outstanding in your portfolio.
</div>`

const priceEarningAlert = `<div class="align-left">                        
<b>Price per earnings</b> measures how expensive a stock is relative to its earnings 
(market price/earnings). Stocks with high price per earnings are known as growth 
stocks (earnings are expected to grow) and stocks with low price per earnings are known 
as value stocks.
</div>`

const segmentMatrixAlert = `<div class="align-left">                                    
The <b>segment matrix</b> measures two dimensions:
<br/><br/>
<u>Company’s size</u> (small, medium, large) based on market capitalization
<br/><br/>
<u>Company’s price vs. earnings</u> (value—low price-per-earnings, mixed, or 
growth—high price-per-earnings).
</div>`

const dividendYieldAlert = `<div class="align-left">                        
A <b>dividend yield</b> ratio is a company’s dividends, paid to investors, over the market 
capitalization. Investors are expected to receive that percentage of their investment’s value 
in dividends. Companies with high-dividend yields can be a good option for investors who need 
cash (i.e., retired people), while stocks with lower dividend yields are a good option for 
investors who are still in an accumulation phase, since they will avoid paying taxes on those 
dividends.
</div>`

const pricePerBookAlert = `<div class="align-left">                                    
<b>Price-to-book value (P/B)</b> is the ratio of the company's value (market capitalization) 
over its equity book value. The book value is defined as the difference between the book 
value of assets and the book value of liabilities as expressed in the company’s balance 
sheet in the 10K.
</div>`

const betaAlert = `<div class="align-left">                                    
<b>Beta</b> measures a stock's volatility compared to the overall market. A stock 
that swings more than the market over time has a beta above 1.0. If it swings less 
than the market, it has a beta below one.
</div>`

const alfaAlert = `<div class="align-left">                                    
<b>Alpha</b> measures the portfolio's ability to beat the market. An investment’s 
excess return relative to a benchmark index’s return is called the investment’s alpha. 
Alpha can be positive or negative and is the result of active investing.
</div>`

const sectorCompositionAlert = `<div class="align-left">                        
A stock market sector is a group of stocks that have a lot in common with each other, usually 
because they are in similar industries. There are 11 different stock market sectors, according 
to the most commonly used classification system: the Global Industry Classification 
Standard (GICS).
<br/> <br/>
 We categorize stocks into sectors to make it easy to compare companies that 
 have similar business models. When investing, you can choose from stocks within the 
 sectors that interest you. Sectors also make it easier to compare which stocks are 
 making the most money. This helps you make decisions about what your next investments 
 will be.
 <br/><br/>
 <b>Energy</b>: The energy sector covers companies that do business in the oil and natural 
 gas industry. It includes oil and gas exploration and production companies, as well as 
 producers of other consumable fuels like coal and ethanol. The energy sector also includes 
 the related businesses that provide equipment, materials, and services to oil and gas 
 producers. Oddly enough, though, it doesn't include many renewable energy companies, which 
 instead are considered utilities.
 <br/>
 The largest U.S. stocks in the energy sector are ExxonMobil (NYSE:XOM) and Chevron (NYSE:CVX).
 <br/><br/>
 <b>Materials</b>:The materials sector includes companies that provide various goods for use 
 in manufacturing and other applications. You'll find makers of chemicals, construction 
 materials, and containers and packaging within the materials sector, along with mining stocks
 and companies specializing in making paper and forest products.
 <br/><br/>
 Well-known materials stocks include paint maker Sherwin-Williams (NYSE:SHW) and 
 chemicals manufacturer DuPont (NYSE:DD).
 <br/><br/>
 <b>Industrial</b>:The industrial sector encompasses a wide range of different businesses 
 that generally involve the use of heavy equipment. Transportation stocks such as airlines, 
 railroads, and logistics companies are found within the industrials sector, as are companies 
 in the aerospace, defense, construction, and engineering industries. Companies making 
 building products, electrical equipment, and machinery also fall into this sector, as do 
 many conglomerates.
 <br/><br/>
 Boeing (NYSE:BA) and Union Pacific (NYSE:UNP) are among the largest U.S. industrials stocks.
 <br/><br/>
 <b>Utilities</b>:The utilities sector encompasses just about every different type of 
 utility company you can think of. Within the sector, you'll find utilities specializing in 
 making electrical power available to residential and commercial customers, as well as 
 specialists in natural gas transmission and distribution. Other utilities are responsible 
 for delivering water to customers. Some utility companies engage in more than one of these 
 different subspecialties. In addition, independent producers of power and renewable 
 electricity also land in the utilities sector, even though they don't exactly resemble 
 the traditional regulated utility in an era of deregulation.
 <br/><br/>
 Utilities tend to be regional in scope, so you might have heard of Duke Energy (NYSE:DUK) 
 in the Southeast U.S., Consolidated Edison (NYSE:ED) in the Northeast, and American Electric 
 Power (NASDAQ:AEP) across much of the Ohio Valley and the Southern Plains states.
 <br/><br/>
 <b>Industrials</b>:The industrial sector encompasses a wide range of different businesses 
 that generally involve the use of heavy equipment. Transportation stocks such as airlines, 
 railroads, and logistics companies are found within the industrials sector, as are companies 
 in the aerospace, defense, construction, and engineering industries. Companies making building 
 products, electrical equipment, and machinery also fall into this sector, as do many 
 conglomerates.
 <br/><br/>
 Boeing (NYSE:BA) and Union Pacific (NYSE:UNP) are among the largest U.S. industrials stocks.
 <br/><br/>
 <b>Healthcare</b>:The healthcare sector has two primary components. One component includes 
 companies that develop pharmaceuticals and treatments based on biotechnology, as well as the 
 analytical tools and supplies needed for the clinical trials that test those treatments. 
 The other encompasses healthcare equipment and services, including surgical supplies, 
 medical diagnostic tools, and health insurance.
 <br/><br/>
 UnitedHealth Group (NYSE:UNH) and Johnson & Johnson (NYSE:JNJ) are the two stocks at 
 the top of the healthcare sector.
 <br/><br/>
 <b>Financials</b>:The financial sector includes businesses that are primarily related to 
 handling money. Banks are a key industry group within the sector, but you'll also find 
 insurance companies, brokerage houses, consumer finance providers, and mortgage-related 
 real estate investment trusts among financials.
 <br/><br/>
 Warren Buffett's Berkshire Hathaway (NYSE:BRK-A) (NYSE:BRK-B) and financial giant 
 JPMorgan Chase (NYSE:JPM) are among the best-known stocks in the financial sector.
 <br/><br/>
 <b>Consumer discretionary</b>:The consumer discretionary sector covers goods and services for which 
 consumer demand depends upon consumer financial status. For example, if you make $25,000 
 per year, you probably buy a different car than someone who makes $25 million per year. 
 The sector includes companies that sell higher-priced items like automobiles and luxury 
 goods, as well as leisure products. You'll find both brick-and-mortar and e-commerce-based 
 retail companies in this category, along with hotel and restaurant stocks.
 <br/><br/>
 Amazon.com (NASDAQ:AMZN) and McDonald's (NYSE:MCD) are among the biggest stocks in the sector.
 <br/><br/>
 <b>Consumer staples</b>:The consumer staples sector includes goods and services that consumers need, 
 regardless of their current financial condition. The category includes companies in the food, 
 beverage, and tobacco industries, as well as household and personal care products. You'll 
 also find retail companies that specialize in selling staples, such as supermarkets, in 
 this group.
 <br/><br/>
 Coca-Cola (NYSE:KO) and Procter & Gamble (NYSE:PG) are two of the most valuable consumer 
 staples stocks in the U.S. market.
 <br/><br/>
 <b>Information technology</b>:The information technology sector covers companies involved 
 in the different categories of technological innovation. Some companies in information 
 technology focus on creating software or providing services related to implementing 
 technological solutions, while others are more involved in building the equipment, 
 components, and hardware that make tech possible. Information technology also includes 
 makers of semiconductors and the’’ equipment used to produce semiconductor chips.
 <br/><br/>
 Apple (NASDAQ:AAPL) and Microsoft (NASDAQ:MSFT) have been switching places back and forth at 
 the top of the list of large U.S. stocks in the information technology sector.
 <br/><br/>
 <b>Communication</b>:The communication services sector is the newest of the GICS 
 sectors and includes a couple of major areas that used to be part of other sectors. 
 Telecommunication services providers, including both wireless telecom networks and 
 providers of old-style landline services, make up one wing of the sector. At the other 
 end are media and entertainment companies, including both older media like television 
 and radio and interactive media via the internet and newer forms of communication.
 <br/><br/>
 Social media giant Facebook (NASDAQ:FB) and search engine pioneer Alphabet (NASDAQ:GOOGL) 
 (NASDAQ:GOOG) are among the biggest stocks in communication services.
 <br/><br/>
 <b>Real Estate</b>:The real estate sector generally includes two different types of 
 investments related to real estate. Some stocks in the sector are responsible for 
 developing new real estate projects and then managing them by obtaining tenants for 
 various spaces within the project property. In addition, most real estate investment 
 trusts, which are special tax-favored business entities that operate in various areas 
 of the real estate industry, get counted as within the real estate sector.
 <br/><br/>
 Among the top stocks in the real estate sector, you'll find cellular communications 
 tower specialist American Tower (NYSE:AMT) and major shopping mall owner and operator 
 Simon Property Group (NYSE:SPG).
 </div>`

const trackingDifferenceAlert = `<div class="align-left">                                    
<b>Tracking difference</b> measures the difference between the portfolio’s and benchmark’s performances.
</div>`

const trackingErrorAlert = `<div class="align-left">                                    
<b>Tracking error</b> measures the standard deviation of the performance difference of the 
portfolio vs. the benchmark. Assuming a normal distribution the difference between the return of the portfolio 
and benchmark will be less than the tracking error at ~70% confidence level
</div>`

const cagrAlert = `<div class="align-left">                        
<b>CAGR</b> is the compound annual growth rate. It measures the mean annual 
growth rate of an investment over a specified period of time longer than one year. 
It is a very effective way of measuring total stock returns.
</div>`

const rsquareAlert = `<div class="align-left">                                    
<b>R-squared</b> measures the relationship between a portfolio and its benchmark index. 
It is expressed as a percentage from one to 100. R-squared is not a measure of the portfolio’s 
performance. Rather, it measures the correlation between the portfolio's returns and the benchmark's 
returns.
</div>`

const factorsAlert = `<div class="align-left">                                    
         Investing in specific <b>factors</b> may help investors reach their goals by reducing 
         portfolio volatility or improving returns. Factors are the persistent and well-documented 
         asset characteristics that have historically driven investment risk and return.
         <br/><br/>
         The most popular smart beta factors are:
         <br/><br/>
         <u>Size</u>: Investing in companies based on their market capitalization, which refers to 
         the total dollar market value of a company’s outstanding stock shares. You calculate this 
         number by multiplying the total number of a company’s outstanding shares by the current 
         market price of one share.
         <br/>
         <u>Dividend</u>: Investing in companies mainly based on the dividend yield ratio 
         (dividends paid to investors over the company’s market capitalization).
         <br/>
         <u>Style (value vs. growth)</u>: Investing in companies mainly based on the price per 
         earnings. It is important to know that earnings can be measured in different ways, 
         such as expected future earnings vs. current earnings.
         <br/>
         <u>Volatility</u>: Investing in companies based on stocks’ standard deviation or the variance 
         between stocks’ daily returns. Volatility is a proxy for risk—the higher the volatility, 
         the higher the risk. Stable companies with predictable returns tend to have less volatile 
         prices.
         <br/>
         <u>Quality</u>: Investing in companies based on their financial health, which can be measured
         by combining different leverage ratios.
         <br/>
         <u>Momentum</u>: Measures the price change rate over a period of time to help investors 
         determine a trend's strength. Stocks that tend to move with the strength of momentum are 
         called momentum stocks.
         </div>`

export const renderPopup = (name: NamesPopup) => {
   let html
   switch (name) {
      case 'avgMarketCapAlert':
         html = avgMarketCapAlert
         break
      case 'unrealizedAlert':
         html = unrealizedAlert
         break
      case 'harvestingAlert':
         html = harvestingAlert
         break
      case 'priceEarningAlert':
         html = priceEarningAlert
         break
      case 'dividendYieldAlert':
         html = dividendYieldAlert
         break
      case 'pricePerBookAlert':
         html = pricePerBookAlert
         break
      case 'betaAlert':
         html = betaAlert
         break
      case 'alfaAlert':
         html = alfaAlert
         break
      case 'sectorCompositionAlert':
         html = sectorCompositionAlert
         break
      case 'trackingDifferenceAlert':
         html = trackingDifferenceAlert
         break
      case 'trackingErrorAlert':
         html = trackingErrorAlert
         break
      case 'cagrAlert':
         html = cagrAlert
         break
      case 'segmentMatrixAlert':
         html = segmentMatrixAlert
         break

      case 'rsquareAlert':
         html = rsquareAlert
         break
      case 'factorsAlert':
         html = factorsAlert
         break

      default:
         html = ''
         break
   }

   Swal.fire({
      html,
      ...commonsConfig,
   })
}
