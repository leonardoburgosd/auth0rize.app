import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare const CodeMirror: any;

interface Page {
    name: string;
    html: string;
    css: string;
}

@Component({
    selector: 'app-domain-detail',
    templateUrl: './domain-detail.component.html',
    styleUrls: ['./domain-detail.component.scss'],
    standalone: false
})
export class DomainDetailComponent implements OnInit, AfterViewInit {

    domainCode: string = '';
    activeTab: 'html' | 'css' = 'html';
    activePage: string = 'usuario';

    pages: { [key: string]: Page } = {
        usuario: {
            name: 'Usuario',
            html: `<div class="bg-slate-900 flex items-center justify-center min-h-screen flex-col">
  <div class="w-[462px] h-[512px] bg-blue-50 rounded-[10px] border border-sky-700">
      <img class="w-[55px] h-14 mx-auto block mt-16" src="../../../assets/icon.png" />
    <h1 class="text-black text-xl text-center mt-6">Inicia sesión</h1>
    <h4 class="text-black text-sm text-center mt-3 mb-12">Si eres miembro ingresa tus datos</h4>

    <div class="pl-10 pr-10">
      <input class="" type="text"
        placeholder="Nombre de usuario o correo" />
      <div class="w-full text-left pl-1 pt-2 pb-5">
        <a href="#" class="text-sky-600 text-sm">¿Has olvidado tu nombre de usuario?</a>
      </div>
      <div class="flex flex-wrap justify-center">
        <a href="#"
          class="flex items-center font-semibold h-10 rounded pl-7 pr-7 text-black text-sm mt-4 right-auto m-auto hover:bg-blue-100">
          Registrarme
        </a>
        <button type="submit"
          class="h-10 bg-[#0f172a] rounded pl-7 pr-7 text-white text-sm mt-4 right-auto m-auto hover:bg-[#15213b]">
          Siguiente
        </button>
      </div>
    </div>
  </div>
</div>`,
            css: `.bg-slate-900 {
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.w-\\[462px\\] {
  width: 462px;
  height: 512px;
  background: #eff6ff;
  border-radius: 10px;
  border: 1px solid #0284c7;
  padding: 0;
}

.h-\\[512px\\] {
  height: 512px;
}

.bg-blue-50 {
  background: #eff6ff;
}

.rounded-\\[10px\\] {
  border-radius: 10px;
}

.border-sky-700 {
  border: 1px solid #0284c7;
}

.w-\\[55px\\] {
  width: 55px;
}

.h-14 {
  height: 56px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.block {
  display: block;
}

.mt-16 {
  margin-top: 64px;
}

.text-black {
  color: #000000;
}

.text-xl {
  font-size: 1.25rem;
}

.text-center {
  text-align: center;
}

.mt-6 {
  margin-top: 24px;
}

.text-sm {
  font-size: 0.875rem;
}

.mt-3 {
  margin-top: 12px;
}

.mb-12 {
  margin-bottom: 48px;
}

.pl-10 {
  padding-left: 40px;
}

.pr-10 {
  padding-right: 40px;
}

.pl-1 {
  padding-left: 4px;
}

.pt-2 {
  padding-top: 8px;
}

.pb-5 {
  padding-bottom: 20px;
}

.pl-7 {
  padding-left: 28px;
}

.pr-7 {
  padding-right: 28px;
}

.mt-4 {
  margin-top: 16px;
}

.text-left {
  text-align: left;
}

.text-sky-600 {
  color: #0284c7;
}

.items-center {
  align-items: center;
}

.font-semibold {
  font-weight: 600;
}

.rounded {
  border-radius: 6px;
}

.right-auto {
  right: auto;
}

.m-auto {
  margin: auto;
}

h1 {
  font-weight: 500;
}

h4 {
  font-weight: 400;
}

input {
  background: #ffffff;
  border: 1px solid #d5d5d5;
  padding: 10px 16px;
  margin: 0;
  width: 100%;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  color: #1f2937;
  transition: all 0.2s ease;
  font-family: 'Poppins', inherit;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  font-weight: 400;
  line-height: 1.5;
}

input:focus {
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
}

input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.w-full {
  width: 100%;
}

a {
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #0369a1;
  text-decoration: underline;
}

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.justify-center {
  justify-content: center;
}

.flex-col {
  flex-direction: column;
}

.min-h-screen {
  min-height: 100vh;
}

a.flex {
  height: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
}

a.flex:hover {
  background: #dbeafe;
}

button {
  height: 40px;
  background: #0f172a;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: 0.875rem;
}

button:hover {
  background: #15213b;
}

.hover\\:bg-blue-100:hover {
  background: #dbeafe;
}

.bg-\\[\\#0f172a\\] {
  background: #0f172a;
}

.hover\\:bg-\\[\\#15213b\\]:hover {
  background: #15213b;
}

@media (max-width: 600px) {
  .w-\\[462px\\] {
    width: 100%;
    max-width: 462px;
    height: auto;
    min-height: 512px;
  }
}`
        },
        contrasena: {
            name: 'Contraseña',
            html: `<div class="bg-slate-900 flex items-center justify-center min-h-screen flex-col">
  <div class="w-[462px] h-auto bg-blue-50 rounded-[10px] border border-sky-700">
    <a href="#">
      <img class="w-[55px] h-14 mx-auto block mt-16" src="../../../assets/icon.png" />
    </a>
    <h1 class="text-black text-xl text-center mt-6">Te damos la bienvenida</h1>
    <div class="flex items-center justify-center m-2">
      <div class="flex bg-slate-200 w-auto px-2 py-2 rounded-md items-center justify-center">
        <i class="fa-solid fa-user pr-3"></i>
        <span class="text-neutral-700 text-sm">jperezgonzales@gmail.com</span>
      </div>
    </div>

    <div class="pl-10 pr-10 text-right pb-11">
      <input type="password" class="ring-1 w-full rounded-md px-4 py-2 mt-2 mb-2 bg-white outline-none border border-neutral-150 focus-border-slate-900" placeholder="Ingrese su contraseña" />
      <div class="w-full text-left pl-1 pt-2 pb-5">
        <a href="#" class="text-sky-600 text-sm">¿Has olvidado tu contraseña?</a>
      </div>
      <button type="submit" class="h-10 bg-[#0f172a] rounded pl-7 pr-7 text-white text-sm mt-4 right-auto m-auto hover-bg-[#15213b]">
        Siguiente
      </button>
    </div>
  </div>
</div>`,
            css: `.bg-slate-900 {
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.w-\\[462px\\] {
  width: 462px;
  height: auto;
  background: #eff6ff;
  border-radius: 10px;
  border: 1px solid #0284c7;
  padding: 0;
}

.h-auto {
  height: auto;
}

.bg-blue-50 {
  background: #eff6ff;
}

.rounded-\\[10px\\] {
  border-radius: 10px;
}

.border-sky-700 {
  border: 1px solid #0284c7;
}

a {
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #0369a1;
}

.w-\\[55px\\] {
  width: 55px;
}

.h-14 {
  height: 56px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.block {
  display: block;
}

.mt-16 {
  margin-top: 64px;
}

.text-black {
  color: #000000;
}

.text-xl {
  font-size: 1.25rem;
}

.text-center {
  text-align: center;
}

.mt-6 {
  margin-top: 24px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.m-2 {
  margin: 8px;
}

.bg-slate-200 {
  background: #e2e8f0;
}

.w-auto {
  width: auto;
}

.px-2 {
  padding-left: 8px;
  padding-right: 8px;
}

.py-2 {
  padding-top: 8px;
  padding-bottom: 8px;
}

.rounded-md {
  border-radius: 6px;
}

.fa-solid {
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
}

.fa-user:before {
  content: "\\f007";
}

.pr-3 {
  padding-right: 12px;
}

.text-neutral-700 {
  color: #404040;
}

.text-sm {
  font-size: 0.875rem;
}

.pl-10 {
  padding-left: 40px;
}

.pr-10 {
  padding-right: 40px;
}

.text-right {
  text-align: right;
}

.pb-11 {
  padding-bottom: 44px;
}

input {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  width: 100%;
  border-radius: 6px;
  padding: 8px 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  background: #ffffff;
  outline: none;
  border: 1px solid #e5e5e5;
  font-size: 0.95rem;
  color: #1f2937;
  transition: all 0.2s ease;
  font-family: 'Poppins', inherit;
  font-weight: 400;
  line-height: 1.5;
}

input:focus {
  border-color: #0f172a;
  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.1);
}

input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.ring-1 {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.w-full {
  width: 100%;
}

.px-4 {
  padding-left: 16px;
  padding-right: 16px;
}

.mt-2 {
  margin-top: 8px;
}

.mb-2 {
  margin-bottom: 8px;
}

.bg-white {
  background: #ffffff;
}

.outline-none {
  outline: none;
}

.border {
  border-width: 1px;
}

.border-neutral-150 {
  border-color: #e5e5e5;
}

.focus-border-slate-900:focus {
  border-color: #0f172a;
}

.text-left {
  text-align: left;
}

.pl-1 {
  padding-left: 4px;
}

.pt-2 {
  padding-top: 8px;
}

.pb-5 {
  padding-bottom: 20px;
}

.text-sky-600 {
  color: #0284c7;
}

a.text-sky-600:hover {
  color: #0369a1;
  text-decoration: underline;
}

button {
  height: 40px;
  background: #0f172a;
  border-radius: 6px;
  padding-left: 28px;
  padding-right: 28px;
  color: #ffffff;
  font-size: 0.875rem;
  margin-top: 16px;
  right: auto;
  margin-left: auto;
  margin-right: auto;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  display: inline-block;
}

button:hover {
  background: #15213b;
}

.h-10 {
  height: 40px;
}

.bg-\\[\\#0f172a\\] {
  background: #0f172a;
}

.rounded {
  border-radius: 6px;
}

.pl-7 {
  padding-left: 28px;
}

.pr-7 {
  padding-right: 28px;
}

.text-white {
  color: #ffffff;
}

.mt-4 {
  margin-top: 16px;
}

.right-auto {
  right: auto;
}

.m-auto {
  margin: auto;
}

.hover-bg-\\[\\#15213b\\]:hover {
  background: #15213b;
}

.flex-col {
  flex-direction: column;
}

.min-h-screen {
  min-height: 100vh;
}

h1 {
  font-weight: 500;
}

@media (max-width: 600px) {
  .w-\\[462px\\] {
    width: 100%;
    max-width: 462px;
    height: auto;
  }

  .pl-10 {
    padding-left: 20px;
  }

  .pr-10 {
    padding-right: 20px;
  }
}`
        }
    };

    @ViewChild('htmlEditorEl') htmlEditorEl!: ElementRef;
    @ViewChild('cssEditorEl') cssEditorEl!: ElementRef;
    @ViewChild('previewFrame') previewFrame!: ElementRef<HTMLIFrameElement>;

    private htmlEditor: any;
    private cssEditor: any;
    private updateTimer: any;

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
        const currentPage = this.pages[this.activePage];

        this.htmlEditor = CodeMirror(this.htmlEditorEl.nativeElement, {
            value: currentPage.html,
            mode: 'htmlmixed',
            theme: 'dracula',
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2,
            indentWithTabs: false,
            autofocus: true,
        });

        this.cssEditor = CodeMirror(this.cssEditorEl.nativeElement, {
            value: currentPage.css,
            mode: 'css',
            theme: 'dracula',
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2,
            indentWithTabs: false,
        });

        this.htmlEditor.on('change', () => {
            this.pages[this.activePage].html = this.htmlEditor.getValue();
            this.scheduleUpdate();
        });

        this.cssEditor.on('change', () => {
            this.pages[this.activePage].css = this.cssEditor.getValue();
            this.scheduleUpdate();
        });
    }

    private scheduleUpdate(): void {
        clearTimeout(this.updateTimer);
        this.updateTimer = setTimeout(() => this.updatePreview(), 400);
    }

    updatePreview(): void {
        const currentPage = this.pages[this.activePage];
        const html = this.htmlEditor?.getValue() ?? currentPage.html;
        const css = this.cssEditor?.getValue() ?? currentPage.css;

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

    setPage(pageKey: string): void {
        this.activePage = pageKey;
        const currentPage = this.pages[pageKey];

        this.htmlEditor.setValue(currentPage.html);
        this.cssEditor.setValue(currentPage.css);
        this.updatePreview();
    }

    getPageKeys(): string[] {
        return Object.keys(this.pages);
    }
}
