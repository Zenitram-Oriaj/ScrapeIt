export class Result extends Object {
	public data: any;
	public success: boolean;
	public message: string;	
	public error?: any;
	
	constructor() {
			super();
			this.data = {};
			this.success = false;
			this.message = '';
			this.error = null;
		}

		public toJSON(): string {
			return JSON.stringify(this);
		}
}