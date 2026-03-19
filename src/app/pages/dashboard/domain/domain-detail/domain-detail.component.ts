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

    htmlCode: string = `<div class="bg-slate-900 flex items-center justify-center min-h-screen flex-col">
  <div class="w-[462px] h-[512px] bg-blue-50 rounded-[10px] border border-sky-700">
      <img class="w-[55px] h-14 mx-auto block mt-16" src="../../../assets/icon.png" />
    <h1 class="text-black text-xl text-center mt-6">Inicia sesión</h1>
    <h4 class="text-black text-sm text-center mt-3 mb-12">Si eres miembro ingresa tus datos</h4>

    <div class="pl-10 pr-10">
      <input class="bg-white border border-neutral-150 px-4 py-2 m-0 w-full ring-1 rounded-md outline-none" type="text"
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
</div>`;

    cssCode: string = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
}

.bg-slate-900 {
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

div[class*="w-\\[462px\\]"] {
  width: 462px;
  height: 512px;
  background: #eff6ff;
  border-radius: 10px;
  border: 1px solid #0284c7;
  padding: 0;
}

img {
  width: 55px;
  height: 56px;
  margin: 0 auto;
  display: block;
  margin-top: 64px;
}

h1 {
  color: #000000;
  font-size: 1.25rem;
  text-align: center;
  margin-top: 24px;
  font-weight: 500;
}

h4 {
  color: #000000;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 48px;
  font-weight: 400;
}

form {
  padding-left: 40px;
  padding-right: 40px;
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
  text-align: left;
  padding-left: 4px;
  padding-top: 8px;
  padding-bottom: 20px;
}

a {
  color: #0284c7;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #0369a1;
  text-decoration: underline;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

button, a[class*="flex"] {
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 40px;
  border-radius: 6px;
  padding: 0 28px;
  color: #000000;
  font-size: 0.875rem;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

a[class*="flex"]:hover {
  background: #dbeafe;
}

button {
  height: 40px;
  background: #0f172a;
  border-radius: 6px;
  padding: 0 28px;
  color: #ffffff;
  font-size: 0.875rem;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
}

button:hover {
  background: #15213b;
}

@media (max-width: 600px) {
  div[class*="w-\\[462px\\]"] {
    width: 100%;
    max-width: 462px;
    height: auto;
    min-height: 512px;
  }

  form {
    padding-left: 24px;
    padding-right: 24px;
  }
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
