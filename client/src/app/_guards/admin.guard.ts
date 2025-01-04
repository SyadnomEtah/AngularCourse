import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {AccountService} from '../_services/account.service';
import {ToastrService} from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const acountService = inject(AccountService);
  const toastr = inject(ToastrService);

  if (acountService.roles().includes('Admin') || acountService.roles().includes('Moderator')) {
    return true;
  } else {
    toastr.error('You cannot access this panel');
    return false;
  }
};
