import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'grocery_app';
//   ngOnInit(){
//     const confirmBox = new ConfirmBoxInitializer();
//   confirmBox.setTitle('Are you sure?');
//   confirmBox.setMessage('Do you want to Delete?');
//   confirmBox.setButtonLabels('DELETE', 'NO');

//   // Choose layout color type
//   confirmBox.setConfig({
//     layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
//   });

//   confirmBox.openConfirmBox$().subscribe((resp:any) => {
//     // IConfirmBoxPublicResponse
//     console.log('Clicked button response: ', resp);

//     if(resp.success){
//       console.log("hiiii")
//     }
//   })
// }
}
