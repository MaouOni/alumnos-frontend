import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  cols: any[];

  @ViewChild('dt') table: Table;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      console.log('Users from service:', users); // Log users
      this.users = users;
    }, error => {
      console.error('Error fetching users:', error);
    });

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'paterno', header: 'Apellido Paterno' },
      { field: 'materno', header: 'Apellido Materno' },
      { field: 'email', header: 'Email' },
      { field: 'actions', header: 'Acciones' }
    ];
  }

  applyFilterGlobal(event: Event, stringVal: any) {
    this.table.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }

  editUser(id: number) {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}
