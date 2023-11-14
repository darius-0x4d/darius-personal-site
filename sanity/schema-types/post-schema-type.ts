export type PostSchemaType = {
    _type: 'post';
    _createdAt: string;
    _updatedAt: string;
    _id: string;
    title: string;
    slug: Slug;
    mainImage: any;
    body: any[];
    publishedAt: string;
    categories: Categories[];
    author: Author;
};

export type Slug = {
    _type: 'slug';
    current: string;
}

type Categories = {
    description: string;
    title: string;
}

type Author = {
    _type: 'author';
    _id: string;
    bio: any[];
    image: Image;
    name: string;

}

type Image = {
    _type: 'image';
    alt: string;
    asset: {
        _ref: string;
        _type: 'reference';
    }
}