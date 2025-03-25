const { PrismaClient } = require("@prisma/client")

// Singleton pattern for Prisma client
let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // Prevent multiple instances during development
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

module.exports = prisma

