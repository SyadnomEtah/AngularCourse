import {Component, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {Member} from '../../_models/member';
import {AccountService} from '../../_services/account.service';
import {MembersService} from '../../_services/members.service';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {FormsModule, NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);
  @ViewChild('editForm') editForm?: NgForm;
  member?: Member;

  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  };

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if (!user)
      return;

    this.memberService.getMember(user.username).subscribe({
      next: result => this.member = result,
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile successfully updated!');
        this.editForm?.reset(this.member);
      }
    })
  }
}
