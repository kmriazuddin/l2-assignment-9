interface ICreateUser {
  email: string;
  name: string;
  address: string;
  mobile: number;
  password: string;
  accountType: "CUSTOMER" | "VENDOR";
}
