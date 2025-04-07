export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
}