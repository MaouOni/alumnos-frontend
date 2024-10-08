import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: UserModel = new UserModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(+id).subscribe(user => this.user = user);
    }
  }

  onSubmit() {
    if (this.user.id) {
      this.userService.updateUser(this.user.id, this.user).subscribe(() => this.goToList());
    }
  }

  goToList() {
    this.router.navigate(['/users']);
  }
}
