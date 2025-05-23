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
};


// Paystack's actual response structure
export interface PaystackResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        status: string;
        reference: string;
        receipt_number: string | null;
        amount: number;
        message: string | null;
        gateway_response: string;
        paid_at: string | null;
        created_at: string;
        channel: string;
        currency: string;
        ip_address: string;
        metadata: string;
        log: string | null;
        fees: number | null;
        fees_split: string | null;
        authorization: Record<string, unknown>;
        customer: {
            id: number;
            first_name: InitiatePayment;
            last_name: string | null;
            email: string;
            customer_code: string;
            phone: string | null;
            metadata: string | null;
            risk_action: string;
            international_format_phone: string | null;
        };
        plan: string | null;
        split: Record<string, unknown>;
        order_id: string | null;
        paidAt: string | null;
        createdAt: string;
        requested_amount: number;
        pos_transaction_data: string | null;
        source: string | null;
        fees_breakdown: string | null;
        connect: string | null;
        transaction_date: string;
        plan_object: Record<string, unknown>;
        subaccount: Record<string, unknown>;
    };
}
