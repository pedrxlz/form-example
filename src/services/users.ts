interface User {
  id: number;
  name: string;
}

export type UsersResponse = User[];

export async function getUsers(): Promise<UsersResponse> {
  return fetch("/api/users").then((response) => response.json());
}
