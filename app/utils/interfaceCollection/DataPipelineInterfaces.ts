export interface Rule {
    id: string;
    ruleType: string;
    domain: string;
    entity: string;
    attribute: string;
    ruleName: string;
    ruleDescription: string;
    ruleDimension: string;
    status: 'Approved' | 'Rejected' | 'Pending';
    createdAt: string;
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}

export interface RuleListResponse {
    success: boolean;
    data: Rule[];
}

export interface UpdatePayload {
    id: string;
    ruleType?: string;
    domain?: string;
    entity?: string;
    attribute?: string;
    ruleName?: string;
    ruleDescription?: string;
    ruleDimension?: string;
    status?: Rule["status"];
}

