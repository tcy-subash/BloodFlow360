import api from "../api/axios";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/Auth";

const AuthService = {
  async login(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const request: LoginRequest = {
      email,
      password,
    };

    const response = await api.post<LoginResponse>(
      "/Auth/login",
      request
    );

    return response.data;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>("/Auth/register", data);

    return response.data;
  },
};

export default AuthService;