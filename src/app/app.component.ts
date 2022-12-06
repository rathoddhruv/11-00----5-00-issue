import {
  ValueAxis,
  CircleBullet,
  XYCursor,
  XYChart,
  LineSeries,
  DateAxis,
} from '@amcharts/amcharts4/charts';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { color, create, useTheme } from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  HostListener,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { MouseCursorStyle } from '@amcharts/amcharts4/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {
  startOfDay,
  endOfDay,
  addHours,
  addDays,
  addYears,
  startOfYear,
  endOfYear,
  isBefore,
  addMonths,
} from 'date-fns';
useTheme(am4themes_animated);
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private formBuilder: FormBuilder
  ) {}

  chart: am4charts.XYChart;
  @ViewChild('chartDiv1', { static: false }) chartDiv1: ElementRef;
  start = new Date();
  end = new Date();

  createSeries(chart, field, name, yAxis) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.yAxis = yAxis;
    series.id = name;
    series.name = name;
    series.tooltipText = '{dateX}: [b]{valueY}[/]';
    series.strokeWidth = 2;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;

    return series;
  }

  ngOnInit() {
    let chart = am4core.create('chartdiv_1', am4charts.XYChart);
    let data = this.generateChartData(new Date(), addDays(new Date(), 2), 3600);
    chart.data = this.generateChartData(
      new Date(),
      addDays(new Date(), 2),
      3600
    );

    // dateAxis.min = addYears(startOfYear(new Date()), -2).getTime();
    // dateAxis.max = endOfYear(new Date()).getTime();

    this.zone.runOutsideAngular(() => {
      // Add legend

      this.chart = chart;
      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 30;

      var valueAxis = this.createAxis(chart, 'valueAxis', 1);
      valueAxis.id = 'valueAxis';
      var valueAxis2 = this.createAxis(chart, 'valueAxis2', 2);
      valueAxis2.id = 'valueAxis2';
      var valueAxis3 = this.createAxis(chart, 'valueAxis3', 3);
      valueAxis3.id = 'valueAxis3';
      var valueAxis4 = this.createAxis(chart, 'valueAxis4', 4);
      valueAxis4.id = 'valueAxis4';
      var valueAxis5 = this.createAxis(chart, 'valueAxis5', 5);
      valueAxis5.id = 'valueAxis5';

      this.createSeries(chart, 'data', 'Series1', valueAxis);
      this.createSeries(chart, 'data2', 'Series2', valueAxis2);
      this.createSeries(chart, 'data3', 'Series3', valueAxis3);
      this.createSeries(chart, 'data4', 'Series4', valueAxis4);
      this.createSeries(chart, 'data5', 'Series5', valueAxis5);

      chart.legend = new am4charts.Legend();

      // chart.legend.width = 200;

      chart.cursor = new am4charts.XYCursor();
      setTimeout(() => {
        this.preferenceGraphAxesIndex(chart);
      }, 2000);
    });
  }
  createAxis(chart: any, id: string, number) {
    let tempAxis = new am4charts.ValueAxis();

    return chart.yAxes.push(tempAxis);
  }

  recentRange(value: number) {
    if (7) {
      this.generateChartData(new Date(), addDays(new Date(), 7), 3600);
      (this.chart.xAxes.getIndex(0) as am4charts.DateAxis).zoomToDates(
        new Date(),
        addDays(new Date(), 7),
        true,
        true
      );
    } else if (365) {
      this.generateChartData(new Date(), addYears(new Date(), -3), 3600);
      (this.chart.xAxes.getIndex(0) as am4charts.DateAxis).zoomToDates(
        new Date(),
        addYears(new Date(), -3),
        true,
        true
      );
    }
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      console.log('graph disposed');
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  preferenceGraphAxesIndex(chart) {
    let graphAxesIndex = 0;
    let axisDefinedArray: any = [];

    chart.series.values.map((element) => {
      debugger;
      if (!axisDefinedArray.includes(element.yAxis.id)) {
        // console.log(element.yAxis.id);
        if (!element.isHiding && !element.isHidden) {
          if (graphAxesIndex < 4) {
            if (graphAxesIndex === 0 || graphAxesIndex === 3) {
              (chart.map.getKey(element.yAxis.id) as am4charts.ValueAxis).renderer.opposite = false;
              (chart.map.getKey(element.yAxis.id) as am4charts.ValueAxis).disabled = false;
              axisDefinedArray.push(element.yAxis.id);
            }
            if (graphAxesIndex === 1 || graphAxesIndex === 2) {
              (chart.map.getKey(element.yAxis.id) as am4charts.ValueAxis).renderer.opposite = true;
              (chart.map.getKey(element.yAxis.id) as am4charts.ValueAxis).disabled = false;
              axisDefinedArray.push(element.yAxis.id);
            }
          } else {
            (
              chart.map.getKey(element.yAxis.id) as am4charts.ValueAxis
            ).disabled = true;
          }
          graphAxesIndex++;
        }
      }
    });
  }

  generateChartData(start: Date, end: Date, interval) {
    var chartData = [[], []];
    var data = 1600;
    var data2 = 1600;
    var data3 = 1600;
    var data4 = 1600;
    var data5 = 1600;

    let step = 0;
    var newDate = start;
    while (isBefore(newDate, end)) {
      if (interval == 3600) {
        newDate = addHours(newDate, 1);
      } else {
        newDate = addMonths(newDate, 1);
      }

      if (step >= 60) {
        step = 0;
      } else {
        step = step + 5;
      }

      data += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data3 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data4 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data5 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);

      chartData[0].push({
        date: newDate,
        data: data,
        data2: data2,
        data3: data3,
        data4: data4,
        data5: data5,
      });
    }
    return chartData[0];
  }
}
