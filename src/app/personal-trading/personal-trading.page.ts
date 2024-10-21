import { Component, OnInit } from '@angular/core';
import { NseIndiaService } from '../services/nseindia.service';
import * as Papa from 'papaparse';
import * as _ from 'lodash';
import { ToastController } from '@ionic/angular';

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
    private nseIndiaService: NseIndiaService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
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

    // Pledged-Data
    let pledgeFilter = _.filter(this.pledgedData, (item) => {
      return item["PROMOTER SHARES ENCUMBERED AS OF LAST QUARTER % OF TOTAL SHARES [X/(A+B+C)]"] > 0;
    });

    this.pledgedDataFiltered = _.filter(this.SASTReg29Filtered, (item) => {
      return !_.some(pledgeFilter, { 'NAME OF COMPANY': item.COMPANY });
    });
    console.log(this.pledgedDataFiltered);
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
}
