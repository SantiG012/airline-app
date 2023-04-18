import { Component } from '@angular/core';

@Component({
  selector: 'app-turistic-sites',
  templateUrl: './turistic-sites.component.html',
  styleUrls: ['./turistic-sites.component.css']
})
export class TuristicSitesComponent {
 images: readonly string[] = [
  "https://images.unsplash.com/photo-1539617546058-a8f9510b464e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", 
  "https://images.unsplash.com/photo-1542704792-e30dac463c90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", 
  "https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"];
  count: number = 0;
  image: string = this.images[0];

  getIindex():number {
    let index:number = this.count % this.images.length;
    
    this.count++;
    return index;
  }

  setImage():void {
    this.image = this.images[this.getIindex()];
  }
  
  ngOnInit() {
    setInterval(() => {
      this.setImage();
    }, 5000);
  }

  constructor() { }
  
}
