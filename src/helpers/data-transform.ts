/**
 * Convert a file to a Base64 URL notation
 */
export function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onerror = (error) => reject(error)
    fileReader.onload = () => resolve(fileReader.result as any)
    fileReader.readAsDataURL(file)
  })
}
