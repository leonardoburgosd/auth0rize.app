import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { createDomainRequest } from 'src/app/Data/dto/user/request/createDomainRequest';
import { getDomainResponse } from 'src/app/Data/dto/user/response/getDomainResponse';
import { userListResponse } from 'src/app/Data/dto/user/response/getUserResponse';
import { getTypeResponse } from 'src/app/Data/dto/user/response/getTypeResponse';
import { domainServices } from 'src/app/Data/services/domainServices';
import { userServices } from 'src/app/Data/services/userServices';
import { typeServices } from 'src/app/Data/services/typeServices';
import Swal from 'sweetalert2';

interface Domain {
  code: string // 36 dígitos
  name: string
  initial: string
  status?: "active" | "inactive"
  email: string;
  count?: number
}

interface DomainUser {
  userId: number
  domainCode: string
  role: string
  isPrincipal: boolean
  assignedAt: string
  status: "active" | "inactive"
}

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  department: string
}

interface FilterOptions {
  search: string
  status: string
}

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss'],
  standalone: false
})
export class DomainComponent implements OnInit {

  //#region Nuevo codigo
  domains: Domain[] = [

  ]

  private searchTimeout: any;

  domainUsers: DomainUser[] = [

  ]

  availableUsers: User[] = [
    {
      id: 1,
      name: "Ana García",
      email: "ana.garcia@company.com",
      role: "Admin",
      status: "active",
      department: "IT",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@company.com",
      role: "Usuario",
      status: "active",
      department: "Ventas",
    },
    {
      id: 3,
      name: "María López",
      email: "maria.lopez@company.com",
      role: "Moderador",
      status: "active",
      department: "Marketing",
    },
    {
      id: 4,
      name: "Juan Martínez",
      email: "juan.martinez@company.com",
      role: "Usuario",
      status: "active",
      department: "HR",
    },
    {
      id: 5,
      name: "Laura Sánchez",
      email: "laura.sanchez@company.com",
      role: "Admin",
      status: "active",
      department: "IT",
    },
    {
      id: 6,
      name: "Pedro Gómez",
      email: "pedro.gomez@company.com",
      role: "Usuario",
      status: "active",
      department: "Finanzas",
    },
  ]

  filteredDomains: Domain[] = []
  selectedDomains: string[] = []
  expandedDomains: Set<number> = new Set()
  showDomainModal = false
  showUsersModal = false
  editingDomain: Domain | null = null
  managingDomainId: number | null = null

  filters: FilterOptions = {
    search: "",
    status: "",
  }

  statuses = ["Activo", "Inactivo"]

  // Paginación
  currentPage = 1
  itemsPerPage = 10
  totalPages = 0

  // Math disponible en template
  Math = Math

  tableColumns: any[] = [
    { key: 'code', header: 'Código' },
    { key: 'status', header: 'Estado', type: 'badge', badgeConfig: (status: string) => this.getStatusClass(status) },
    { key: 'count', header: 'Usuarios' },
    { key: 'name', header: 'Usuario Principal', type: 'user' }
  ];

  tableActions: any[] = [
    { id: 'design', icon: 'fas fa-paint-brush', class: 'text-purple-600 hover:text-purple-900', title: 'Diseñar' },
    { id: 'edit', icon: 'fas fa-edit', class: 'text-teal-600 hover:text-teal-900', title: 'Editar' },
    { id: 'delete', icon: 'fas fa-trash', class: 'text-red-600 hover:text-red-900', title: 'Eliminar' }
  ];
  //#endregion


  public domainsR: getDomainResponse[] = [];
  public newDomain: createDomainRequest = new createDomainRequest();
  public formGroup!: FormGroup;
  public isModalCreateView: boolean = false;
  public isLoadingCreate: boolean = false;
  public total: number = 0;
  public active: number = 0;
  public inactive: number = 0;
  // ── Modal Asignar Usuarios ───────────────────────────────────
  showAddUsersModal: boolean = false;
  addUsersDomainCode: string = '';
  availableUsersList: userListResponse[] = [];
  roles: getTypeResponse[] = [];
  selectedUserIds: Set<number> = new Set();
  selectedRoleId: number = 0;
  isAssigningUsers: boolean = false;
  isLoadingUsers: boolean = false;

  // ── Usuarios por dominio (expanded) ─────────────────────────
  domainUsersMap: Map<string, userListResponse[]> = new Map();
  domainUsersLoadingMap: Map<string, boolean> = new Map();
  domainUsersFilterMap: Map<string, string> = new Map();

  constructor(private formBuilder: FormBuilder, private domain: domainServices, private userSvc: userServices, private typeSvc: typeServices, private router: Router) { }

  ngOnInit(): void {
    this.applyFilters();
    this.getDomain();
    this.validacionFormaulario();
  }

  private validacionFormaulario = () =>
    this.formGroup = this.formBuilder.group({
      name: [this.newDomain.name, [Validators.required, Validators.min(20)]]
    });

  getDomain(search?: string, state: string = "active", page: number = 1, size: number = 10) {
    this.domain.get$(search, state, page, size).then(res => {
      if (res.success) {
        this.total = res.data.total;
        this.active = res.data.active;
        this.inactive = res.data.deleted;

        this.domains = res.data.domains.map(domain => ({
          code: domain.code,
          name: domain.principalName,
          initial: domain.initial,
          status: domain.isActive === true ? "active" : "inactive",
          email: domain.principalEmail,
          count: domain.count,
        }));
        this.applyFilters();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en la respuesta',
          text: res.message
        });
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error no controlado',
        text: MessageDefault.errorConexion
      });
    }).finally();
  }

  openModalCreate() {
    this.isModalCreateView = !this.isModalCreateView;
  }

  deleteDomainR(id: string) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Deseas eliminar esta aplicacion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
      background: "#111827",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        this.domain.delete$(id).then(res => {
          if (res.success) {

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error en la respuesta',
              text: res.message
            });
          }
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error no controlado',
            text: MessageDefault.errorConexion
          })
        }).finally(() => {
          this.domains = this.domains.filter(d => d.code !== id);
          this.applyFilters();
        });
      }
    });
  }

  createDomain(domain: createDomainRequest) {
    this.isLoadingCreate = true;
    this.domain.create$(domain)
      .then(res => {
        if (res.success) {
          const createdDomain: Domain = {
            code: res.data.code,
            name: domain.name,
            initial: domain.name.substring(0, 2).toUpperCase(),
            status: "active",
            email: "N/A",
            count: 0
          };
          this.domains.push(createdDomain);
          this.applyFilters();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en la respuesta',
            text: res.message
          });
        }
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error no controlado',
          text: MessageDefault.errorConexion
        });
      }).finally(() => {
        this.openModalCreate();
        this.newDomain = new createDomainRequest();
        this.isLoadingCreate = false;
      });
  }

  copyCode(code: string) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(
        () => {
          console.log('Código copiado.');
        },
        (err) => {
          console.error('Error al copiar.: ', err);
        }
      );
    }
  }

  //#region Nuevo codigo
  applyFilters(): void {
    this.filteredDomains = this.domains.filter((domain) => {
      const matchesSearch =
        domain.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        domain.code.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        domain.email?.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || domain.status === this.filters.status

      return matchesSearch && matchesStatus
    })

    this.totalPages = Math.ceil(this.filteredDomains.length / this.itemsPerPage)
    this.currentPage = 1
  }

  getPaginatedDomains(): Domain[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    return this.filteredDomains.slice(startIndex, endIndex)
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement
    this.filters.search = target.value
    //Que despues de 3 segundos de no recibir ningun valor adicional se ejecute this.getdomain
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.getDomain(this.filters.search)
    }, 3000)
  }

  onFilterChange(): void {
    this.applyFilters()
  }

  clearFilters(): void {
    this.filters = {
      search: "",
      status: "",
    }
    this.applyFilters()
  }

  toggleDomainExpansion(domainId: number): void {
    if (this.expandedDomains.has(domainId)) {
      this.expandedDomains.delete(domainId)
    } else {
      this.expandedDomains.add(domainId)
    }
  }

  isDomainExpanded(domainId: number): boolean {
    return this.expandedDomains.has(domainId)
  }

  getDomainUsers(domainCode: string): DomainUser[] {
    return this.domainUsers.filter((du) => du.domainCode === domainCode)
  }

  getPrincipalUser(domainCode: string): DomainUser | undefined {
    return this.domainUsers.find((du) => du.domainCode === domainCode && du.isPrincipal)
  }

  toggleDomainSelection(domainCode: string): void {
    const index = this.selectedDomains.indexOf(domainCode)
    if (index > -1) {
      this.selectedDomains.splice(index, 1)
    } else {
      this.selectedDomains.push(domainCode)
    }
  }

  isDomainSelected(domainCode: string): boolean {
    return this.selectedDomains.includes(domainCode)
  }

  openDomainModal(domain?: Domain): void {
    this.editingDomain = domain || null
    this.showDomainModal = true
  }

  closeDomainModal(): void {
    this.showDomainModal = false
    this.editingDomain = null
  }

  openUsersModal(domainId: number): void {
    this.managingDomainId = domainId
    this.showUsersModal = true
  }

  closeUsersModal(): void {
    this.showUsersModal = false
    this.managingDomainId = null
  }

  deleteDomain(domainCode: string): void {
    if (confirm("¿Estás seguro de que quieres eliminar este dominio?")) {
      this.domains = this.domains.filter((domain) => domain.code !== domainCode)
      this.domainUsers = this.domainUsers.filter((du) => du.domainCode !== domainCode)
      this.selectedDomains = this.selectedDomains.filter((id) => id !== domainCode)
      this.applyFilters()
    }
  }

  generateDomainCode(): string {
    // Generar código de 36 dígitos (UUID-like)
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "suspended":
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
      case "suspended":
        return "Suspendido"
      default:
        return status
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


  // Gestión de usuarios del dominio
  getAvailableUsersForDomain(domainCode: string): User[] {
    const assignedUserIds = this.domainUsers.filter((du) => du.domainCode === domainCode).map((du) => du.userId)

    return this.availableUsers.filter((user) => !assignedUserIds.includes(user.id))
  }

  assignUserToDomain(userId: number, domainCode: string, isPrincipal = false): void {
    const user = this.availableUsers.find((u) => u.id === userId)
    if (!user) return

    // Si se marca como principal, desmarcar el principal actual
    if (isPrincipal) {
      this.domainUsers.forEach((du) => {
        if (du.domainCode === domainCode && du.isPrincipal) {
          du.isPrincipal = false
        }
      })
    }

    const newDomainUser: DomainUser = {
      userId: userId,
      domainCode: domainCode,
      role: user.role,
      isPrincipal: isPrincipal,
      assignedAt: new Date().toISOString().split("T")[0],
      status: "active",
    }

    this.domainUsers.push(newDomainUser)

    // Actualizar contador de usuarios del dominio
    const domain = this.domains.find((d) => d.code === domainCode)
    if (domain) {
      domain.count = this.getDomainUsers(domainCode).length
    }
  }

  removeUserFromDomain(domainUserId: number): void {
    const domainUser = this.domainUsers.find((du) => du.userId === domainUserId)
    if (!domainUser) return

    if (domainUser.isPrincipal) {
      alert("No puedes eliminar el usuario principal. Asigna otro usuario como principal primero.")
      return
    }

    if (confirm("¿Estás seguro de que quieres eliminar este usuario del dominio?")) {
      this.domainUsers = this.domainUsers.filter((du) => du.userId !== domainUserId)

      // Actualizar contador de usuarios del dominio
      const domain = this.domains.find((d) => d.code === domainUser.domainCode)
      if (domain) {
        domain.count = this.getDomainUsers(domainUser.domainCode).length
      }
    }
  }

  setPrincipalUser(domainUserId: number): void {
    const domainUser = this.domainUsers.find((du) => du.userId === domainUserId)
    if (!domainUser) return

    // Desmarcar el principal actual
    this.domainUsers.forEach((du) => {
      if (du.domainCode === domainUser.domainCode && du.isPrincipal) {
        du.isPrincipal = false
      }
    })

    // Marcar el nuevo principal
    domainUser.isPrincipal = true
  }

  handleTableAction(event: { actionId: string, item: any }): void {
    if (event.actionId === 'design') {
      this.router.navigate(['/dashboard/domain/detail', event.item.code]);
    } else if (event.actionId === 'edit') {
      this.openDomainModal(event.item);
    } else if (event.actionId === 'delete') {
      this.deleteDomain(event.item.code);
    }
  }

  // ── Usuarios expandidos por dominio ──────────────────────────
  loadDomainUsers(domainCode: string): void {
    if (this.domainUsersMap.has(domainCode)) return; // ya cargado
    this.domainUsersLoadingMap.set(domainCode, true);
    this.userSvc.listByDomain$(domainCode)
      .then(res => {
        if (res.success) {
          this.domainUsersMap.set(domainCode, res.data.users ?? []);
        } else {
          this.domainUsersMap.set(domainCode, []);
        }
      })
      .catch(() => this.domainUsersMap.set(domainCode, []))
      .finally(() => this.domainUsersLoadingMap.set(domainCode, false));
  }

  getDomainUsersFiltered(domainCode: string): userListResponse[] {
    const users = this.domainUsersMap.get(domainCode) ?? [];
    const filter = (this.domainUsersFilterMap.get(domainCode) ?? '').toLowerCase();
    if (!filter) return users;
    return users.filter(u =>
      u.name.toLowerCase().includes(filter) ||
      u.email.toLowerCase().includes(filter)
    );
  }

  isDomainUsersLoading(domainCode: string): boolean {
    return this.domainUsersLoadingMap.get(domainCode) ?? false;
  }

  getDomainUserFilter(domainCode: string): string {
    return this.domainUsersFilterMap.get(domainCode) ?? '';
  }

  setDomainUserFilter(domainCode: string, value: string): void {
    this.domainUsersFilterMap.set(domainCode, value);
  }

  reloadDomainUsers(domainCode: string): void {
    this.domainUsersMap.delete(domainCode);
    this.loadDomainUsers(domainCode);
  }

  removeUserFromDomainApi(domainCode: string, userId: number): void {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'El usuario dejará de estar vinculado a este dominio.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm mx-2 transition-all',
        cancelButton: 'px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm mx-2 transition-all'
      }
    }).then(result => {
      if (!result.isConfirmed) return;
      this.userSvc.removeFromDomain$(domainCode, userId)
        .then(res => {
          if (res.success) {
            const current = this.domainUsersMap.get(domainCode) ?? [];
            this.domainUsersMap.set(domainCode, current.filter(u => u.id !== userId));
            Swal.fire({ icon: 'success', title: 'Eliminado', text: 'Usuario desvinculado correctamente.', timer: 2000, showConfirmButton: false });
          } else {
            Swal.fire({ icon: 'warning', title: 'Atención', text: res.message });
          }
        })
        .catch(() => Swal.fire({ icon: 'error', title: 'Error', text: MessageDefault.errorConexion }));
    });
  }

  // ── Asignar Usuarios ─────────────────────────────────────────
  openAddUsersModal(domainCode: string): void {
    this.addUsersDomainCode = domainCode;
    this.selectedUserIds = new Set();
    this.selectedRoleId = 0;
    this.showAddUsersModal = true;
    this.isLoadingUsers = true;

    // IDs ya asignados a este dominio
    const assignedIds = new Set((this.domainUsersMap.get(domainCode) ?? []).map(u => u.id));

    Promise.all([
      this.userSvc.lista$(),
      this.typeSvc.lista$()
    ]).then(([usersRes, rolesRes]) => {
      if (rolesRes.success) this.roles = rolesRes.data;
      if (usersRes.success) {
        // Excluir usuarios ya asignados al dominio
        this.availableUsersList = usersRes.data.users.filter(u => !assignedIds.has(u.id));
      }
    }).catch(() => {
      Swal.fire({ icon: 'error', title: 'Error', text: MessageDefault.errorConexion });
    }).finally(() => this.isLoadingUsers = false);
  }

  closeAddUsersModal(): void {
    this.showAddUsersModal = false;
  }

  toggleUserSelection(userId: number): void {
    if (this.selectedUserIds.has(userId)) {
      this.selectedUserIds.delete(userId);
    } else {
      this.selectedUserIds.add(userId);
    }
  }

  confirmAssignUsers(): void {
    if (this.selectedUserIds.size === 0) return;
    this.isAssigningUsers = true;

    const requests = Array.from(this.selectedUserIds).map(userId => {
      const user = this.availableUsersList.find(u => u.id === userId);
      // Resolver roleId por el type del usuario; si no coincide usar el primero disponible
      const roleId = this.roles.find(r => r.name === user?.type)?.id ?? (this.roles[0]?.id ?? 0);
      return this.domain.assignUser$(this.addUsersDomainCode, userId, roleId);
    });

    Promise.all(requests)
      .then(results => {
        const failed = results.filter(r => !r.success);
        if (failed.length === 0) {
          Swal.fire({ icon: 'success', title: 'Éxito', text: 'Usuarios asignados correctamente.', timer: 2000, showConfirmButton: false });
          this.showAddUsersModal = false;
          this.getDomain();
          this.reloadDomainUsers(this.addUsersDomainCode);
        } else {
          Swal.fire({ icon: 'warning', title: 'Atención', text: `${failed.length} usuario(s) no pudieron ser asignados.` });
        }
      })
      .catch(() => Swal.fire({ icon: 'error', title: 'Error', text: MessageDefault.errorConexion }))
      .finally(() => this.isAssigningUsers = false);
  }
  //#endregion
}
