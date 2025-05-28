import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-drawdown',
  templateUrl: './drawdown.page.html',
  styleUrls: ['./drawdown.page.scss'],
})
export class DrawdownPage implements OnInit {
  //spread
  buyOrders: { lotSize: number; openPrice: number }[] = [
    { lotSize: 0.01, openPrice: 3287.07 },
    { lotSize: 0.02, openPrice: 3265.18 },
    { lotSize: 0.03, openPrice: 3231.98 }
  ];

  sellOrders: any = [
    // { "lotSize": 0.03, "openPrice": 3286.72 },
    // { "lotSize": 0.03, "openPrice": 3264.95 },
    // { "lotSize": 0.03, "openPrice": 3231.57 },
    // { "lotSize": 0.03, "openPrice": 3231.65 }
  ];

  constructor() { }

  ngOnInit() {
    this.calculateBreakEven();
    this.calculateDrawdownTarget(50);
  }

  calculateBreakEven() {
    const buyTotalLots = _.sumBy(this.buyOrders, 'lotSize');
    const sellTotalLots = _.sumBy(this.sellOrders, 'lotSize');

    const buyTotalCost = _.sumBy(this.buyOrders, (o: any) => o.lotSize * o.openPrice);
    const sellTotalCost = _.sumBy(this.sellOrders, (o: any) => o.lotSize * o.openPrice);

    const netLots = buyTotalLots - sellTotalLots;
    const netCost = buyTotalCost - sellTotalCost;

    const breakeven = netCost / netLots;
    console.log('✅ Breakeven Price:', breakeven.toFixed(2));
  }

  calculateDrawdownTarget(drawdownAmount: number) {
    const highestOrder = (Number(_.maxBy(this.buyOrders, 'openPrice')?.openPrice) - drawdownAmount);
    console.log("Down Amt: ", highestOrder);

    for (let i = 0; i < this.buyOrders.length; i++) {
      const openPrice = this.buyOrders[i].openPrice;
      let drawdown = (highestOrder - openPrice);
      console.log(drawdown.toFixed(2));
    }
  }
}
