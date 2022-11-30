import {
  ValueAxis,
  CircleBullet,
  XYCursor,
  XYChart,
  LineSeries,
  DateAxis
} from "@amcharts/amcharts4/charts";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { color, create, useTheme } from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  HostListener,
  ViewEncapsulation,
  ElementRef
} from "@angular/core";
import { MouseCursorStyle } from "@amcharts/amcharts4/core";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
import {
  startOfDay,
  endOfDay,
  addHours,
  addDays,
  addYears,
  startOfYear,
  endOfYear,
  isBefore,
  addMonths
} from "date-fns";
useTheme(am4themes_animated);
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private formBuilder: FormBuilder
  ) {}

  chart: am4charts.XYChart = new am4charts.XYChart();
  @ViewChild("chartDiv1", { static: false }) chartDiv1: ElementRef;
  start = new Date();
  end = new Date();

  ngOnInit() {
    let chart = am4core.create("chartdiv_1", am4charts.XYChart);
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let axis0 = chart.yAxes.push(new am4charts.ValueAxis());
    let axis1 = chart.yAxes.push(new am4charts.ValueAxis());
    axis1.renderer.opposite = true;

    let series0 = chart.series.push(new am4charts.ColumnSeries());
    let series1 = chart.series.push(new am4charts.LineSeries());

    let series0Past = chart.series.push(new am4charts.ColumnSeries());
    let series1Past = chart.series.push(new am4charts.LineSeries());

    series0.zIndex = 10;
    series0Past.zIndex = 10;
    series1.zIndex = 20;
    series1Past.zIndex = 20;


    dateAxis.min = addYears(startOfYear(new Date()), -2).getTime();
    dateAxis.max = endOfYear(new Date()).getTime();

    this.zone.runOutsideAngular(() => {
      // Add legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "absolute";
      chart.legend.parent = chart.bottomAxesContainer;
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;

      chart.dateFormatter.utc = true;
      chart.dateFormatter.inputDateFormat = "i";
      chart.cursor = new XYCursor();
      chart.cursor.behavior = "panX";

      chart.cursor.behavior = "selectXY";
      // let consumptionState = series0.columns.template.states.create(
      //   "hover"
      // );
      chart.scrollbarX.series.push(axis0);

      dateAxis.renderer.grid.template.location = 0;
      // dateAxis.renderer.grid.template.location = 0.5;
      dateAxis.renderer.labels.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.renderer.cellStartLocation = 0.1;
      dateAxis.renderer.cellEndLocation = 0.9;
      // dateAxis.min = (addYears(startOfYear(new Date()), -1)).getTime();
      // dateAxis.max = (endOfYear(new Date())).getTime();
      dateAxis.tooltipDateFormat = "hh:mm a, d MMMM yyyy";
      dateAxis.tooltipText = "{HH:mm:ss}";
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.fullWidthTooltip = true;
      dateAxis.baseInterval = { timeUnit: "hour", count: 1 };

      axis0.title.text = "consumption";
      axis0.title.fill = am4core.color("#0A7696");
      axis0.renderer.labels.template.fill = am4core.color("#0A7696");
      axis0.strictMinMax = false;
      // axis0.min = 0;
      axis0.renderer.grid.template.disabled = true;
      axis0.renderer.opposite = false;
      axis0.renderer.labels.template.fontWeight = "bold";

      axis1.title.text = "demand";
      axis1.title.fill = am4core.color("#E14555");
      axis1.renderer.labels.template.fill = am4core.color("#E14555");
      axis1.renderer.grid.template.disabled = true;
      axis1.renderer.opposite = true;
      axis1.background.fill = am4core.color("#fff");
      axis1.renderer.labels.template.fontWeight = "bold";

     

      axis1.strictMinMax = false;
      axis1.min = 0;
      axis1.title.rotation = 270;
      let consumptionState = series0.columns.template.states.create(
        "hover"
      );
      series1.bullets.push(new am4charts.CircleBullet());
      let demandBullet2 = series1Past.bullets.push(
        new am4charts.CircleBullet()
      );
   
   

      // Create series
      series0.columns.template.cursorOverStyle =
        MouseCursorStyle.pointer;
      series0.sequencedInterpolation = false;
      series0.dataFields.valueY = "consumption";
      series0.dataFields.dateX = "time";
      series0.yAxis = axis0;
      series0.columns.template.propertyFields.strokeDasharray =
        "dashLength";
      series0.groupFields.valueY = "sum";
      series0.name = "Consumption";
      series0.columns.template.fillOpacity = 1;
      series0.columns.template.fill = am4core.color("#0C7696");
      series0.stroke = am4core.color("#0C7696");
      series0.tooltip.background.stroke = am4core.color("#0C7696");
      series0.tooltip.label.fontWeight = "bold";
      series0.tooltip.background.fill = am4core.color("#ffffff");
      series0.tooltip.label.fill = am4core.color("#000000");
      series0.id = "consumption1";
      series0.tooltip.background.strokeWidth = 0;
      series0.tooltip.getFillFromObject = false;
      series0.columns.template.tooltipText =
        "{valueY.formatNumber('#,###.')} " + +"";
      series0.columns.template.width = am4core.percent(100);

      series0Past.columns.template.cursorOverStyle =
        MouseCursorStyle.pointer;
      series0Past.sequencedInterpolation = false;
      series0Past.dataFields.valueY = "consumption2";
      series0Past.dataFields.dateX = "time";
      series0Past.yAxis = axis0;
      series0Past.columns.template.propertyFields.strokeDasharray =
        "dashLength";
      series0Past.groupFields.valueY = "sum";
      series0Past.name = "Consumption2";
      series0Past.columns.template.fillOpacity = 1;
      series0Past.columns.template.fill = am4core.color("#59C2EC");
      series0Past.stroke = am4core.color("#59C2EC");
      series0Past.tooltip.background.stroke = am4core.color("#59C2EC");
      series0Past.tooltip.label.fontWeight = "bold";
      series0Past.tooltip.background.fill = am4core.color("#ffffff");
      series0Past.tooltip.label.fill = am4core.color("#000000");
      series0Past.id = "consumption2";
      series0Past.tooltip.background.strokeWidth = 0;
      series0Past.tooltip.getFillFromObject = false;
      series0Past.columns.template.tooltipText =
        "{valueY.formatNumber('#,###.')} " + +"";
      series0Past.columns.template.width = am4core.percent(100);
      consumptionState.properties.fillOpacity = 0.9;

      series1.sequencedInterpolation = true;
      series1.dataFields.valueY = "demand";
      series1.dataFields.dateX = "time";
      series1.yAxis = axis1;
      series1.name = "Demand";
      series1.stroke = am4core.color("red");
      series1.propertyFields.strokeDasharray = "dashLength";
      series1.strokeWidth = 2;
      series1.stroke = am4core.color("#E03445");

      series1.tooltip.background.stroke = am4core.color("#E03445");
      series1.tooltip.label.fontWeight = "bold";
      series1.connect = false;
      series1.tooltip.background.fill = am4core.color("#ffffff");
      series1.tooltip.label.fill = am4core.color("#000000");
      series1.id = "demand1";
      series1.tooltip.background.strokeWidth = 2;
      series1.tooltip.getFillFromObject = false;
      series1.tooltipText = "{valueY.formatNumber('#,###.')} " + +"";
      series1.groupFields.valueY = "high";
      series1.tensionX = 0.77;

      series1Past.sequencedInterpolation = true;
      series1Past.dataFields.valueY = "demand2";
      series1Past.dataFields.dateX = "time";
      series1Past.yAxis = axis1;
      series1Past.name = "Demand2";
      series1Past.stroke = am4core.color("red");
      series1Past.propertyFields.strokeDasharray = "dashLength";
      series1Past.strokeWidth = 2;
      series1Past.stroke = am4core.color("#D90368");
      series1Past.tooltip.background.stroke = am4core.color("#D90368");
      series1Past.tooltip.label.fontWeight = "bold";
      series1Past.connect = false;
      series1Past.tooltip.background.fill = am4core.color("#ffffff");
      series1Past.tooltip.label.fill = am4core.color("#000000");
      series1Past.id = "demand2";
      series1Past.tooltip.background.strokeWidth = 2;
      series1Past.tooltip.getFillFromObject = false;
      series1Past.tooltipText = "{valueY.formatNumber('#,###.')} " + +"";
      series1Past.tensionX = 0.77;
      series1Past.strokeDasharray = "8,4";
      // series1Past.hiddenInLegend = true;

      //////////////////////////////////////////////
      demandBullet2.fill = am4core.color("red");

     

      am4core.getInteraction().body.events.on("keydown", ev => {
        console.log("keyboard keydown");
        // series0.columns.template.cursorOverStyle = MouseCursorStyle.default;
        // chart.cursorOverStyle = am4core.MouseCursorStyle.default;

        if (am4core.keyboard.isKey(ev.event, "shift")) {
          chart.cursor.behavior = "zoomX";
          // chart.cursor.behavior ="selectX";
          return;
        }
 

        chart.cursor.behavior = "panX";
      });

      am4core.getInteraction().body.events.on("keyup", ev => {
        console.log("keyboard keyup key press");
        if (am4core.keyboard.isKey(ev.event, "shift")) {
          chart.cursor.behavior = "panX";
        }
        if (am4core.keyboard.isKey(ev.event, "ctrl")) {
          // series0.columns.template.cursorOverStyle = MouseCursorStyle.pointer;
          this.chartDiv1.nativeElement.style.cursor = "default";
          chart.cursor.behavior = "panX";
        }
        // chart.cursorOverStyle = am4core.MouseCursorStyle.default;
      });



      this.chart = chart;
      let data = this.generateChartData(
        new Date(),
        addDays(new Date(), 2),
        3600
      );
      debugger;
      this.chart.map.getKey("demand1").data = data[0];
      this.chart.map.getKey("consumption1").data = data[0];

      // this.chart.data = this.generateChartData(0);
      setTimeout(() => {
        this.chart.map.getKey("consumption2").data = data[1];
        this.chart.map.getKey("demand2").data = data[1];
      }, 2000);

      series0.columns.template.events.on("hit", ev => {
        console.log(ev.target.dataItem);


        chart.cursor.behavior = "panX";
      });


    });
  }

  generateChartData(start: Date, end: Date, interval) {
    var chartData = [[], []];
    var consumption = 1600;
    var demand = 1600;
    var temperature = 1600;

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

      consumption += Math.round(
        (Math.random() < 0.5 ? 1 : -1) * Math.random() * 100
      );
      demand += Math.round(
        (Math.random() < 0.5 ? 1 : -1) * Math.random() * 100
      );
      temperature += Math.round(
        (Math.random() < 0.5 ? 1 : -1) * Math.random() * 100
      );

      chartData[0].push({
        time: newDate.toUTCString(),
        consumption: consumption,
        demand: demand,
        temperature: temperature
      });
    }
    debugger;
    return chartData;
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
      console.log("graph disposed");
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
