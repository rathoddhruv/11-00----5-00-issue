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
import { startOfDay, endOfDay } from "date-fns";
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

  ngOnInit() {
    let chart = am4core.create("chartdiv_1", am4charts.XYChart);
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let consumptionAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let demandAxis = chart.yAxes.push(new am4charts.ValueAxis());
      demandAxis.renderer.opposite = true;
    let weatherAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let consumptionSeries = chart.series.push(new am4charts.ColumnSeries());

    let demandSeries = chart.series.push(new am4charts.LineSeries());
    let weatherSeries = chart.series.push(new am4charts.LineSeries());
    this.zone.runOutsideAngular(() => {
      chart.dateFormatter.utc = true;
            chart.dateFormatter.inputDateFormat = "i";
      chart.cursor = new XYCursor();
      chart.cursor.behavior = "panX";

      chart.cursor.behavior = "selectXY";
      // let consumptionState = consumptionSeries.columns.template.states.create(
      //   "hover"
      // );
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(consumptionAxis);
      // consumptionState.properties.fillOpacity = 0.9;
      demandSeries.dataFields.valueY = "demand";
      demandSeries.dataFields.dateX = "time";
      dateAxis.renderer.minGridDistance = 80;


       let consumptionState = consumptionSeries.columns.template.states.create(
              "hover"
            );
      consumptionSeries.dataFields.valueY = "consumption";
      consumptionSeries.dataFields.dateX = "time";
      consumptionSeries.columns.template.cursorOverStyle = MouseCursorStyle.grabbing;


chart.dateFormatter.dateFormat = {
              "year": "numeric",
              "month": "numeric",
              "day": "numeric",
              "hour": "numeric",
              "minute": "numeric",
              "timeZone": "America/Chicago"
            };
            dateAxis.dateFormats.setKey("hour", { "hour": "numeric", "minute": "numeric", "timeZone": "America/Chicago" });
            dateAxis.dateFormats.setKey("minute", { "hour": "numeric", "minute": "numeric", "timeZone": "America/Chicago" });
            dateAxis.dateFormats.setKey("second", { "hour": "numeric", "minute": "numeric", "timeZone": "America/Chicago" });
            dateAxis.periodChangeDateFormats.setKey("hour", { "hour": "numeric", "minute": "numeric", "timeZone": "America/Chicago" });
            dateAxis.periodChangeDateFormats.setKey("minute", { "hour": "numeric", "minute": "numeric", "timeZone": "America/Chicago" });
            dateAxis.periodChangeDateFormats.setKey("second", { "hour": "numeric", "minute": "numeric", "timeZone": "America/Chicago" });


        am4core.getInteraction().body.events.on("keydown", (ev) => {
          
              console.log("keyboard keydown");
              // consumptionSeries.columns.template.cursorOverStyle = MouseCursorStyle.default;
              // chart.cursorOverStyle = am4core.MouseCursorStyle.default;

              if (am4core.keyboard.isKey(ev.event, "shift")) {
                chart.cursor.behavior = "zoomX";
                // chart.cursor.behavior ="selectX";
                return;
              }
              if (am4core.keyboard.isKey(ev.event, "ctrl")) {
                // consumptionState.dispose();
                // consumptionState = consumptionSeries.columns.template.states.create(
                //   "hidden"
                // );
                consumptionSeries.columns.template.cursorOverStyle = MouseCursorStyle.default;

                
            
                  
                  this.chartDiv1.nativeElement.style = `cursor: url("data:image/svg+xml,%3Csvg width='23px' height='23px' viewBox='0 0 23 23' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Eato/graph cursor - ctrl%3C/title%3E%3Cg id='ato/graph-cursor---ctrl' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cpath d='M12,-2.72848411e-12 L12.0003924,4.51760973 C15.4675652,4.76249954 18.2375005,7.53243478 18.4823903,10.9996076 L23,11 L23,12 L18.4824612,11.9993867 C18.2380361,15.4670295 15.4679005,18.2374768 12.0003924,18.4823903 L12,23 L11,23 L11.0006133,18.4824612 C7.5326352,18.2380125 4.76198751,15.4673648 4.51753877,11.9993867 L0,12 L0,11 L4.51760973,10.9996076 C4.76252322,7.53209953 7.53297047,4.76196388 11.0006133,4.51753877 L11,-2.72848411e-12 L12,-2.72848411e-12 Z M12.0009037,5.52061151 L12,8.5 L11,8.5 L11.0000973,5.52052886 C8.08545439,5.76093454 5.76149415,8.08458865 5.52061151,10.9990963 L8.5,10.999 L8.5,11.999 L5.52052886,11.9999027 C5.76096206,14.9148793 8.08512071,17.2390379 11.0000973,17.4794711 L11,14.5 L12,14.5 L12.0009037,17.4793885 C14.9154113,17.2385058 17.2390655,14.9145456 17.4794711,11.9999027 L14.5,11.999 L14.5,10.999 L17.4793885,10.9990963 C17.2385334,8.08492231 14.9150777,5.76146658 12.0009037,5.52061151 Z' id='Combined-Shape' fill='%23000000' fill-rule='nonzero'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") 12 12, pointer !important;`;
                  chart.cursor.behavior = "selectXY";
                  // chart.cursor.behavior ="selectX";
                  // this.chartDiv1.nativeElement.style = 'height: 500px';
                  return;
                }
               
              
              chart.cursor.behavior = "panX";
            });


            am4core.getInteraction().body.events.on("keyup", (ev) => {
              console.log("keyboard keyup key press");
              if (am4core.keyboard.isKey(ev.event, "shift")) {
                chart.cursor.behavior = "panX";
              }
              if (am4core.keyboard.isKey(ev.event, "ctrl")) {
                // consumptionSeries.columns.template.cursorOverStyle = MouseCursorStyle.pointer;
                this.chartDiv1.nativeElement.style.cursor = 'default';
                chart.cursor.behavior = "panX";
              }
              // chart.cursorOverStyle = am4core.MouseCursorStyle.default;
            });

            am4core.getInteraction().body.events.on("DOWN", (ev) => {
              console.log("keyboard key DOWN");
              this.chartDiv1.nativeElement.style = `cursor: url("data:image/svg+xml,%3Csvg width='13px' height='13px' viewBox='0 0 13 13' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Eato/graph cursor%3C/title%3E%3Cg id='ato/graph-cursor' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cpath d='M7,-5.24025268e-14 L7,5.999 L13,6 L13,7 L7,6.999 L7,13 L6,13 L6,6.999 L0,7 L0,6 L6,5.999 L6,-5.24025268e-14 L7,-5.24025268e-14 Z' id='Combined-Shape' fill='%23000000' fill-rule='nonzero'%3E%3C/path%3E%3C/g%3E%3C/svg%3E"), pointer !important`;

              chart.cursorOverStyle = am4core.MouseCursorStyle.default;
            });



            
      this.chart = chart;
      this.chart.data = this.generateChartData(0);
      weatherSeries.dataFields.valueY = "demand";
      weatherSeries.dataFields.dateX = "time";
      setTimeout(()=>{
 (this.chart.series.values[2] as am4charts.LineSeries).data = this.generateChartData(1);
      },200 );
       (this.chart.xAxes.values[0] as am4charts.DateAxis).zoomToDates(
        startOfDay(new Date()) ,
        endOfDay(new Date()),
        true,
        true
      );
       consumptionSeries.columns.template.events.on("hit", (ev) => {

              console.log(ev.target.dataItem);
            
                // item.controls['fromDate'].setValue(ev.target.dataItem.dates.dateX, { emitEvent: false });
                // //interval will be range 
                // item.controls['range'].setValue(optionRange[this.findIndexFromOptions(item.controls['interval'].value.value, item.controls['interval'].value.label, optionRange)], { emitEvent: false });
                // this.setDateByRange(item, null, item.controls['fromDate'].value);
                // this.setIntervalOptions(item);
                // this.checkDateExceedLimit(item, true);
            
              chart.cursor.behavior = "panX";

            });

        chart.events.on("ready", () => {
           (this.chart.xAxes.values[0] as am4charts.DateAxis).zoomToDates(
        startOfDay(new Date()) ,
        endOfDay(new Date()),
        true,
        true
        );
        })
this.chart.events.on("datavalidated", (ev) => {
      // Create a range
      console.log('datavalidated () => zoomToDates selected');
      setTimeout(() => {
        (this.chart.xAxes.values[0] as am4charts.DateAxis).zoomToDates(
        startOfDay(new Date()) ,
        endOfDay(new Date()),
        true,
        true
        );

      }, 50);


    });



      
     
    });
  }

  generateChartData(isWeather) {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);
    firstDate.setHours(0, 0, 0, 0);

    var consumption = 1600;
    var demand = 1600;
    var temperature = 1600;

    let step = 0;
    for (var i = 0; i < 40; i++) {
      // we create date objects here. In your data, you can have date strings
      // and then set format of your dates using chart.dataDateFormat property,
      // however when possible, use date objects, as this will speed up chart rendering.
      var newDate = new Date(firstDate);
      newDate.setMinutes(newDate.getMinutes() + i);

      if (step >= 60) {
        step = 0;
      } else {
        step = step + 5;
      }

      consumption += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      demand += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      temperature += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

      chartData.push({
        time: newDate.toUTCString(),
        consumption: consumption,
        demand: demand,
        temperature: temperature
      });
    }
    return chartData;
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
