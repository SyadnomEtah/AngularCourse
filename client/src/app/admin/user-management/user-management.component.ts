import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from '../../_services/admin.service';
import {User} from '../../_models/user';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {RolesModalComponent} from '../../_modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  private adminService = inject(AdminService);
  private modalService = inject(BsModalService);
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  openRolesModal(user: User) {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'User roles',
        username: user.username,
        availableRoles: ['Admin', 'Moderator', 'Member'],
        selectedRoles: [...user.roles],
        users: this.users,
        rolesUpdated: false
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, initialState);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content && this.bsModalRef.content.rolesUpdated) {
          const selectedRoles = this.bsModalRef.content.selectedRoles;
          this.adminService.updateUserRoles(user.username, selectedRoles).subscribe({
              next: result => user.roles = result
            }
          )
        }
      }
    })
  }

  getUsersWithRoles() {
    this.adminService.getUserWithRoles().subscribe({
      next: result => this.users = result,
    })
  }

}
