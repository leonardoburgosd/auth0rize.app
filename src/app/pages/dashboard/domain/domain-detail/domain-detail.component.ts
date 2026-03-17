import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare const CodeMirror: any;

@Component({
    selector: 'app-domain-detail',
    templateUrl: './domain-detail.component.html',
    styleUrls: ['./domain-detail.component.scss'],
    standalone: false
})
export class DomainDetailComponent implements OnInit, AfterViewInit {

    domainCode: string = '';
    activeTab: 'html' | 'css' = 'html';

    @ViewChild('htmlEditorEl') htmlEditorEl!: ElementRef;
    @ViewChild('cssEditorEl') cssEditorEl!: ElementRef;
    @ViewChild('previewFrame') previewFrame!: ElementRef<HTMLIFrameElement>;

    private htmlEditor: any;
    private cssEditor: any;
    private updateTimer: any;

    htmlCode: string = `<div class="login-wrapper">
  <div class="login-card">
    <div class="login-logo">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="#14b8a6"/>
        <path d="M20 10a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 14c-6.627 0-12 2.686-12 6v1h24v-1c0-3.314-5.373-6-12-6z" fill="white"/>
      </svg>
    </div>
    <h1>Bienvenido</h1>
    <p class="subtitle">Inicia sesión en tu cuenta</p>

    <form>
      <div class="field">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" placeholder="usuario@correo.com" />
      </div>
      <div class="field">
        <label for="password">Contraseña</label>
        <input type="password" id="password" placeholder="••••••••" />
      </div>
      <div class="options">
        <label class="remember">
          <input type="checkbox" /> Recordarme
        </label>
        <a href="#" class="forgot">¿Olvidaste tu contraseña?</a>
      </div>
      <button type="submit" class="btn-login">Iniciar sesión</button>
    </form>

    <p class="register">¿No tienes cuenta? <a href="#">Regístrate</a></p>
  </div>
</div>`;

    cssCode: string = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f1f5f9;
  min-height: 100vh;
}

.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f766e 0%, #134e4a 100%);
  padding: 1rem;
}

.login-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.login-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
}

h1 {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.subtitle {
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 1.75rem;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.4rem;
}

.field input {
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus {
  border-color: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20,184,166,0.15);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
}

.remember {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #64748b;
  cursor: pointer;
}

.forgot {
  color: #14b8a6;
  text-decoration: none;
  font-weight: 500;
}

.forgot:hover {
  text-decoration: underline;
}

.btn-login {
  width: 100%;
  padding: 0.75rem;
  background: #14b8a6;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn-login:hover {
  background: #0f766e;
}

.btn-login:active {
  transform: scale(0.98);
}

.register {
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.82rem;
  color: #94a3b8;
}

.register a {
  color: #14b8a6;
  font-weight: 600;
  text-decoration: none;
}

.register a:hover {
  text-decoration: underline;
}`;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.domainCode = this.route.snapshot.paramMap.get('code') ?? '';
    }

    goBack(): void {
        this.router.navigate(['/dashboard/domain']);
    }

    ngAfterViewInit(): void {
        this.loadCodeMirror().then(() => {
            this.initEditors();
            this.updatePreview();
        });
    }

    private loadCodeMirror(): Promise<void> {
        return new Promise(resolve => {
            if (typeof CodeMirror !== 'undefined') { resolve(); return; }

            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css';
            document.head.appendChild(cssLink);

            const themeCss = document.createElement('link');
            themeCss.rel = 'stylesheet';
            themeCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/dracula.min.css';
            document.head.appendChild(themeCss);

            const loadScript = (src: string): Promise<void> =>
                new Promise(res => {
                    const s = document.createElement('script');
                    s.src = src;
                    s.onload = () => res();
                    document.head.appendChild(s);
                });

            loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js')
                .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/xml/xml.min.js'))
                .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/css/css.min.js'))
                .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/htmlmixed/htmlmixed.min.js'))
                .then(() => resolve());
        });
    }

    private initEditors(): void {
        this.htmlEditor = CodeMirror(this.htmlEditorEl.nativeElement, {
            value: this.htmlCode,
            mode: 'htmlmixed',
            theme: 'dracula',
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2,
            indentWithTabs: false,
            autofocus: true,
        });

        this.cssEditor = CodeMirror(this.cssEditorEl.nativeElement, {
            value: this.cssCode,
            mode: 'css',
            theme: 'dracula',
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2,
            indentWithTabs: false,
        });

        this.htmlEditor.on('change', () => this.scheduleUpdate());
        this.cssEditor.on('change', () => this.scheduleUpdate());
    }

    private scheduleUpdate(): void {
        clearTimeout(this.updateTimer);
        this.updateTimer = setTimeout(() => this.updatePreview(), 400);
    }

    updatePreview(): void {
        const html = this.htmlEditor?.getValue() ?? this.htmlCode;
        const css = this.cssEditor?.getValue() ?? this.cssCode;

        const doc = this.previewFrame.nativeElement.contentDocument;
        if (!doc) return;

        doc.open();
        doc.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #fff; }
  ${css}
</style>
</head>
<body>${html}</body>
</html>`);
        doc.close();
    }

    setTab(tab: 'html' | 'css'): void {
        this.activeTab = tab;
        setTimeout(() => {
            if (tab === 'html') this.htmlEditor?.refresh();
            else this.cssEditor?.refresh();
        }, 50);
    }
}
