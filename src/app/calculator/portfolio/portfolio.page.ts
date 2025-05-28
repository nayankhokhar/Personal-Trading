import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {
  portfolio: any = [
    {
      name: "HG Infra Engineering (Part IX)",
      holding: [
        { qty: 1, date: "19-08-2024", price: 1564.25 },
        { qty: 2, date: "07-03-2025", price: 1078.80 }
      ]
    },
    {
      name: "Tata Motors",
      holding: [
        { qty: 11, date: "03-10-2024", price: 933.35 },
        { qty: 1, date: "29-10-2025", price: 841.00 },
        { qty: 1, date: "25-02-2025", price: 671.30 },
        { qty: 5, date: "27-03-2025", price: 673.20 },
      ]
    },
  ];
  isShowHoldings = true;

  constructor() { }

  ngOnInit() {
    const withTotal = _.map(this.portfolio, (stock) => {
      const total = _.sumBy(stock.holding, (h: any) => h.qty * h.price);
      return { ...stock, total };
    });

    const grandTotal = _.sumBy(withTotal, 'total');

    this.portfolio = _.map(withTotal, (stock) => {
      const percentage = ((stock.total / grandTotal) * 100).toFixed(2);
      return { ...stock, percentage: `${percentage}%` };
    });

    console.log(this.portfolio);
  }

  hideShowHoldings() {
    this.isShowHoldings = this.isShowHoldings ? false : true;
  }

  formatIndianCurrency(amount: number): string {
    return amount ? new Intl.NumberFormat('en-IN').format(amount) : '0';
  }
}
