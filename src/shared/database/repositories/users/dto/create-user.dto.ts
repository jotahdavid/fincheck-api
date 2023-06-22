interface Category {
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface CreateUserDto {
  password: string;
  email: string;
  name: string;
  categories?: Category[];
}
