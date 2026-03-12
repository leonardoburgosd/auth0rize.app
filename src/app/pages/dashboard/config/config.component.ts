import { Component, OnInit } from '@angular/core';
import { userServices } from 'src/app/Data/services/userServices';

interface UserProfile {
    firstName: string;
    fatherLastName: string;
    motherLastName: string;
    userName: string;
    email: string;
    avatar: string;
    userType: number;
    twoFactorAuth: boolean;
}

interface UserType {
    id: number;
    name: string;
}

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss'],
    standalone: false
})
export class ConfigComponent implements OnInit {

    profile: UserProfile = {
        firstName: '',
        fatherLastName: '',
        motherLastName: '',
        userName: '',
        email: '',
        avatar: '',
        userType: 0,
        twoFactorAuth: false
    };

    userTypes: UserType[] = [
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Moderador' },
        { id: 3, name: 'Usuario' },
        { id: 4, name: 'Invitado' }
    ];

    isSaving: boolean = false;
    avatarPreview: string = '';
    activeTab: 'profile' | 'security' = 'profile';

    constructor(private userService: userServices) { }

    ngOnInit(): void {
        this.loadUserInfo();
    }

    loadUserInfo(): void {
        this.userService.info$().then(response => {
            if (response.success && response.data) {
                const data = response.data;
                this.profile = {
                    firstName: data.firstName,
                    fatherLastName: data.lastName,
                    motherLastName: data.motherLastName,
                    userName: data.userName,
                    email: data.email,
                    avatar: data.avatar,
                    userType: this.mapUserType(data.userType),
                    twoFactorAuth: data.isDoubleFactorActive
                };
                if (this.profile.avatar && this.profile.avatar !== 'default.png') {
                    // Assuming avatar is a URL or we need to prefix it
                    this.avatarPreview = this.profile.avatar;
                } else {
                    this.avatarPreview = this.getInitialsAvatar();
                }
            }
        });
    }

    mapUserType(type: string): number {
        const types: { [key: string]: number } = {
            'admin': 1,
            'superadmin': 1,
            'moderator': 2,
            'user': 3,
            'guest': 4
        };
        return types[type.toLowerCase()] || 0;
    }

    get fullName(): string {
        const parts = [this.profile.firstName, this.profile.fatherLastName, this.profile.motherLastName];
        return parts.filter(p => p.trim()).join(' ') || 'Sin nombre';
    }

    get initials(): string {
        const first = this.profile.firstName?.charAt(0) || '';
        const father = this.profile.fatherLastName?.charAt(0) || '';
        return (first + father).toUpperCase() || '??';
    }

    getInitialsAvatar(): string {
        return '';
    }

    onAvatarChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.profile.avatar = e.target.result;
                this.avatarPreview = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    removeAvatar(): void {
        this.profile.avatar = '';
        this.avatarPreview = '';
    }

    autoGenerateUserName(): void {
        const f = this.profile.firstName?.charAt(0).toLowerCase() || '';
        const l = this.profile.fatherLastName?.toLowerCase().replace(/\s/g, '') || '';
        if (f || l) {
            this.profile.userName = f + l;
        }
    }

    toggleTwoFactor(): void {
        this.profile.twoFactorAuth = !this.profile.twoFactorAuth;
    }

    saveProfile(): void {
        this.isSaving = true;

        if (this.activeTab === 'profile') {
            const request = {
                firstName: this.profile.firstName,
                lastName: this.profile.fatherLastName,
                motherLastName: this.profile.motherLastName,
                userName: this.profile.userName,
                email: this.profile.email,
                typeId: this.profile.userType
            };

            this.userService.actualizar$(request).then(response => {
                this.isSaving = false;
                if (response.success) {
                    console.log('Información personal guardada correctamente');
                    // Recargar información si es necesario
                    this.loadUserInfo();
                }
            }).catch(error => {
                this.isSaving = false;
                console.error('Error al guardar información personal', error);
            });
        } else if (this.activeTab === 'security') {
            this.userService.doubleFactor$(this.profile.twoFactorAuth).then(response => {
                this.isSaving = false;
                if (response.success) {
                    console.log('Configuración de seguridad guardada');
                }
            }).catch(error => {
                this.isSaving = false;
                console.error('Error al guardar configuración de seguridad', error);
            });
        }
    }

    setTab(tab: 'profile' | 'security'): void {
        this.activeTab = tab;
    }
}
