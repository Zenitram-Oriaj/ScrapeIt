
const URL = require('url');

export class Options extends Object {
	public host: string;
	public port: number;
	public path: string;
	public retries: number;
	public protocol: string;
	
	private url: URL;
	
	constructor(obj?: Options) {
		super();
		if(obj){
			Object.assign(this, obj);
		} else {
			this.host = 'localhost';
			this.port = 80;
			this.path = '';
			this.retries = 0;
			this.protocol = 'http';
		}
		this.Validate();
		this.url = new URL(this.toUrlString());
	}

	public toUrlString(): string {
		return `${this.protocol}://${this.host}:${this.port.toString()}/${this.path}`;
	}

	private Validate(){
		if(this.host.length > 0 && this.host.indexOf('://',0) > -1){
			let s = this.host.split('://');
			this.protocol = s[0];
			this.host = s[1];
		}

		if(this.host.length > 0 && this.host.indexOf(':',0) > -1){
			let s = this.host.split(':');
			this.host = s[0];
			this.port = parseInt(s[1], 10);
		}
	}
}