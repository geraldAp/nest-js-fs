import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      role: 'ENGINEER',
    },
    {
      id: '2',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'INTERN',
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'ADMIN',
    },
    {
      id: '4',
      name: 'Dana White',
      email: 'dana.white@example.com',
      role: 'ENGINEER',
    },
    {
      id: '5',
      name: 'Evan Black',
      email: 'evan.black@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => +b.id - +a.id);
    const newUser = {
      id: (+usersByHighestId[0].id + 1).toString(),
      ...user,
    };

    this.users.push(newUser);
    return 'user created successfully';
  }
  updateUser(
    id: string,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: string) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;  // User not found
    }
    const removedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);  // Remove user from array
    return {message:'user removed successfully',removedUser};

  }
}
