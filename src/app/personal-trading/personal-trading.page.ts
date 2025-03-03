import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import * as _ from 'lodash';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-personal-trading',
  templateUrl: './personal-trading.page.html',
  styleUrls: ['./personal-trading.page.scss'],
})
export class PersonalTradingPage implements OnInit {
  private isAllFileProcessed = 0;

  insiderTrading: any = [];          // CF-Insider-Trading-equities
  insiderTradingFiltered: any = [];
  shareholdingPatterns: any = [];    // CF-Shareholding-Pattern-equities
  shareholdingPatternsFiltered: any = [];
  SASTReg29: any = [];               // CF-SAST- Reg29
  SASTReg29Filtered: any = [];
  finalData: any = [];
  pledgedData: any = [];             // CF-SAST-Pledged-Data
  pledgedDataFiltered: any = [];

  constructor(
    private toastController: ToastController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // const url = 'https://www.nseindia.com/api/corporates-pit?index=equities&from_date=30-08-2024&to_date=30-11-2024'; // Replace with your API endpoint
    // const headers = new HttpHeaders({
    //   'User-Agent': 'PostmanRuntime/7.42.0',
    // });

    // this.http.get<any>(url, { headers }).subscribe({
    //   next: (response) => console.log('API Response:', response),
    //   error: (error) => console.error('Error:', error),
    // });
    // this.calculateProfit();
  }

  pickFile(event: any) {
    const files: FileList = event.target.files;
    this.isAllFileProcessed = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const text = reader.result as string;
          this.convertCSVToJSON(text, file.name);

          this.isAllFileProcessed++;
          if (files.length === this.isAllFileProcessed) {
            this.showAllData();

            event.target.value = '';
          }
        };
        reader.readAsText(file);
      }
    }
  }

  convertCSVToJSON(csvText: string, fileName: string) {
    Papa.parse(csvText, {
      header: true, // Use the first row as headers
      dynamicTyping: true, // Convert numbers and booleans automatically
      skipEmptyLines: true, // Skip empty lines
      complete: (result) => {
        if (fileName.includes('CF-Insider-Trading-equities')) {
          this.insiderTrading = result.data;
        } else if (fileName.includes('CF-Shareholding-Pattern-equities')) {
          this.shareholdingPatterns = result.data;
        } else if (fileName.includes('CF-SAST- Reg29')) {
          this.SASTReg29 = result.data;
        } else if (fileName.includes('CF-SAST-Pledged-Data')) {
          this.pledgedData = result.data;
        }
      }
    });
  }

  showAllData() {
    console.log("All Data: ", this.insiderTrading);
    
    // Insider-Trading
    const marketPurchaseIsiderTrading = _.filter(this.insiderTrading, item => ((item['CATEGORY OF PERSON \n'] == "Promoters" || item['CATEGORY OF PERSON \n'] == "Promoter Group") && (item['MODE OF ACQUISITION \n'] == "Market Purchase" || item['MODE OF ACQUISITION \n'] == "Market Sale"))
    );

    const removeSellIsiderTrading = _.chain(marketPurchaseIsiderTrading)
      .groupBy('COMPANY \n')
      .filter(group => {
        return !_.some(group, { 'MODE OF ACQUISITION \n': 'Market Sale' });
      }).flatten().value();

    this.insiderTradingFiltered = _(removeSellIsiderTrading).groupBy('COMPANY \n').map((entries, company) => {
      const totalPurchase = _.sumBy(entries, 'VALUE OF SECURITY (ACQUIRED/DISPLOSED) \n');
      const totalShare = _.sumBy(entries, 'NO. OF SECURITIES (ACQUIRED/DISPLOSED) \n');
      return {
        symbol: entries[0]['SYMBOL \n'],
        COMPANY: company,
        "VALUE OF SECURITY (ACQUIRED/DISPLOSED) \n": totalPurchase,
        "NO. OF SECURITIES (ACQUIRED/DISPLOSED) \n": totalShare,

        Average_Purchase: (totalPurchase / totalShare)
      };
    }).orderBy('VALUE OF SECURITY (ACQUIRED/DISPLOSED) \n', 'desc').value();
    console.log("Insider Trading: ", this.insiderTradingFiltered);

    // Shareholding-Patterns
    this.shareholdingPatternsFiltered = _.filter(this.insiderTradingFiltered, (insider: any) => {
      const matchingShareholder = _.find(this.shareholdingPatterns, { COMPANY: insider.COMPANY });

      if (matchingShareholder) {
        if (matchingShareholder['PROMOTER & PROMOTER GROUP (A)'] > 50) {
          insider.inShareHolder = true;
          insider.PromotersShareHolding = matchingShareholder['PROMOTER & PROMOTER GROUP (A)'];
          return true;
        } else {
          return false;
        }
      } else {
        insider.inShareHolder = false;
        return true;
      }
    });
    console.log("Shareholding Patterns: ", this.shareholdingPatternsFiltered);

    // SAST-Reg29
    const SASTReg29SellData = _(this.SASTReg29)
      .groupBy('SYMBOL')
      .map((items) => _.some(items, item => item['TOTAL SALE (SHARES/VOTING RIGHTS/WARRANTS/ CONVERTIBLE SECURITIES/ANY OTHER INSTRUMENT)'] > 1) && {
        SYMBOL: items[0].SYMBOL,
        selling: true
      })
      .compact()
      .value();

    this.SASTReg29Filtered = _.filter(this.shareholdingPatternsFiltered, (insider) =>
      !_.some(SASTReg29SellData, { COMPANY: insider.COMPANY })
    );
    console.log("SASTReg29: ", this.SASTReg29Filtered);

    // Pledged-Data
    let pledgeFilter = _.filter(this.pledgedData, (item) => {
      return item["PROMOTER SHARES ENCUMBERED AS OF LAST QUARTER % OF TOTAL SHARES [X/(A+B+C)]"] > 0;
    });

    this.pledgedDataFiltered = _.filter(this.SASTReg29Filtered, (item) => {
      return !_.some(pledgeFilter, { 'NAME OF COMPANY': item.COMPANY });
    });
    console.log("Pledged: " , this.pledgedDataFiltered);
  }

  convertToCrores(value: number): string {
    const crores = value / 1e7; // 1 crore = 10 million
    return crores.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Cr';
  }

  async copyToClipboard(companyName: string) {
    // Create a temporary textarea element to hold the text
    const textarea = document.createElement('textarea');
    textarea.value = companyName;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy'); // Copy the text to the clipboard
    document.body.removeChild(textarea); // Clean up the textarea element


    const toast = await this.toastController.create({
      message: companyName + " copied!",
      duration: 1500,
      position: "bottom",
      color: "dark"
    });
    await toast.present();
  }

  calculateProfit() {
    const buyLotSizes = [0.01, 0.01, 0.02, 0.03];
    const pipSeries = [0.050, 0.100, 0.180, 0.210, 0.240, 0.270, 0.300, 0.330, 0.360, 0.380, 0.410, 0.430, 0.450, 0.450, 0.450, 0.450, 0.450, 0.450, 0.450, 0.450, 0.450, 0.450, 0.450, 0.450];
    const profitMultiplier = 2;
    const baseOpenPrice = 179.304;
    const tradeData = [];

    for (let i = 0; i < buyLotSizes.length; i++) {
      const lotSize = buyLotSizes[i];
      const pip = pipSeries[i];

      const openPrice = i === 0
        ? baseOpenPrice
        : baseOpenPrice - pipSeries.slice(0, i).reduce((a, b) => a + b, 0);
      const tp = openPrice + (pip * profitMultiplier);

      tradeData.push({
        lotSize: lotSize,
        openPrice: parseFloat(openPrice.toFixed(3)),
        tp: parseFloat(tp.toFixed(3)),
      });
      tradeData.forEach(trade => {
        trade.tp = parseFloat(tp.toFixed(3));
      });
    }

    let netProfit = 0;
    let totalMargin = 0;

    tradeData.forEach((trade: any) => {
      //For GBPJPY
      const profit = parseFloat((((trade.tp - trade.openPrice) / 0.01) * (6.4 * trade.lotSize)).toFixed(2));
      //      const profit = parseFloat(((trade.tp - trade.openPrice) * ((100000 * 0.01) / 1.25649) * trade.lotSize).toFixed(2));
      // const profit = parseFloat((((trade.tp - trade.openPrice) * 1000 * trade.lotSize) / 1.27228).toFixed(2));

      //const profit = parseFloat(((trade.tp - trade.openPrice) * 100000 * trade.lotSize).toFixed(5)); //GBPUSD

      netProfit += profit;
      trade.profit = profit;

      const margin = parseFloat(((trade.lotSize * 100000 * 1.25649) / 1000).toFixed(2)); //GBPJPY
      // const margin = parseFloat(((trade.openPrice * trade.lotSize) * 100).toFixed(5)); //GBPUSD

      totalMargin += margin;
      trade.margin = margin;
    });

    console.log(tradeData);
    console.log("Net Profit: " + netProfit.toFixed(2));
    console.log("Total Margin: " + totalMargin.toFixed(2));
  }
}
