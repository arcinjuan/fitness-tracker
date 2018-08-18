// We want outside components to listen to our sidenav toggle button, so we
// create a new event emitter object (sideNavToggle). Because of this we import
// EventEmitter. We also grab Output to make it a listenable event from outside
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	// we output a new event called sideNavToggle
	@Output() sidenavToggle = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  // this is tied to the nav burger icon
  onToggleSidenav(){
  	// when clicked, it outputs this event we created and output
  	this.sidenavToggle.emit();
  }

}
