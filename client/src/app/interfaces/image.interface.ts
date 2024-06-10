export interface Image {
  imageId: string;
  imagePath: string;
  imageDescription: string;
  referenceId: string;
  referenceType: 'Animal' | 'Biome' | 'Service';
}
