import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { Info } from '../model/info';
import { TarefasService } from '../services/tarefas.service';

function createInfo(config: Info): { 
  registroId: number;
  tittle:string; 
  description:string;
  responsible:string;
  priority:string;
  deadline:string;
  status:string;
 } {
    let newInfo = {
      registroId:0,
      tittle:"",
      description:"",
      responsible:"",
      priority:"",
      deadline:"",
      status:"Em Andamento"
    }
    if(config.registroId){
      newInfo.registroId = config.registroId;
    }
    if(config.tittle)
    {
      newInfo.tittle = config.tittle;
    }
    if(config.description)
    {
      newInfo.description = config.description;
    }
    if(config.responsible)
    {
      newInfo.responsible = config.responsible;
    }
    if(config.priority)
    {
      newInfo.priority = config.priority;
    }
    if(config.deadline)
    {
      newInfo.deadline = config.deadline;
    }
    return newInfo;
  }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  info = this.infoServices.return_list();
  contadorId = 1;
  panelOpenState = false;
  displayedColumns: string[] = ['registroId', 'tittle', 'description', "responsible", "priority", "deadline", "status"];
  checkoutForm = this.formBuilder.group({
    tid:this.contadorId,
    tittle: '',
    description: '',
    responsible: '',
    priority: '',
    deadline: ''
  });

  dataToDisplay = [...this.info];
  dataSource = new MatTableDataSource(this.dataToDisplay);
  //dataSource1 = [...this.info];
  table: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private infoServices: TarefasService,
  ){
    this.infoServices = new TarefasService();
    this.info = this.infoServices.return_list();
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const registerFromRoute = Number(routeParams.get('registerId'));
  }
  onSubmit(): Info {
    console.warn('Your order has been submitted', this.checkoutForm.value);
    let info1 = createInfo(this.checkoutForm.value);
    info1.registroId =this.contadorId;
    this.contadorId+=1;
    this.infoServices.addToTable(info1);
    this.dataToDisplay = [...this.infoServices.list];
    this.dataSource = new MatTableDataSource(this.info);
    //dataSource1 = [...this.info];
    this.checkoutForm.reset();
    return info1;
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  removeData(element: Info) {
    if (element == this.info[this.info.length-1]) {
      this.info.pop();
    }
    else if(element == this.info[0]){
      this.info.shift();
    }
    else{
      for (let index = 0; index < this.info.length; index++) {
        if(element == this.info[index])
        {
          if (element == this.info[this.info.length-1]) {
            this.info.pop();
          }
          else{
            for (let index2 = index; index2 < this.info.length; index2++) {
              this.info[index2] = this.info[index2+1];
              this.info.length -=1;
            }
          }
        }
      }
    }
    this.infoServices.removeTable();
    this.dataSource = new MatTableDataSource(this.infoServices.list);
  }
  concluirTarefa(elemento: Info)
  {
    for (let index = 0; index < this.info.length; index++) {
      if (elemento == this.info[index]) {
        this.info[index].status = "Concluido";
      }
    }
  }
}