export type PostSchemaType = {
    _type: 'post';
    _createdAt: string;
    _updatedAt: string;
    _id: string;
    title: string;
    slug: Slug;
    mainImage: any;
    body: any[];
};

type Slug = {
    _type: 'slug';
    current: string;
}