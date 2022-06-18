declare class Wallet {
    constructor(token: string);

    private call(methodTag: string, method: string, requestData: any): any;

    public getBalance(): number;

    public createPayUrl(payload: string): string;

    public getTransHistory(params?: any): any[];

    public checkUser(userId: number): boolean;

    public createTransfer(toId: number, amount: number, payload?: string): any;

    public createCallBackServer(url: string): string;

    public deleteCallBackServer(): string;
}