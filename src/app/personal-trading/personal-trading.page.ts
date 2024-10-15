import { Component, OnInit } from '@angular/core';
import { NseIndiaService } from '../services/nseindia.service';
@Component({
  selector: 'app-personal-trading',
  templateUrl: './personal-trading.page.html',
  styleUrls: ['./personal-trading.page.scss'],
})
export class PersonalTradingPage implements OnInit {
  private shareholdingPatterns: any = [];    // CF-Shareholding-Pattern-equities
  private regulation29SAST: any = [];        // CF-SAST- Reg29
  private pledgedData: any = [];             // CF-SAST-Pledged-Data
  private insiderTrading: any = [];          // CF-Insider-Trading-equities


  constructor(
    private nseIndiaService: NseIndiaService
  ) { }

  ngOnInit() {
  }

  pickFile(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const text = reader.result as string;
          // console.log("Test: ", text);

          this.convertCSVToJSON(text, file.name);
        };

        reader.readAsText(file);
      }
    }
  }

  convertCSVToJSON(csvText: string, fileName: string) {
    console.log("Name: ", fileName);

    const lines = csvText.split('\n'); // Split the CSV into lines
    const headers = lines[0].split(','); // Get the headers from the first row
    const jsonArray = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      const jsonObj: any = {};

      // Skip empty lines
      if (!lines[i]) continue;

      // Map each value to the corresponding header
      for (let j = 0; j < headers.length; j++) {
        jsonObj[headers[j]] = currentLine[j];
      }

      jsonArray.push(jsonObj);
    }

    if (fileName.includes('CF-Shareholding-Pattern-equities')) {
      this.shareholdingPatterns = jsonArray;
    } else if (fileName.includes('CF-SAST- Reg29')) {
      this.regulation29SAST = jsonArray;
    } else if (fileName.includes('CF-SAST-Pledged-Data')) {
      this.pledgedData = jsonArray;
    } else if (fileName.includes('CF-Insider-Trading-equities')) {
      this.insiderTrading = jsonArray;
    }
  }

  showAllData() {
    console.log("ShareholdingPatterns: ", this.shareholdingPatterns);
    console.log("Regulation29SAST: ", this.regulation29SAST);
    console.log("PledgedData: ", this.pledgedData);
    console.log("InsiderTrading: ", this.insiderTrading);
  }

  getIT() {
    const params = {
      index: "equities",
      from_date: "9-07-2024",
      to_date: "9-10-2024"
    };

    this.nseIndiaService.getIT(params).subscribe(result => {
      console.log(JSON.stringify(result));
    });
  }
}
