export interface TaxonomyTag {
  id: string;
  label: string;
  description?: string;
}

export interface Taxonomy {
  tags: TaxonomyTag[];
}
