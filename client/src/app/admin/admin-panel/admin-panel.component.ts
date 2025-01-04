import { Component } from '@angular/core';
import {TabDirective, TabsetComponent} from 'ngx-bootstrap/tabs';
import {HasRoleDirective} from '../../_directives/has-role.directive';
import {UserManagementComponent} from '../user-management/user-management.component';
import {PhotoManagementComponent} from '../photo-management/photo-management.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    TabsetComponent,
    TabDirective,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
