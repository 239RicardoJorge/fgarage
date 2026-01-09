
import { WorkItem, ContactInfo } from './types';

export const SLOGAN = "Arranjamos Carros";
export const MAP_URL = "https://maps.app.goo.gl/6AmUNBUaj6x1HVwH6";
export const BRAND_NAME = "F GARAGE";

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 1,
    title: "V8 Big Block",
    description: "Restauração total de motor Chevy 454. Performance pura e precisão mecânica.",
    image: "/images/v8-engine.png",
    year: "2024"
  },
  {
    id: 2,
    title: "Cofre de Motor Mustang",
    description: "Limpeza detalhada, pintura de coletores e afinação de carburador Edelbrock.",
    image: "/images/mustang-engine.png",
    year: "2023"
  },
  {
    id: 3,
    title: "Chassis & Suspensão",
    description: "Substituição de casquilhos e reforço estrutural para condução desportiva.",
    image: "/images/chassis-suspension.png",
    year: "2024"
  },
  {
    id: 4,
    title: "A Alma da Oficina",
    description: "Ferramentas certas, mãos experientes. Onde o metal ganha vida.",
    image: "/images/workshop-soul.png",
    year: "2024"
  }
];

export const CONTACTS: ContactInfo = {
  phone: "+351 912 345 678",
  whatsapp: "351912345678",
  address: "Estrada de Paço de Arcos, 12, 2735-307 Agualva-Cacém",
  hours: "Seg - Sex: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
  email: "contato@fgarage.pt"
};
