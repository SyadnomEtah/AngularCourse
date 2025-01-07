import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from '../../_services/admin.service';
import {Photo} from '../../_models/photo';

@Component({
  selector: 'app-photo-management',
  standalone: true,
  imports: [],
  templateUrl: './photo-management.component.html',
  styleUrl: './photo-management.component.css'
})
export class PhotoManagementComponent implements OnInit {
  adminService = inject(AdminService)
  photosForApproval: Photo[] = [];

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe({
      next: photos => this.photosForApproval = photos
    })
  }

  approvePhoto(photoID: number) {
    this.adminService.approvePhoto(photoID).subscribe({
      next: () => this.photosForApproval.splice(this.photosForApproval
        .findIndex(photo => photo.id === photoID), 1)
    });
  }

  rejectPhoto(photoID: number) {
    this.adminService.rejectPhoto(photoID).subscribe({
      next: () => this.photosForApproval.splice(this.photosForApproval
        .findIndex(photo => photo.id === photoID), 1)
    });
  }
}
