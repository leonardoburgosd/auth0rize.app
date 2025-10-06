import { Component, OnInit } from '@angular/core';
import { userServices } from '../../../Data/services/userServices';
import Swal from 'sweetalert2';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { typeServices } from '../../../Data/services/typeServices';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createInteranUserRequest } from 'src/app/Data/dto/user/request/createInteralUserRequest';

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  avatar?: string
  lastLogin: string
}

interface FilterOptions {
  search: string
  role: string
  status: string
  department: string
}

interface Type {
  id: number
  name: string
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userServices: userServices,
    private typeServices: typeServices) { }

  users: User[] = []
  userNewForm!: FormGroup;
  usersTotal: number = 0;
  usersActive: number = 0;
  usersDeleted: number = 0;
  usersPending: number = 0;

  filteredUsers: User[] = []
  selectedUsers: number[] = []
  showUserModal = false
  editingUser: User | null = null

  filters: FilterOptions = {
    search: "",
    role: "",
    status: "",
    department: "",
  }

  roles: Type[] = []
  statuses = ["active", "inactive", "pending"]

  // Paginación
  currentPage = 1
  itemsPerPage = 5
  totalPages = 0

  ngOnInit(): void {
    //this.userNewForm debe ser un formgroup pero los parametros debe ser iguales a la interface user

    this.userNewForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      motherLastName: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      type: new FormControl(null, Validators.required),
    });
    this.obtenerRoles()
    this.obtenerUsuarios()
  }

  obtenerRoles() {
    this.typeServices.lista$().then((response) => {
      if (response.success) {
        this.roles = response.data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención.',
          text: response.message
        })
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error no controlado',
        text: MessageDefault.errorConexion
      });
    });
  }

  obtenerUsuarios() {
    this.userServices.lista$().then((response) => {
      if (response.success) {
        this.usersTotal = response.data.total;
        this.usersActive = response.data.active;
        this.usersDeleted = response.data.deleted;
        this.usersPending = response.data.pending;
        this.users = response.data.users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.type,
          status: user.deleted ? "inactive" : "active",
          lastLogin: user.lastLogin,
        }));
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención.',
          text: response.message
        })
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error no controlado',
        text: MessageDefault.errorConexion
      });
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesRole = !this.filters.role || user.role === this.filters.role
      const matchesStatus = !this.filters.status || user.status === this.filters.status

      return matchesSearch && matchesRole && matchesStatus
    })

    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    this.currentPage = 1
  }

  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    return this.filteredUsers.slice(startIndex, endIndex)
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement
    this.filters.search = target.value
    this.applyFilters()
  }

  onFilterChange(): void {
    this.applyFilters()
  }

  clearFilters(): void {
    this.filters = {
      search: "",
      role: "",
      status: "",
      department: "",
    }
    this.applyFilters()
  }

  toggleUserSelection(userId: number): void {
    const index = this.selectedUsers.indexOf(userId)
    if (index > -1) {
      this.selectedUsers.splice(index, 1)
    } else {
      this.selectedUsers.push(userId)
    }
  }

  toggleSelectAll(): void {
    const currentPageUsers = this.getPaginatedUsers()
    const allSelected = currentPageUsers.every((user) => this.selectedUsers.includes(user.id))

    if (allSelected) {
      currentPageUsers.forEach((user) => {
        const index = this.selectedUsers.indexOf(user.id)
        if (index > -1) {
          this.selectedUsers.splice(index, 1)
        }
      })
    } else {
      currentPageUsers.forEach((user) => {
        if (!this.selectedUsers.includes(user.id)) {
          this.selectedUsers.push(user.id)
        }
      })
    }
  }

  isUserSelected(userId: number): boolean {
    return this.selectedUsers.includes(userId)
  }

  areAllSelected(): boolean {
    const currentPageUsers = this.getPaginatedUsers()
    return currentPageUsers.length > 0 && currentPageUsers.every((user) => this.selectedUsers.includes(user.id))
  }

  openUserModal(user?: User): void {
    this.editingUser = user || null
    this.showUserModal = true
  }

  closeUserModal(): void {
    this.showUserModal = false
    this.editingUser = null
  }

  deleteUser(userId: number): void {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      this.users = this.users.filter((user) => user.id !== userId)
      this.selectedUsers = this.selectedUsers.filter((id) => id !== userId)
      this.applyFilters()
    }
  }

  deleteSelectedUsers(): void {
    if (this.selectedUsers.length === 0) return

    if (confirm(`¿Estás seguro de que quieres eliminar ${this.selectedUsers.length} usuario(s)?`)) {
      this.users = this.users.filter((user) => !this.selectedUsers.includes(user.id))
      this.selectedUsers = []
      this.applyFilters()
    }
  }

  exportUsers(): void {
    console.log("Exportando usuarios...", this.filteredUsers)
    // Aquí implementarías la lógica de exportación
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      case "pending":
        return "Pendiente"
      default:
        return status
    }
  }

  getRoleClass(role: string): string {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800"
      case "Moderador":
        return "bg-blue-100 text-blue-800"
      case "Usuario":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }

  getPageNumbers(): number[] {
    const pages = []
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  getMinValue(a: number, b: number): number {
    return Math.min(a, b)
  }

  createUser() {
    const formValues = this.userNewForm.value;
    const user: createInteranUserRequest = {
      name: `${formValues.name} ${formValues.lastName} ${formValues.motherLastName}`,
      email: formValues.email,
      userName: formValues.username,
      password: 'DefaultPassword123!', // Asigna una contraseña por defecto o genera una
      typeUserId: formValues.type,
      lastName: formValues.lastName,
      motherLastName: formValues.motherLastName,
      domainId: 1 // Asigna un domainId por defecto o según tu lógica
    };

    this.userServices.create$(user).then((response) => {
      if (response.success) {
        this.closeUserModal();
        this.obtenerUsuarios();
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario se ha creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al crear el usuario.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error no controlado',
        text: MessageDefault.errorConexion
      });
    });
  }
}
