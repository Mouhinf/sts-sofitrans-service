/**
 * Seed script — populates the database with a default admin user,
 * a few properties/vehicles/trainings/posts, and the company settings.
 *
 * Run with:  npm run seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@sts-sofitrans.sn").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const name = process.env.ADMIN_NAME ?? "Admin STS";

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name, role: "admin" },
  });
  console.log(`[seed] admin user: ${email} / ${password}`);

  await prisma.companySettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      phone: "+221 77 000 00 00",
      whatsapp: "221770000000",
      email: "contact@sts-sofitrans.sn",
      address: "Zac Mbao Rond Point Sipres, Dakar, Sénégal",
    },
  });
  console.log("[seed] company settings created");

  // Properties
  const propertyCount = await prisma.property.count();
  if (propertyCount === 0) {
    await prisma.property.createMany({
      data: [
        {
          title: "Villa moderne avec piscine — Almadies",
          description:
            "Magnifique villa F5 avec piscine, jardin paysager et gardiennage 24/7. Située dans un quartier résidentiel calme, à 5 minutes de l'aéroport.",
          price: 180_000_000,
          location: "Almadies, Dakar",
          bedrooms: 4,
          bathrooms: 3,
          areaSqm: 320,
          propertyType: "house",
          featured: true,
          images: "[]",
        },
        {
          title: "Appartement meublé — Plateau",
          description:
            "Appartement F3 meublé avec vue sur le port. Idéal pour cadres en mission ou location courte durée.",
          price: 65_000_000,
          location: "Plateau, Dakar",
          bedrooms: 2,
          bathrooms: 2,
          areaSqm: 95,
          propertyType: "apartment",
          featured: false,
          images: "[]",
        },
        {
          title: "Terrain viabilisé — Diamniadio",
          description:
            "Terrain de 500 m² viabilisé dans la zone d'extension de Diamniadio. Titre foncier disponible.",
          price: 35_000_000,
          location: "Diamniadio",
          bedrooms: 0,
          bathrooms: 0,
          areaSqm: 500,
          propertyType: "land",
          featured: false,
          images: "[]",
        },
      ],
    });
    console.log("[seed] 3 properties created");
  }

  // Vehicles
  const vehicleCount = await prisma.vehicle.count();
  if (vehicleCount === 0) {
    await prisma.vehicle.createMany({
      data: [
        {
          title: "Toyota Land Cruiser V8",
          model: "Land Cruiser V8",
          description: "SUV 7 places idéal pour les déplacements professionnels et excursions.",
          vehicleType: "car",
          capacity: 7,
          pricePerDay: 150_000,
          featured: true,
          images: "[]",
        },
        {
          title: "Bus Coaster 30 places",
          model: "Toyota Coaster",
          description: "Bus climatisé 30 places avec chauffeur, idéal pour le transport de personnel.",
          vehicleType: "bus",
          capacity: 30,
          pricePerDay: 200_000,
          featured: true,
          images: "[]",
        },
        {
          title: "Camion benne 5T",
          model: "Mercedes Atego",
          description: "Camion benne pour le transport de matériaux et logistique chantier.",
          vehicleType: "truck",
          capacity: 3,
          pricePerDay: 120_000,
          featured: false,
          images: "[]",
        },
      ],
    });
    console.log("[seed] 3 vehicles created");
  }

  // Trainings
  const trainingCount = await prisma.training.count();
  if (trainingCount === 0) {
    await prisma.training.createMany({
      data: [
        {
          title: "Logistique & transport de marchandises",
          description:
            "Maîtrisez les fondamentaux de la logistique, du transport multimodal et de la gestion d'entrepôt.",
          durationDays: 5,
          price: 350_000,
          maxCapacity: 20,
          imageUrl: "",
          imagePublicId: "",
        },
        {
          title: "Gestion d'entreprise — initiation",
          description:
            "Initiation à la gestion d'entreprise : comptabilité, fiscal, droit du travail, management.",
          durationDays: 10,
          price: 500_000,
          maxCapacity: 25,
          imageUrl: "",
          imagePublicId: "",
        },
        {
          title: "Techniques agricoles modernes",
          description:
            "Formation pratique aux techniques agricoles modernes adaptées au contexte sénégalais.",
          durationDays: 7,
          price: 400_000,
          maxCapacity: 15,
          imageUrl: "",
          imagePublicId: "",
        },
      ],
    });
    console.log("[seed] 3 trainings created");
  }

  console.log("[seed] done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
