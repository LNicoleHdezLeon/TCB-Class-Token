import { Injectable } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { bindNodeCallback, Observable } from 'rxjs';
import { AbiItem } from 'web3-utils';
import { Buffer } from 'buffer';
import { Subject } from 'rxjs';

import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

@Injectable({providedIn: 'root'})
export class Web3Service {
    public abi: any;
    public contractAddress: string;
    public contrato: any;
    public accounts: any;
    public web3js: any;    
    public provider: any;    
    web3Modal;
    
    private accountStatusSource = new Subject<any>();
    accountStatus$ = this.accountStatusSource.asObservable();

    constructor() {
        const providerOptions = {
            walletconnect: {
              package: WalletConnectProvider, // required
              options: {
                infuraId: "wss://ropsten.infura.io/ws/v3/ba4cc3e93f614299b1dae93cfcca823c" // required
              }
            }
          };

        this.web3Modal = new Web3Modal({
            network: "ropsten", // optional
            cacheProvider: true, // optional
            providerOptions, // required
            theme: {
                background: "rgb(39, 49, 56)",
                main: "rgb(199, 199, 199)",
                secondary: "rgb(136, 136, 136)",
                border: "rgba(195, 195, 195, 0.14)",
                hover: "rgb(16, 26, 32)"
            }
        });

        // tslint:disable-next-line:max-line-length              
        this.abi = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_someone","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]');
        this.contractAddress = '0x11714f7C0F81d7612A9E6d4CA4c6322EeE56e112';             
    }
      
    async connectAccount() {
        this.web3Modal.clearCachedProvider();
    
        this.provider = await this.web3Modal.connect(); // set provider
        this.web3js = new Web3(this.provider); // create web3 instance
        this.accounts = await this.web3js.eth.getAccounts(); 
        this.accountStatusSource.next(this.accounts)
        this.contrato = new this.web3js.eth.Contract(this.abi, this.contractAddress);   
    }  
    
}

/*

constructor() {
        this.web3 = new Web3();

        this.web3.setProvider(
            new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/c0c8c037208043debd3192efe93ed1d2')
        );

        //this.sender = '0xf65112fa0998477c990fb71722b067b7892f2160';
        this.sender = '0xAFF7B3C82d2B3B2270db013E0Cbf2783ED514bF1';

        this.web3.eth.defaultAccount = this.sender;
        
        // tslint:disable-next-line:max-line-length              
        this.abi = JSON.parse('[{"constant":false,"inputs":[],"name":"increment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldValue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"ValueChanged","type":"event"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
        this.contractAddress = '0x99E5a41b66702D9d54428d48FE9C8dEE2DDc6CbC';

        this.contrato = new this.web3.eth.Contract(this.abi, this.contractAddress);
    }
*/
