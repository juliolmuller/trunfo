/**
 * Convert a file to a Base64 URL notation
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onerror = (error): void => reject(error);
    fileReader.onload = (): void => resolve(fileReader.result?.toString() as string);
    fileReader.readAsDataURL(file);
  });
}
