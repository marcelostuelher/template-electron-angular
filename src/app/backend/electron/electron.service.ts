import { Injectable } from '@angular/core';
import { dialog, ipcRenderer, remote, shell} from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as os from 'os';

import { BehaviorSubject } from 'rxjs';
import { webFrame } from 'electron/renderer';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  public ipcRenderer: typeof ipcRenderer;
  public os: typeof os;
  private webFrame: typeof webFrame;
  private remote: typeof remote;
  public childProcess: typeof childProcess;
  private fs: typeof fs;
  private shell: typeof shell;
  private dialog: typeof dialog;
  private filesPath: string;
  public showLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public cmdEvent: EventEmitter = new EventEmitter();


  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.dialog = window.require('electron').dialog;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.os = window.require('os');
      this.shell = window.require('electron').shell;
    }
  }


  public getUserProfile(): string {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  }

  public getUserName(): string {
    return this.os.userInfo().username;
  }
}
