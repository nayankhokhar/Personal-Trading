import { Component, OnInit } from '@angular/core';
import { NseIndiaService } from '../services/nseindia.service';
import * as Papa from 'papaparse';
import * as _ from 'lodash';

@Component({
  selector: 'app-personal-trading',
  templateUrl: './personal-trading.page.html',
  styleUrls: ['./personal-trading.page.scss'],
})
export class PersonalTradingPage implements OnInit {
  private isAllFileProcessed = 0;

  insiderTrading: any = [];          // CF-Insider-Trading-equities
  insiderTradingFiltered: any = [];

  private shareholdingPatterns: any = [];    // CF-Shareholding-Pattern-equities
  private regulation29SAST: any = [];        // CF-SAST- Reg29
  private pledgedData: any = [];             // CF-SAST-Pledged-Data


  constructor(
    private nseIndiaService: NseIndiaService
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
          this.regulation29SAST = result.data;
        } else if (fileName.includes('CF-SAST-Pledged-Data')) {
          this.pledgedData = result.data;
        }
      }
    });
  }

  showAllData() {
    console.log("InsiderTrading: ", this.insiderTrading);
    // console.log("ShareholdingPatterns: ", this.shareholdingPatterns);
    // console.log("Regulation29SAST: ", this.regulation29SAST);
    // console.log("PledgedData: ", this.pledgedData);

    const marketPurchaseIsiderTrading = _.filter(this.insiderTrading, item => ((item['CATEGORY OF PERSON \n'] == "Promoters" || item['CATEGORY OF PERSON \n'] == "Promoter Group") && item['MODE OF ACQUISITION \n'] == "Market Purchase")
    );
    console.log("MarketPurchaseIsiderTrading: ", marketPurchaseIsiderTrading);


    this.insiderTradingFiltered = _(marketPurchaseIsiderTrading).groupBy('COMPANY \n').map((entries, company) => {
      const totalValue = _.sumBy(entries, 'VALUE OF SECURITY (ACQUIRED/DISPLOSED) \n');
      return {
        symbol: entries[0]['SYMBOL \n'],
        COMPANY: company,
        "VALUE OF SECURITY (ACQUIRED/DISPLOSED) \n": totalValue,
      };
    }).orderBy('VALUE OF SECURITY (ACQUIRED/DISPLOSED) \n', 'desc').value();

    console.log("InsiderTradingFilter: ", this.insiderTradingFiltered);
    console.log("Sum: ", (1985000000+503255000+50325000+385425000+373950000));
    
  }
}
