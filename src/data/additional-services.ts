export type AdditionalItem = {
  name: string;
  price: string;
  /** Qualifier printed next to the price, when the rate is not a flat one. */
  unit?: string;
};

export type AdditionalCategory = {
  number: string;
  name: string;
  items: AdditionalItem[];
};

export const additionalCategories: AdditionalCategory[] = [
  {
    number: "01",
    name: "CONTENT & CREATIVE",
    items: [
      { name: "Reel Social", price: "$200.000" },
      { name: "Reel Pro", price: "$300.000" },
      { name: "Carrusel", price: "$90.000" },
      { name: "Sesión fotográfica", price: "$350.000" },
      { name: "Diseño de flyer", price: "$90.000", unit: "+ impresión" },
      { name: "Diseño de póster", price: "$170.000", unit: "+ impresión" },
    ],
  },
  {
    number: "02",
    name: "MARKETING & STRATEGY",
    items: [
      { name: "Estrategia mensual sin producción", price: "$450.000" },
      { name: "Administración de redes", price: "$500.000" },
    ],
  },
  {
    number: "03",
    name: "DIGITAL & TECHNOLOGY",
    items: [
      { name: "Landing page", price: "$900.000" },
      { name: "Página web corporativa", price: "$1.800.000" },
      { name: "Tienda virtual e-commerce", price: "$2.800.000" },
    ],
  },
  {
    number: "04",
    name: "BUSINESS & GROWTH",
    items: [
      {
        name: "Mentoría empresarial individual",
        price: "$200.000",
        unit: "por sesión",
      },
      {
        name: "Taller de ventas y servicio al cliente",
        price: "$750.000",
        unit: "por 6 sesiones",
      },
    ],
  },
];

export const additionalNote =
  "Todos los valores están en COP y son tarifas de referencia sujetas al alcance de cada proyecto. La cotización final se confirma después de la reunión de diagnóstico.";
