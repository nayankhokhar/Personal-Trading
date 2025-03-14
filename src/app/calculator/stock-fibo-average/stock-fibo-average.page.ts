import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-fibo-average',
  templateUrl: './stock-fibo-average.page.html',
  styleUrls: ['./stock-fibo-average.page.scss'],
})
export class StockFiboAveragePage implements OnInit {
  averageData: any = [];

  constructor() { }

  ngOnInit() {
    const BuyPrice = 5000.00;
    const Investment = [5000, 5000, 5000, 5000, 5000, 5000, 5000];
    const PercentageDown = [5, 5, 5, 5, 5, 5, 5];
    const PercentageProfit = [5, 5, 5, 5, 5, 5, 5];

    let currentPrice = BuyPrice;
    let totalShares = 0;
    let totalInvestment = 0;

    for (let i = 0; i < Investment.length; i++) {
      let sharesBought = Investment[i] / currentPrice;
      totalShares += sharesBought;
      totalInvestment += Investment[i];

      let downFromBuyPrice = BuyPrice - currentPrice;
      let downPercentage = ((BuyPrice - currentPrice) / BuyPrice) * 100;

      // Calculate profit in terms of total investment
      let profitAmount = (totalInvestment * PercentageProfit[i]) / 100;
      let profitPrice = currentPrice * (1 + PercentageProfit[i] / 100);; // Price at which profit is achieved

      // Pushing data into the array
      this.averageData.push({
        price: currentPrice.toFixed(2),
        sharesBought: sharesBought.toFixed(2),
        totalShares: totalShares.toFixed(2),
        investment: Investment[i],
        totalInvestment: totalInvestment.toFixed(2),
        downFromBuyPrice: downFromBuyPrice.toFixed(2),
        downPercentage: downPercentage.toFixed(2),
        profitPercentage: PercentageProfit[i], // Profit percentage at this step
        profitAmount: profitAmount.toFixed(2), // Profit amount
        profitPrice: profitPrice.toFixed(2), // Price needed to achieve profit
      });

      currentPrice -= (currentPrice * (PercentageDown[i] / 100));
    }

    console.log(this.averageData);
  }
}
