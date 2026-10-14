import type { ComponentCategory } from "./types";

export const componentCategories: ComponentCategory[] = [
    {id: 'cpu', name: 'CPU', icon: 'Cpu'},
    {id: 'gpu', name: 'Видеокарта', icon: 'Monitor'},
    {id: 'motherboard', name: 'Материнская плата', icon: 'Server'},
    {id: 'ram', name: 'Оперативная память', icon: 'MemoryStick'},
    {id: 'storage', name: 'Накопитель', icon: 'HardDrive'},
    {id: 'psu', name: 'Блок Питания', icon: 'Zap'},
    {id: 'case', name: 'Корпус', icon: 'Box'},
    {id: 'cooling', name: 'Охлаждение', icon: 'Fan'},
]

// Тестовый аккаунт: его создаёт prisma/seed.ts, а форма входа показывает
// логин и пароль всем посетителям. При изменении поправьте и prisma/seed.ts
export const TEST_USER = { login: 'test', password: '12345678' };
