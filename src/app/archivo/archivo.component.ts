import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

type AOA= any [][] ;

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {
  
  data: AOA = [
    [1, 2],
    [3, 4],
  ]; 
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(evt:any){
    
    //coneccion al lector de archivos

    const target: DataTransfer= <DataTransfer>(evt.target);

    if(target.files.length !== 1) throw new Error('No se pueden usar multiples archivos');
    const reader: FileReader = new FileReader();

  reader.onload=(e:any)=>{
    //lee el libro de trabajo
    const bstr:string=e.target.result;
    const wb : XLSX.WorkBook=XLSX.read(bstr,{type:'binary'});
    //toma la primera hoja
    const wsname:string=wb.SheetNames[0];
    const ws:XLSX.WorkSheet=wb.Sheets[wsname];
    console.log(ws);
    //guarda los datos
    this.data=<AOA>(XLSX.utils.sheet_to_json(ws,{header:1}));
    console.log(this.data);

  };
    reader.readAsBinaryString(target.files[0]);
  }
  

}
