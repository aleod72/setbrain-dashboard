import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { Tab } from '../interfaces/tab.interface';

@Component({
  selector: 'setbrain-dashboard-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent implements OnInit{
  @Input() tabs: Tab[] = [];
  @Input() defaultTab: null | Tab = null;
  @Output() activeTabOutput = new EventEmitter();
  activeTab = 0;

  ngOnInit() {
    if (this.defaultTab) this.activeTab = this.defaultTab.id;
  }

  setActiveTab(tab: Tab) {
    this.activeTabOutput.emit(tab);
    this.activeTab = tab.id;
  }
}
