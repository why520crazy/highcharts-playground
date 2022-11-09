import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as Highcharts from 'highcharts/highstock.src';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import HighchartsBoost from 'highcharts/modules/boost';
import HighchartsBoostCanvas from 'highcharts/modules/boost-canvas';
import HighchartsGroupedCategories from './highcharts-grouped-categories';
import { chartOptionsColor } from './chart-options';
HighchartsGroupedCategories(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'highcharts-playground';

  chart!: Highcharts.Chart;

  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLElement>;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    const options: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Emissions to air in Norway',
      },
      subtitle: {
        text:
          'Source: ' +
          '<a href="https://www.ssb.no/en/statbank/table/08940/" ' +
          'target="_blank">SSB</a>',
      },
      tooltip: {
        shared: true,
        backgroundColor: 'rgba(0,0,0,.75)',
        borderRadius: 6,
        borderWidth: 0,
        shadow: false,
        style: {
          color: '#fff',
        },
      },
      // tooltip: {
      //   headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      //   pointFormat:
      //     '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      //     '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      //   footerFormat: '</table>',
      //   shared: true,
      //   useHTML: true,
      // },
      legend: {
        squareSymbol: true,
        symbolHeight: 12,
        symbolWidth: 1,
        symbolPadding: 11,
        verticalAlign: 'top',
        align: 'right',
        itemStyle: {
          fontSize: '12px',
          fontWeight: 'normal',
          color: chartOptionsColor.legendItemColor,
          lineHeight: '13px',
        },
        navigation: {
          activeColor: chartOptionsColor.legendNavigationActiveColor,
          animation: true,
          arrowSize: 12,
          inactiveColor: chartOptionsColor.legendInactiveColor,
          style: {
            color: chartOptionsColor.textColor,
            fontSize: '14px',
          },
        },
        useHTML: true,
        labelFormatter: function () {
          return `<span class="axis-label" #axisLable>${this.name}</span>`;
        },
      },
      xAxis: {
        max: 6,
        scrollbar: {
          enabled: true,
        },
        categories: [
          {
            name: '项目1',
            categories: [
              {
                // name: 'Sprint 01',
                name: '测试迭代回顾 名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长名称很长很长 ',
                categories: ['2019-02-02', '2019-02-03', '2019-02-04'],
              },
              {
                name: 'Sprint 02',
                categories: ['2019-02-05', '2019-02-06', '2019-02-07'],
              },
              {
                name: 'Sprint 03',
                categories: ['2019-02-08', '2019-02-09', '2019-02-10'],
              },
            ],
          },
          {
            // name: '项目2项目2项目2项目2项目2项目',
            name: '项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2项目2',
            categories: [
              {
                name: 'Sprint 10',
                categories: ['2019-02-08', '2019-02-09', '2019-02-10'],
              },
              {
                name: 'Sprint 11',
                categories: ['2019-02-08', '2019-02-09', '2019-02-10'],
              },
              {
                name: 'Sprint 12',
                categories: ['2019-02-08', '2019-02-09', '2019-02-10'],
              },
            ],
          },
          {
            name: '项目3',
            categories: [
              {
                name: 'Sprint 100',
                categories: ['2019-02-11', '2019-02-12', '2019-02-13'],
              },
              {
                name: 'Sprint 101',
                categories: ['2019-02-14', '2019-02-15', '2019-02-16'],
              },
              {
                name: 'Sprint 102',
                categories: ['2019-02-17', '2019-02-18', '2019-02-19'],
              },
            ],
          },
        ],
        crosshair: true,
        labels: {
          useHTML: true,
          //  分组的每层样式, 只有一部分是好的, 比如:formatter 第二层级是无效的
          groupedOptions: [
            {
              style: {
                // maxWidth: '70px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              },
            },
            {
              style: {
                // maxWidth: '70px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              },
              rotation: 0,
            },
          ],
          // 格式化 x轴(格式化为日期为:02-02) : 难点  无法判断this.value是哪个维度的, 因为项目名称也可能写成 2020-02-03 得字符串,无法根据值是否可以转换为日期类型去判断
          formatter: function (
            ctx: Highcharts.AxisLabelsFormatterContextObject
          ) {
            // ctx label 有值得时候一般是分组，主要是 highcharts-grouped-categories 设置的
            // ctx tick 有值是日期第一次调用，也是 highcharts-grouped-categories 设置的
            if (!ctx.tick && !(ctx as any)['label'] && ctx.value) {
              // 日期格式
              return ctx.value + ' 日期';
            }
            return (this as any)['value'];
          },
        },
      } as unknown as Array<Highcharts.XAxisOptions>,
      yAxis: {
        title: {
          useHTML: true,
          text: 'Million tonnes CO<sub>2</sub>-equivalents',
        },
      },

      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Oil and gas extraction',
          data: [
            13.93, 13.63, 13.73, 13.67, 14.37, 14.89, 14.56, 14.32, 14.13,
            13.93, 13.21, 12.16, 13.93, 13.21, 12.16, 13.93, 13.21, 12.16,
            13.93, 13.21, 12.16, 13.93, 13.21, 12.16, 13.93, 13.21, 12.16,
          ],
        },
        // {
        //   name: 'Manufacturing industries and mining',
        //   data: [
        //     12.24, 12.24, 11.95, 12.02, 11.65, 11.96, 11.59, 11.94, 11.96,
        //     11.59, 11.42, 11.76,
        //   ],
        // },
        // {
        //   name: 'Road traffic',
        //   data: [
        //     10.0, 9.93, 9.97, 10.01, 10.23, 10.26, 10.0, 9.12, 9.36, 8.72, 8.38,
        //     8.69,
        //   ],
        // },
        // {
        //   name: 'Agriculture',
        //   data: [
        //     4.35, 4.32, 4.34, 4.39, 4.46, 4.52, 4.58, 4.55, 4.53, 4.51, 4.49,
        //     4.57,
        //   ],
        // },
      ] as Array<Highcharts.SeriesOptionsType>,
    };
    this.zone.runOutsideAngular(() => {
      this.chart = Highcharts.chart(
        this.container.nativeElement,
        options as any
      );
      (this.chart as any)['containerScaling'] = null;
    });
  }
}
