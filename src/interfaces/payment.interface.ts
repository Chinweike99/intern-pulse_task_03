export interface InitiatePayment{
    name: string;
    amount: number;
    email: string;
};


export interface PaymentResponse {
    id: string;
    name: string;
    email: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    reference: string;
    created_at: Date
}