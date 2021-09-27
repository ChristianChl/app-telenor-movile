import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import { Label } from 'ng2-charts';
import { VentasService } from '../../services/ventas.service';
import { IngresoService } from '../../services/ingreso.service';
import { DetallVentaService } from '../../services/detall-venta.service';
import { ProductosService } from '../../services/productos.service';
import { DatePipe } from '@angular/common';
import { CotizacionService } from '../../services/cotizacion.service';
import { HistorialProductoService } from 'src/app/services/historial-producto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public doughnutChartLabels: any[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: any = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  

  ventas:any = [];
  ingreso:any = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    // scales: { xAxes: [{}], yAxes: [{}] },
    // plugins: {
    //   datalabels: {
    //     anchor: 'end',
    //     align: 'end',
    //   }
    // }
  };
  public barChartData: any = [];

  public barChartLabels = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartDataCompra:any = [];
  /*
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];*/


  constructor(private ventasService:VentasService,
    private ingresoService: IngresoService,
    private detallVentaService:DetallVentaService,
    private prductoService:ProductosService,
    private datePipe: DatePipe,
    private cotizacionService:CotizacionService,
    private historialProductoService:HistorialProductoService) {}

  ngOnInit(): void{
    this.getVentas();
    this.getMeses();
    this.getCompras();
  }

  contador:number = 0;
  filterVentas:any=[];
  filterIngresos:any=[];
  months = ['Ene', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
    
  //Obtener meses
  getMeses(){
    var todaysDate = new Date();
    var currentMonth = this.months[todaysDate.getMonth()];
    for(let i = this.months.indexOf(currentMonth); i >= 0; i--){
        this.contador = this.contador + 1;
        if(this.contador <= 3){
          this.barChartLabels.push(this.months[i]);
        }
    }
    this.barChartLabels = this.barChartLabels.reverse();

    // Obtener meses por filtro
    
  }
  
  getVentas(){
    this.ventasService.getVentas().subscribe(
      res => {
        this.barChartData = [];
        
        const pruebaVentas = 'Ventas';
        this.ventas = res;
        this.ventas = this.ventas.venta;
        console.log(this.ventas);
        let ventasArraySol:any = [];
        let ventasArrayDol:any = [];

        for(let i = 0; i <this.barChartLabels.length ; i++){
    
          this.filterVentas = this.filterMes(this.barChartLabels[i],this.ventas);

          let ventaMesDol = 0;
          let ventaMesSol = 0;
          
          for(let i=0; i<this.filterVentas.length; i++){
              if(this.filterVentas[i].Monedas.mon_nombre == "Dolares"){
                ventaMesDol = ventaMesDol + Number(this.filterVentas[i].ven_total);
              }else{
                ventaMesSol = ventaMesSol + Number(this.filterVentas[i].ven_total);
              }
              
          }

          ventasArrayDol.push(ventaMesDol);
          ventasArraySol.push(ventaMesSol);
        }
          
          this.barChartData.push({data:ventasArrayDol, label:"Ventas - Dolares",backgroundColor:'#ea8013', hoverBackgroundColor:'#e1913e'});
          this.barChartData.push({data:ventasArraySol, label:"Ventas - Soles",backgroundColor:'#a3e542', hoverBackgroundColor:'#b5e56e'});
          

      },
      err => console.error(err)
    );
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

   randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }

  filterMes(mesSeleccionado:any, arrayDatos:any){

    let filtro :any=[];
    for(let i=0; i<arrayDatos.length; i++){
        const now = new Date(arrayDatos[i].createdAt);
        let mesVenta = this.months[now.getMonth()];
        if(mesVenta == mesSeleccionado){
          filtro.push(arrayDatos[i]);
        }
    }
    return filtro;
  }

  filterIngreso:any = [];
  getCompras(){
    this.ingresoService.getIngresos().subscribe(
      res => {
        this.barChartDataCompra = [];
        const pruebaCompras = 'Compras';
        this.ingreso = res;
        this.ingreso = this.ingreso.ingreso;
        let IngresoArray:any = [];
        for(let i = 0; i <this.barChartLabels.length ; i++){
    
          this.filterIngreso =  this.filterMes(this.barChartLabels[i],this.ingreso);

          let ingresoMes = 0;
          
          for(let i=0; i<this.filterIngreso.length; i++){
              ingresoMes = ingresoMes + Number(this.filterIngreso[i].ing_totalCompra);
          }
          IngresoArray.push(ingresoMes);
        }
          this.barChartDataCompra.push({data:IngresoArray, label:"Compras - Soles", backgroundColor:'#6cb6d6', hoverBackgroundColor:'#8bc4dd'});
          
      },
      err => console.error(err)
    );
  }
}
