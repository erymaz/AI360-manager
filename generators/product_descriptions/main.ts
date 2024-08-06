export { run } from "./generator";
export { getFormSchema } from "./form";

export function metaData() {
  return {
    name: "product_descriptions",
    title: {
      "en-US": "Create a Captivating Product Description in Seconds Using AI",
      es: "Cree una descripción de producto cautivadora en segundos utilizando IA",
      de: "Mit AI in Sekundenschnelle eine fesselnde Produktbeschreibung erstellen",
    },
    image: "product_descriptions",
    description: {
      "en-US": "Attract customer interest with engaging product descriptions. Include all the details such as product benefits, material, size, appearance, keywords, and use the right tone of voice.",
      es: "Atraiga el interés del cliente con descripciones atractivas de los productos. Incluya todos los detalles, como ventajas del producto, material, tamaño, aspecto, palabras clave y utilice el tono de voz adecuado.",
      de: "Wecken Sie das Interesse der Kunden mit ansprechenden Produktbeschreibungen. Geben Sie alle Details wie Produktvorteile, Material, Größe, Aussehen und Schlüsselwörter an und verwenden Sie den richtigen Tonfall.",
    },
    contentType: "text",
    credits_per_use: 2,
    cost_per_use: 20,
    promoted: 0,
    popularity: 1,
  };
}
