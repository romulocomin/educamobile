import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { Network } from '@ionic-native/network';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class NetworkConnectivityProvider {

    public NetworkStatus: BehaviorSubject<boolean>;
    public WatchConnect: Subscription;
    public WatchDisconnect: Subscription;

    constructor(public platform:Platform, public network: Network) {
        console.log('Hello NetworkConnectivityProvider');
        this.NetworkStatus = new BehaviorSubject(false);            // Assume Network is offline
        this.CheckNetworkStatus();
        this.CreateNetworkObserverSubscriptions();
    }

    CheckNetworkStatus() {
        if( this.platform.is('cordova') ) {
            if( this.network.type === undefined || this.network.type === null || this.network.type === 'unknown') {
                this.UpdateNetworkStatus(false);

            } else {
              this.UpdateNetworkStatus(true);
            }
        } else {
            this.UpdateNetworkStatus(navigator.onLine);
        }
    }

    CreateNetworkObserverSubscriptions() {
        this.WatchConnect = this.network.onConnect().subscribe(
            data => { this.UpdateNetworkStatus(true); },
            error => { console.log(error); }
        );      
        this.WatchDisconnect = this.network.onDisconnect().subscribe(
            data => { this.UpdateNetworkStatus(false); },
            error => { console.log(error); }
        );      
    }

    UpdateNetworkStatus(IsOnline:boolean) {
        console.log('Network ', (IsOnline == true ? 'Online' : 'Offline') );
        
        this.NetworkStatus.next(IsOnline);
    }
}   

