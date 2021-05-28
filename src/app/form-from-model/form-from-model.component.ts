import { Person } from './../person.type';
import { ControlProp, FORM_CONTROL_META_KEY, getDecoratedProperties, getControlProps } from './../form-control.decorator';
import { Component, Input, OnInit } from '@angular/core';
import 'reflect-metadata';

@Component({
  selector: 'app-form-from-model',
  templateUrl: './form-from-model.component.html',
  styleUrls: ['./form-from-model.component.css']
})
export class FormFromModelComponent implements OnInit {
  @Input() modelType: any = {};
  controlProps: ControlProp[] = [];

  constructor() { }

  ngOnInit(): void {

    const properties = getDecoratedProperties(this.modelType);
    this.controlProps = properties.map(p => getControlProps(this.modelType, p));
  }

}
