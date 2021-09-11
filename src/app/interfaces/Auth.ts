export interface AuthResponse{
    ok:    boolean;
    uid?:   string;
    name?:  string;
    surnames?: string;
    avatar?: string;
    email?: string;
    token?: string;
    msg?: string;
}

export interface Usuario {
    uid: string;
    name: string;
    surnames: string;
    avatar?: string;
    email: string;
    token?: string;
    msg?: string;
}