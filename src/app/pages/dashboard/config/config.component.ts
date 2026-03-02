import { Component, OnInit } from '@angular/core';

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

    ngOnInit(): void {
        this.avatarPreview = this.getInitialsAvatar();
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
        // Simula guardado
        setTimeout(() => {
            this.isSaving = false;
        }, 1500);
    }

    setTab(tab: 'profile' | 'security'): void {
        this.activeTab = tab;
    }
}
