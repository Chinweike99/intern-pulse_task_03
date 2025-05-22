export interface InitiatePayment{
    name: string;
    amount: number;
    email: string;
};


export interface PaymentResonse {
    id: string;
    customer_name: string;
    customer_email: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    reference: string;
    created_at: Date;
}