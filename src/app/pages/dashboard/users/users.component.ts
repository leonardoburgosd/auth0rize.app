import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { userServices } from '../../../Data/services/userServices';
import Swal from 'sweetalert2';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { typeServices } from '../../../Data/services/typeServices';

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
  styleUrls: ['./users.component.scss'],
  standalone: false
})
export class UsersComponent implements OnInit {

  constructor(
    private userServices: userServices,
    private typeServices: typeServices) { }

  users: User[] = []
  usersTotal: number = 0;
  usersActive: number = 0;
  usersDeleted: number = 0;
  usersPending: number = 0;

  userForm = {
    name: '',
    lastName: '',
    motherLastName: '',
    userName: '',
    email: '',
    password: '',
    type: 0
  }

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
  departments = ["IT", "Ventas", "Marketing", "HR", "Finanzas", "Operaciones"]

  // Paginación
  currentPage = 1
  itemsPerPage = 5
  totalPages = 0

  ngOnInit(): void {
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
    if (user) {
      // Inicializar con datos básicos de la tabla mientras carga
      this.userForm = {
        name: user.name,
        lastName: '',
        motherLastName: '',
        userName: '',
        email: user.email,
        password: '', // Contraseña oculta en edición
        type: this.roles.find(r => r.name === user.role)?.id || 0
      }

      // Consultar servicio para obtener detalles completos
      this.userServices.obtenerPorId$(user.id.toString()).then((response: any) => {
        if (response.success && response.data) {
          const userData = response.data;
          this.userForm.name = userData.name || userData.names || this.userForm.name;
          this.userForm.lastName = userData.lastName || '';
          this.userForm.motherLastName = userData.motherLastName || '';
          this.userForm.userName = userData.userName || '';
          this.userForm.email = userData.email || this.userForm.email;

          if (userData.type) {
            // Intentar mapear si viene como ID o nombre
            if (typeof userData.type === 'number') {
              this.userForm.type = userData.type;
            } else if (typeof userData.type === 'string') {
              this.userForm.type = this.roles.find(r => r.name === userData.type)?.id || this.userForm.type;
            }
          }
        }
      });
    } else {
      this.userForm = {
        name: '',
        lastName: '',
        motherLastName: '',
        userName: '',
        email: '',
        password: this.generatePassword(),
        type: 0
      }
    }
    this.showUserModal = true
  }

  closeUserModal(): void {
    this.showUserModal = false
    this.editingUser = null
    this.userForm = {
      name: '',
      lastName: '',
      motherLastName: '',
      userName: '',
      email: '',
      password: '',
      type: 0
    }
  }

  generatePassword(): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }

  regeneratePassword(): void {
    this.userForm.password = this.generatePassword();
  }

  generateUserName(): void {
    const name = this.userForm.name || '';
    const lastName = this.userForm.lastName || '';
    const motherLastName = this.userForm.motherLastName || '';

    if (name && lastName) {
      const p1 = name.substring(0, 3);
      const p2 = lastName.split(' ')[0];
      const p3 = motherLastName ? motherLastName.substring(0, 1) : '';

      this.userForm.userName = (p1 + p2 + p3).toLowerCase().replace(/\s/g, '');
    }
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

}
