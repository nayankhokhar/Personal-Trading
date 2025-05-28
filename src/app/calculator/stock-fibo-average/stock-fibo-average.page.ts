import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-fibo-average',
  templateUrl: './stock-fibo-average.page.html',
  styleUrls: ['./stock-fibo-average.page.scss'],
})
export class StockFiboAveragePage implements OnInit {
  InitialBuyPrice:number = 273.25;
  InitialShare: number = 10;
  PercentageDown: number[] = [13.40, 10, 10, 10, 10, 10];
  AverageShares: number[] = [6, 10, 10, 10, 10, 10];
  PercentageTP: number[] = [10, 20, 30, 40, 50, 10];

  averageData: any = [];

  constructor() { }

  ngOnInit() {
    // buy charges
    // sell charges
    this.calculateAveraging();
  }

  calculateAveraging() {
    let currentPrice = this.InitialBuyPrice;
    let totalShares: number = this.InitialShare;
    let totalInvestment: number = currentPrice * this.InitialShare; // Initial investment
    let averageSharePrice: number = totalInvestment / totalShares; // Initial avg price

    // Calculate TP for the initial buy price
    let tpPercentage = this.PercentageTP[0];
    let tpPrice = currentPrice * (1 + tpPercentage / 100);
    let profitAmount = (tpPrice * totalShares) - totalInvestment; // ✅ Profit calculation
    let totalProfitAmount = totalInvestment + profitAmount; // ✅ Total profit calculation

    // Push the initial purchase
    this.averageData.push({
      price: currentPrice,
      new_shares: this.InitialShare,
      total_shares: totalShares,
      average_share_price: averageSharePrice,
      investment: currentPrice * this.InitialShare, // Investment for this row
      total_investment: totalInvestment, // Cumulative investment
      down_percentage_from_previous: 0,
      down_percentage_from_initial: 0, // No drop at the initial purchase
      tp_percentage: tpPercentage,
      tp_price: tpPrice,
      profit_amount: profitAmount, // ✅ Added profit amount
      total_profit_amount: totalProfitAmount // ✅ Added total profit amount
    });

    for (let i = 0; i < this.PercentageDown.length; i++) {
      // Calculate new buy price
      currentPrice = currentPrice * (1 - this.PercentageDown[i] / 100);

      // Get shares to buy at this level
      let sharesToBuy = this.AverageShares[i];

      // Calculate investment for this row
      let investment = currentPrice * sharesToBuy;

      // Update total shares and total investment
      totalShares += sharesToBuy;
      totalInvestment += investment;

      // Calculate new average share price
      averageSharePrice = totalInvestment / totalShares;

      // Calculate percentage drop from the initial price
      let downPercentage: number = (((this.InitialBuyPrice) - currentPrice) / (this.InitialBuyPrice)) * 100;

      // Calculate TP
      let tpPercentage = this.PercentageTP[i] ?? this.PercentageTP[this.PercentageTP.length - 1]; // Use last TP if out of bounds
      let tpPrice = currentPrice * (1 + tpPercentage / 100);

      // Calculate profit if TP is hit
      let profitAmount = (tpPrice * totalShares) - totalInvestment; // ✅ Profit calculation
      let totalProfitAmount = totalInvestment + profitAmount; // ✅ Total profit calculation

      // Store in array
      this.averageData.push({
        price: currentPrice,
        new_shares: sharesToBuy,
        total_shares: totalShares,
        average_share_price: averageSharePrice,
        down_percentage_from_previous: this.PercentageDown[i],
        down_percentage_from_initial: Number(downPercentage.toFixed(2)),
        investment: investment, // Amount spent on this purchase
        total_investment: totalInvestment, // Cumulative investment
        tp_percentage: tpPercentage,
        tp_price: tpPrice,
        profit_amount: profitAmount, // ✅ Added profit amount
        total_profit_amount: totalProfitAmount // ✅ Added total profit amount
      });
    }
  }

  formatIndianCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }
}
