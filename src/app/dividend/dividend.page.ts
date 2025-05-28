import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-dividend',
  templateUrl: './dividend.page.html',
  styleUrls: ['./dividend.page.scss'],
})
export class DividendPage implements OnInit {
  sortDirection = 'desc';
  divYear: String = "2024";
  stocks: any = [];
  tableHeaders: any = [
    { title: 'No.', property: 'NO' },
    { title: 'Company', property: '' },
    // { title: 'Sector', property: '' },
    { title: 'Current Price', property: 'CURRENT_PRICE' },
    { title: '52H', property: 'FW_H' },
    { title: '52L', property: 'FW_L' },
    { title: '200 DA', property: '' },
    { title: '150 DA', property: '' },
    { title: '50 DA', property: '' },
    { title: '30 DA', property: '' },
    { title: 'Market Cap', property: 'MARKET_CAP' },
    { title: 'PE', property: 'PE_RATIO' },
    { title: 'Book Value', property: 'BOOK_VALUE' },
    { title: 'PB', property: 'PB_RATIO' },
    { title: 'Year', property: '' },
    { title: 'Sum Amount', property: 'SUM_DIV_PRICE' },
    { title: 'Avg. Price', property: 'AVG_SHARE_PRICE' },
    { title: 'Div %', property: 'DIV_PERCENTAGE' },
    { title: 'Curr Div %', property: 'CURR_DIV_PERCENTAGE' },
    { title: 'Div Growth', property: 'YEARLY_DIV_PER_GROWTH' },
    { title: 'No. of Divs', property: 'DIV_COUNT' },
    { title: 'Div Months', property: '' },
    { title: 'Note', property: '' }
  ];

  stocksApi: any = [
    // Agricultural: Pesticides & Agrochemicals
    // { "no": 1, "fundamental": "DP04", "type": "bse", "history_price": "507717", "shareholding": "1774.0", "revenue_type": "S", "on_watch": true, "note": "Manufactures of herbicides, insecticides, fungicides, 11 R&D labs" },
    // { "no": 0, "fundamental": "NAL", "type": "bse", "history_price": "544100", "shareholding": "74102.0", "revenue_type": "S", "on_watch": true, "note": "Soil health management, crop nutrition and crop protection products, Newly Listed" },
    // { "no": 2, "fundamental": "BAS", "type": "bse", "history_price": "500042", "shareholding": "59.0", "revenue_type": "S", "on_watch": true, "note": "Agricultural Solutions, Materials, Industrial solutions, Surface Technologies, Nutrition & Care and Chemicals" },

    // Agricultural: Aquaculture
    // { "no": 0, "fundamental": "VAF01", "type": "bse", "history_price": "530215", "shareholding": "4919.0", "revenue_type": "S", "on_watch": true, "note": "Operates aquaculture farms, Creating infrastructure" },

    // Agricultural: Fertilizer
    // { "no": "0", "fundamental": "PHOSP54212", "type": "bse", "history_price": "542123", "shareholding": "13550.0", "revenue_type": "C", "on_watch": true, "note": "Phosphate Fertilizer manufacturer in Eastern India" },
    // { "no": "1", "fundamental": "AA13", "type": "nse", "history_price": "ARIES", "shareholding": "12476.0", "revenue_type": "C", "on_watch": true, "note": "134 brands, 21 organically certified productsm, Micronutrients, Water Soluble NPK, Organic and Bio Products" },
    // { "no": "2", "fundamental": "GSF", "type": "nse", "history_price": "GSFC", "shareholding": "226.0", "revenue_type": "C", "on_watch": true, "note": "PSU, Fertilizer products (78%), Industrial products (22%), Green Hydrogen Project, 5549 investments in various listed and unlisted companies" },

    // Agricultural: Agriculture
    // { "no": "1", "fundamental": "BBT", "type": "nse", "history_price": "BBTC", "shareholding": "84.0", "revenue_type": "C", "on_watch": true, "note": "Food-Bakery & Dairy Products (96%), Investments (2%), Auto Electrical Components" },
    // { "no": "2", "fundamental": "MS27", "type": "bse", "history_price": "539275", "shareholding": "55355.0", "revenue_type": "C", "on_watch": true, "note": "Production, processing and marketing of Hybrid and GM seeds" },

    // Apparel & Accessories: Diamond & Jewellery
    //  { "no": "0", "fundamental": "MJL", "type": "nse", "history_price": "MOTISONS", "shareholding": "77893.0", "revenue_type": "S", "on_watch": true, "note": "" }, 

    // Apparel & Accessories: Watches & Accessories
    // { "no": "1", "fundamental": "KD05", "type": "nse", "history_price": "KDDL", "shareholding": "2631.0", "revenue_type": "S", "on_watch": true, "note": "Watch & Accessories(76%), Watch Components(24%), India: 79%, Switzerland: 16%" },

    // Automobile & Ancillaries: Auto Ancillary
    // { "no": "1", "fundamental": "SSW01", "type": "nse", "history_price": "SSWL", "shareholding": "1338.0", "revenue_type": "C", "on_watch": true, "note": "Leading manufacturer of automotive wheel rims for passenger vehicles, heavy commercial vehicles, tractors, OTRs, and 2W & 3W, Tata Steel has held a 6.97% stake, Nippon Steel & Sumitomo Metal Corporation holds 5.45% since 2010, offering expertise in steel quality and technological advancement", "name": "Steel Strips Wheels" },
    // { "no": "2", "fundamental": "HC06", "type": "nse", "history_price": "HINDCOMPOS", "shareholding": "253.0", "revenue_type": "C", "on_watch": true, "note": " Friction Materials in India comprising Brake Lining, Clutch Facing, Disc Brake Pad, Roll Lining, Brake Block, etc. Company is also engaged in the treasury business, Automotive, Railways, Engineering, Mining, Aerospace, Steel, Chemical, Oil Exploration etc", "name": "Hindustan Composites" },
    // { "no": "3", "fundamental": "BPI", "type": "nse", "history_price": "BANCOINDIA", "shareholding": "991.0", "revenue_type": "C", "on_watch": true, "note": "Engine cooling modules such as radiators, charged air coolers, fuel coolers, oil coolers, AC condensers, deaeration plastic tanks, metal-layered gaskets, and hybrid elastomeric molded gaskets.", "name": "Banco Products (India)" },

    // Energy: Power Generation/Distribution
    // { "no": "1", "fundamental": "NBF01", "type": "nse", "history_price": "NAVA", "shareholding": "3780.0", "revenue_type": "C", "on_watch": true, "note": "434 MW, Energy (75%), Ferro Alloys (19%), Mining (6%), Healthcare, Agri-Business" },
    // { "no": "2", "fundamental": "TPC", "type": "nse", "history_price": "TATAPOWER", "shareholding": "554.0", "revenue_type": "C", "on_watch": true, "note": "Aims to achieve 100% clean energy, Transmission & Distribution (62%), Thermal & Hydro Power Generation (24%), Renewables (13%)" },
    // { "no": "3", "fundamental": "SA13", "type": "nse", "history_price": "WAAREERTL", "shareholding": "42529.0", "revenue_type": "C", "on_watch": true, "note": "12 GW, Chikhli, Surat and Umbergaon in Gujarat" },
    // { "no": "0", "fundamental": "SEP02", "type": "nse", "history_price": "SAMPANN", "shareholding": "41535.0", "revenue_type": "C", "on_watch": true, "note": "800 KW, Non-Conventional Energy:5%, Reclaimed Rubber Division:95%" },
    // { "no": "0", "fundamental": "NGE", "type": "nse", "history_price": "NTPCGREEN", "shareholding": "94008.0", "revenue_type": "C", "on_watch": true, "note": "26,071 MW" },

    // Finance: Finance Term Lending
    { "no": "1", "fundamental": "PFC02", "type": "nse", "history_price": "PFC", "shareholding": "12068.0", "revenue_type": "C", "on_watch": true, "note": "Financial assistance to the Indian power sector" },
    // { "no": "2", "fundamental": "REC02", "type": "nse", "history_price": "RECLTD", "shareholding": "18075.0", "revenue_type": "C", "on_watch": true, "note": "Financing projects in the complete power sector" },
    // { "no": "3", "fundamental": "IRF", "type": "nse", "history_price": "IRFC", "shareholding": "12854.0", "revenue_type": "S", "on_watch": true, "note": "Acquisition / creation of assets, leased out to the Indian Railways" },

    // FMCG: Breweries Distilleries
    { "no": 1, "fundamental": "GMB", "type": "nse", "history_price": "GMBREW", "shareholding": "3240.0", "revenue_type": "S", "on_watch": true, "note": "Monopoly in country liquor Maharashtra" },
    // { "no": 2, "fundamental": "SV05", "type": "bse", "history_price": "543711", "shareholding": "72935.0", "revenue_type": "S", "on_watch": true, "note": "Country’s wine market leader, Production import and distribution, Solar Power 50%  annual energy needs" },
    // { "no": 3, "fundamental": "MC08", "type": "nse", "history_price": "UNITDSPR", "shareholding": "8036.0", "revenue_type": "S", "on_watch": true, "note": "Country’s leading and a subsidiary of global leader" },

    // Industries: Real Estate : Construction - Residential & Commercial Complexes
    // { "no": 1, "fundamental": "ARI", "type": "nse", "history_price": "ANANTRAJ", "shareholding": "1538.0", "revenue_type": "S", "on_watch": true, "note": "Diversify real estate, 6 MW Data Center, Holds 83.43 acres land in Delhi NCR for future developments." },
    // { "no": 0, "fundamental": "DBEIL", "type": "nse", "history_price": "DBEIL", "shareholding": "7553.0", "revenue_type": "S", "on_watch": true, "note": "Diversify construction, historic memorial, Punjab and Haryana contributed 80% OB:1380", },
    // { "no": 2, "fundamental": "GHF", "type": "nse", "history_price": "GANESHHOUC", "shareholding": "3446.0", "revenue_type": "S", "on_watch": true, "note": "Organized housing and construction" },
    // { "no": 3, "fundamental": "D04", "type": "nse", "history_price": "DLF", "shareholding": "6890.0", "revenue_type": "S", "on_watch": true, "note": "Cyber cities Rental Income, Power gen., hospitality" },

    // Industries: Ship Building
    { "no": 1, "fundamental": "MDS01", "type": "nse", "history_price": "MAZDOCK", "shareholding": "12963.0", "revenue_type": "S", "on_watch": true, "note": "Shipbuilding & Repair: Defence warships & submarines for Navy, cargo/passenger ships, OB: 39,872" },
    { "no": 2, "fundamental": "GRS01", "type": "nse", "history_price": "GRSE", "shareholding": "13229.0", "revenue_type": "S", "on_watch": true, "note": "Shipbuilding: Indian Navy and the Indian Coast Guard, OB: 23,592" },

    // Raw Material: Carbon Black
    // { "no": 1, "fundamental": "PCB01", "type": "nse", "history_price": "PCBL", "shareholding": "435.0", "revenue_type": "S", "on_watch": true, "note": "India's largest & world's 7th largest Carbon Black Company, Making Green Power during waste gas and produced during the manufacturing of carbon black" },


    // { "main_sector": "Software & IT Services", "sub_sector": "Software", "fundamental": "TEI", "type": "nse", "history_price": "TATAELXSI", "shareholding": "2322.0", "revenue_type": "S", "company": "Tata Elxsi", "on_watch": true },
    // { "main_sector": "Diversified ", "sub_sector": "Diversified ", "fundamental": "ITC", "type": "nse", "history_price": "ITC", "shareholding": "301.0", "revenue_type": "S", "company": "ITC", "on_watch": true },
  ];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchStockData();
  }

  fetchStockData() {
    this.stocksApi.forEach((stock: any) => {
      const priceApiUrl = `https://priceapi.moneycontrol.com/pricefeed/${stock.type}/equitycash/${stock.fundamental}`;
      const corporateActionUrl = `https://api.moneycontrol.com/mcapi/v1/stock/corporate-action?deviceType=W&scId=${stock.fundamental}&section=d&start=0&limit=25`;
      const shareholdingPatternUrl = `https://aogapi-prod.angelone.in/shareHoldingPattern?co_code=${stock.shareholding}`;

      forkJoin({
        priceData: this.http.get<any>(priceApiUrl),
        shareholdingPattern: this.http.get<any>(shareholdingPatternUrl),
        corporateActionData: this.http.get<any>(corporateActionUrl),
      }).subscribe(
        ({ priceData, corporateActionData, shareholdingPattern }) => {
          if (priceData && priceData.data) {
            const dividends = corporateActionData?.data?.dividends || [];

            // Process dividends (existing code remains the same)
            let dividendsList = [];
            if (dividends.length > 0) {
              dividendsList = dividends.map((div: any) => {
                const exDate = div.effective_date && div.effective_date !== "-" ? div.effective_date : div.announce_date;
                return {
                  "DIV_EX_DATE": exDate,
                  "DIV_AMOUNT": parseFloat(div.dividend_amount) || 0
                };
              });
            }

            // Fetch stock price on dividend dates (existing code remains the same)
            let priceRequests = [];
            if (dividendsList.length > 0) {
              priceRequests = dividendsList.map((div: any) => {
                const exDate = new Date(div.DIV_EX_DATE);
                const exDatePrevDay = (Math.floor(exDate.getTime() / 1000));

                let historyApiUrl = "";
                if (stock.history_price == "ARE" || stock.history_price == "GRMOVER") {
                  historyApiUrl = `https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol=${stock.history_price}&resolution=1D&from=${exDatePrevDay}&to=${exDatePrevDay}&countback=2&currencyCode=INR`;
                } else {
                  historyApiUrl = `https://priceapi.moneycontrol.com/techCharts/history?symbol=${stock.history_price}&resolution=1D&from=${exDatePrevDay}&to=${exDatePrevDay}`;
                }

                return this.http.get<any>(historyApiUrl).pipe(
                  map(res => {
                    const closingPrices = res?.o || [];
                    return closingPrices.length > 0 ? closingPrices[0] : null;
                  })
                );
              });
            }

            forkJoin(priceRequests.length > 0 ? priceRequests : [of(null)]).subscribe((prices: any) => {
              // Attach prices to dividend list (existing code remains the same)
              dividendsList.forEach((div: any, index: any) => {
                div["SHARE_PRICE"] = prices[index] || "N/A";
                div["DIV_PERCENTAGE"] = Number((div["SHARE_PRICE"] && div["SHARE_PRICE"] !== "N/A")
                  ? ((div["DIV_AMOUNT"] / div["SHARE_PRICE"]) * 100).toFixed(2)
                  : "N/A");
              });

              const currentPrice = priceData.data.pricecurrent && priceData.data.pricecurrent != "NT*" ? Number(priceData.data.pricecurrent).toFixed(2) : "";
              const high52 = priceData.data['52H'] && priceData.data['52H'] != "-" ? priceData.data['52H'] : "";
              const low52 = priceData.data['52L'] && priceData.data['52L'] != "-" ? priceData.data['52L'] : "";
              const percentFrom52High = high52 ? ((Number(currentPrice) - high52) / high52 * 100).toFixed(2) : "";
              const percentFrom52Low = low52 ? ((Number(currentPrice) - low52) / low52 * 100).toFixed(2) : "";

              const yearlyDividendMap: Record<string, {
                totalDiv: number,
                totalPrice: number,
                count: number,
                months: Set<string>  // store unique month names
              }> = {};

              // Group by year and accumulate
              dividendsList.forEach((div: any) => {
                const date = new Date(div.DIV_EX_DATE);
                const year = date.getFullYear().toString();
                const monthName = date.toLocaleString('default', { month: 'short' }).toUpperCase();

                if (!yearlyDividendMap[year]) {
                  yearlyDividendMap[year] = { totalDiv: 0, totalPrice: 0, count: 0, months: new Set() };
                }

                yearlyDividendMap[year].totalDiv += div.DIV_AMOUNT;
                yearlyDividendMap[year].totalPrice += div.SHARE_PRICE;
                yearlyDividendMap[year].count += 1;
                yearlyDividendMap[year].months.add(monthName);
              });

              // Convert to final format with growth calc
              const years = Object.keys(yearlyDividendMap).sort((a, b) => Number(b) - Number(a)); // descending order
              let prevAvgDiv = 0;

              const yearlyDividends = years.map(year => {
                const { totalDiv, totalPrice, count, months } = yearlyDividendMap[year];
                const avgDiv = totalDiv / count;
                const avgPrice = totalPrice / count;
                const divPercentage = ((totalDiv / avgPrice) * 100).toFixed(2);
                const growth = prevAvgDiv ? (((avgDiv - prevAvgDiv) / prevAvgDiv) * 100).toFixed(2) : "0";
                prevAvgDiv = avgDiv;

                return {
                  YEAR: year,
                  SUM_DIV_PRICE: totalDiv.toFixed(2),
                  DIV_PERCENTAGE: divPercentage,
                  CURR_DIV_PERCENTAGE: ((totalDiv / Number(currentPrice)) * 100).toFixed(2),
                  AVG_SHARE_PRICE: avgPrice.toFixed(2),
                  AVG_DIV_PRICE: avgDiv.toFixed(2),
                  DIV_COUNT: count,
                  YEARLY_DIV_PER_GROWTH: growth,
                  MONTHS: Array.from(months).sort((a, b) =>
                    new Date(`${a} 1, 2000`).getMonth() - new Date(`${b} 1, 2000`).getMonth()
                  ).join(" ")
                };
              });

              this.stocks.push({
                "YM": stock.revenue_type,
                "NSE": priceData.data.NSEID,
                "COMPANY_NAME": priceData.data.SC_FULLNM,
                "MAIN_SECTOR": priceData?.data?.main_sector,
                "SUB_SECTOR": priceData?.data?.newSubsector,
                "CURRENT_PRICE": currentPrice,
                "200_DAY_AVG": priceData?.data['200DayAvg'],
                "150_DAY_AVG": priceData?.data['150DayAvg'],
                "50_DAY_AVG": priceData?.data['50DayAvg'],
                "30_DAY_AVG": priceData?.data['30DayAvg'],
                "AVGP": priceData?.data['AVGP'],
                "52H": high52,
                "52L": low52,
                "52H_PERCENTAGE": percentFrom52High,
                "52L_PERCENTAGE": percentFrom52Low,
                "BOOK_VALUE": priceData.data.BVCONS ? Number(priceData.data.BVCONS).toFixed(2) : "",
                "MARKET_CAP": priceData.data.MKTCAP && priceData.data.MKTCAP != "-" ? Number(priceData.data.MKTCAP).toFixed(2) : "",
                "PE_RATIO": priceData.data.PE && priceData.data.PE != "-" ? Number(priceData.data.PE).toFixed(2) : "",
                "SECTOR_PE": priceData.data.IND_PE ? Number(priceData.data.IND_PE) : "",
                "PB_RATIO": priceData.data.PB && priceData.data.PB != "-" ? Number(priceData.data.PB).toFixed(2) : "",
                "DIVIDENDS": dividendsList,
                "YEARLY_DIVIDENDS": yearlyDividends,
                "SHAREHOLDING_PATTERN": shareholdingPattern?.data,
                "NO": stock.no,
                "NOTE": stock.note,
              });

              console.log(this.stocks);
            });
          }
        }
      );
    });
  }

  formatIndianCurrency(amount: number): string {
    return amount ? new Intl.NumberFormat('en-IN').format(amount) : '0';
  }

  selectYear(year: String) {
    this.divYear = year;
  }

  sortData(header: any) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    if (header == "NO") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => Number(stock.NO)],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "CURRENT_PRICE") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => Number(stock.CURRENT_PRICE)],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "FW_H") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => Number(stock['52H_PERCENTAGE'])],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "FW_L") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => Number(stock['52L_PERCENTAGE'])],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "MARKET_CAP") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => Number(stock['MARKET_CAP'])],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "PE_RATIO") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => Number(stock['PE_RATIO'])],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "BOOK_VALUE") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => Number(stock['BOOK_VALUE'])],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "PB_RATIO") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => Number(stock['PB_RATIO'])],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "CURR_DIV_PERCENTAGE") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => {
          const yearly = stock.YEARLY_DIVIDENDS.find((y: any) => y.YEAR === this.divYear);
          return yearly ? Number(yearly.CURR_DIV_PERCENTAGE) : -Infinity; // or 0 depending on how you want to handle missing data
        }],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "SUM_DIV_PRICE") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => {
          const yearly = stock.YEARLY_DIVIDENDS.find((y: any) => y.YEAR === this.divYear);
          return yearly ? Number(yearly.SUM_DIV_PRICE) : -Infinity; // or 0 depending on how you want to handle missing data
        }],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "AVG_SHARE_PRICE") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => {
          const yearly = stock.YEARLY_DIVIDENDS.find((y: any) => y.YEAR === this.divYear);
          return yearly ? Number(yearly.AVG_SHARE_PRICE) : -Infinity; // or 0 depending on how you want to handle missing data
        }],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "DIV_PERCENTAGE") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => {
          const yearly = stock.YEARLY_DIVIDENDS.find((y: any) => y.YEAR === this.divYear);
          return yearly ? Number(yearly.DIV_PERCENTAGE) : -Infinity; // or 0 depending on how you want to handle missing data
        }],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "YEARLY_DIV_PER_GROWTH") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => {
          const yearly = stock.YEARLY_DIVIDENDS.find((y: any) => y.YEAR === this.divYear);
          return yearly ? Number(yearly.YEARLY_DIV_PER_GROWTH) : -Infinity; // or 0 depending on how you want to handle missing data
        }],
        [this.sortDirection as 'asc' | 'desc']
      );
    } else if (header == "DIV_COUNT") {
      this.stocks = _.orderBy(
        this.stocks,
        [stock => {
          const yearly = stock.YEARLY_DIVIDENDS.find((y: any) => y.YEAR === this.divYear);
          return yearly ? Number(yearly.DIV_COUNT) : -Infinity; // or 0 depending on how you want to handle missing data
        }],
        [this.sortDirection as 'asc' | 'desc']
      );
    }
  }
}